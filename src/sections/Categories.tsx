import { Link } from 'react-router-dom';
import { CATEGORIES } from '../data/store';
import { IconArrowUpRight } from '../components/common/Icons';

type Cat = { name: string; index?: string; count?: number; courses?: number };
const CATS = CATEGORIES as unknown as Cat[];

export function Categories() {
  return (
    <section className="section" id="categories">
      <div className="container">
        <header className="section-head" data-reveal>
          <p className="eyebrow"><span className="eyebrow__index">01</span>Discover</p>
          <h2 className="section-title">Every discipline,<br />taught at depth.</h2>
          <p className="section-lede">
            A curated field guide, not an endless catalog. Eight disciplines, each with a
            deliberate arc from fundamentals to mastery.
          </p>
        </header>
        <div className="cat-grid" data-stagger>
          {CATS.map((c, i) => (
            <Link
              className="cat-tile"
              to={`/courses?cat=${encodeURIComponent(c.name)}`}
              key={c.name}
              data-stagger-item
            >
              <span className="cat-tile__index mono">{c.index ?? String(i + 1).padStart(2, '0')}</span>
              <h3 className="cat-tile__name">{c.name}</h3>
              <div className="cat-tile__foot">
                <span className="cat-tile__count mono">{c.count ?? c.courses} courses</span>
                <IconArrowUpRight className="cat-tile__arrow" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
