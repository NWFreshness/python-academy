import type { LessonValidation } from './lessons';
import type { PythonExecutionResult } from './python-runtime';

const MANUAL_VALIDATION_MESSAGE = 'Review your output and mark the lesson complete when it matches the goal.';

export type ValidationStatus = 'passed' | 'failed' | 'manual';

export type ValidationResult = {
  status: ValidationStatus;
  message: string;
};

export function validateExecution(
  execution: PythonExecutionResult,
  validation: LessonValidation | undefined,
): ValidationResult {
  if (execution.error || execution.stderr.trim().length > 0) {
    return failedValidation('Fix the runtime error, then run the code again.');
  }

  if (!validation || validation.type === 'manual') {
    return manualValidation();
  }

  const expected = validation.value ?? '';
  const actual = execution.stdout.trim();

  switch (validation.type) {
    case 'exact-output':
      return validateExactOutput(actual, expected);
    case 'output-contains':
      return validateOutputContains(actual, expected);
  }
}

function validateExactOutput(actual: string, expected: string): ValidationResult {
  if (actual === expected.trim()) {
    return passedValidation('Output matched exactly.');
  }

  return failedValidation(`Expected exactly "${expected}", but received "${actual}".`);
}

function validateOutputContains(actual: string, expected: string): ValidationResult {
  if (actual.includes(expected)) {
    return passedValidation('Output contained the expected text.');
  }

  return failedValidation(`Expected output to contain "${expected}".`);
}

function passedValidation(message: string): ValidationResult {
  return { status: 'passed', message };
}

function failedValidation(message: string): ValidationResult {
  return { status: 'failed', message };
}

function manualValidation(): ValidationResult {
  return { status: 'manual', message: MANUAL_VALIDATION_MESSAGE };
}
