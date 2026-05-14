import Link from 'next/link';
import { PythonRunner } from '@/components/python-runner';
import type { Lesson } from '@/lib/lessons';

export function LessonContent({ lesson }: Readonly<{ lesson: Lesson }>) {
  return (
    <article className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 shadow-card backdrop-blur sm:p-8">
      <div className="mb-7 flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-[0.2em]">
        <Link href="/#lessons" className="rounded-full border border-white/10 px-3 py-2 text-lab-muted transition hover:border-lab-yellow hover:text-lab-yellow">
          Roadmap
        </Link>
        <span className="rounded-full border border-lab-blue/40 bg-lab-blue/10 px-3 py-2 text-lab-blue">{lesson.level}</span>
        <span className="rounded-full border border-lab-yellow/30 bg-lab-yellow/10 px-3 py-2 text-lab-yellow">{lesson.section}</span>
      </div>

      <h1 className="max-w-4xl text-4xl font-black tracking-[-0.06em] text-white sm:text-6xl">{lesson.title}</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-lab-muted">{lesson.objective}</p>

      <div className="mt-10 space-y-5">
        {lesson.explanation.map((block, index) => {
          if (block.type === 'code') {
            return (
              <pre key={`${block.type}-${index}`} className="overflow-x-auto rounded-3xl border border-white/10 bg-[#02040a] p-5 font-mono text-sm leading-7 text-lab-ink">
                <code>{block.content}</code>
              </pre>
            );
          }

          if (block.type === 'callout') {
            return (
              <div key={`${block.type}-${index}`} className="rounded-3xl border border-lab-yellow/25 bg-lab-yellow/10 p-5 text-lab-ink">
                {block.content}
              </div>
            );
          }

          if (block.type === 'list') {
            return (
              <ul key={`${block.type}-${index}`} className="list-inside list-disc space-y-2 text-lab-muted">
                {block.items?.map((item) => <li key={item}>{item}</li>)}
              </ul>
            );
          }

          return <p key={`${block.type}-${index}`} className="text-base leading-8 text-lab-muted sm:text-lg">{block.content}</p>;
        })}
      </div>

      <PythonRunner lesson={lesson} />
    </article>
  );
}
