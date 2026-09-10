import { Button } from './Button';

interface PageHeroProps {
  index: string;
  eyebrow: string;
  title: string;
  lede: string;
}

export function PageHero({ index, eyebrow, title, lede }: PageHeroProps) {
  return (
    <header className="page-hero">
      <div className="container">
        <p className="eyebrow" data-reveal>
          <span className="eyebrow__index">{index}</span>
          {eyebrow}
        </p>
        <h1 className="page-title" data-reveal>{title}</h1>
        <p className="page-lede" data-reveal>{lede}</p>
      </div>
    </header>
  );
}

export function PageCta() {
  return (
    <section className="page-cta">
      <div className="container" data-reveal>
        <h2 className="page-cta__title">Ready to begin your ascent?</h2>
        <p className="page-cta__lede">
          Join the next cohort — or talk to us about team learning.
        </p>
        <Button href="/courses" arrow>Start learning</Button>
      </div>
    </section>
  );
}
