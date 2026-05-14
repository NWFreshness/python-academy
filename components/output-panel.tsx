import type { PythonExecutionResult } from '@/lib/python-runtime';
import type { ValidationResult, ValidationStatus } from '@/lib/validation';

type OutputPanelProps = Readonly<{
  isRunning: boolean;
  result?: PythonExecutionResult;
  validation?: ValidationResult;
}>;

export function OutputPanel({ isRunning, result, validation }: OutputPanelProps) {
  const hasError = Boolean(result?.error || result?.stderr);
  const statusLabel = getStatusLabel(isRunning, hasError);
  const statusClassName = hasError ? 'text-red-300' : 'text-lab-green';
  const outputText = getOutputText(isRunning, result);

  return (
    <section className="rounded-3xl border border-white/10 bg-[#02040a] p-5">
      <div className="mb-4 flex items-center justify-between gap-3 font-mono text-xs uppercase tracking-[0.2em]">
        <span className="text-lab-muted">Output</span>
        <span className={statusClassName}>{statusLabel}</span>
      </div>

      <pre className="min-h-32 whitespace-pre-wrap break-words font-mono text-sm leading-7 text-lab-ink">
        {outputText}
      </pre>

      {validation ? <ValidationMessage validation={validation} /> : null}
    </section>
  );
}

function ValidationMessage({ validation }: Readonly<{ validation: ValidationResult }>) {
  return (
    <div className={`mt-4 rounded-2xl border p-4 text-sm ${getValidationClassName(validation.status)}`}>
      {validation.message}
    </div>
  );
}

function getStatusLabel(isRunning: boolean, hasError: boolean): string {
  if (isRunning) {
    return 'Running';
  }

  if (hasError) {
    return 'Error';
  }

  return 'Ready';
}

function getOutputText(isRunning: boolean, result: PythonExecutionResult | undefined): string {
  if (isRunning) {
    return 'Executing Python in the browser...';
  }

  if (!result) {
    return 'Run the starter code to see stdout and tracebacks here.';
  }

  return result.stderr || result.stdout || 'No output.';
}

function getValidationClassName(status: ValidationStatus): string {
  switch (status) {
    case 'passed':
      return 'border-lab-green/25 bg-lab-green/10 text-lab-green';
    case 'failed':
      return 'border-red-300/25 bg-red-400/10 text-red-200';
    case 'manual':
      return 'border-lab-yellow/25 bg-lab-yellow/10 text-lab-yellow';
  }
}
