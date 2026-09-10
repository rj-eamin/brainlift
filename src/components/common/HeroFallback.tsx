import { useMemo } from 'react';

export function HeroFallback() {
  const pts = useMemo(() => {
    const arr: { x: number; y: number; t: number }[] = [];
    for (let i = 0; i < 30; i++) {
      const t = i / 29;
      arr.push({
        x: 1000 - t * 440 + Math.sin(t * 12) * 92,
        y: 650 - t * 460 + Math.cos(t * 9) * 32,
        t,
      });
    }
    return arr;
  }, []);

  return (
    <div className="hero-fallback" aria-hidden="true">
      <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="hf-glow" cx="62%" cy="42%" r="55%">
            <stop offset="0%" stopColor="#e2a63d" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#e2a63d" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="1200" height="800" fill="url(#hf-glow)" />
        {pts.slice(0, -1).map((p, i) => (
          <line
            key={`l-${i}`}
            x1={p.x} y1={p.y}
            x2={pts[i + 1].x} y2={pts[i + 1].y}
            stroke="#7d8db0" strokeOpacity="0.25" strokeWidth="1"
          />
        ))}
        {pts.map((p, i) => (
          <circle
            key={`n-${i}`}
            cx={p.x} cy={p.y}
            r={1.6 + p.t * 3.2}
            fill={p.t > 0.55 ? '#e2a63d' : '#7d8db0'}
            fillOpacity={0.4 + p.t * 0.6}
          />
        ))}
        <ellipse cx="560" cy="180" rx="52" ry="14" fill="none" stroke="#e2a63d" strokeOpacity="0.7" />
        <ellipse cx="560" cy="180" rx="84" ry="24" fill="none" stroke="#e2a63d" strokeOpacity="0.32" />
      </svg>
    </div>
  );
}
