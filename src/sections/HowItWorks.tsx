import { METHOD_CHAIN, STEPS } from '../data/store';
import { Button } from '../components/ui/Button';

export function HowItWorks() {
  return (
    <section className="section section--light method" id="method">
      <div className="container method__grid">
        <div className="method__intro" data-reveal>
          <p className="eyebrow"><span className="eyebrow__index">04</span>The method</p>
          <h2 className="section-title">A method, not a feed.</h2>
          <p className="section-lede">
            Most platforms optimize for watch time. Brainlift optimizes for ascent — a four-stage
            loop grounded in how expertise actually forms.
          </p>
          <ul className="chain mono" aria-label="The Brainlift ascent">
            {METHOD_CHAIN.map((s) => <li key={s}>{s}</li>)}
          </ul>
          <div style={{ marginTop: '2.2rem' }}>
            <Button href="#cta" variant="ghost-ink" size="sm" arrow>See it in action</Button>
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
  );
}
