import type { Course } from '../../data/content';
import { IconStar } from '../common/Icons';

function CoverArt({ id, art }: { id: string; art: Course['art'] }) {
  const gid = `cover-${id}`;
  return (
    <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={art.from} />
          <stop offset="1" stopColor={art.to} />
        </linearGradient>
      </defs>
      <rect width="320" height="200" fill={`url(#${gid})`} />
      {art.variant === 'orbits' && (
        <g stroke="rgba(236,233,225,0.18)" fill="none">
          <circle cx="238" cy="72" r="34" />
          <circle cx="238" cy="72" r="62" strokeDasharray="3 7" />
          <circle cx="238" cy="72" r="94" opacity="0.5" />
          <circle cx="238" cy="72" r="4.5" fill="#e2a63d" stroke="none" />
          <circle cx="174" cy="98" r="3" fill="#e2a63d" stroke="none" opacity="0.8" />
        </g>
      )}
      {art.variant === 'constellation' && (
        <g>
          <path d="M36 152 L108 96 L178 124 L244 58 L294 84" stroke="rgba(236,233,225,0.22)" fill="none" />
          {[[36, 152], [108, 96], [178, 124], [244, 58], [294, 84]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i === 3 ? 5 : 3.2} fill={i === 3 ? '#e2a63d' : 'rgba(236,233,225,0.75)'} />
          ))}
        </g>
      )}
      {art.variant === 'contour' && (
        <g stroke="rgba(236,233,225,0.16)" fill="none">
          {[0, 1, 2, 3].map((i) => (
            <path key={i} d={`M-20 ${188 - i * 26} Q 120 ${118 - i * 30} 340 ${150 - i * 34}`} />
          ))}
          <circle cx="236" cy="64" r="5" fill="#e2a63d" stroke="none" />
        </g>
      )}
      {art.variant === 'signal' && (
        <g>
          <path d="M16 128 Q 56 64 96 112 T 176 104 T 256 88 T 320 72" stroke="rgba(226,166,61,0.7)" fill="none" strokeWidth="2" />
          {[36, 76, 116, 156, 196, 236, 276].map((x, i) => (
            <rect key={x} x={x} y={150 - i * 4} width="3" height={18 + i * 5} fill="rgba(236,233,225,0.18)" />
          ))}
        </g>
      )}
    </svg>
  );
}

export function CourseCard({ course }: { course: Course }) {
  return (
    <article className="course-card" data-stagger-item>
      <div className="course-card__cover">
        <CoverArt id={course.id} art={course.art} />
        {course.image && <img className="course-card__img" src={course.image} alt="" />}
        <span className="course-card__level">{course.level}</span>
      </div>
      <div className="course-card__body">
        <p className="course-card__cat mono">{course.category}</p>
        <h3 className="course-card__title">{course.title}</h3>
        <p className="course-card__mentor">with {course.instructor}</p>
        <div className="course-card__meta">
          <span>{course.duration}</span>
          <span>{course.lessons} lessons</span>
          <span className="course-card__rating"><IconStar />{course.rating.toFixed(1)}</span>
          <span>{course.learners} learners</span>
        </div>
      </div>
    </article>
  );
}
