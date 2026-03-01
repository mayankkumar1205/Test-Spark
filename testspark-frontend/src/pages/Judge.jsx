import { useState } from "react";
import { judgeResponse } from "../services/evalService";
import JudgeRadarChart from "../components/JudgeRadarChart";

export default function Judge() {
  const [testCase, setTestCase] = useState(
    "Explain the concept of machine learning"
  );
  const [modelOutput, setModelOutput] = useState(
    "Machine learning is a subset of AI where systems learn from data."
  );
  const [adapter, setAdapter] = useState("base");

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleJudge(e) {
    e.preventDefault();
    setLoading(true);

    const response = await judgeResponse({
      testCase,
      modelOutput,
      adapter,
    });

    setResult(response.data);
    setLoading(false);
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">LLM Judge Evaluation</h1>

      {/* FORM */}
      <form onSubmit={handleJudge} className="space-y-4">

        <div>
          <label className="block mb-1 font-medium">Test Case</label>
          <textarea
            value={testCase}
            onChange={(e) => setTestCase(e.target.value)}
            rows={2}
            className="w-full p-3 border rounded-lg dark:bg-gray-800"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Model Output</label>
          <textarea
            value={modelOutput}
            onChange={(e) => setModelOutput(e.target.value)}
            rows={3}
            className="w-full p-3 border rounded-lg dark:bg-gray-800"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Judge Adapter</label>
          <select
            value={adapter}
            onChange={(e) => setAdapter(e.target.value)}
            className="w-full p-2 border rounded-lg dark:bg-gray-800"
          >
            <option value="base">Base</option>
            <option value="math">Math</option>
            <option value="msur">MSUR</option>
          </select>
        </div>

        <button
          type="submit"
          className="px-6 py-2 rounded-lg bg-primary text-white"
        >
          {loading ? "Judging..." : "Run Judge"}
        </button>
      </form>

      {/* RESULT CARD */}
      {result && (
        <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow space-y-8">

          {/* Header + PASS FAIL */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Judgement Result</h2>

            <span
              className={`px-4 py-1 rounded-full text-sm ${
                result.passed
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {result.passed ? "PASS" : "FAIL"}
            </span>
          </div>

          {/* SCORE PROGRESS BAR */}
          <div className="space-y-3">
            <p className="text-lg font-semibold">
              Overall Score: {result.score} / 10
            </p>

            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
              <div
                className="bg-primary h-4 rounded-full transition-all"
                style={{ width: `${(result.score / 10) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* RADAR CHART */}
          <div>
            <h3 className="font-semibold mb-4">
              Criteria Visualization
            </h3>

            <JudgeRadarChart criteria={result.criteria} />
          </div>

          {/* CRITERIA CARDS */}
          <div>
            <h3 className="font-semibold mb-4">
              Criteria Breakdown
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {Object.entries(result.criteria).map(
                ([key, value]) => (
                  <div
                    key={key}
                    className="p-4 border rounded-lg dark:border-gray-700"
                  >
                    <p className="capitalize text-gray-500">
                      {key}
                    </p>
                    <p className="font-bold text-lg">
                      {value} / 10
                    </p>
                  </div>
                )
              )}
            </div>
          </div>

          {/* REASONING */}
          <div>
            <h3 className="font-semibold mb-2">
              Judge Reasoning
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {result.reasoning}
            </p>
          </div>

          {/* FEEDBACK */}
          <div>
            <h3 className="font-semibold mb-2">
              Feedback
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {result.feedback}
            </p>
          </div>

        </div>
      )}
    </div>
  );
}