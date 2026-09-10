import { ORGS, STATS } from '../data/store';

export function TrustBar() {
  return (
    <section className="trust" id="trust" aria-label="Traction">
      <div className="container">
        <p className="trust__label mono" data-reveal>Learning teams at</p>
      </div>
      <div className="marquee" data-reveal>
        <p className="sr-only">Teams learning with Brainlift: {ORGS.join(', ')}</p>
        <div className="marquee__track" aria-hidden="true">
          {[0, 1].map((g) => (
            <div className="marquee__group" key={g}>
              {ORGS.map((o) => (
                <span className="marquee__item" key={o}>{o}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="container">
        <dl className="trust__stats" data-stagger>
          {STATS.map((s) => (
            <div className="trust__stat" key={s.label} data-stagger-item>
              <dd className="trust__num" data-count={s.value} data-decimals={s.decimals ?? 0} data-suffix={s.suffix}>
                {s.initial}
              </dd>
              <dt className="trust__cap mono">{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
