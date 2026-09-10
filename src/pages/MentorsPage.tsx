import { INSTRUCTORS } from '../data/store';
import { InstructorCard } from '../components/cards/InstructorCard';
import { PageHero, PageCta } from '../components/ui/Page';

export function MentorsPage() {
  return (
    <>
      <PageHero
        index="05"
        eyebrow="Mentors"
        title="People who've done the work."
        lede="Practitioners first, teachers second. Every mentor on Brainlift actively builds, ships and leads."
      />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="mentor-grid" data-stagger>
            {INSTRUCTORS.map((m) => <InstructorCard key={m.id} instructor={m} />)}
          </div>
          <p className="mono page-count" style={{ marginTop: '2.4rem', textAlign: 'center' }}>
            120+ mentors across 8 disciplines · new mentors each cohort
          </p>
        </div>
      </section>
      <PageCta />
    </>
  );
}
