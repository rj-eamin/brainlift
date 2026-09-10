import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '../components/ui/Button';
import { ErrorBoundary } from '../components/common/ErrorBoundary';
import { HeroFallback } from '../components/common/HeroFallback';
import { IconSpark } from '../components/common/Icons';
import { detectQuality, supportsWebGL } from '../lib/system';
import { useReducedMotion } from '../hooks/useReducedMotion';

const HeroScene = lazy(() => import('../three/scenes/HeroScene'));

export function Hero() {
  const visualRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);
  const [webgl] = useState(() => supportsWebGL());
  const quality = useMemo(() => detectQuality(), []);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = visualRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { threshold: 0.01 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="hero" id="top" data-hero aria-label="Brainlift introduction">
      <div className="hero__visual" data-hero-visual ref={visualRef} aria-hidden="true">
        {webgl ? (
          <ErrorBoundary fallback={<HeroFallback />}>
            <Suspense fallback={<HeroFallback />}>
              <HeroScene quality={quality} animate={!reduced} active={active} />
            </Suspense>
          </ErrorBoundary>
        ) : (
          <HeroFallback />
        )}
      </div>
      <div className="hero__scrim" aria-hidden="true" />

      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="eyebrow" data-hero-eyebrow>
            <IconSpark /> Next-generation learning
          </p>
          <h1 className="hero__title" data-hero-title>
            <span className="line-mask"><span className="line-mask__inner">Elevate the way</span></span>
            <span className="line-mask"><span className="line-mask__inner">you <em className="tint">learn.</em></span></span>
          </h1>
          <p className="hero__sub" data-hero-sub>
            Brainlift turns learning from passive watching into an active ascent — map what you know,
            discover what&apos;s next, and build skills that compound, guided by people who&apos;ve done the work.
          </p>
          <div className="hero__cta">
            <span data-hero-cta><Button href="/courses" arrow>Explore courses</Button></span>
            <span data-hero-cta><Button href="/courses" variant="ghost">Start learning</Button></span>
          </div>
          <p className="hero__meta mono" data-hero-meta>
            240+ expert-led courses · 120 mentors · 92% completion
          </p>
        </div>
      </div>

      <div className="hero__cue" data-hero-cue aria-hidden="true">
        <span className="hero__cue-line" />
        <span className="mono">Scroll</span>
      </div>
    </section>
  );
}
