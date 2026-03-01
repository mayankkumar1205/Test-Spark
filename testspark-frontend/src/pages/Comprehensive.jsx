import { useState } from "react";
import { comprehensiveTest } from "../services/evalService";

export default function Comprehensive() {
  const [modelName, setModelName] = useState("gpt-4");
  const [includeGenerated, setIncludeGenerated] = useState(true);
  const [benchmarks, setBenchmarks] = useState({
    aime: true,
    mmlu: true,
    msur: false,
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  function toggleBenchmark(type) {
    setBenchmarks({ ...benchmarks, [type]: !benchmarks[type] });
  }

  async function handleRun(e) {
    e.preventDefault();
    setLoading(true);

    const selectedBenchmarks = Object.keys(benchmarks).filter(
      (b) => benchmarks[b]
    );

    const response = await comprehensiveTest({
      modelName,
      includeGenerated,
      includeBenchmarks: selectedBenchmarks,
    });

    setResult(response.data);
    setLoading(false);
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">
        Comprehensive Model Test
      </h1>

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

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={includeGenerated}
            onChange={() =>
              setIncludeGenerated(!includeGenerated)
            }
          />
          <label>Include Generated Tests</label>
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Include Benchmarks
          </label>

          <div className="flex gap-6">
            {Object.keys(benchmarks).map((b) => (
              <label key={b} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={benchmarks[b]}
                  onChange={() => toggleBenchmark(b)}
                />
                {b.toUpperCase()}
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-2 rounded-lg bg-primary text-white"
        >
          {loading ? "Running..." : "Run Comprehensive Test"}
        </button>
      </form>

      {result && (
        <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow space-y-6">
          <h2 className="text-xl font-bold">
            Overall Accuracy: {result.overallAccuracy}%
          </h2>

          <div>
            <h3 className="font-semibold">
              Generated Tests
            </h3>
            <p>
              {result.generatedTests.passed} /{" "}
              {result.generatedTests.total} passed
            </p>
          </div>

          <div>
            <h3 className="font-semibold">
              Benchmark Scores
            </h3>
            <ul className="list-disc pl-6">
              {Object.entries(result.benchmarks).map(
                ([key, value]) => (
                  <li key={key}>
                    {key.toUpperCase()} — {value}%
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}