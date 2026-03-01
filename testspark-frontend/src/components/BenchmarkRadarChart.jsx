import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

export default function BenchmarkRadarChart({ categories }) {
  const data = Object.entries(categories).map(([key, value]) => ({
    subject: key.replace("_", " "),
    accuracy: value.accuracy,
    fullMark: 100,
  }));

  return (
    <div className="w-full h-80">
      <ResponsiveContainer>
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis domain={[0, 100]} />
          <Radar
            dataKey="accuracy"
            stroke="#6366F1"
            fill="#6366F1"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}