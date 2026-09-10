export interface NavLink { label: string; href: string }
export interface Category { name: string; courses: number }
export type ArtVariant = 'orbits' | 'constellation' | 'contour' | 'signal';
export interface CourseArt { from: string; to: string; variant: ArtVariant }
export interface Course {
  image?: string;
  id: string; title: string; instructor: string; category: string;
  level: 'Foundation' | 'Intermediate' | 'Advanced';
  duration: string; lessons: number; rating: number; learners: string; art: CourseArt;
}
export interface Path {
  id: string; name: string; desc: string; weeks: number; courses: number;
  level: string; stages: string[];
}
export interface Step { n: string; tag: string; title: string; body: string }
export interface Instructor {
  id: string; name: string; craft: string; bio: string;
  courses: number; learners: string; initials: string; hue: number;
}
export interface Testimonial { quote: string; name: string; role: string }
export interface Stat { value: number; suffix: string; label: string; decimals?: number; initial: string }
export interface FooterCol { title: string; links: NavLink[] }

export const NAV_LINKS: NavLink[] = [
  { label: 'Courses', href: '/courses' },
  { label: 'Paths', href: '/paths' },
  { label: 'Method', href: '/method' },
  { label: 'Mentors', href: '/instructors' },
  { label: 'Stories', href: '/stories' },
];

export const ORGS = [
  'MERIDIAN SYSTEMS', 'NORTHWIND', 'HALCYON LABS', 'ARCLIGHT',
  'FERROSTACK', 'BLUEPEAK', 'OKTAVIO', 'SUMMERFIELD',
];

export const STATS: Stat[] = [
  { value: 38400, suffix: '+', label: 'Learners worldwide', initial: '38,400+' },
  { value: 240, suffix: '+', label: 'Expert-led courses', initial: '240+' },
  { value: 92, suffix: '%', label: 'Average completion', initial: '92%' },
  { value: 4.9, suffix: '/5', label: 'Learner rating', decimals: 1, initial: '4.9/5' },
];

export const CATEGORIES: Category[] = [
  { name: 'Design & Craft', courses: 42 },
  { name: 'Software Engineering', courses: 58 },
  { name: 'Data & AI', courses: 37 },
  { name: 'Product Management', courses: 24 },
  { name: 'Business Strategy', courses: 31 },
  { name: 'Leadership', courses: 22 },
  { name: 'Communication & Story', courses: 19 },
  { name: 'Science of Learning', courses: 12 },
];

export const COURSES: Course[] = [
  {
    id: 'design-systems',
    title: 'Design Systems at Scale',
    instructor: 'Mara Lindqvist',
    category: 'Design & Craft',
    level: 'Intermediate',
    duration: '6h 40m',
    lessons: 42,
    rating: 4.9,
    learners: '4.1k',
    art: { from: '#22304a', to: '#0c1018', variant: 'orbits' },
  },
  {
    id: 'neural-first-principles',
    title: 'Neural Networks from First Principles',
    instructor: 'Dr. Ade Okafor',
    category: 'Data & AI',
    level: 'Advanced',
    duration: '11h 20m',
    lessons: 58,
    rating: 4.8,
    learners: '6.3k',
    art: { from: '#33270f', to: '#141007', variant: 'constellation' },
  },
  {
    id: 'product-strategy',
    title: 'The Art of Product Strategy',
    instructor: 'Priya Raman',
    category: 'Product',
    level: 'Intermediate',
    duration: '5h 20m',
    lessons: 31,
    rating: 4.9,
    learners: '3.7k',
    art: { from: '#1f2b2a', to: '#0d1211', variant: 'contour' },
  },
  {
    id: 'typescript-architecture',
    title: 'TypeScript Architecture Deep Dive',
    instructor: 'Jonas Weber',
    category: 'Engineering',
    level: 'Advanced',
    duration: '8h 05m',
    lessons: 47,
    rating: 4.8,
    learners: '5.2k',
    art: { from: '#2e2a1e', to: '#12100b', variant: 'signal' },
  },
];

export const PATHS: Path[] = [
  {
    id: 'fullstack',
    name: 'Full-Stack Product Engineer',
    desc: 'From fundamentals to leading features in production — a complete engineering ascent with a capstone reviewed by senior engineers.',
    weeks: 14, courses: 6, level: 'Beginner-friendly',
    stages: ['Foundations', 'Systems Design', 'Shipping', 'Capstone'],
  },
  {
    id: 'ai-literacy',
    name: 'AI Literacy for Builders',
    desc: 'Understand, evaluate and ship with modern AI. Practical intuition over theory — no PhD required.',
    weeks: 8, courses: 4, level: 'Intermediate',
    stages: ['Intuition', 'Models', 'Integration', 'Evaluation'],
  },
  {
    id: 'design-leadership',
    name: 'Design Leadership',
    desc: 'Move from senior designer to design leader: systems thinking, strategy, and the craft of multiplying other people.',
    weeks: 10, courses: 5, level: 'Advanced',
    stages: ['Craft', 'Systems', 'Strategy', 'Leadership'],
  },
];

export const METHOD_CHAIN = [
  'KNOWLEDGE', 'DISCOVERY', 'CONNECTION', 'LEARNING', 'GROWTH', 'ELEVATION',
];

export const STEPS: Step[] = [
  {
    n: '01', tag: 'DISCOVERY', title: 'Discover your starting elevation',
    body: 'A diagnostic maps what you already know and reveals the gaps that matter — so every hour you invest moves you upward, not sideways.',
  },
  {
    n: '02', tag: 'CONNECTION', title: 'Learn with people, not feeds',
    body: 'Small cohorts, live sessions and mentors who challenge your thinking. Ideas solidify when they meet resistance.',
  },
  {
    n: '03', tag: 'GROWTH', title: 'Build real artifacts',
    body: 'Studio projects force the leap from theory to practice. You ship work that gets reviewed — not multiple-choice answers that get scored.',
  },
  {
    n: '04', tag: 'ELEVATION', title: 'Carry proof with you',
    body: 'Portable credentials, a reviewed portfolio and a network that opens doors. Evidence of skill, not just hours watched.',
  },
];

export const INSTRUCTORS: Instructor[] = [
  {
    id: 'mara', name: 'Mara Lindqvist', craft: 'Design Systems',
    bio: 'Former principal designer. Twelve years building systems used by millions.',
    courses: 6, learners: '9.2k', initials: 'ML', hue: 38,
  },
  {
    id: 'ade', name: 'Dr. Ade Okafor', craft: 'Machine Learning',
    bio: 'Research lead turned educator. Makes neural networks feel inevitable.',
    courses: 4, learners: '11.4k', initials: 'AO', hue: 212,
  },
  {
    id: 'priya', name: 'Priya Raman', craft: 'Product Strategy',
    bio: 'VP Product. Took three zero-to-one products to category leadership.',
    courses: 5, learners: '7.8k', initials: 'PR', hue: 14,
  },
  {
    id: 'yuki', name: 'Yuki Tanaka', craft: 'Creative Technology',
    bio: 'WebGL artist. Believes code is a material, like clay or light.',
    courses: 3, learners: '6.1k', initials: 'YT', hue: 160,
  },
];

export const TESTIMONIAL: Testimonial = {
  quote: "Brainlift didn't just teach me design systems — it changed how I think about learning itself. Six months later I lead our design system at work.",
  name: 'Sofia Marchetti',
  role: 'Design Systems Lead, Meridian Systems',
};

export const TESTIMONIALS_SMALL: Testimonial[] = [
  {
    quote: 'The mentor reviews alone are worth it. A senior engineer in your corner, every single week.',
    name: 'Daniel Osei', role: 'Full-Stack Developer',
  },
  {
    quote: "I'd finished exactly zero online courses before this. I've completed three Brainlift paths — and used every one.",
    name: 'Amara Chen', role: 'Data Analyst',
  },
];

export const IMPACT: Stat[] = [
  { value: 94, suffix: '%', label: 'of learners would recommend Brainlift', initial: '94%' },
  { value: 87, suffix: '%', label: 'apply a new skill within 30 days', initial: '87%' },
  { value: 68, suffix: '%', label: 'report career movement within a year', initial: '68%' },
];

export const FOOTER_COLS: FooterCol[] = [
  {
    title: 'LEARN',
    links: [
      { label: 'Featured courses', href: '/courses' },
      { label: 'Learning paths', href: '/paths' },
      { label: 'Categories', href: '/categories' },
    ],
  },
  {
    title: 'PLATFORM',
    links: [
      { label: 'The method', href: '/method' },
      { label: 'Mentors', href: '/instructors' },
      { label: 'Experience', href: '/platform' },
    ],
  },
  {
    title: 'COMMUNITY',
    links: [
      { label: 'Learner stories', href: '/stories' },
      { label: 'Traction', href: '/trust' },
      { label: 'Start learning', href: '/cta' },
    ],
  },
];
