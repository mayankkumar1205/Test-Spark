import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function BenchmarkBarChart({ categories }) {
  const data = Object.entries(categories).map(([key, value]) => ({
    name: key.replace("_", " "),
    accuracy: value.accuracy,
  }));

  return (
    <div className="w-full h-80">
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Bar dataKey="accuracy" fill="#6366F1" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}