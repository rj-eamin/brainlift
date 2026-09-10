import { Hero } from '../sections/Hero';
import { TrustBar } from '../sections/TrustBar';
import { Categories } from '../sections/Categories';
import { FeaturedCourses } from '../sections/FeaturedCourses';
import { LearningPaths } from '../sections/LearningPaths';
import { HowItWorks } from '../sections/HowItWorks';
import { Instructors } from '../sections/Instructors';
import { PlatformExperience } from '../sections/PlatformExperience';
import { StudentSuccess } from '../sections/StudentSuccess';
import { FinalCta } from '../sections/FinalCta';

export function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Categories />
      <FeaturedCourses />
      <LearningPaths />
      <HowItWorks />
      <Instructors />
      <PlatformExperience />
      <StudentSuccess />
      <FinalCta />
    </>
  );
}
