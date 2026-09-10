interface IconProps { className?: string }

const base = { 'aria-hidden': true, focusable: false } as const;

export function IconArrowRight({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...base}>
      <path d="M3.5 10h13M11.5 5l5 5-5 5" />
    </svg>
  );
}

export function IconArrowUpRight({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...base}>
      <path d="M5.5 14.5l9-9M7.5 5.5h7v7" />
    </svg>
  );
}

export function IconStar({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" {...base}>
      <path d="M10 1.8l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.42 5.06 17l.94-5.5-4-3.9 5.53-.8L10 1.8z" />
    </svg>
  );
}

export function IconSpark({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" {...base}>
      <path d="M10 1l1.9 6.1L18 9l-6.1 1.9L10 17l-1.9-6.1L2 9l6.1-1.9L10 1z" />
    </svg>
  );
}

export function IconCheck({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...base}>
      <path d="M4 10.5l4 4 8-9" />
    </svg>
  );
}
