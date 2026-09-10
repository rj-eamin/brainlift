import { Link } from 'react-router-dom';

export function Logo() {
  return (
    <Link className="logo" to="/" aria-label="Brainlift — home">
      <svg className="logo__mark" viewBox="0 0 28 28" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="bl-g1" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#5c6b8c" />
            <stop offset="1" stopColor="#8fa2c7" />
          </linearGradient>
          <linearGradient id="bl-g2" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#b97f1f" />
            <stop offset="1" stopColor="#e2a63d" />
          </linearGradient>
          <linearGradient id="bl-g3" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#e2a63d" />
            <stop offset="1" stopColor="#f6d47c" />
          </linearGradient>
        </defs>
        <rect x="3" y="15" width="5" height="10" rx="1.6" fill="url(#bl-g1)" />
        <rect x="11" y="10" width="5" height="15" rx="1.6" fill="url(#bl-g2)" />
        <rect x="19" y="6" width="5" height="19" rx="1.6" fill="url(#bl-g3)" />
        <path
          d="M5.5 12.5C10 12 15 9 21.5 3.5"
          stroke="#f6d47c"
          strokeWidth="1.3"
          strokeLinecap="round"
          fill="none"
          opacity="0.9"
        />
        <circle cx="22.6" cy="2.6" r="1.6" fill="#f6d47c" />
      </svg>
      <span className="logo__word">
        BRAIN<span className="logo__lift">LIFT</span>
      </span>
    </Link>
  );
}
