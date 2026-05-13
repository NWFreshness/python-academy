export const PROGRESS_STORAGE_KEY = 'python-academy-progress';

export type CourseProgress = {
  completedLessonSlugs: string[];
  lastLessonSlug?: string;
};

type ProgressStorage = Pick<Storage, 'getItem' | 'setItem'>;

export function createDefaultProgress(): CourseProgress {
  return {
    completedLessonSlugs: [],
    lastLessonSlug: undefined,
  };
}

export function parseProgress(rawProgress: string | null | undefined): CourseProgress {
  if (!rawProgress) {
    return createDefaultProgress();
  }

  try {
    const parsed: unknown = JSON.parse(rawProgress);

    if (!isProgressShape(parsed)) {
      return createDefaultProgress();
    }

    return {
      completedLessonSlugs: Array.from(new Set(parsed.completedLessonSlugs)),
      lastLessonSlug: parsed.lastLessonSlug,
    };
  } catch {
    return createDefaultProgress();
  }
}

export function serializeProgress(progress: CourseProgress): string {
  return JSON.stringify({
    completedLessonSlugs: Array.from(new Set(progress.completedLessonSlugs)),
    lastLessonSlug: progress.lastLessonSlug,
  });
}

export function markLessonComplete(progress: CourseProgress, lessonSlug: string): CourseProgress {
  return {
    ...progress,
    completedLessonSlugs: Array.from(new Set([...progress.completedLessonSlugs, lessonSlug])),
  };
}

export function saveLastLesson(progress: CourseProgress, lessonSlug: string): CourseProgress {
  return {
    ...progress,
    lastLessonSlug: lessonSlug,
  };
}

export function getBrowserStorage(): ProgressStorage | undefined {
  if (typeof window === 'undefined') {
    return undefined;
  }

  return window.localStorage;
}

export function loadProgress(storage: ProgressStorage | undefined = getBrowserStorage()): CourseProgress {
  if (!storage) {
    return createDefaultProgress();
  }

  try {
    return parseProgress(storage.getItem(PROGRESS_STORAGE_KEY));
  } catch {
    return createDefaultProgress();
  }
}

export function storeProgress(
  progress: CourseProgress,
  storage: ProgressStorage | undefined = getBrowserStorage(),
): CourseProgress {
  if (!storage) {
    return progress;
  }

  try {
    storage.setItem(PROGRESS_STORAGE_KEY, serializeProgress(progress));
  } catch {
    return progress;
  }

  return progress;
}

function isProgressShape(value: unknown): value is CourseProgress {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Partial<CourseProgress>;
  const hasCompletedLessons =
    Array.isArray(candidate.completedLessonSlugs) &&
    candidate.completedLessonSlugs.every((slug) => typeof slug === 'string');
  const hasValidLastLesson =
    candidate.lastLessonSlug === undefined || typeof candidate.lastLessonSlug === 'string';

  return hasCompletedLessons && hasValidLastLesson;
}
