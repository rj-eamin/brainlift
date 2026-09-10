import type { CSSProperties } from 'react';
import type { Instructor } from '../../data/content';

export function InstructorCard({ instructor }: { instructor: Instructor }) {
  return (
    <article className="mentor-card" data-stagger-item>
      <div className="mentor-card__avatar" style={{ '--hue': instructor.hue } as CSSProperties} aria-hidden="true">
        <span>{instructor.initials}</span>
      </div>
      <h3>{instructor.name}</h3>
      <p className="mono mentor-card__craft">{instructor.craft}</p>
      <p className="mentor-card__bio">{instructor.bio}</p>
      <p className="mono mentor-card__stats">{instructor.courses} courses · {instructor.learners} learners</p>
    </article>
  );
}
