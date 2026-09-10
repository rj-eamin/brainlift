export type Quality = 'high' | 'medium' | 'low';

export function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl2') || canvas.getContext('webgl'))
    );
  } catch {
    return false;
  }
}

export function detectQuality(): Quality {
  if (typeof navigator === 'undefined') return 'medium';
  const nav = navigator as Navigator & { deviceMemory?: number };
  const memory = nav.deviceMemory ?? 8;
  const cores = navigator.hardwareConcurrency ?? 4;
  if (memory <= 2 || cores <= 2) return 'low';
  const small = typeof window !== 'undefined' && window.innerWidth < 768;
  if (small || memory <= 4 || cores <= 4) return 'medium';
  return (window.devicePixelRatio ?? 1) > 2.75 ? 'medium' : 'high';
}
