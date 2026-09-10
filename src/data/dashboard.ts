export interface EnrolledCourse {
  title: string;
  category: string;
  progress: number;
  lastLesson: string;
  nextUp: string;
  weeksLeft: number;
}

export const ENROLLED: EnrolledCourse[] = [
  {
    title: 'Design Systems at Scale',
    category: 'Design & Craft',
    progress: 68,
    lastLesson: 'Tokens & primitives',
    nextUp: 'Component anatomy',
    weeksLeft: 2,
  },
  {
    title: 'Neural Networks from First Principles',
    category: 'Data & AI',
    progress: 41,
    lastLesson: 'Backpropagation intuition',
    nextUp: 'Training loops in code',
    weeksLeft: 4,
  },
  {
    title: 'The Art of Product Strategy',
    category: 'Product',
    progress: 12,
    lastLesson: 'Positioning maps',
    nextUp: 'Narrative & memos',
    weeksLeft: 6,
  },
];

export const STATS = [
  { label: 'Day streak', value: '12', unit: 'days' },
  { label: 'Hours this week', value: '6.5', unit: 'hrs' },
  { label: 'Courses in progress', value: '3', unit: 'active' },
  { label: 'Certificates', value: '1', unit: 'earned' },
];

export const ACTIVITY = [
  { when: '2h ago', what: 'Completed lesson “Color systems”', course: 'Design Systems at Scale' },
  { when: 'Yesterday', what: 'Mentor review submitted', course: 'Neural Networks from First Principles' },
  { when: '3d ago', what: 'Earned certificate “Foundations of Design Systems”', course: 'Path milestone' },
  { when: '5d ago', what: 'Joined cohort discussion “Tokens in the wild”', course: 'Community' },
];

export const CERTIFICATES = [
  { title: 'Foundations of Design Systems', id: 'BL-2026-0417', date: 'Aug 2026', hue: 38 },
];
