import {
  COURSES as DEFAULT_COURSES,
  INSTRUCTORS as DEFAULT_INSTRUCTORS,
  TESTIMONIAL as DEFAULT_TESTIMONIAL,
  TESTIMONIALS_SMALL as DEFAULT_SMALL,
} from './content';

export * from './content';

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export const COURSES = load('bl_courses', DEFAULT_COURSES);
export const INSTRUCTORS = load('bl_mentors', DEFAULT_INSTRUCTORS);
export const TESTIMONIAL = load('bl_testimonial', DEFAULT_TESTIMONIAL);
export const TESTIMONIALS_SMALL = load('bl_testimonials_small', DEFAULT_SMALL);

export function saveCourses(list: typeof COURSES) {
  localStorage.setItem('bl_courses', JSON.stringify(list));
}
export function saveMentors(list: typeof INSTRUCTORS) {
  localStorage.setItem('bl_mentors', JSON.stringify(list));
}
export function saveTestimonial(t: typeof TESTIMONIAL) {
  localStorage.setItem('bl_testimonial', JSON.stringify(t));
}
export function saveSmall(list: typeof TESTIMONIALS_SMALL) {
  localStorage.setItem('bl_testimonials_small', JSON.stringify(list));
}
export function resetContent() {
  ['bl_courses', 'bl_mentors', 'bl_testimonial', 'bl_testimonials_small'].forEach((k) =>
    localStorage.removeItem(k),
  );
}
