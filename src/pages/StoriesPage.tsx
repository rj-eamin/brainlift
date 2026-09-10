import { IMPACT, TESTIMONIAL, TESTIMONIALS_SMALL } from '../data/store';
import { QuoteCard } from '../sections/StudentSuccess';
import { PageHero, PageCta } from '../components/ui/Page';

const HUES = [38, 210, 160];

export function StoriesPage() {
  return (
    <>
      <PageHero
        index="07"
        eyebrow="Stories"
        title="The lift is real."
        lede="Real learners, real transitions — measured in skills, roles and confidence."
      />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
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
      <PageCta />
    </>
  );
}
