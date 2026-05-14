'use client';

import { useMemo, useState } from 'react';
import { CodeEditor } from '@/components/code-editor';
import { OutputPanel } from '@/components/output-panel';
import type { Lesson } from '@/lib/lessons';
import { createPyodideRuntime, type PythonExecutionResult } from '@/lib/python-runtime';
import { loadProgress, markLessonComplete, storeProgress } from '@/lib/progress';
import { validateExecution, type ValidationResult } from '@/lib/validation';

type PythonRunnerProps = Readonly<{
  lesson: Lesson;
}>;

export function PythonRunner({ lesson }: PythonRunnerProps) {
  const [code, setCode] = useState(lesson.starterCode);
  const [result, setResult] = useState<PythonExecutionResult>();
  const [validation, setValidation] = useState<ValidationResult>();
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const runtime = useMemo(() => createPyodideRuntime(), []);

  async function runCode() {
    setIsRunning(true);
    setValidation(undefined);

    try {
      const execution = await runtime.run(code);
      const nextValidation = validateExecution(execution, lesson.validation);

      setResult(execution);
      setValidation(nextValidation);

      if (nextValidation.status === 'passed') {
        completeLesson();
      }
    } finally {
      setIsRunning(false);
    }
  }

  function markCompleteManually() {
    completeLesson();
    setValidation({ status: 'passed', message: 'Lesson marked complete in this browser.' });
  }

  function completeLesson() {
    const progress = markLessonComplete(loadProgress(), lesson.slug);
    storeProgress(progress);
    setIsCompleted(true);
  }

  return (
    <section className="mt-10 rounded-[1.8rem] border border-lab-blue/25 bg-lab-panel/90 p-5 shadow-card sm:p-6">
      <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-end">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-lab-blue">Browser Python runner</p>
          <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] text-white">Run the lab</h2>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            className="rounded-full bg-lab-yellow px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.18em] text-slate-950 transition hover:-translate-y-0.5 hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
            type="button"
            disabled={isRunning}
            onClick={runCode}
          >
            {isRunning ? 'Running' : 'Run code'}
          </button>
          <button
            className="rounded-full border border-white/15 px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.18em] text-lab-ink transition hover:border-lab-yellow hover:text-lab-yellow"
            type="button"
            onClick={markCompleteManually}
          >
            {isCompleted ? 'Completed' : 'Mark complete'}
          </button>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(20rem,0.72fr)]">
        <CodeEditor code={code} disabled={isRunning} onChange={setCode} />
        <OutputPanel isRunning={isRunning} result={result} validation={validation} />
      </div>
    </section>
  );
}
