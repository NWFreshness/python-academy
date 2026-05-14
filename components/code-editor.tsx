'use client';

import type { ChangeEvent } from 'react';

type CodeEditorProps = Readonly<{
  code: string;
  disabled?: boolean;
  onChange: (code: string) => void;
}>;

export function CodeEditor({ code, disabled, onChange }: CodeEditorProps) {
  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    onChange(event.target.value);
  }

  return (
    <textarea
      aria-label="Python code editor"
      className="min-h-72 w-full resize-y rounded-3xl border border-white/10 bg-[#02040a] p-5 font-mono text-sm leading-7 text-lab-ink outline-none transition placeholder:text-lab-muted/60 focus:border-lab-yellow/70 focus:ring-4 focus:ring-lab-yellow/10 disabled:cursor-not-allowed disabled:opacity-60"
      disabled={disabled}
      spellCheck={false}
      value={code}
      onChange={handleChange}
    />
  );
}
