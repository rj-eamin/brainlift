import type { CSSProperties } from 'react';
import { IMPACT, TESTIMONIAL, TESTIMONIALS_SMALL } from '../data/store';
import { IconStar } from '../components/common/Icons';

const HUES = [38, 210, 160];

function initials(name: string): string {
  return name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
}

function Stars() {
  return (
    <span className="quote__stars" aria-label="Rated 5 out of 5">
      {[0, 1, 2, 3, 4].map((i) => <IconStar key={i} />)}
    </span>
  );
}

interface QuoteData { quote: string; name: string; role: string }

export function QuoteCard({ data, hue, featured }: { data: QuoteData; hue: number; featured?: boolean }) {
  return (
    <blockquote
      className={`quote ${featured ? 'quote--featured quote--big' : 'quote--small'}`}
      data-stagger-item
    >
      <div className="quote__head">
        <span className="quote__avatar" style={{ '--hue': hue } as CSSProperties} aria-hidden="true">
          {initials(data.name)}
        </span>
        <Stars />
      </div>
      <p className="quote__text">{data.quote}</p>
      <footer className="quote__author">
        <strong>{data.name}</strong> — {data.role}
      </footer>
    </blockquote>
  );
}

export function StudentSuccess() {
  return (
    <section className="section" id="stories">
      <div className="container">
        <header className="section-head" data-reveal>
          <p className="eyebrow"><span className="eyebrow__index">07</span>Stories</p>
          <h2 className="section-title">The lift is real.</h2>
        </header>

        <div className="stories__grid" data-stagger>
          <QuoteCard data={TESTIMONIAL} hue={HUES[0]} featured />
          <div className="stories__side">
            {TESTIMONIALS_SMALL.map((t, i) => (
              <QuoteCard key={t.name} data={t} hue={HUES[i + 1]} />
            ))}
          </div>
        </div>

        <div className="impact" data-stagger>
          {IMPACT.map((s) => (
            <div key={s.label} data-stagger-item>
              <div className="impact__num" data-count={s.value} data-decimals={s.decimals ?? 0} data-suffix={s.suffix}>
                {s.initial}
              </div>
              <p className="impact__cap">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
