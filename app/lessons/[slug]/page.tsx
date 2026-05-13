import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CourseShell } from '@/components/course-shell';
import { LessonContent } from '@/components/lesson-content';
import { getAdjacentLessons, getLessonBySlug, lessons } from '@/lib/lessons';

type LessonPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return lessons.map((lesson) => ({ slug: lesson.slug }));
}

export async function generateMetadata({ params }: LessonPageProps) {
  const { slug } = await params;
  const lesson = getLessonBySlug(slug);

  if (!lesson) {
    return { title: 'Lesson not found | Python Academy' };
  }

  return {
    title: `${lesson.title} | Python Academy`,
    description: lesson.objective,
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { slug } = await params;
  const lesson = getLessonBySlug(slug);

  if (!lesson) {
    notFound();
  }

  const adjacent = getAdjacentLessons(lesson.slug);

  return (
    <CourseShell>
      <section className="mx-auto grid max-w-7xl gap-6 px-5 pb-20 pt-8 sm:px-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:px-12 lg:pt-14">
        <LessonContent lesson={lesson} />

        <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-[1.6rem] border border-white/10 bg-lab-panel/85 p-5 shadow-card backdrop-blur">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-lab-blue">Lesson nav</p>
            <div className="mt-5 space-y-3">
              {adjacent.previous ? (
                <Link className="block rounded-2xl border border-white/10 p-4 text-sm text-lab-muted transition hover:border-lab-yellow hover:text-lab-yellow" href={`/lessons/${adjacent.previous.slug}`}>
                  Previous<br />
                  <span className="text-base font-bold text-white">{adjacent.previous.title}</span>
                </Link>
              ) : null}
              {adjacent.next ? (
                <Link className="block rounded-2xl border border-white/10 p-4 text-sm text-lab-muted transition hover:border-lab-yellow hover:text-lab-yellow" href={`/lessons/${adjacent.next.slug}`}>
                  Next<br />
                  <span className="text-base font-bold text-white">{adjacent.next.title}</span>
                </Link>
              ) : null}
            </div>
          </div>
        </aside>
      </section>
    </CourseShell>
  );
}
