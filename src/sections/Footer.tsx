import { Link } from 'react-router-dom';
import { FOOTER_COLS } from '../data/store';
import { Logo } from '../components/common/Logo';

const SOCIALS = [
  {
    label: 'Brainlift on X',
    href: '#top',
    path: 'M18.9 2H22l-7.6 8.7L23 22h-6.8l-5.3-6.9L4.8 22H1.7l8.1-9.3L1 2h7l4.8 6.3L18.9 2z',
  },
  {
    label: 'Brainlift on LinkedIn',
    href: '#top',
    path: 'M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z',
  },
  {
    label: 'Brainlift on GitHub',
    href: '#top',
    path: 'M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.18-1.49 3.14-1.18 3.14-1.18.63 1.59.24 2.76.12 3.05.73.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.26 5.66.41.36.78 1.06.78 2.14 0 1.54-.01 2.78-.01 3.16 0 .31.21.67.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z',
  },
];

export function Footer() {
  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Logo />
          <p>Elevate the way you learn.</p>
          <p className="footer__note">
            Knowledge → Discovery → Connection → Learning → Growth → Elevation
          </p>
          <div className="footer__social">
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} aria-label={s.label}>
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d={s.path} /></svg>
              </a>
            ))}
          </div>
        </div>
        {FOOTER_COLS.map((col) => (
          <nav className="footer__col" key={col.title} aria-label={col.title}>
            <h3 className="mono">{col.title}</h3>
            <ul>
              {col.links.map((l) => (
                <li key={l.href}>
                  {l.href.startsWith('/') ? (
                    <Link to={l.href}>{l.label}</Link>
                  ) : (
                    <a href={l.href}>{l.label}</a>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="container footer__bottom">
        <p>© {new Date().getFullYear()} Brainlift Learning. Crafted for curious minds.</p>
        <div className="footer__bottom-right">
          <span className="mono footer__lang">EN · বাংলা</span>
          <button className="backtop mono" onClick={toTop}>Back to top ↑</button>
        </div>
      </div>
    </footer>
  );
}
