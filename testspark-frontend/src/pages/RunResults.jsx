import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRunResults } from "../services/evalService";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function RunResults() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await getRunResults(id);
      setData(res.data);
    }
    fetchData();
  }, [id]);

  if (!data) return <p>Loading results...</p>;

  const pieData = [
    { name: "Passed", value: data.summary.passed },
    { name: "Failed", value: data.summary.failed },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">
        Run Results
      </h1>

      <div className="p-6 bg-white dark:bg-gray-800 shadow rounded-xl">
        <h2 className="font-semibold mb-4">
          Accuracy: {data.summary.accuracy}%
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              outerRadius={100}
              fill="#6366F1"
            >
              <Cell fill="#22c55e" />
              <Cell fill="#ef4444" />
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="p-6 bg-white dark:bg-gray-800 shadow rounded-xl">
        <h2 className="font-semibold mb-4">
          Detailed Results
        </h2>

        <table className="w-full text-left">
          <thead>
            <tr className="border-b dark:border-gray-700">
              <th>Input</th>
              <th>Expected</th>
              <th>Output</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.results.map((r, i) => (
              <tr key={i} className="border-b dark:border-gray-700">
                <td>{r.input}</td>
                <td>{r.expected}</td>
                <td>{r.modelOutput}</td>
                <td>
                  {r.passed ? "PASS" : "FAIL"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}