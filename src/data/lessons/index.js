import { world1Lessons } from './world1';
import { world2Lessons } from './world2';
import { world3Lessons } from './world3';
import { world4Lessons } from './world4';
import { world5Lessons } from './world5';
import { world6Lessons } from './world6';
import { world7Lessons } from './world7';
import { world8Lessons } from './world8';
import { world9Lessons } from './world9';
import { world10Lessons } from './world10';

export const allLessons = [
  ...world1Lessons,
  ...world2Lessons,
  ...world3Lessons,
  ...world4Lessons,
  ...world5Lessons,
  ...world6Lessons,
  ...world7Lessons,
  ...world8Lessons,
  ...world9Lessons,
  ...world10Lessons,
];

export function getLessonsForWorld(worldId) {
  return allLessons.filter(l => l.worldId === worldId);
}

export function getLesson(lessonId) {
  return allLessons.find(l => l.id === lessonId);
}

export function getNextLesson(currentLessonId) {
  const idx = allLessons.findIndex(l => l.id === currentLessonId);
  return idx >= 0 && idx < allLessons.length - 1 ? allLessons[idx + 1] : null;
}
