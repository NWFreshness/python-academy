import Link from 'next/link';
import type { Lesson } from '@/lib/lessons';

const levelLabels: Record<Lesson['level'], string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
  project: 'Project',
};

export function LessonCard({ lesson, index }: Readonly<{ lesson: Lesson; index: number }>) {
  return (
    <Link
      href={`/lessons/${lesson.slug}`}
      className="group block rounded-[1.6rem] border border-white/10 bg-white/[0.035] p-5 transition duration-300 hover:-translate-y-1 hover:border-lab-yellow/60 hover:bg-white/[0.065] hover:shadow-glow"
    >
      <div className="mb-7 flex items-center justify-between gap-4 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-lab-muted">
        <span>Lesson {String(index + 1).padStart(2, '0')}</span>
        <span className="rounded-full border border-lab-blue/40 px-2.5 py-1 text-lab-blue">{levelLabels[lesson.level]}</span>
      </div>
      <h3 className="text-2xl font-black tracking-[-0.04em] text-white transition group-hover:text-lab-yellow">{lesson.title}</h3>
      <p className="mt-3 min-h-16 text-sm leading-6 text-lab-muted">{lesson.objective}</p>
      <div className="mt-6 border-t border-white/10 pt-4 font-mono text-xs uppercase tracking-[0.2em] text-lab-yellow">
        Open lab
      </div>
    </Link>
  );
}
