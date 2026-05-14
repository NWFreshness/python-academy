import { describe, expect, it } from 'vitest';
import { validateExecution } from './validation';

const manualValidationMessage = 'Review your output and mark the lesson complete when it matches the goal.';

describe('validateExecution', () => {
  it('passes exact output when stdout matches after trimming', () => {
    const result = validateExecution(
      { stdout: 'Hello, Ada\n', stderr: '' },
      { type: 'exact-output', value: 'Hello, Ada' },
    );

    expect(result).toEqual({ status: 'passed', message: 'Output matched exactly.' });
  });

  it('passes output-contains when stdout includes expected text', () => {
    const result = validateExecution(
      { stdout: 'Training syntax...\nReady.\n', stderr: '' },
      { type: 'output-contains', value: 'Ready.' },
    );

    expect(result.status).toBe('passed');
  });

  it('returns neutral incomplete state for manual validation', () => {
    const result = validateExecution({ stdout: '', stderr: '' }, { type: 'manual' });

    expect(result).toEqual({ status: 'manual', message: manualValidationMessage });
  });

  it('fails when execution returned stderr or an error', () => {
    const result = validateExecution(
      { stdout: '', stderr: 'Traceback', error: 'NameError' },
      { type: 'output-contains', value: 'Ready.' },
    );

    expect(result.status).toBe('failed');
    expect(result.message).toContain('Fix the runtime error');
  });
});
