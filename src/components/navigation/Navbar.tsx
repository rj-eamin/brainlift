import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../../data/content';
import { useAuth } from '../../auth/AuthContext';
import { Logo } from '../common/Logo';
import { Button } from '../ui/Button';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => { setOpen(false); }, [location.pathname]);

  useEffect(() => {
    const header = document.querySelector<HTMLElement>('[data-nav-root]');
    if (!header) return;
    if (open) {
      document.body.style.overflow = 'hidden';
      header.classList.add('is-menu-open');
      header.style.transform = 'none';
    } else {
      document.body.style.overflow = '';
      header.classList.remove('is-menu-open');
      header.style.transform = '';
    }
    return () => {
      document.body.style.overflow = '';
      header.classList.remove('is-menu-open');
      header.style.transform = '';
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const close = () => setOpen(false);
  const initials = user
    ? user.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()
    : '';

  return (
    <header className="nav" data-nav-root>
      <div className="container nav__inner">
        <Logo />
        <nav className="nav__links" aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.href}
              to={l.href}
              className={({ isActive }) => (isActive ? 'is-active' : undefined)}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="nav__actions">
          {user ? (
            <Link to="/dashboard" className="nav__avatar mono" aria-label="Open dashboard">
              {initials}
            </Link>
          ) : (
            <>
              <Button href="/login" size="sm" arrow>Start learning</Button>
            </>
          )}
          <button
            className="nav__burger"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span /><span />
          </button>
        </div>
      </div>

      <div className={`mobile-menu${open ? ' is-open' : ''}`} id="mobile-menu" aria-hidden={!open}>
        <nav className="mobile-menu__nav" aria-label="Mobile">
          {NAV_LINKS.map((l, i) => (
            <NavLink
              key={l.href}
              to={l.href}
              onClick={close}
              style={{ transitionDelay: `${0.06 + i * 0.05}s` }}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="mobile-menu__cta">
          {user ? (
            <Button href="/dashboard" onClick={close} arrow>Open dashboard</Button>
          ) : (
            <Button href="/login" onClick={close} arrow>Start learning</Button>
          )}
        </div>
      </div>
    </header>
  );
}
