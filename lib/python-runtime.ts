export type PythonExecutionResult = {
  stdout: string;
  stderr: string;
  error?: string;
};

export interface PythonRuntime {
  run(code: string): Promise<PythonExecutionResult>;
}

type PyodideInstance = {
  setStdout(options: { batched: (message: string) => void }): void;
  setStderr(options: { batched: (message: string) => void }): void;
  runPythonAsync(code: string): Promise<unknown>;
};

type PyodideModule = {
  loadPyodide(options?: { indexURL?: string }): Promise<PyodideInstance>;
};

const PYODIDE_VERSION = '0.28.3';
const PYODIDE_BASE_URL = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

let pyodidePromise: Promise<PyodideInstance> | undefined;

async function getPyodide(): Promise<PyodideInstance> {
  pyodidePromise ??= import(
    /* webpackIgnore: true */ `${PYODIDE_BASE_URL}pyodide.mjs`
  ).then((module) =>
    (module as PyodideModule).loadPyodide({
      indexURL: PYODIDE_BASE_URL,
    }),
  );

  return pyodidePromise;
}

export function createPyodideRuntime(): PythonRuntime {
  return {
    async run(code: string): Promise<PythonExecutionResult> {
      const pyodide = await getPyodide();
      const stdout: string[] = [];
      const stderr: string[] = [];

      pyodide.setStdout({ batched: (message: string) => stdout.push(message) });
      pyodide.setStderr({ batched: (message: string) => stderr.push(message) });

      try {
        await pyodide.runPythonAsync(code);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        stderr.push(message);
        return {
          stdout: stdout.join('\n'),
          stderr: stderr.join('\n'),
          error: message,
        };
      }

      return {
        stdout: stdout.join('\n'),
        stderr: stderr.join('\n'),
      };
    },
  };
}
