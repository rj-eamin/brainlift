import { useState, type FormEvent } from 'react';
import { IconCheck } from '../components/common/Icons';

export function FinalCta() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'error' | 'done'>('idle');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
    setStatus(ok ? 'done' : 'error');
  };

  return (
    <section className="section cta" id="cta">
      <div className="container cta__inner">
        <p className="eyebrow" style={{ justifyContent: 'center' }} data-reveal>Begin</p>
        <h2 className="cta__title" data-reveal>
          Begin your ascent<span className="tint">.</span>
        </h2>
        <p className="cta__lede" data-reveal>
          Join the next cohort and learn the way your brain was meant to —
          by discovering, connecting and climbing.
        </p>

        <div data-reveal aria-live="polite">
          {status === 'done' ? (
            <p className="waitlist__ok">
              <IconCheck /> You&apos;re on the list — see you at the trailhead.
            </p>
          ) : (
            <form className="waitlist" onSubmit={submit} noValidate>
              <label className="sr-only" htmlFor="waitlist-email">Email address</label>
              <input
                id="waitlist-email"
                className="waitlist__input"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (status === 'error') setStatus('idle'); }}
                aria-invalid={status === 'error'}
                aria-describedby={status === 'error' ? 'waitlist-error' : undefined}
              />
              <button className="btn btn--primary" type="submit">Request early access</button>
            </form>
          )}
          {status === 'error' && (
            <p className="waitlist__error" id="waitlist-error">Please enter a valid email address.</p>
          )}
        </div>

        <p className="mono cta__micro" data-reveal>Early access opens quarterly · No card required</p>
        <a className="cta__alt" href="#courses" data-reveal>Or explore the courses first ↓</a>
      </div>
    </section>
  );
}
