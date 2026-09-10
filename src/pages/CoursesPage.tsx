import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CATEGORIES, COURSES } from '../data/store';
import { CourseCard } from '../components/cards/CourseCard';
import { PageHero, PageCta } from '../components/ui/Page';

export function CoursesPage() {
  const [params, setParams] = useSearchParams();
  const cat = params.get('cat') ?? 'All';

  const list = useMemo(
    () => (cat === 'All' ? COURSES : COURSES.filter((c) => c.category === cat)),
    [cat],
  );

  const setCat = (name: string) => {
    setParams(name === 'All' ? {} : { cat: name });
  };

  return (
    <>
      <PageHero
        index="01"
        eyebrow="Catalog"
        title="Category-wise courses."
        lede="Eight disciplines, one standard — taught by practitioners, reviewed by mentors, built around real artifacts."
      />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="chips" aria-label="Filter by category">
            {['All', ...CATEGORIES.map((c) => c.name)].map((name) => (
              <button
                key={name}
                className={`chip${cat === name ? ' is-active' : ''}`}
                aria-pressed={cat === name}
                onClick={() => setCat(name)}
              >
                {name}
              </button>
            ))}
          </div>
          <p className="mono page-count">
            {list.length} course{list.length === 1 ? '' : 's'}
          </p>
          <div className="course-grid" data-stagger>
            {list.map((c) => <CourseCard key={c.id} course={c} />)}
          </div>
        </div>
      </section>
      <PageCta />
    </>
  );
}
