import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getJudgementStats } from "../services/evalService";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function JudgementStats() {
  const { id } = useParams();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await getJudgementStats(id);
      setStats(res.data);
    }
    fetchData();
  }, [id]);

  if (!stats) return <p>Loading stats...</p>;

  const distributionData = Object.entries(
    stats.scoreDistribution
  ).map(([range, value]) => ({
    range,
    count: value,
  }));

  const criteriaData = Object.entries(
    stats.averageCriteria
  ).map(([key, value]) => ({
    name: key,
    value,
  }));

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">
        Judgement Analytics
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-6">
        <div className="p-6 bg-white dark:bg-gray-800 shadow rounded-xl">
          <h3>Total</h3>
          <p className="text-2xl font-bold">
            {stats.totalJudgements}
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 shadow rounded-xl">
          <h3>Pass Rate</h3>
          <p className="text-2xl font-bold text-green-500">
            {stats.passRate}%
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 shadow rounded-xl">
          <h3>Average Score</h3>
          <p className="text-2xl font-bold">
            {stats.averageScore}
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 shadow rounded-xl">
          <h3>Failed</h3>
          <p className="text-2xl font-bold text-red-500">
            {stats.failed}
          </p>
        </div>
      </div>

      {/* Score Distribution */}
      <div className="p-6 bg-white dark:bg-gray-800 shadow rounded-xl">
        <h2 className="font-semibold mb-4">
          Score Distribution
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={distributionData}>
            <XAxis dataKey="range" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#6366F1" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Average Criteria */}
      <div className="p-6 bg-white dark:bg-gray-800 shadow rounded-xl">
        <h2 className="font-semibold mb-4">
          Average Criteria Scores
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={criteriaData}>
            <XAxis dataKey="name" />
            <YAxis domain={[0, 10]} />
            <Tooltip />
            <Bar dataKey="value" fill="#22c55e" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Judgement List */}
      <div className="p-6 bg-white dark:bg-gray-800 shadow rounded-xl">
        <h2 className="font-semibold mb-4">
          Individual Judgements
        </h2>

        <ul className="space-y-2">
          {stats.judgements.map((j) => (
            <li
              key={j.id}
              className="flex justify-between border-b pb-2 dark:border-gray-700"
            >
              <span>ID: {j.id}</span>
              <span>
                Score: {j.score} |{" "}
                {j.passed ? "PASS" : "FAIL"}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}