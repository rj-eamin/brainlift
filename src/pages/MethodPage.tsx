import { METHOD_CHAIN, STEPS } from '../data/store';
import { Button } from '../components/ui/Button';
import { PageHero, PageCta } from '../components/ui/Page';

export function MethodPage() {
  return (
    <>
      <PageHero
        index="04"
        eyebrow="The method"
        title="A method, not a feed."
        lede="Most platforms optimize for watch time. Brainlift optimizes for ascent — a four-stage loop grounded in how expertise actually forms."
      />
      <section className="section section--light method" style={{ paddingTop: 0 }}>
        <div className="container method__grid">
          <div className="method__intro" data-reveal>
            <ul className="chain mono" aria-label="The Brainlift ascent">
              {METHOD_CHAIN.map((s) => <li key={s}>{s}</li>)}
            </ul>
            <p style={{ marginTop: '1.6rem' }}>
              Every course, path and review on Brainlift is an expression of this loop.
              You are never asked to watch passively — you discover, connect, build and carry proof.
            </p>
            <div style={{ marginTop: '2rem' }}>
              <Button href="/#cta" variant="ghost-ink" size="sm" arrow>Apply the method</Button>
            </div>
          </div>
          <div className="steps" data-stagger>
            {STEPS.map((s) => (
              <div className="step" key={s.n} data-stagger-item>
                <div className="step__num" aria-hidden="true">{s.n}</div>
                <div className="step__body">
                  <span className="step__tag mono">{s.tag}</span>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <PageCta />
    </>
  );
}
