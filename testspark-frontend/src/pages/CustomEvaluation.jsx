import { useState } from "react";
import { evaluateCustomDataset } from "../services/evalService";
import AccuracyChart from "../components/AccuracyChart";

export default function CustomEvaluation() {
  const [modelName, setModelName] = useState("Qwen/Qwen2.5-0.5B-Instruct");
  const [provider, setProvider] = useState("hf-user-model");
  const [evaluationType, setEvaluationType] = useState("exact_match");
  const [datasetText, setDatasetText] = useState(
    JSON.stringify(
      [
        { input: "What is 2+2?", expected: "4" },
        { input: "Capital of France?", expected: "Paris" },
      ],
      null,
      2
    )
  );

  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = {
        modelName,
        provider,
        evaluationType,
        dataset: JSON.parse(datasetText),
      };

      const response = await evaluateCustomDataset(payload);

      if (!response.success) {
        throw new Error(response.message || "Evaluation failed");
      }

      setResults(response.data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Custom Dataset Evaluation</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block mb-1">Model Name</label>
          <input
            value={modelName}
            onChange={(e) => setModelName(e.target.value)}
            className="w-full p-2 border rounded-lg dark:bg-gray-800"
          />
        </div>

        <div>
          <label className="block mb-1">Provider</label>
          <select
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
            className="w-full p-2 border rounded-lg dark:bg-gray-800"
          >
            <option value="hf-user-model">HuggingFace (Free)</option>
            <option value="openai">OpenAI</option>
            <option value="anthropic">Anthropic</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Evaluation Type</label>
          <select
            value={evaluationType}
            onChange={(e) => setEvaluationType(e.target.value)}
            className="w-full p-2 border rounded-lg dark:bg-gray-800"
          >
            <option value="exact_match">Exact Match</option>
            <option value="contains">Contains</option>
            <option value="llm_judge">LLM Judge</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Dataset (JSON)</label>
          <textarea
            value={datasetText}
            onChange={(e) => setDatasetText(e.target.value)}
            rows={8}
            className="w-full p-2 border rounded-lg dark:bg-gray-800 font-mono"
          />
        </div>

        <button
          type="submit"
          className="px-6 py-2 rounded-lg bg-primary text-white"
          disabled={loading}
        >
          {loading ? "Evaluating..." : "Run Evaluation"}
        </button>

        {error && (
          <div className="text-red-500 mt-2">
            {error}
          </div>
        )}
      </form>

      {results && (
  <div className="mt-10 space-y-8">

    {/* Summary Cards */}
    <div className="grid grid-cols-3 gap-6">
      <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow">
        <h3 className="text-gray-500">Total</h3>
        <p className="text-2xl font-bold mt-2">
          {results.summary.total}
        </p>
      </div>

      <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow">
        <h3 className="text-gray-500">Passed</h3>
        <p className="text-2xl font-bold mt-2 text-green-500">
          {results.summary.passed}
        </p>
      </div>

      <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow">
        <h3 className="text-gray-500">Accuracy</h3>
        <p className="text-2xl font-bold mt-2 text-primary">
          {results.summary.accuracy}%
        </p>
      </div>
    </div>

    {/* Accuracy Chart */}
    <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow">
      <h2 className="text-xl font-bold mb-4">
        Accuracy Breakdown
      </h2>

      <AccuracyChart
        passed={results.summary.passed}
        failed={results.summary.failed}
      />
    </div>

    {/* Results Table */}
    <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow">
      <h2 className="text-xl font-bold mb-4">
        Per-Question Results
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b dark:border-gray-700">
              <th className="py-2">Input</th>
              <th className="py-2">Expected</th>
              <th className="py-2">Model Output</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>

          <tbody>
            {results.results.map((item, index) => (
              <tr
                key={index}
                className="border-b dark:border-gray-700"
              >
                <td className="py-2">{item.input}</td>
                <td className="py-2">{item.expected}</td>
                <td className="py-2">{item.modelOutput}</td>
                <td className="py-2">
                  {item.passed ? (
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-600 text-sm">
                      PASS
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-sm">
                      FAIL
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  </div>
)}
    </div>
  );
}