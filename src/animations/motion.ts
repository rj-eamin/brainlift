import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const EASE = {
  out: 'power3.out',
  inOut: 'power4.inOut',
  soft: 'power2.out',
} as const;

export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function initMotion(): () => void {
  if (typeof window === 'undefined' || prefersReducedMotion()) return () => undefined;

  const cleanups: Array<() => void> = [];
  const toArray = gsap.utils.toArray;

  const tl = gsap.timeline({ defaults: { ease: EASE.out }, delay: 0.15 });
  tl.fromTo('[data-hero-eyebrow]', { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.7 }, 0)
    .fromTo('[data-hero-title]', { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 1 }, 0.1)
    .fromTo('[data-hero-sub]', { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.55)
    .fromTo('[data-hero-cta]', { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.1 }, 0.7)
    .fromTo('[data-hero-meta]', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.9 }, 0.95)
    .fromTo('[data-hero-cue]', { autoAlpha: 0 }, { autoAlpha: 1, duration: 1 }, 1.25);
  cleanups.push(() => tl.kill());

  if (document.querySelector('[data-hero-visual]')) {
    const tw = gsap.to('[data-hero-visual]', {
      yPercent: 12,
      ease: 'none',
      scrollTrigger: { trigger: '[data-hero]', start: 'top top', end: 'bottom top', scrub: 0.6 },
    });
    cleanups.push(() => tw.scrollTrigger?.kill());
  }

  toArray<HTMLElement>('[data-reveal]').forEach((el) => {
    const tw = gsap.fromTo(el,
      { autoAlpha: 0, y: 28 },
      {
        autoAlpha: 1, y: 0, duration: 0.9, ease: EASE.out,
        scrollTrigger: { trigger: el, start: 'top 86%', once: true },
      });
    cleanups.push(() => tw.scrollTrigger?.kill());
  });

  toArray<HTMLElement>('[data-stagger]').forEach((parent) => {
    const items = parent.querySelectorAll('[data-stagger-item]');
    if (!items.length) return;
    const tw = gsap.fromTo(items,
      { autoAlpha: 0, y: 30 },
      {
        autoAlpha: 1, y: 0, duration: 0.85, ease: EASE.out, stagger: 0.09,
        scrollTrigger: { trigger: parent, start: 'top 82%', once: true },
      });
    cleanups.push(() => tw.scrollTrigger?.kill());
  });

  toArray<HTMLElement>('[data-count]').forEach((el) => {
    const target = Number(el.dataset.count ?? '0');
    const decimals = Number(el.dataset.decimals ?? '0');
    const suffix = el.dataset.suffix ?? '';
    const state = { v: 0 };
    const tw = gsap.to(state, {
      v: target,
      duration: 1.8,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 92%', once: true },
      onUpdate: () => {
        el.textContent = decimals > 0
          ? state.v.toFixed(decimals) + suffix
          : Math.round(state.v).toLocaleString('en-US') + suffix;
      },
    });
    cleanups.push(() => tw.scrollTrigger?.kill());
  });

  const nav = document.querySelector<HTMLElement>('[data-nav-root]');
  if (nav) {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      nav.classList.toggle('is-scrolled', y > 24);
      if (y > 420 && y > last + 3) {
        gsap.to(nav, { y: -90, duration: 0.45, ease: EASE.soft, overwrite: true });
      } else if (y < last - 3 || y < 420) {
        gsap.to(nav, { y: 0, duration: 0.45, ease: EASE.soft, overwrite: true });
      }
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    cleanups.push(() => window.removeEventListener('scroll', onScroll));
  }

  if (document.fonts?.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());

  return () => {
    cleanups.forEach((fn) => fn());
    ScrollTrigger.getAll().forEach((t) => t.kill());
  };
}
