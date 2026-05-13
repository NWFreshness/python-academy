import { describe, expect, it, vi } from 'vitest';
import {
  createDefaultProgress,
  loadProgress,
  markLessonComplete,
  parseProgress,
  saveLastLesson,
  serializeProgress,
} from './progress';

describe('progress helpers', () => {
  it('returns default progress with no completed lessons and no last lesson', () => {
    expect(createDefaultProgress()).toEqual({ completedLessonSlugs: [], lastLessonSlug: undefined });
  });

  it('stores completed lesson slugs uniquely', () => {
    const progress = markLessonComplete(
      { completedLessonSlugs: ['variables-and-types'], lastLessonSlug: 'variables-and-types' },
      'variables-and-types',
    );

    expect(progress.completedLessonSlugs).toEqual(['variables-and-types']);

    const updated = markLessonComplete(progress, 'lists');
    expect(updated.completedLessonSlugs).toEqual(['variables-and-types', 'lists']);
  });

  it('persists the last opened lesson', () => {
    const progress = saveLastLesson(createDefaultProgress(), 'loops');

    expect(progress.lastLessonSlug).toBe('loops');
    expect(progress.completedLessonSlugs).toEqual([]);
  });

  it('round-trips serialized progress', () => {
    const progress = { completedLessonSlugs: ['lists'], lastLessonSlug: 'lists' };

    expect(parseProgress(serializeProgress(progress))).toEqual(progress);
  });

  it('falls back safely for invalid stored JSON', () => {
    expect(parseProgress('{not json')).toEqual(createDefaultProgress());
    expect(parseProgress('{"completedLessonSlugs":"lists"}')).toEqual(createDefaultProgress());
  });

  it('returns default progress when browser storage is unavailable', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

    expect(loadProgress(undefined)).toEqual(createDefaultProgress());

    warn.mockRestore();
  });
});
