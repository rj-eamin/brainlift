import type { ReactNode } from 'react';

interface Props {
  index: string;
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
}

export function SectionHeading({ index, eyebrow, title, lede }: Props) {
  return (
    <header className="section-head" data-reveal>
      <p className="eyebrow">
        <span className="eyebrow__index">{index}</span>
        {eyebrow}
      </p>
      <h2 className="section-title">{title}</h2>
      {lede && <p className="section-lede">{lede}</p>}
    </header>
  );
}
