# Python Academy Design

Date: 2026-05-13
Project folder: `/home/tyler-mayfield/Documents/python-academy`

## Summary

Python Academy is a browser-based Python learning web application inspired by the sectioned structure of learnpython.org. It teaches Python from beginner through advanced topics using concise lessons, runnable examples, exercises, and immediate feedback. The first implementation uses a local-first, Pyodide-powered Python runtime in the browser, with clean extension points for an optional backend sandbox later.

## Goals

- Provide a polished web application for learning Python by topic section.
- Let learners run Python directly in the browser without installing Python locally.
- Cover a full learning track from beginner concepts through decorators, APIs, testing, and async Python.
- Keep the first version local-first, static-friendly, and safe by executing Python with Pyodide/WebAssembly in the browser.
- Structure lessons as data so adding or editing lessons does not require changing page logic.
- Preserve a path to add backend execution later for packages, multi-file projects, filesystem exercises, or server-side integrations.

## Non-goals for the first version

- User accounts, authentication, or cloud sync.
- Database-backed progress tracking.
- Server-side Python code execution.
- Arbitrary package installation beyond what Pyodide supports in-browser.
- Real-time collaboration or classrooms.

## Recommended architecture

Use a Next.js application with React, TypeScript, Tailwind CSS, and Pyodide.

Primary pattern: static educational web app with a browser sandbox runtime.

Rationale:

- Next.js gives routing, static generation, future API routes, and a clear upgrade path if a backend is added.
- Pyodide keeps Python execution local to the browser, matching the local-first preference and avoiding server sandbox security work in the first version.
- TypeScript lesson definitions provide typed, maintainable content and validation metadata.
- Local storage is enough for first-version progress persistence.

## User experience

### Home page

The home page introduces the course and presents a roadmap from Python basics to advanced topics. It should feel like entering a technical learning lab rather than a generic course catalog.

Key elements:

- Hero section with course value proposition.
- Course roadmap grouped by level.
- Resume button for the last opened lesson.
- Quick start button for the first lesson.
- Progress summary from local storage.

### Lesson index and navigation

Lessons are grouped into sections similar to learnpython.org:

1. Python Basics
2. Variables and Types
3. Lists and Tuples
4. Dictionaries and Sets
5. Operators
6. String Formatting
7. Conditions
8. Loops
9. Functions
10. Classes and Objects
11. Modules and Packages
12. File Handling
13. Exceptions
14. Comprehensions
15. Decorators
16. APIs with Python
17. Testing with pytest
18. Async Python
19. Capstone Mini Projects

The navigation should make it easy to jump between sections while keeping the active lesson obvious.

### Lesson page

Each lesson page contains:

- Title and short objective.
- Explanation content.
- Example code.
- Interactive code editor.
- Run button and reset button.
- Output panel for stdout, stderr, and tracebacks.
- Exercise prompt.
- Completion or validation hint.
- Previous and next lesson links.

The code playground should be prominent and usable on desktop and mobile.

## Visual direction

Use a dark Python lab notebook aesthetic:

- Deep navy and charcoal base colors.
- Python-inspired yellow and blue accents.
- High-contrast text and code panels.
- Subtle grid, grain, or blueprint texture in backgrounds.
- Terminal-style output panel.
- Lesson cards that look like technical modules.
- Strong typography with a distinctive display face and readable body text.

Avoid generic purple-gradient SaaS styling and avoid emoji in UI copy.

## Core components

### `CourseShell`

Wraps lesson pages with shared layout, section navigation, and progress summary.

Responsibilities:

- Render sidebar or mobile drawer navigation.
- Highlight current lesson and section.
- Provide previous/next lesson controls.

### `LessonContent`

Displays structured lesson explanation, examples, exercise prompt, and hints.

Responsibilities:

- Render lesson metadata.
- Render markdown-like lesson blocks or typed content sections.
- Keep content display separate from Python execution.

### `PythonRunner`

Coordinates the code editor, Pyodide runtime, run/reset actions, and output display.

Responsibilities:

- Load Pyodide lazily on the client.
- Capture stdout and stderr.
- Execute user code.
- Report successful output or formatted tracebacks.
- Prevent server rendering of browser-only Pyodide APIs.

### `CodeEditor`

Provides the Python editor surface.

Responsibilities:

- Show starter code.
- Allow editing and reset.
- Use a lightweight editor first, with room to upgrade to CodeMirror or Monaco.

### `OutputPanel`

Displays execution state.

Responsibilities:

- Show runtime loading status.
- Show stdout and stderr.
- Show Python tracebacks clearly.
- Distinguish empty output from failed execution.

### `ProgressStore`

Small local-storage utility for progress.

Responsibilities:

- Save completed lessons.
- Save last opened lesson.
- Read progress safely on the client.
- Avoid hydration mismatches by treating local storage as client-only state.

## Data model

Lessons should be defined as typed data rather than hardcoded page components.

Example shape:

```ts
export type Lesson = {
  slug: string;
  title: string;
  section: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'project';
  objective: string;
  explanation: LessonBlock[];
  starterCode: string;
  solutionHint?: string;
  expectedOutput?: string;
  validation?: {
    type: 'output-contains' | 'exact-output' | 'manual';
    value?: string;
  };
};
```

The first implementation should include enough lesson content to prove the full structure works. It does not need every advanced lesson to be exhaustive on day one, but it should scaffold the full track and include representative runnable lessons across beginner, intermediate, and advanced sections.

## Python execution design

The first version runs code with Pyodide in the browser.

Execution flow:

1. User opens a lesson page.
2. `PythonRunner` initializes Pyodide on the client if it has not already loaded.
3. The editor is populated with lesson starter code.
4. User clicks Run.
5. The runner redirects Python stdout and stderr into JavaScript buffers.
6. The code executes inside Pyodide.
7. Output or traceback is displayed in the output panel.
8. If validation is configured, the app checks the output and marks the lesson complete when the result matches.

Constraints:

- Pyodide loading can take noticeable time, so the UI must communicate runtime status.
- Infinite loops can freeze execution in a basic implementation. The initial version should document this limitation in UI copy or use a worker-based runtime if feasible within the implementation scope.
- Browser-only runtime code must not execute during server rendering.

## Future backend extension point

The app should keep execution behind a small interface so a backend runner can be added later.

```ts
export type PythonExecutionResult = {
  stdout: string;
  stderr: string;
  error?: string;
};

export interface PythonRuntime {
  run(code: string): Promise<PythonExecutionResult>;
}
```

Initial implementation: `PyodideRuntime`.

Future implementation: `BackendRuntime` calling an API route or separate sandbox service.

This keeps lesson pages independent from the execution provider.

## Error handling

- Runtime loading failure: show retry action and concise explanation.
- Python exception: show formatted traceback in the output panel.
- Empty output: show an explicit empty-output state.
- Validation failure: show a hint without revealing the full solution by default.
- Local storage unavailable: continue functioning without saved progress.

## Accessibility and responsive design

- The app must work at 375px width.
- Buttons need visible focus states.
- Code output must preserve whitespace and be readable with sufficient contrast.
- Navigation should not trap keyboard focus.
- Interactive controls need descriptive labels.

## Testing and verification

Fresh verification before claiming completion should include:

- Install dependencies successfully.
- Run lint or equivalent static checks.
- Run TypeScript/build verification.
- Start the dev server and confirm pages render.
- Open the app in browser tooling and verify Python code executes.
- Verify a Python exception appears as a readable traceback.
- Verify progress persists after refresh.
- Verify mobile layout is usable at 375px.

## Implementation phases

The implementation plan should break work into small phases:

1. Scaffold Next.js project and base tooling.
2. Build lesson data model and seed lesson content.
3. Build layout, navigation, and visual system.
4. Build Pyodide runtime and code runner.
5. Add validation and local progress tracking.
6. Add responsive polish and accessibility fixes.
7. Run full verification.

## Risks and mitigations

### Pyodide loading size and latency

Mitigation: lazy-load the runtime only on lesson pages, show clear loading state, and reuse the loaded runtime.

### Infinite loops or long-running code

Mitigation: keep first exercises simple and consider running Pyodide in a Web Worker during implementation if it fits the phase budget. If not, clearly document the limitation and add worker execution in a later phase.

### Lesson content scope creep

Mitigation: scaffold the full track but seed a representative subset first. Add the remaining lessons incrementally after the app shell and runner are verified.

### Backend sandbox complexity

Mitigation: keep backend execution out of the first version and define the runtime interface so it can be added later without rewriting lesson pages.

## Approval checkpoint

This spec captures the approved direction: Next.js, Pyodide-first browser execution, a hybrid extension path, and a full Python learning track. After review, the next step is to write a detailed implementation plan before coding the application.
