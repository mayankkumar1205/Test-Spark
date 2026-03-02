# TestSpark — Frontend ↔ Backend Integration

This document describes how the TestSpark frontend communicates with the backend: configured base URL, all HTTP endpoints the frontend calls (method + path), the expected request shapes where obvious, response shape conventions, error handling, and notes about mocked helpers in the frontend.

## Quick summary

- Axios instance: `src/services/api.js` — sets the `baseURL` used by all requests.
- Main service helpers: `src/services/evalService.js` — exported functions call backend endpoints. Many functions are real HTTP calls; some are mocked/simulated in the frontend for development.

## Base URL

The Axios instance is configured in `src/services/api.js`:

```
baseURL: "https://testspark-api.onrender.com"
```

Change the backend host by updating `baseURL` in `src/services/api.js`.

## Response & error convention

- Successful responses are expected as: `{ success: true, data: ... }` or raw data inside `res.data`.
- Service functions catch errors and return: `{ success: false, error: <serverData | message> }`.

## Endpoints used by the frontend

Below are the endpoints the frontend calls (implemented in `src/services/evalService.js`). For each endpoint we show the exported helper, HTTP method, path, brief request shape, and response expectation.

- `evaluateCustomDataset(payload)` — POST `/api/eval/custom`
  - Usage: `await evaluateCustomDataset(payload)`
  - Request: JSON payload containing dataset + evaluation options. Example:
    ```json
    {
      "runId": "run_1",
      "dataset": [{ "input": "...", "expected": "..." }],
      "modelConfig": { "name": "gpt-4", "params": {} }
    }
    ```
  - Response: `res.data` (expected shape `{ success: true, data: {...} }`). Errors return `{ success: false, error: ... }`.

- `testBenchmark(payload)` — POST `/api/eval/benchmark`
  - Usage: `await testBenchmark(payload)`
  - Request: benchmark spec and model config.
  - Response: benchmark results via `res.data`.

- `getEvaluationRuns()` — GET `/api/runs`
  - Usage: `await getEvaluationRuns()`
  - Response: list of runs, typically `{ success: true, data: { runs: [...] } }`.

- `getDashboardStats()` — GET `/api/dashboard`
  - Usage: `await getDashboardStats()`
  - Response: dashboard metrics. NOTE: if `/api/dashboard` is unavailable, the frontend falls back to GET `/api/runs` and computes basic stats client-side (total runs, completed, active, average accuracy).

- `generateVariants(payload)` — POST `/api/generate`
  - Usage: `await generateVariants(payload)`
  - Request: generation options (prompt, rules, number of variants)
  - Response: generated variants in `res.data`.

- `judgeResponse(payload)` — POST `/api/judge`
  - Usage: `await judgeResponse(payload)`
  - Request: model output, expected output and judgement criteria
  - Response: judgement result in `res.data`.

- `compareModels()` — GET `/api/compare`
  - Usage: `await compareModels()`
  - Response: model comparison metrics.

## Mocked / Frontend-only helpers

The following functions in `src/services/evalService.js` are mocked (simulate network latency and return sample data). They currently do not make real HTTP calls:

- `comprehensiveTest(payload)` — returns simulated test report.
- `createRun(payload)`, `getRunById(id)`, `startRun(id)`, `deleteRun(id)` — simulated run management.
- `getTestcases()`, `createTestcase(payload)`, `updateTestcase(id,payload)`, `deleteTestcase(id)` — local mocked testcases CRUD.
- `getJudgementStats(runId)`, `getRunResults(id)`, `getJudgementById(id)`, `getTestcaseJudgements(id)` — mocked judgement/result endpoints.

If you want these to call the real backend, replace the mock implementations with `api.get/post/put/delete(...)` calls consistent with the other helpers.

## Error handling in services

- Each service helper wraps the Axios call in try/catch. On error they log and return a normalized object: `{ success: false, error: err.response?.data || err.message }`.

## Example usage (from a component)

```javascript
import { evaluateCustomDataset } from "./services/evalService";

const result = await evaluateCustomDataset(payload);
if (result.success) {
  // handle result.data
} else {
  // handle result.error
}
```

## How to add or change endpoints

- Update `src/services/api.js` to change the `baseURL`.
- Add a new exported async function to `src/services/evalService.js` that calls `api.get/post/put/delete(path, payload)` and follows the existing error-normalization pattern.

## Where to look

- Axios instance: [src/services/api.js](src/services/api.js)
- Service helpers & endpoint implementations: [src/services/evalService.js](src/services/evalService.js)

## Questions / Next steps

- Want me to convert some mocked helpers into real backend calls? I can implement them if you provide the backend routes or desired shapes.

---

Generated on 2026-03-02 — TestSpark frontend

## Frontend folder structure

Below is the repository folder layout for the frontend and a short description of each file and folder so you can locate code quickly.

```
testspark-frontend/
├─ index.html
├─ package.json
├─ postcss.config.js
├─ tailwind.config.js
├─ vite.config.js
├─ public/
└─ src/
   ├─ main.jsx            # app entry — ReactDOM render, global providers
   ├─ App.jsx             # main router and top-level routes
   ├─ index.css           # global styles (Tailwind + app overrides)
   ├─ assets/             # static assets (images, icons)
   ├─ context/
   │  └─ ThemeContext.jsx # theme provider (light/dark)
   ├─ layout/
   │  ├─ DashboardLayout.jsx # main page layout wrapper
   │  ├─ Navbar.jsx           # top navigation bar
   │  └─ Sidebar.jsx          # side navigation links
   ├─ components/         # small, reusable UI components
   │  ├─ AccuracyChart.jsx
   │  ├─ BenchmarkBarChart.jsx
   │  ├─ BenchmarkRadarChart.jsx
   │  └─ JudgeRadarChart.jsx
   ├─ pages/              # route pages (each maps to a screen in the UI)
   │  ├─ Landing.jsx
   │  ├─ Dashboard.jsx
   │  ├─ Generator.jsx
   │  ├─ CustomEvaluation.jsx
   │  ├─ Benchmark.jsx
   │  ├─ Compare.jsx
   │  ├─ Comprehensive.jsx
   │  ├─ Judge.jsx
   │  ├─ JudgementDetail.jsx
   │  ├─ JudgementStats.jsx
   │  ├─ Runs.jsx
   │  ├─ RunDetails.jsx
   │  ├─ RunResults.jsx
   │  ├─ Testcases.jsx
   │  └─ TestcaseJudgements.jsx
   └─ services/           # API wrappers and business API calls
      ├─ api.js           # axios instance with baseURL & headers
      └─ evalService.js   # all evaluation/judgement related helpers
```

### Files and purpose (detailed)

- `src/main.jsx` — application entry point. Mounts `App` and wraps it in providers (router, theme). Check here to change global providers or add analytics.

- `src/App.jsx` — defines routes and page-level composition. Routing maps paths to files in `src/pages`.

- `src/index.css` — global CSS; Tailwind utilities and app overrides live here.

- `src/assets/` — store images, logos and other static files referenced by components/pages.

- `src/context/ThemeContext.jsx` — provides theme (dark/light) state and helper hook used across the layout and components.

- `src/layout/`
  - `DashboardLayout.jsx` — page wrapper used on all protected/dashboard pages; composes `Navbar` and `Sidebar` and places page content.
  - `Navbar.jsx` — top navigation controls, user menu, quick actions.
  - `Sidebar.jsx` — main navigation for switching between pages (Dashboard, Runs, Benchmarks, etc.).

- `src/components/` — small, focused components used by pages. Current files are chart components (Accuracy and Benchmark charts). Each accepts `data` props and configuration and is rendered in dashboard and page details.

- `src/pages/` — primary UI screens. Short summary of each:
  - `Landing.jsx` — public landing / marketing view.
  - `Dashboard.jsx` — overview of runs, high-level stats. Uses `getDashboardStats()` and `getEvaluationRuns()` from `evalService`.
  - `Generator.jsx` — UI for generating test variants. Calls `generateVariants(payload)`.
  - `CustomEvaluation.jsx` — run an evaluation against a custom dataset. Calls `evaluateCustomDataset(payload)`.
  - `Benchmark.jsx` — run or view benchmark tests. Calls `testBenchmark(payload)`.
  - `Compare.jsx` — model comparison UI. Calls `compareModels()`.
  - `Comprehensive.jsx` — (currently simulated) comprehensive testing dashboard; may call `comprehensiveTest()`.
  - `Judge.jsx` — create or view judgement flows, uses `judgeResponse(payload)` and judgement-related helpers.
  - `JudgementDetail.jsx` — detailed view for a single judgement; uses `getJudgementById(id)`.
  - `JudgementStats.jsx` — aggregated judgement statistics; uses `getJudgementStats(runId)`.
  - `Runs.jsx` — list of evaluation runs; uses `getEvaluationRuns()` and `createRun(payload)`.
  - `RunDetails.jsx` — per-run details and progress; uses `getRunById(id)` and `startRun(id)`.
  - `RunResults.jsx` — final run results and per-testcase outcomes; uses `getRunResults(id)`.
  - `Testcases.jsx` — CRUD for testcases (create/update/delete); uses `getTestcases()`, `createTestcase()`, `updateTestcase()`, `deleteTestcase()` (currently mocked in `evalService.js`).
  - `TestcaseJudgements.jsx` — list of judgements for a testcase; uses `getTestcaseJudgements(id)`.

- `src/services/api.js` — creates an Axios instance exported as `api`.
  - Default `baseURL` is `https://testspark-api.onrender.com`.
  - Update this file to switch environments (local, staging, prod).

- `src/services/evalService.js` — exports many helpers used by pages. Real HTTP calls present for:
  - POST `/api/eval/custom` — `evaluateCustomDataset(payload)`
  - POST `/api/eval/benchmark` — `testBenchmark(payload)`
  - GET `/api/runs` — `getEvaluationRuns()`
  - GET `/api/dashboard` — `getDashboardStats()` (with client fallback)
  - POST `/api/generate` — `generateVariants(payload)`
  - POST `/api/judge` — `judgeResponse(payload)`
  - GET `/api/compare` — `compareModels()`

  Several helpers are currently mocked in the same file (simulate network delay and return sample data): run creation, run details, testcases CRUD, judgement stats, run results, and judge lookups. See the file to replace mocks with real `api` calls.

## How pages map to backend endpoints (quick reference)

- CustomEvaluation.jsx -> `evaluateCustomDataset(payload)` -> POST `/api/eval/custom`
- Benchmark.jsx -> `testBenchmark(payload)` -> POST `/api/eval/benchmark`
- Generator.jsx -> `generateVariants(payload)` -> POST `/api/generate`
- Judge.jsx -> `judgeResponse(payload)` -> POST `/api/judge`
- Compare.jsx -> `compareModels()` -> GET `/api/compare`
- Runs/RunsDetails/RunResults -> `getEvaluationRuns()`, `getRunById(id)`, `getRunResults(id)`, `createRun(payload)`, `startRun(id)`, `deleteRun(id)`
- Testcases page -> `getTestcases()`, `createTestcase(payload)`, `updateTestcase(id,payload)`, `deleteTestcase(id)` (currently mocked)
- Judgement pages -> `getJudgementStats(runId)`, `getJudgementById(id)`, `getTestcaseJudgements(id)` (mocked)

## Developer notes

- To point the frontend to a local backend during development, edit `src/services/api.js` and change `baseURL` to your local server (for example `http://localhost:5000`).
- To convert a mocked helper to a real backend call, replace the mock implementation in `src/services/evalService.js` with an axios call using the existing `api` instance and follow the error-handling pattern used elsewhere.

## Example: add a new API helper

1. Open `src/services/evalService.js`.
2. Add an exported async function:

```javascript
export async function getSomething(params) {
  try {
    const res = await api.get("/api/something", { params });
    return res.data;
  } catch (err) {
    return { success: false, error: err.response?.data || err.message };
  }
}
```

## Next steps I can help with

- Replace mocked helpers with real backend calls.
- Add TypeScript types or JSDoc for service functions.
- Add environment switching for `baseURL` (env files + Vite config).

---

Updated documentation for the frontend structure and mapping to backend endpoints.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
