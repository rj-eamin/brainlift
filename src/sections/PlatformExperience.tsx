import type { JSX } from 'react';
import { Logo } from '../components/common/Logo';
import { SectionHeading } from '../components/ui/SectionHeading';

type MockKind = 'adaptive' | 'reviews' | 'progress' | 'credential';

const FEATURES: Array<{ n: string; title: string; body: string; mock: MockKind }> = [
  {
    n: '01', title: 'Adaptive syllabus', mock: 'adaptive',
    body: 'Your curriculum listens. Brainlift reorders lessons in real time around what you have mastered and where you hesitate.',
  },
  {
    n: '02', title: 'Mentor reviews', mock: 'reviews',
    body: 'Submit work and receive line-by-line feedback from practitioners within 48 hours — the fastest loop in online learning.',
  },
  {
    n: '03', title: 'Progress you can see', mock: 'progress',
    body: 'Streaks, skill curves and elevation scores turn invisible effort into visible momentum.',
  },
  {
    n: '04', title: 'Credentials that travel', mock: 'credential',
    body: 'Verified certificates and a living portfolio, ready for the people who hire.',
  },
];

function ProgressRingMock() {
  const r = 42;
  const c = 2 * Math.PI * r;
  return (
    <svg className="mock-ring" viewBox="0 0 120 120" role="img" aria-label="Elevation progress: 72 percent">
      <circle className="mock-ring__track" cx="60" cy="60" r={r} />
      <circle className="mock-ring__fill" cx="60" cy="60" r={r} strokeDasharray={`${0.72 * c} ${c}`} transform="rotate(-90 60 60)" />
      <text className="mock-ring__num" x="60" y="58" textAnchor="middle">72%</text>
      <text className="mock-ring__label" x="60" y="74" textAnchor="middle">elevation</text>
    </svg>
  );
}

function ReviewMock() {
  return (
    <div className="mock-review">
      <div className="mock-review__top">
        <span className="mock-review__dot" aria-hidden="true">AO</span>
        <span className="mock-review__stars" aria-label="5 out of 5 stars">★★★★★</span>
      </div>
      <q>Strong abstraction boundary here — now make the failure path explicit.</q>
      <span className="mock-review__foot">Mentor feedback · 38h</span>
    </div>
  );
}

function BarsMock() {
  const bars = [42, 68, 55, 80, 62, 90, 74];
  return (
    <div className="mock-bars" role="img" aria-label="Weekly learning streak chart">
      {bars.map((v, i) => (
        <div key={i} style={{ height: `${v}%` }} className={v === 90 ? 'is-peak' : ''} />
      ))}
    </div>
  );
}

function CertMock() {
  return (
    <div className="mock-cert">
      <span className="mock-cert__seal" aria-hidden="true">
        <svg viewBox="0 0 24 24"><rect x="2.6" y="13.2" width="4.8" height="8.2" rx="1.3" fill="currentColor" /><rect x="9.6" y="8.6" width="4.8" height="12.8" rx="1.3" fill="currentColor" /><rect x="16.6" y="3.2" width="4.8" height="18.2" rx="1.3" fill="currentColor" /></svg>
      </span>
      <span className="mock-cert__title mono">Certificate of Elevation</span>
      <span className="mock-cert__name">Sofia Marchetti</span>
      <span className="mock-cert__id">BL-2025-0419</span>
    </div>
  );
}

const MOCKS: Record<MockKind, () => JSX.Element> = {
  adaptive: ProgressRingMock,
  reviews: ReviewMock,
  progress: BarsMock,
  credential: CertMock,
};

export function PlatformExperience() {
  return (
    <section className="section" id="platform">
      <div className="container platform__grid">
        <div className="platform__intro" data-reveal>
          <p className="eyebrow"><span className="eyebrow__index">06</span>The platform</p>
          <h2 className="section-title">Built like a studio. Tuned like an instrument.</h2>
          <p className="section-lede">
            Every surface of Brainlift serves one purpose: moving you upward. No infinite scroll,
            no autoplay treadmill — just deliberate, designed momentum.
          </p>
          <div style={{ marginTop: '2.4rem', opacity: 0.9 }}>
            <Logo />
          </div>
        </div>
        <div className="feature-list" data-stagger>
          {FEATURES.map((f) => {
            const Mock = MOCKS[f.mock];
            return (
              <article className="feature" key={f.n} data-stagger-item>
                <div className="feature__copy">
                  <div className="feature__head">
                    <span className="feature__index mono">{f.n}</span>
                    <h3>{f.title}</h3>
                  </div>
                  <p>{f.body}</p>
                </div>
                <div className="mock"><Mock /></div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
