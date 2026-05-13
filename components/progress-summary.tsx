'use client';

import { useEffect, useState } from 'react';
import { getProgressStats } from '@/lib/lessons';
import { createDefaultProgress, loadProgress, type CourseProgress } from '@/lib/progress';

export function ProgressSummary() {
  const [progress, setProgress] = useState<CourseProgress>(createDefaultProgress());

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  const stats = getProgressStats(progress.completedLessonSlugs);

  return (
    <aside className="rounded-[1.7rem] border border-lab-blue/25 bg-lab-panel/80 p-5 shadow-card backdrop-blur">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-lab-blue">Local progress</p>
          <p className="mt-2 text-3xl font-black tracking-[-0.04em] text-white">{stats.percentComplete}%</p>
        </div>
        <div className="grid h-20 w-20 place-items-center rounded-full border border-lab-yellow/40 bg-lab-yellow/10 font-mono text-sm text-lab-yellow">
          {stats.completedLessons}/{stats.totalLessons}
        </div>
      </div>
      <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-lab-yellow transition-all" style={{ width: `${stats.percentComplete}%` }} />
      </div>
      <p className="mt-4 text-sm leading-6 text-lab-muted">
        Progress is stored in this browser only. No account or backend is required for the first release.
      </p>
    </aside>
  );
}
