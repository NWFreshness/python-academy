import { describe, expect, it } from 'vitest';
import { getAdjacentLessons, getLessonBySlug, getProgressStats, lessons, sections } from './lessons';

describe('lesson catalog', () => {
  it('returns a lesson for a known slug', () => {
    const lesson = getLessonBySlug('variables-and-types');

    expect(lesson?.title).toBe('Variables and Types');
    expect(lesson?.starterCode).toContain('name');
  });

  it('returns previous and next lessons for navigation', () => {
    const adjacent = getAdjacentLessons('lists');

    expect(adjacent.previous?.slug).toBe('variables-and-types');
    expect(adjacent.next?.slug).toBe('operators');
  });

  it('includes beginner, intermediate, advanced, and project levels', () => {
    const levels = new Set(lessons.map((lesson) => lesson.level));

    expect(levels).toEqual(new Set(['beginner', 'intermediate', 'advanced', 'project']));
  });

  it('groups lessons into ordered sections', () => {
    expect(sections[0]).toMatchObject({ title: 'Python Foundations' });
    expect(sections[0].lessons.map((lesson) => lesson.slug)).toContain('variables-and-types');
  });

  it('computes progress stats from completed lesson slugs', () => {
    const stats = getProgressStats(['variables-and-types', 'lists', 'missing-lesson']);

    expect(stats.completedLessons).toBe(2);
    expect(stats.totalLessons).toBe(lessons.length);
    expect(stats.percentComplete).toBe(Math.round((2 / lessons.length) * 100));
  });
});
