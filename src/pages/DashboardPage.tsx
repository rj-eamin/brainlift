import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { ACTIVITY, CERTIFICATES, ENROLLED, STATS } from '../data/dashboard';
import type { EnrolledCourse } from '../data/dashboard';

const TABS = ['Overview', 'My courses', 'Certificates', 'Settings'] as const;
type Tab = (typeof TABS)[number];

function CourseRow({ c }: { c: EnrolledCourse }) {
  return (
    <article className="dash__course" data-stagger-item>
      <div className="dash__course-top">
        <div>
          <h3>{c.title}</h3>
          <p className="mono dash__course-cat">{c.category}</p>
        </div>
        <span className="mono dash__course-pct">{c.progress}%</span>
      </div>
      <div className="progress" role="progressbar" aria-valuenow={c.progress} aria-valuemin={0} aria-valuemax={100}>
        <span className="progress__fill" style={{ width: `${c.progress}%` }} />
      </div>
      <div className="dash__course-foot">
        <span>Last: {c.lastLesson}</span>
        <span>Next: {c.nextUp}</span>
        <Link className="mono dash__resume" to="/courses">Resume →</Link>
      </div>
    </article>
  );
}

export function DashboardPage() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const [tab, setTab] = useState<Tab>('Overview');

  if (!user) return null;
  const initials = user.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <section className="dash">
      <div className="container dash__layout">
        <aside className="dash__side" data-reveal>
          <div className="dash__profile">
            <span className="dash__avatar" aria-hidden="true">{initials}</span>
            <div>
              <p className="dash__name">{user.name}</p>
              <p className="mono dash__mail">{user.email}</p>
            </div>
          </div>
          <nav className="dash__tabs" aria-label="Dashboard sections">
            {TABS.map((t, i) => (
              <button
                key={t}
                className={`dash__tab mono${tab === t ? ' is-active' : ''}`}
                onClick={() => setTab(t)}
              >
                <span className="dash__tab-index">0{i + 1}</span>
                {t}
              </button>
            ))}
          </nav>
          <button className="dash__logout mono" onClick={() => { logout(); nav('/'); }}>
            Log out →
          </button>
        </aside>

        <div className="dash__main">
          {tab === 'Overview' && (
            <>
              <header className="dash__head" data-reveal>
                <h1 className="dash__title">Keep climbing, {user.name.split(' ')[0]}.</h1>
                <p className="dash__sub mono">Member since {user.joined} · {ENROLLED.length} active courses</p>
              </header>
              <div className="dash__stats" data-stagger>
                {STATS.map((s) => (
                  <div className="dash__stat" key={s.label} data-stagger-item>
                    <span className="dash__stat-value">{s.value}</span>
                    <span className="mono dash__stat-unit">{s.unit}</span>
                    <p className="dash__stat-label">{s.label}</p>
                  </div>
                ))}
              </div>
              <h2 className="dash__section-title">Continue learning</h2>
              <div className="dash__courses" data-stagger>
                {ENROLLED.map((c) => <CourseRow key={c.title} c={c} />)}
              </div>
              <h2 className="dash__section-title">Recent activity</h2>
              <ul className="dash__activity" data-stagger>
                {ACTIVITY.map((a) => (
                  <li className="dash__activity-item" key={a.what} data-stagger-item>
                    <span className="mono dash__activity-when">{a.when}</span>
                    <p>{a.what}</p>
                    <span className="dash__activity-course">{a.course}</span>
                  </li>
                ))}
              </ul>
            </>
          )}

          {tab === 'My courses' && (
            <>
              <header className="dash__head" data-reveal>
                <h1 className="dash__title">My courses.</h1>
                <p className="dash__sub mono">{ENROLLED.length} enrolled · 1 completed</p>
              </header>
              <div className="dash__courses" data-stagger>
                {ENROLLED.map((c) => <CourseRow key={c.title} c={c} />)}
              </div>
            </>
          )}

          {tab === 'Certificates' && (
            <>
              <header className="dash__head" data-reveal>
                <h1 className="dash__title">Certificates.</h1>
                <p className="dash__sub mono">{CERTIFICATES.length} earned · verified on-chain</p>
              </header>
              <div className="dash__certs" data-stagger>
                {CERTIFICATES.map((cert) => (
                  <article className="dash__cert" key={cert.id} data-stagger-item>
                    <span className="dash__cert-seal" style={{ '--hue': cert.hue } as React.CSSProperties} aria-hidden="true">✓</span>
                    <h3>{cert.title}</h3>
                    <p className="mono">{cert.id} · {cert.date}</p>
                  </article>
                ))}
              </div>
            </>
          )}

          {tab === 'Settings' && (
            <>
              <header className="dash__head" data-reveal>
                <h1 className="dash__title">Settings.</h1>
                <p className="dash__sub mono">Profile & preferences</p>
              </header>
              <div className="dash__settings" data-stagger>
                <div className="dash__field" data-stagger-item>
                  <label className="login__label mono" htmlFor="set-name">Display name</label>
                  <input id="set-name" className="login__input" defaultValue={user.name} />
                </div>
                <div className="dash__field" data-stagger-item>
                  <label className="login__label mono" htmlFor="set-mail">Email</label>
                  <input id="set-mail" className="login__input" defaultValue={user.email} />
                </div>
                <label className="dash__toggle" data-stagger-item>
                  <div>
                    <p>Email notifications</p>
                    <small>Mentor reviews & cohort updates</small>
                  </div>
                  <span className="switch"><input type="checkbox" defaultChecked /><span /></span>
                </label>
                <label className="dash__toggle" data-stagger-item>
                  <div>
                    <p>Weekly progress digest</p>
                    <small>Every Monday, your ascent in one email</small>
                  </div>
                  <span className="switch"><input type="checkbox" defaultChecked /><span /></span>
                </label>
                <label className="dash__toggle" data-stagger-item>
                  <div>
                    <p>Public profile</p>
                    <small>Show certificates on your public page</small>
                  </div>
                  <span className="switch"><input type="checkbox" /><span /></span>
                </label>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
