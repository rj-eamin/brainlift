import { PATHS } from '../data/store';
import { Button } from '../components/ui/Button';
import { PageHero, PageCta } from '../components/ui/Page';

export function PathsPage() {
  return (
    <>
      <PageHero
        index="03"
        eyebrow="Learning paths"
        title="Structured journeys, from first step to summit."
        lede="A path sequences courses, projects and reviews into one continuous ascent — so you always know your next move."
      />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="path-list" data-stagger>
            {PATHS.map((p, i) => (
              <article className="path-row" key={p.id} data-stagger-item>
                <div className="path-row__index mono">{String(i + 1).padStart(2, '0')}</div>
                <div className="path-row__main">
                  <h3 className="path-row__title">{p.name}</h3>
                  <p className="path-row__desc">{p.desc}</p>
                  <ul className="path-row__stages" aria-label="Path stages">
                    {p.stages.map((s, j) => (
                      <li className="stage" key={s}>
                        <span className="stage__dot" aria-hidden="true" />
                        {s}
                        {j < p.stages.length - 1 && <span className="stage__line" aria-hidden="true" />}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="path-row__side">
                  <p className="mono path-row__meta">{p.weeks} weeks · {p.courses} courses · {p.level}</p>
                  <Button href="/#cta" variant="ghost" size="sm" arrow>Start this path</Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <PageCta />
    </>
  );
}
