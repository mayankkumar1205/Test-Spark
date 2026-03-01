import { useEffect, useState } from "react";
import { getDashboardStats } from "../services/evalService";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const response = await getDashboardStats();
      setStats(response.data);
      setLoading(false);
    }

    fetchStats();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div className="space-y-8">

      <h1 className="text-2xl font-bold">Dashboard Overview</h1>

      {/* Metrics Cards */}
      <div className="grid grid-cols-4 gap-6">

        <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow">
          <h3 className="text-gray-500">Total Runs</h3>
          <p className="text-2xl font-bold mt-2">
            {stats.totalRuns}
          </p>
        </div>

        <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow">
          <h3 className="text-gray-500">Completed</h3>
          <p className="text-2xl font-bold mt-2 text-green-500">
            {stats.completedRuns}
          </p>
        </div>

        <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow">
          <h3 className="text-gray-500">Active</h3>
          <p className="text-2xl font-bold mt-2 text-yellow-500">
            {stats.activeRuns}
          </p>
        </div>

        <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow">
          <h3 className="text-gray-500">Avg Accuracy</h3>
          <p className="text-2xl font-bold mt-2 text-primary">
            {stats.averageAccuracy}%
          </p>
        </div>

      </div>

      {/* Accuracy Trend */}
      <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow">
        <h2 className="text-xl font-bold mb-4">
          Accuracy Trend
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={stats.trend}>
           <XAxis 
  dataKey="name" 
  stroke="#94a3b8"   // light gray-blue for dark mode
/>
            <XAxis 
  dataKey="name" 
  stroke="#94a3b8"   // light gray-blue for dark mode
/>
           <Tooltip 
  contentStyle={{
    backgroundColor: "#1f2937",
    border: "none",
    color: "white"
  }}
/>
            <Line
              type="monotone"
              dataKey="accuracy"
              stroke="#6366F1"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}