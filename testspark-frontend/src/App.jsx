import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import CustomEvaluation from "./pages/CustomEvaluation";
import Benchmark from "./pages/Benchmark";
import Runs from "./pages/Runs";
import Generator from "./pages/Generator";
import Judge from "./pages/Judge";
import Compare from "./pages/Compare";
import Comprehensive from "./pages/Comprehensive";
import RunDetails from "./pages/RunDetails";
import Testcases from "./pages/Testcases";
import JudgementStats from "./pages/JudgementStats";
import RunResults from "./pages/RunResults";
import TestcaseJudgements from "./pages/TestcaseJudgements";
import JudgementDetail from "./pages/JudgementDetail";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="evaluation/custom" element={<CustomEvaluation />} />
          <Route path="evaluation/benchmark" element={<Benchmark />} />
          <Route path="runs" element={<Runs />} />
          <Route path="generator" element={<Generator />} />
          <Route path="judge" element={<Judge />} />
          <Route path="compare" element={<Compare />} />
          <Route path="evaluation/comprehensive" element={<Comprehensive />} />
          <Route path="runs/:id" element={<RunDetails />} />
          <Route path="testcases" element={<Testcases />} />
          <Route path="runs/:id/judgements" element={<JudgementStats />} />
          <Route path="runs/:id/results" element={<RunResults />} />
          <Route
  path="testcases/:id/judgements"
  element={<TestcaseJudgements />}
/>
          <Route
  path="judgements/:judgementId"
  element={<JudgementDetail />}
/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}