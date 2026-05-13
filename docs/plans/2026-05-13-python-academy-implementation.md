# Python Academy Implementation Plan

> **For Hermes:** Implement this plan task-by-task. Use TDD for reusable logic and fresh verification before completion claims.

**Goal:** Build the first version of Python Academy: a Next.js learning app with sectioned Python lessons and in-browser Pyodide execution.

**Architecture:** Next.js App Router renders static educational pages. Lesson content lives in typed TypeScript modules. Client components provide the code editor, Pyodide runtime, validation, and local progress persistence.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS, Pyodide, Vitest, Testing Library.

---

## Task 1: Scaffold project tooling

**Objective:** Create the Next.js app structure in the existing repo without overwriting the committed spec.

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `postcss.config.mjs`
- Create: `tailwind.config.ts`
- Create: `vitest.config.ts`
- Create: `app/layout.tsx`
- Create: `app/page.tsx`
- Create: `app/globals.css`

**Steps:**
1. Add scripts: `dev`, `build`, `lint`, `test`.
2. Add dependencies for Next, React, Pyodide, and testing.
3. Add Tailwind and TypeScript config.
4. Install with `pnpm install`.
5. Run `pnpm test` and `pnpm build` after initial files exist.
6. Commit: `chore: scaffold Next.js app`.

## Task 2: Add lesson data model and navigation tests

**Objective:** Define the course structure and prove lesson lookup/navigation works.

**Files:**
- Create: `lib/lessons.ts`
- Create: `lib/lessons.test.ts`

**Tests first:**
- `getLessonBySlug` returns a lesson for a known slug.
- `getAdjacentLessons` returns previous/next lessons.
- The full track includes beginner, intermediate, advanced, and project levels.

**Implementation:**
- Add `Lesson`, `LessonBlock`, and validation types.
- Add representative lessons across the full track.
- Export `lessons`, `sections`, `getLessonBySlug`, `getAdjacentLessons`, and `getProgressStats`.

**Verification:** `pnpm test lib/lessons.test.ts` then `pnpm test`.

**Commit:** `feat: add Python lesson catalog`.

## Task 3: Build progress utilities with tests

**Objective:** Add local-storage progress helpers that are safe when storage is unavailable.

**Files:**
- Create: `lib/progress.ts`
- Create: `lib/progress.test.ts`

**Tests first:**
- Default progress returns empty completed lessons and no last lesson.
- Marking a lesson complete stores a unique slug.
- Last opened lesson is persisted.
- Invalid stored JSON falls back safely.

**Implementation:**
- Add pure helpers for parsing/serializing progress.
- Add browser storage wrappers guarded by `typeof window`.

**Verification:** `pnpm test lib/progress.test.ts` then `pnpm test`.

**Commit:** `feat: add local progress store`.

## Task 4: Build visual shell and pages

**Objective:** Create the home page, lesson route, and shared components.

**Files:**
- Modify: `app/page.tsx`
- Create: `app/lessons/[slug]/page.tsx`
- Create: `components/course-shell.tsx`
- Create: `components/lesson-card.tsx`
- Create: `components/progress-summary.tsx`
- Create: `components/lesson-content.tsx`
- Modify: `app/globals.css`

**Implementation:**
- Use a dark Python lab notebook aesthetic.
- Render roadmap sections on home page.
- Render lesson content and navigation on lesson pages.
- Keep layout responsive at 375px.

**Verification:** `pnpm build`.

**Commit:** `feat: build course interface`.

## Task 5: Build Python runner and validation

**Objective:** Let learners run Python in the browser and validate lesson output.

**Files:**
- Create: `lib/python-runtime.ts`
- Create: `lib/validation.ts`
- Create: `lib/validation.test.ts`
- Create: `components/python-runner.tsx`
- Create: `components/code-editor.tsx`
- Create: `components/output-panel.tsx`
- Modify: `components/lesson-content.tsx` or lesson route to include runner.

**Tests first:**
- `validateExecution` passes for exact output.
- `validateExecution` passes for output contains.
- Manual validation returns neutral/incomplete.

**Implementation:**
- Dynamic import Pyodide on the client.
- Capture stdout/stderr.
- Show loading/running/error states.
- Mark lessons complete when validation passes.

**Verification:** `pnpm test lib/validation.test.ts`, `pnpm build`, browser smoke test.

**Commit:** `feat: add browser Python runner`.

## Task 6: Final verification and polish

**Objective:** Prove the application satisfies the design requirements.

**Verification commands:**
- `pnpm test`
- `pnpm lint`
- `pnpm build`
- Start `pnpm dev` and verify pages with browser tools.
- Verify Python stdout and traceback display in-browser.
- Verify progress persists after refresh.
- Verify 375px viewport layout.

**Commit:** `chore: finalize Python Academy implementation` if needed.
