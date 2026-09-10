import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { helixPoint, mulberry32 } from '../utils/helix';
import type { Quality } from '../../lib/system';

export interface HeroSceneProps {
  quality: Quality;
  animate: boolean;
  active: boolean;
}

const CONFIG: Record<Quality, { nodes: number; particles: number; dpr: [number, number]; antialias: boolean }> = {
  high: { nodes: 210, particles: 260, dpr: [1, 2], antialias: true },
  medium: { nodes: 150, particles: 160, dpr: [1, 1.6], antialias: true },
  low: { nodes: 96, particles: 90, dpr: [1, 1.2], antialias: false },
};

const COL_BOTTOM = new THREE.Color('#5c6b84');
const COL_TOP = new THREE.Color('#e2a63d');
const COL_LINE = new THREE.Color('#7d8db0');

function KnowledgeField({ quality, animate }: { quality: Quality; animate: boolean }) {
  const { size } = useThree();
  const group = useRef<THREE.Group>(null);
  const rings = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.InstancedMesh>(null);
  const pulse = useRef<THREE.Mesh>(null);
  const pulseLight = useRef<THREE.PointLight>(null);

  const count = CONFIG[quality].nodes;

  const nodes = useMemo(() => {
    const rng = mulberry32(20250419);
    const arr: { pos: THREE.Vector3; t: number; s: number }[] = [];
    for (let i = 0; i < count; i++) {
      const t = count === 1 ? 0 : i / (count - 1);
      const p = helixPoint(t);
      p.x += (rng() - 0.5) * 1.1;
      p.y += (rng() - 0.5) * 0.8;
      p.z += (rng() - 0.5) * 1.1;
      arr.push({ pos: p, t, s: 0.045 + rng() * 0.08 + t * 0.055 });
    }
    return arr;
  }, [count]);

  const nodeGeo = useMemo(() => new THREE.IcosahedronGeometry(1, 1), []);
  const nodeMat = useMemo(
    () => new THREE.MeshStandardMaterial({
      roughness: 0.32, metalness: 0.25,
      emissive: new THREE.Color('#1a1408'), emissiveIntensity: 0.6,
    }),
    [],
  );
  useEffect(() => () => { nodeGeo.dispose(); nodeMat.dispose(); }, [nodeGeo, nodeMat]);

  useEffect(() => {
    const m = mesh.current;
    if (!m) return;
    const mat4 = new THREE.Matrix4();
    const quat = new THREE.Quaternion();
    const scl = new THREE.Vector3();
    const col = new THREE.Color();
    nodes.forEach((n, i) => {
      scl.setScalar(n.s);
      mat4.compose(n.pos, quat, scl);
      m.setMatrixAt(i, mat4);
      col.copy(COL_BOTTOM).lerp(COL_TOP, Math.pow(n.t, 1.4));
      m.setColorAt(i, col);
    });
    m.instanceMatrix.needsUpdate = true;
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
  }, [nodes]);

  const lineGeo = useMemo(() => {
    const pos: number[] = [];
    for (let i = 0; i < nodes.length - 1; i++) {
      const a = nodes[i].pos;
      const b = nodes[i + 1].pos;
      pos.push(a.x, a.y, a.z, b.x, b.y, b.z);
      if (i + 2 < nodes.length && i % 5 === 0) {
        const c = nodes[i + 2].pos;
        pos.push(a.x, a.y, a.z, c.x, c.y, c.z);
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    return g;
  }, [nodes]);
  useEffect(() => () => lineGeo.dispose(), [lineGeo]);

  const summit = useMemo(() => helixPoint(1).add(new THREE.Vector3(0, 0.9, 0)), []);

  const landscape = size.width / size.height > 1.15;

  useFrame((state, delta) => {
    if (!animate) return;
    if (group.current) group.current.rotation.y += delta * 0.04;
    if (rings.current) {
      rings.current.children.forEach((r, i) => {
        r.rotation.z += delta * (0.05 + i * 0.03) * (i % 2 ? -1 : 1);
      });
    }
    const p = pulse.current;
    const light = pulseLight.current;
    if (p && light) {
      const cycle = 1.35;
      const tRaw = (state.clock.elapsedTime * 0.14 + 0.35) % cycle;
      const t = Math.min(tRaw, 1);
      const target = helixPoint(t);
      p.position.copy(target);
      light.position.copy(target);
      const fade = tRaw > 1
        ? Math.max(0, 1 - (tRaw - 1) / (cycle - 1))
        : Math.min(1, t / 0.06);
      (p.material as THREE.MeshBasicMaterial).opacity = fade;
      light.intensity = 10 * fade;
    }
  });

  return (
    <group ref={group} position={[landscape ? 2.3 : 0, 0, 0]} scale={landscape ? 1 : 0.78}>
      <instancedMesh ref={mesh} args={[nodeGeo, nodeMat, count]} frustumCulled={false} />
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial color={COL_LINE} transparent opacity={0.22} blending={THREE.AdditiveBlending} depthWrite={false} />
      </lineSegments>
      <group ref={rings} position={summit}>
        {[1.0, 1.5, 2.05].map((r, i) => (
          <mesh key={r} rotation={[Math.PI / 2.15 + i * 0.16, i * 0.5, 0]}>
            <torusGeometry args={[r, 0.016, 8, 96]} />
            <meshBasicMaterial color="#e2a63d" transparent opacity={0.85 - i * 0.22} blending={THREE.AdditiveBlending} depthWrite={false} />
          </mesh>
        ))}
      </group>
      <mesh ref={pulse}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshBasicMaterial color="#ffd98a" transparent opacity={0} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <pointLight ref={pulseLight} color="#e2a63d" distance={5.5} decay={2} intensity={0} />
    </group>
  );
}

function DriftParticles({ count, animate }: { count: number; animate: boolean }) {
  const { positions, speeds } = useMemo(() => {
    const rng = mulberry32(99);
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (rng() - 0.5) * 20;
      positions[i * 3 + 1] = -6 + rng() * 14;
      positions[i * 3 + 2] = -7 + rng() * 10;
      speeds[i] = 0.12 + rng() * 0.3;
    }
    return { positions, speeds };
  }, [count]);

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return g;
  }, [positions]);
  useEffect(() => () => geo.dispose(), [geo]);

  useFrame((_, delta) => {
    if (!animate) return;
    const attr = geo.getAttribute('position') as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      let y = attr.getY(i) + speeds[i] * delta;
      if (y > 8) y = -6;
      attr.setY(i, y);
    }
    attr.needsUpdate = true;
  });

  return (
    <points geometry={geo}>
      <pointsMaterial color="#cbb27a" size={0.05} sizeAttenuation transparent opacity={0.5} depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

function CameraRig({ animate }: { animate: boolean }) {
  const { camera } = useThree();
  const pointer = useRef({ x: 0, y: 0 });
  const arrived = useRef(!animate);
  const lookTarget = useMemo(() => new THREE.Vector3(0, 0.6, 0), []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  useEffect(() => {
    if (!animate) {
      camera.position.set(0, 1.2, 13.5);
      camera.lookAt(lookTarget);
      return;
    }
    camera.position.set(0, -2.2, 19.5);
    arrived.current = false;
    const tween = gsap.to(camera.position, {
      x: 0, y: 1.2, z: 13.5,
      duration: 2.6, ease: 'power3.inOut',
      onComplete: () => { arrived.current = true; },
    });
    return () => { tween.kill(); };
  }, [animate, camera, lookTarget]);

  useFrame((_, delta) => {
    camera.lookAt(lookTarget);
    if (!animate || !arrived.current) return;
    const k = Math.min(1, delta * 2.2) * 0.4;
    camera.position.x += (pointer.current.x * 0.9 - camera.position.x) * k;
    camera.position.y += ((1.2 - pointer.current.y * 0.55) - camera.position.y) * k;
  });

  return null;
}

export default function HeroScene({ quality, animate, active }: HeroSceneProps) {
  const cfg = CONFIG[quality];
  return (
    <Canvas
      dpr={cfg.dpr}
      frameloop={animate && active ? 'always' : 'demand'}
      camera={{ fov: 45, near: 0.1, far: 80, position: [0, 1.2, 13.5] }}
      gl={{ antialias: cfg.antialias, alpha: true, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
    >
      <fog attach="fog" args={['#0a0d13', 12, 34]} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[7, 10, 6]} intensity={1.7} color="#ffd9a3" />
      <directionalLight position={[-9, -4, -6]} intensity={0.5} color="#7d8db0" />
      <KnowledgeField quality={quality} animate={animate} />
      <DriftParticles count={cfg.particles} animate={animate} />
      <CameraRig animate={animate} />
    </Canvas>
  );
}
