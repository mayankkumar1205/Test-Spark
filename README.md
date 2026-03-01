🚀 TESTSPARK – LLM Evaluation Platform (Frontend)

A modern SaaS-style React dashboard for comprehensive LLM evaluation, benchmarking, adversarial test case generation, and judge analytics.

Built for AI for Bharat Hackathon.

🌐 Live Demo

Frontend URL: https://shiny-cannoli-0ca8e6.netlify.app/
Backend URL: https://testspark-api.onrender.com/api/eval/custom

🧠 Overview

TESTSPARK is a full-stack LLM evaluation engine that allows:

Custom dataset evaluation

Standard benchmark testing (AIME, MMLU, MSUR)

Adversarial test case generation

LLM-as-a-Judge scoring

Evaluation run lifecycle management

Analytics & visualization dashboard

This repository contains the React frontend (Pure JavaScript + Tailwind CSS).

🏗️ Tech Stack
Layer	Tech
Framework	React (Vite)
Styling	Tailwind CSS
Charts	Recharts
Icons	Lucide React
Routing	React Router
Deployment	Vercel
Backend	Node.js + Express (separate repo)
Database	MongoDB Atlas
📁 Folder Structure
src/
│
├── components/
│   ├── AccuracyCharts.jsx
│   ├── BenchmarkBarChart.jsx
|   └── BenchmarkRadarChart.jsx
|   └── JudgeRadarChart.jsx
|
├── layout/
│   ├── Sidebar.jsx
│   ├── Navbar.jsx
|   └── DashboardLayout.jsx
│
├── context/
│   └── ThemeContext.jsx
│
├── pages/
│   ├── Dashboard.jsx
│   ├── CustomEvaluation.jsx
│   ├── Benchmark.jsx
│   ├── Comprehensive.jsx
│   ├── Runs.jsx
│   ├── RunDetails.jsx
│   ├── RunResults.jsx
│   ├── Generator.jsx
│   ├── Testcases.jsx
│   ├── TestcaseJudgements.jsx
│   ├── Judge.jsx
│   ├── JudgementStats.jsx
│   ├── JudgementDetail.jsx
│   ├── About.jsx
│
├── services/
    |-- api.js
│   └── evalService.js
│
├── App.jsx
├── main.jsx
└── index.css
⚙️ Setup Instructions
1️⃣ Clone the Repository
git clone https://github.com/your-username/testspark-frontend.git
cd testspark-frontend
2️⃣ Install Dependencies
npm install
3️⃣ Environment Variables

Create .env file:

VITE_API_URL=https://your-backend.onrender.com
4️⃣ Run Locally
npm run dev

App runs on:

http://localhost:5173
🔌 Backend API Coverage

This frontend covers 100% of backend endpoints.

🧪 Evaluation Endpoints
1️⃣ Custom Dataset Evaluation
POST /api/eval/custom-dataset

Supports:

exact_match

contains

llm_judge

UI Features:

Dataset input (JSON)

Model provider selection

Accuracy analytics

Result breakdown table

Pie chart visualization

2️⃣ Benchmark Testing
POST /api/eval/test-benchmark

Supports:

AIME

MMLU

MSUR

UI Features:

Overall accuracy

Category breakdown

Radar chart

Bar chart analytics

3️⃣ Comprehensive Model Test
POST /api/eval/comprehensive-test

UI:

Toggle generated tests

Multi-benchmark selection

Combined analytics

🔁 Evaluation Run Management
Create Run
POST /api/eval/runs
Start Run
POST /api/eval/runs/:evalRunId/start
List Runs
GET /api/eval/runs
Get Run Details
GET /api/eval/runs/:evalRunId
Run Results
GET /api/eval/runs/:evalRunId/results
Benchmark Stats
GET /api/eval/runs/:evalRunId/benchmark-stats
Delete Run
DELETE /api/eval/runs/:evalRunId

UI Features:

Run lifecycle

Progress bar

Status badges

Pie charts

Results table

🔨 Test Case Generator
Generate Variants
POST /api/generator/generate

Types:

ambiguity

contradiction

negation

UI:

Parent prompt ID input

Variant selection

Generated list display

🗂 Test Case CRUD
Create Testcase
POST /api/generator/testcases
Bulk Upload
POST /api/generator/testcases/bulk
Get All Testcases
GET /api/generator/testcases
Update Testcase
PATCH /api/generator/testcases/:testCaseId
Delete Testcase
DELETE /api/generator/testcases/:testCaseId
Filter Support

Query params:

generatedBy

generationType

parentPromptId

UI Features:

Create

Edit

Delete

Bulk JSON upload

Dropdown filtering

Per-testcase judgement history

⚖️ Judge System
Manual Judge
POST /api/judge/judge

UI:

Score display

Criteria breakdown

Radar visualization

Retrieve Judgements
GET /api/judge/judgements/:judgementId
GET /api/judge/evalrun/:evalRunId/judgements
GET /api/judge/evalrun/:evalRunId/stats
GET /api/judge/testcase/:testCaseId/judgements

UI:

Score distribution chart

Average criteria bar chart

Pass rate metrics

Individual judgement detail page

📊 Dashboard Features

Dark / Light mode

Recharts visualizations

Responsive layout

SaaS-style UI

Clean sidebar navigation

Loading states

Error handling

Disabled button states

Empty states

🎨 UI Enhancements

Dark mode optimized contrast

Status badges

Margin-balanced layout

Adaptive chart colors

Styled tooltips

Professional spacing

🚀 Deployment
Backend

Deployed on Render

Frontend

Deployed on Vercel

Environment variable required:

VITE_API_URL
🏆 Hackathon Submission Notes

This project was built as:

A full-stack LLM Evaluation Engine

Designed for scalable AI model testing

Supports adversarial evaluation

Uses LLM-as-a-Judge methodology

Provides benchmark comparisons

📌 Future Improvements

Authentication system

Real-time run updates (WebSockets)

Result export (CSV/PDF)

Model comparison mode

Usage quotas & rate limiting

📜 License

MIT License

🤝 Contributors

Mayank Kumar
AI for Bharat Hackathon Submission

💡 Final Note

This frontend achieves complete API coverage of the TESTSPARK backend and demonstrates a production-grade AI evaluation dashboard architecture.
