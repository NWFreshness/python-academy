const previewLessons = [
  'Variables and Types',
  'Lists and Loops',
  'Functions',
  'Classes and Objects',
  'Decorators',
  'Async Python',
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-lab-black text-lab-ink">
      <section className="relative isolate px-6 py-10 sm:px-10 lg:px-16">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_18%_12%,rgba(55,118,171,0.38),transparent_30%),radial-gradient(circle_at_82%_8%,rgba(255,212,59,0.22),transparent_24%),linear-gradient(140deg,#05070d_0%,#09111f_48%,#05070d_100%)]" />
        <div className="absolute inset-0 -z-10 bg-grid bg-[length:38px_38px] opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_78%)]" />

        <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 backdrop-blur">
          <div className="font-mono text-sm uppercase tracking-[0.28em] text-lab-yellow">Python Academy</div>
          <a className="rounded-full border border-lab-blue/60 px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-lab-ink transition hover:border-lab-yellow hover:text-lab-yellow" href="#lessons">
            View track
          </a>
        </nav>

        <div className="mx-auto grid max-w-7xl items-center gap-12 py-16 lg:grid-cols-[1.04fr_0.96fr] lg:py-24">
          <div>
            <p className="mb-5 inline-flex rounded-full border border-lab-yellow/30 bg-lab-yellow/10 px-4 py-2 font-mono text-xs uppercase tracking-[0.24em] text-lab-yellow">
              Pyodide-first browser lab
            </p>
            <h1 className="max-w-4xl text-5xl font-black tracking-[-0.06em] text-white sm:text-7xl lg:text-8xl">
              Learn Python where the code actually runs.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-lab-muted sm:text-xl">
              A full-track Python course with explanations, exercises, validation, and a local-first runtime that executes Python directly in your browser.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a className="rounded-full bg-lab-yellow px-6 py-3 text-center font-mono text-sm font-bold uppercase tracking-[0.18em] text-slate-950 shadow-glow transition hover:-translate-y-0.5 hover:bg-white" href="#lessons">
                Start roadmap
              </a>
              <a className="rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-center font-mono text-sm font-bold uppercase tracking-[0.18em] text-lab-ink transition hover:-translate-y-0.5 hover:border-lab-blue" href="/lessons/variables-and-types">
                Open first lesson
              </a>
            </div>
          </div>

          <div className="relative rounded-[2rem] border border-white/10 bg-lab-panel/90 p-4 shadow-card backdrop-blur">
            <div className="mb-4 flex items-center gap-2 border-b border-white/10 pb-4">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-lab-yellow" />
              <span className="h-3 w-3 rounded-full bg-lab-green" />
              <span className="ml-3 font-mono text-xs text-lab-muted">academy://lesson/variables</span>
            </div>
            <pre className="overflow-hidden rounded-3xl bg-[#02040a] p-6 font-mono text-sm leading-7 text-lab-ink"><code>{`student = "builder"
skills = ["syntax", "loops", "APIs"]

for skill in skills:
    print(f"Training {skill}...")

print(f"Ready, {student}.")`}</code></pre>
            <div className="mt-4 rounded-3xl border border-lab-green/20 bg-lab-green/10 p-5 font-mono text-sm text-lab-green">
              Training syntax...<br />Training loops...<br />Training APIs...<br />Ready, builder.
            </div>
          </div>
        </div>
      </section>

      <section id="lessons" className="mx-auto max-w-7xl px-6 pb-20 sm:px-10 lg:px-16">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-lab-blue">Course roadmap</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-white sm:text-5xl">Beginner to capstone.</h2>
          </div>
          <p className="max-w-xl text-lab-muted">This scaffold will become a structured set of lessons backed by typed content, client-side execution, and progress that stays local to the browser.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {previewLessons.map((lesson, index) => (
            <article key={lesson} className="group rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-6 transition hover:-translate-y-1 hover:border-lab-yellow/60 hover:bg-white/[0.06]">
              <div className="mb-8 flex items-center justify-between font-mono text-xs uppercase tracking-[0.2em] text-lab-muted">
                <span>Module {String(index + 1).padStart(2, '0')}</span>
                <span className="text-lab-yellow">Queued</span>
              </div>
              <h3 className="text-2xl font-bold tracking-[-0.03em] text-white">{lesson}</h3>
              <p className="mt-3 text-sm leading-6 text-lab-muted">Explanation, runnable starter code, output checks, and a compact exercise loop.</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
