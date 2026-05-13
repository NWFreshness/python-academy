import Link from 'next/link';
import { CourseShell } from '@/components/course-shell';
import { LessonCard } from '@/components/lesson-card';
import { ProgressSummary } from '@/components/progress-summary';
import { lessons, sections } from '@/lib/lessons';

export default function Home() {
  return (
    <CourseShell>
      <section className="px-5 pb-12 pt-8 sm:px-8 lg:px-12 lg:pt-16">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="mb-5 inline-flex rounded-full border border-lab-yellow/30 bg-lab-yellow/10 px-4 py-2 font-mono text-xs uppercase tracking-[0.24em] text-lab-yellow">
              Full-track Python lab
            </p>
            <h1 className="max-w-4xl text-5xl font-black tracking-[-0.065em] text-white sm:text-7xl lg:text-8xl">
              Learn Python where the code actually runs.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-lab-muted sm:text-xl">
              Move from syntax to capstone projects with runnable examples, output checks, and browser-local progress. The first release uses Pyodide so Python runs on your machine.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link className="rounded-full bg-lab-yellow px-6 py-3 text-center font-mono text-sm font-bold uppercase tracking-[0.18em] text-slate-950 shadow-glow transition hover:-translate-y-0.5 hover:bg-white" href="/lessons/variables-and-types">
                Start lesson one
              </Link>
              <a className="rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-center font-mono text-sm font-bold uppercase tracking-[0.18em] text-lab-ink transition hover:-translate-y-0.5 hover:border-lab-blue" href="#lessons">
                Explore roadmap
              </a>
            </div>
          </div>

          <div className="space-y-5">
            <ProgressSummary />
            <div className="relative rounded-[2rem] border border-white/10 bg-lab-panel/90 p-4 shadow-card backdrop-blur">
              <div className="mb-4 flex items-center gap-2 border-b border-white/10 pb-4">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-lab-yellow" />
                <span className="h-3 w-3 rounded-full bg-lab-green" />
                <span className="ml-3 font-mono text-xs text-lab-muted">academy://runtime/pyodide</span>
              </div>
              <pre className="overflow-hidden rounded-3xl bg-[#02040a] p-6 font-mono text-sm leading-7 text-lab-ink"><code>{`for lesson in ${lessons.length} * ["practice"]:
    print("ship skill")`}</code></pre>
              <div className="mt-4 rounded-3xl border border-lab-green/20 bg-lab-green/10 p-5 font-mono text-sm text-lab-green">
                ship skill<br />ship skill<br />ship skill
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="lessons" className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 lg:px-12">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-lab-blue">Course roadmap</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-white sm:text-5xl">Beginner to capstone.</h2>
          </div>
          <p className="max-w-xl text-lab-muted">{lessons.length} lessons grouped into {sections.length} learning sections. Each module is designed to become a tight explain, run, validate loop.</p>
        </div>

        <div className="space-y-10">
          {sections.map((section) => (
            <section key={section.title} className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-4 sm:p-6">
              <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-end">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.22em] text-lab-yellow">{section.level}</p>
                  <h3 className="mt-2 text-3xl font-black tracking-[-0.04em] text-white">{section.title}</h3>
                </div>
                <p className="max-w-2xl text-sm leading-6 text-lab-muted">{section.description}</p>
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {section.lessons.map((lesson) => (
                  <LessonCard key={lesson.slug} lesson={lesson} index={lessons.findIndex((candidate) => candidate.slug === lesson.slug)} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </CourseShell>
  );
}
