import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'ghost' | 'ghost-ink';
  size?: 'md' | 'sm';
  href?: string;
  onClick?: () => void;
  arrow?: boolean;
  className?: string;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  arrow,
  className = '',
}: ButtonProps) {
  const cls = `btn btn--${variant} btn--${size} ${className}`.trim();
  const inner = (
    <>
      <span>{children}</span>
      {arrow && (
        <svg className="btn__arrow" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
          <path
            d="M3 10h13M11.5 4.5 17 10l-5.5 5.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </>
  );

  if (href && href.startsWith('/')) {
    return (
      <Link to={href} className={cls} onClick={onClick}>
        {inner}
      </Link>
    );
  }
  return (
    <a href={href ?? '#'} className={cls} onClick={onClick}>
      {inner}
    </a>
  );
}
