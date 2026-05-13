import Link from 'next/link';
import type { ReactNode } from 'react';

export function CourseShell({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <main className="min-h-screen overflow-hidden bg-lab-black text-lab-ink">
      <div className="pointer-events-none fixed inset-0 -z-20 bg-[radial-gradient(circle_at_12%_10%,rgba(55,118,171,0.36),transparent_28%),radial-gradient(circle_at_88%_0%,rgba(255,212,59,0.18),transparent_24%),linear-gradient(135deg,#05070d_0%,#081221_54%,#05070d_100%)]" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-grid bg-[length:40px_40px] opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_82%)]" />
      <header className="px-5 py-5 sm:px-8 lg:px-12">
        <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-white/[0.045] px-5 py-3 shadow-card backdrop-blur-xl">
          <Link href="/" className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-lab-yellow sm:text-sm">
            Python Academy
          </Link>
          <div className="flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-lab-muted sm:gap-4 sm:text-xs">
            <Link href="/#lessons" className="transition hover:text-lab-yellow">Roadmap</Link>
            <Link href="/lessons/variables-and-types" className="rounded-full border border-lab-blue/60 px-3 py-2 text-lab-ink transition hover:border-lab-yellow hover:text-lab-yellow sm:px-4">
              Start
            </Link>
          </div>
        </nav>
      </header>
      {children}
    </main>
  );
}
