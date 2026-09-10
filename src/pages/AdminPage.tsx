import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import {
  CATEGORIES,
  COURSES,
  INSTRUCTORS,
  TESTIMONIALS_SMALL,
  resetContent,
  saveCourses,
  saveMentors,
  saveSmall,
} from '../data/store';

type CourseT = typeof COURSES[number];
type MentorT = typeof INSTRUCTORS[number];
type SmallT = typeof TESTIMONIALS_SMALL[number];

const OWNER_PW = 'brainlift-admin';
const LEVELS = ['Beginner', 'Intermediate', 'Advanced'];

export function AdminPage() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('bl_admin') === '1');
  const [pw, setPw] = useState('');
  const [err, setErr] = useState(false);

  if (!authed) {
    return (
      <section className="login">
        <form
          className="login__card"
          onSubmit={(e) => {
            e.preventDefault();
            if (pw === OWNER_PW) {
              sessionStorage.setItem('bl_admin', '1');
              setAuthed(true);
            } else {
              setErr(true);
            }
          }}
        >
          <h1 className="login__title">Owner access.</h1>
          <p className="login__lede">This area controls the whole site — courses, mentors, stories, users.</p>
          <label className="login__label mono" htmlFor="owner-pw">Owner password</label>
          <input
            id="owner-pw"
            className="login__input"
            type="password"
            value={pw}
            onChange={(e) => { setPw(e.target.value); setErr(false); }}
            placeholder="••••••••"
          />
          {err && <p className="login__error" role="alert">Wrong password — try again.</p>}
          <button className="btn btn--primary btn--md login__btn" type="submit">
            <span>Enter admin</span>
          </button>
          <p className="login__note mono">Demo key: brainlift-admin</p>
        </form>
      </section>
    );
  }
  return <AdminPanel />;
}

const TABS = ['Courses', 'Mentors', 'Stories', 'People'] as const;
type Tab = (typeof TABS)[number];

function AdminPanel() {
  const [tab, setTab] = useState<Tab>('Courses');
  const [courses, setCourses] = useState<CourseT[]>(COURSES);
  const [mentors, setMentors] = useState<MentorT[]>(INSTRUCTORS);
  const [smalls, setSmalls] = useState<SmallT[]>(TESTIMONIALS_SMALL);

  const commitCourses = (list: CourseT[]) => { setCourses(list); saveCourses(list); };
  const commitMentors = (list: MentorT[]) => { setMentors(list); saveMentors(list); };
  const commitSmalls = (list: SmallT[]) => { setSmalls(list); saveSmall(list); };

  return (
    <section className="admin">
      <div className="container">
        <header className="admin__head" data-reveal>
          <div>
            <h1 className="admin__title">Control room.</h1>
            <p className="admin__sub mono">Owner panel · saves to this browser</p>
          </div>
          <div className="admin__actions">
            <button className="chip" onClick={() => { resetContent(); window.location.reload(); }}>
              Reset all content
            </button>
            <button className="chip" onClick={() => { window.location.href = import.meta.env.BASE_URL; }}>
              View site →
            </button>
          </div>
        </header>
        <div className="admin__tabs" role="tablist" aria-label="Admin sections">
          {TABS.map((t) => (
            <button key={t} className={`chip${tab === t ? ' is-active' : ''}`} onClick={() => setTab(t)}>
              {t}
            </button>
          ))}
        </div>

        {tab === 'Courses' && <CourseTab courses={courses} commit={commitCourses} />}
        {tab === 'Mentors' && <MentorTab mentors={mentors} commit={commitMentors} />}
        {tab === 'Stories' && <StoryTab smalls={smalls} commit={commitSmalls} />}
        {tab === 'People' && <PeopleTab />}
      </div>
    </section>
  );
}

function CourseTab({ courses, commit }: { courses: CourseT[]; commit: (l: CourseT[]) => void }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0].name);
  const [level, setLevel] = useState('Intermediate');
  const [instructor, setInstructor] = useState('');
  const [duration, setDuration] = useState('6h 0m');
  const [lessons, setLessons] = useState('30');
  const [rating, setRating] = useState('4.8');
  const [learners, setLearners] = useState('1.2k');
  const [image, setImage] = useState<string | undefined>();

  const onFile = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => setImage(typeof r.result === 'string' ? r.result : undefined);
    r.readAsDataURL(f);
  };

  const add = (e: FormEvent) => {
    e.preventDefault();
    const course = {
      id: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40) || `course-${Date.now()}`,
      title,
      category,
      level,
      instructor: instructor || 'Brainlift Mentor',
      duration,
      lessons: Number(lessons) || 30,
      rating: Number(rating) || 4.8,
      learners,
      art: { variant: 'contour' },
      ...(image ? { image } : {}),
    } as CourseT;
    commit([course, ...courses]);
    setTitle('');
    setInstructor('');
    setImage(undefined);
  };

  return (
    <div className="admin__panel">
      <form className="admin__form" onSubmit={add}>
        <h2 className="admin__section-title">Add course</h2>
        <div className="admin__row">
          <input className="login__input" placeholder="Course title" required value={title} onChange={(e) => setTitle(e.target.value)} />
          <input className="login__input" placeholder="Instructor name" value={instructor} onChange={(e) => setInstructor(e.target.value)} />
        </div>
        <div className="admin__row">
          <select className="login__input" value={category} onChange={(e) => setCategory(e.target.value)}>
            {CATEGORIES.map((c) => <option key={c.name}>{c.name}</option>)}
          </select>
          <select className="login__input" value={level} onChange={(e) => setLevel(e.target.value)}>
            {LEVELS.map((l) => <option key={l}>{l}</option>)}
          </select>
        </div>
        <div className="admin__row admin__row--4">
          <input className="login__input" placeholder="Duration (6h 40m)" value={duration} onChange={(e) => setDuration(e.target.value)} />
          <input className="login__input" type="number" placeholder="Lessons" value={lessons} onChange={(e) => setLessons(e.target.value)} />
          <input className="login__input" type="number" step="0.1" placeholder="Rating" value={rating} onChange={(e) => setRating(e.target.value)} />
          <input className="login__input" placeholder="Learners (1.2k)" value={learners} onChange={(e) => setLearners(e.target.value)} />
        </div>
        <label className="admin__file mono">
          {image ? 'Image attached ✓ (click to change)' : 'Upload cover image (jpg/png)'}
          <input type="file" accept="image/*" onChange={onFile} />
        </label>
        <button className="btn btn--primary btn--sm" type="submit"><span>Add course</span></button>
      </form>
      <h2 className="admin__section-title">All courses ({courses.length})</h2>
      <ul className="admin__list">
        {courses.map((c) => (
          <li className="admin__item" key={c.id}>
            <div>
              <p className="admin__item-title">{c.title}</p>
              <p className="mono admin__item-meta">{c.category} · {c.level} · {c.instructor}</p>
            </div>
            <button className="admin__del mono" onClick={() => commit(courses.filter((x) => x.id !== c.id))}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MentorTab({ mentors, commit }: { mentors: MentorT[]; commit: (l: MentorT[]) => void }) {
  const [name, setName] = useState('');
  const [craft, setCraft] = useState('');
  const [bio, setBio] = useState('');

  const add = (e: FormEvent) => {
    e.preventDefault();
    const m = {
      id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name,
      craft: craft || 'Practitioner',
      bio: bio || 'Builds, ships and leads.',
      courses: 3,
      learners: '1.0k',
      hue: 210,
    } as MentorT;
    commit([m, ...mentors]);
    setName('');
    setCraft('');
    setBio('');
  };

  return (
    <div className="admin__panel">
      <form className="admin__form" onSubmit={add}>
        <h2 className="admin__section-title">Add mentor</h2>
        <div className="admin__row">
          <input className="login__input" placeholder="Full name" required value={name} onChange={(e) => setName(e.target.value)} />
          <input className="login__input" placeholder="Craft (Design Systems)" value={craft} onChange={(e) => setCraft(e.target.value)} />
        </div>
        <input className="login__input" placeholder="Short bio" value={bio} onChange={(e) => setBio(e.target.value)} />
        <button className="btn btn--primary btn--sm" type="submit"><span>Add mentor</span></button>
      </form>
      <h2 className="admin__section-title">All mentors ({mentors.length})</h2>
      <ul className="admin__list">
        {mentors.map((m) => (
          <li className="admin__item" key={m.id}>
            <div>
              <p className="admin__item-title">{m.name}</p>
              <p className="mono admin__item-meta">{m.craft}</p>
            </div>
            <button className="admin__del mono" onClick={() => commit(mentors.filter((x) => x.id !== m.id))}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function StoryTab({ smalls, commit }: { smalls: SmallT[]; commit: (l: SmallT[]) => void }) {
  const [quote, setQuote] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  const add = (e: FormEvent) => {
    e.preventDefault();
    commit([{ quote, name, role: role || 'Learner' }, ...smalls]);
    setQuote('');
    setName('');
    setRole('');
  };

  return (
    <div className="admin__panel">
      <form className="admin__form" onSubmit={add}>
        <h2 className="admin__section-title">Add learner story</h2>
        <textarea className="login__input admin__textarea" placeholder="The quote…" required value={quote} onChange={(e) => setQuote(e.target.value)} />
        <div className="admin__row">
          <input className="login__input" placeholder="Name" required value={name} onChange={(e) => setName(e.target.value)} />
          <input className="login__input" placeholder="Role (Data Analyst)" value={role} onChange={(e) => setRole(e.target.value)} />
        </div>
        <button className="btn btn--primary btn--sm" type="submit"><span>Add story</span></button>
      </form>
      <h2 className="admin__section-title">All stories ({smalls.length + 1})</h2>
      <ul className="admin__list">
        {smalls.map((s) => (
          <li className="admin__item" key={s.name}>
            <div>
              <p className="admin__item-title">{s.name}</p>
              <p className="mono admin__item-meta">{s.quote.slice(0, 60)}…</p>
            </div>
            <button className="admin__del mono" onClick={() => commit(smalls.filter((x) => x.name !== s.name))}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PeopleTab() {
  const [people, setPeople] = useState<{ email: string; name?: string }[]>(() => {
    try {
      const raw = localStorage.getItem('bl_users');
      return raw ? (JSON.parse(raw) as { email: string; name?: string }[]) : [];
    } catch {
      return [];
    }
  });

  const del = (email: string) => {
    const list = people.filter((p) => p.email !== email);
    setPeople(list);
    localStorage.setItem('bl_users', JSON.stringify(list));
  };

  return (
    <div className="admin__panel">
      <h2 className="admin__section-title">Registered users ({people.length})</h2>
      {people.length === 0 && (
        <p className="admin__empty">No signups yet — share your site to get learners!</p>
      )}
      <ul className="admin__list">
        {people.map((p) => (
          <li className="admin__item" key={p.email}>
            <div>
              <p className="admin__item-title">{p.name ?? 'Learner'}</p>
              <p className="mono admin__item-meta">{p.email}</p>
            </div>
            <button className="admin__del mono" onClick={() => del(p.email)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
