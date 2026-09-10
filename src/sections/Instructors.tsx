import { INSTRUCTORS } from '../data/store';
import { SectionHeading } from '../components/ui/SectionHeading';
import { InstructorCard } from '../components/cards/InstructorCard';

export function Instructors() {
  return (
    <section className="section" id="instructors">
      <div className="container">
        <SectionHeading
          index="05"
          eyebrow="Mentors"
          title="Learn from people who've done the work."
          lede="Practitioners first, teachers second. Every mentor on Brainlift actively builds, ships and leads."
        />
        <div className="mentor-grid" data-stagger>
          {INSTRUCTORS.map((m) => <InstructorCard key={m.id} instructor={m} />)}
        </div>
      </div>
    </section>
  );
}
