import { useState } from "react";
import { testBenchmark } from "../services/evalService";
import BenchmarkRadarChart from "../components/BenchmarkRadarChart";
import BenchmarkBarChart from "../components/BenchmarkBarChart";

export default function Benchmark() {
  const [modelName, setModelName] = useState("gpt-4");
  const [benchmarkType, setBenchmarkType] = useState("aime");
  const [maxProblems, setMaxProblems] = useState(10);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleRun(e) {
    e.preventDefault();
    setLoading(true);

    const response = await testBenchmark({
      modelName,
      benchmarkType,
      maxProblems,
    });

    setResults(response.data);
    setLoading(false);
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Benchmark Evaluation</h1>

      {/* FORM */}
      <form onSubmit={handleRun} className="space-y-4">

        <div>
          <label className="block mb-1 font-medium">
            Model Name
          </label>
          <input
            value={modelName}
            onChange={(e) => setModelName(e.target.value)}
            className="w-full p-2 border rounded-lg dark:bg-gray-800"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Benchmark
          </label>
          <select
            value={benchmarkType}
            onChange={(e) => setBenchmarkType(e.target.value)}
            className="w-full p-2 border rounded-lg dark:bg-gray-800"
          >
            <option value="aime">AIME (Math)</option>
            <option value="mmlu">MMLU (Knowledge)</option>
            <option value="msur">MSUR (Proofs)</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Max Problems
          </label>
          <input
            type="number"
            value={maxProblems}
            onChange={(e) => setMaxProblems(e.target.value)}
            className="w-full p-2 border rounded-lg dark:bg-gray-800"
          />
        </div>

        <button
          type="submit"
          className="px-6 py-2 rounded-lg bg-primary text-white"
        >
          {loading ? "Running..." : "Run Benchmark"}
        </button>
      </form>

      {/* RESULTS SECTION */}
      {results && (
        <div className="space-y-8">

          {/* METRIC CARDS */}
          <div className="grid grid-cols-4 gap-6">
            <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow">
              <h3 className="text-gray-500">Total Problems</h3>
              <p className="text-2xl font-bold mt-2">
                {results.overall.total}
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow">
              <h3 className="text-gray-500">Passed</h3>
              <p className="text-2xl font-bold mt-2 text-green-500">
                {results.overall.passed}
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow">
              <h3 className="text-gray-500">Accuracy</h3>
              <p className="text-2xl font-bold mt-2 text-primary">
                {results.overall.accuracy}%
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow">
              <h3 className="text-gray-500">Avg Score</h3>
              <p className="text-2xl font-bold mt-2">
                {results.overall.averageScore}
              </p>
            </div>
          </div>

          {/* OVERALL ACCURACY PROGRESS BAR */}
          <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow">
            <h2 className="font-semibold mb-3">
              Overall Accuracy
            </h2>

            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
              <div
                className="bg-primary h-4 rounded-full transition-all"
                style={{
                  width: `${results.overall.accuracy}%`,
                }}
              ></div>
            </div>
          </div>

          {/* RADAR CHART */}
          <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow">
            <h2 className="font-semibold mb-4">
              Category Radar View
            </h2>

            <BenchmarkRadarChart
              categories={results.byCategory}
            />
          </div>

          {/* BAR CHART */}
          <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow">
            <h2 className="font-semibold mb-4">
              Category Comparison
            </h2>

            <BenchmarkBarChart
              categories={results.byCategory}
            />
          </div>

        </div>
      )}
    </div>
  );
}