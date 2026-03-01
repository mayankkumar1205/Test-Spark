import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getRunById, startRun } from "../services/evalService";

export default function RunDetails() {
  const { id } = useParams();
  const [run, setRun] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRun() {
      const response = await getRunById(id);
      setRun(response.data);
      setLoading(false);
    }

    fetchRun();
  }, [id]);

  async function handleStart() {
    await startRun(id);
    alert("Run started (mock)");
  }

  if (loading) return <p>Loading run details...</p>;

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">
        {run.runName}
      </h1>

      {/* Status + Progress */}
      <div className="p-6 bg-white dark:bg-gray-800 shadow rounded-xl space-y-4">

        <div className="flex justify-between items-center">
          <p className="font-medium">
            Status: {run.status}
          </p>

          <button
            onClick={handleStart}
            className="px-4 py-2 bg-primary text-white rounded-lg"
          >
            Start Run
          </button>
        </div>

        {/* Progress Bar */}
        <div>
          <p className="mb-2">
            Progress: {run.progress.completed} /{" "}
            {run.progress.total}
          </p>

          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
            <div
              className="bg-primary h-4 rounded-full transition-all"
              style={{
                width: `${
                  (run.progress.completed /
                    run.progress.total) *
                  100
                }%`,
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Benchmark Stats */}
      <div className="p-6 bg-white dark:bg-gray-800 shadow rounded-xl">
        <h2 className="font-semibold mb-4">
          Benchmark Stats
        </h2>

        <ul className="space-y-2">
          {Object.entries(run.benchmarkStats).map(
            ([key, value]) => (
              <li
                key={key}
                className="flex justify-between border-b pb-2 dark:border-gray-700"
              >
                <span>{key.toUpperCase()}</span>
                <span>{value}%</span>
              </li>
            )
          )}
        </ul>
      </div>

      {/* Judgement Analytics Link */}
      <div>
        <Link
          to={`/runs/${id}/judgements`}
          className="text-blue-500 hover:underline"
        >
          View Judgement Analytics →
        </Link>
      </div>

      <Link
  to={`/runs/${id}/results`}
  className="text-blue-500 hover:underline ml-6"
>
  View Run Results →
</Link>

    </div>
  );
}