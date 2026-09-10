import { COURSES } from '../data/store';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import { CourseCard } from '../components/cards/CourseCard';

export function FeaturedCourses() {
  return (
    <section className="section" id="courses">
      <div className="container">
        <div className="section-head-row">
          <SectionHeading
            index="02"
            eyebrow="Featured courses"
            title="Courses built like apprenticeships."
            lede="Short cohorts, real artifacts, mentor review. Every course is designed to change what you can do — not just what you know."
          />
          <div data-reveal>
            <Button href="#categories" variant="ghost" size="sm" arrow>Browse all categories</Button>
          </div>
        </div>
        <div className="course-grid" data-stagger>
          {COURSES.map((c) => <CourseCard key={c.id} course={c} />)}
        </div>
      </div>
    </section>
  );
}
