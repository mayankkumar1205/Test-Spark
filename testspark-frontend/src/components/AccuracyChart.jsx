import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function AccuracyChart({ passed, failed }) {
  const data = [
    { name: "Passed", value: passed },
    { name: "Failed", value: failed },
  ];

  const COLORS = ["#22c55e", "#ef4444"];

  return (
    <div className="flex justify-center">
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          dataKey="value"
          outerRadius={100}
          label
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}