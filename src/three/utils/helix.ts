import * as THREE from 'three';

const TURNS = 2.4;
const HEIGHT = 8.6;
const RADIUS_BOTTOM = 5.2;
const RADIUS_TOP = 1.7;
const Y_OFFSET = -3.9;

export function helixPoint(t: number, out = new THREE.Vector3()): THREE.Vector3 {
  const angle = t * Math.PI * 2 * TURNS + 0.6;
  const radius = THREE.MathUtils.lerp(RADIUS_BOTTOM, RADIUS_TOP, Math.pow(t, 0.92));
  return out.set(Math.cos(angle) * radius, Y_OFFSET + t * HEIGHT, Math.sin(angle) * radius);
}

export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a += 0x6d2b79f5;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
