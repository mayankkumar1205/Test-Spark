import { useEffect, useState } from "react";
import { compareModels } from "../services/evalService";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

export default function Compare() {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await compareModels();
      setModels(response.data);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) return <p>Loading comparison...</p>;

  const categories = Object.keys(models[0].categories);

  const radarData = categories.map((cat) => {
    const entry = { category: cat };
    models.forEach((model) => {
      entry[model.name] = model.categories[cat];
    });
    return entry;
  });

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Model Comparison</h1>

      {/* Accuracy Bar Chart */}
      <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow">
        <h2 className="font-semibold mb-4">
          Overall Accuracy Comparison
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={models}>
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Bar dataKey="accuracy" fill="#6366F1" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Radar Chart */}
      <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow">
        <h2 className="font-semibold mb-4">
          Category Comparison (Radar)
        </h2>

        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="category" />
            <PolarRadiusAxis domain={[0, 100]} />

            {models.map((model, index) => (
              <Radar
                key={model.name}
                name={model.name}
                dataKey={model.name}
                stroke={["#6366F1", "#22c55e", "#f97316"][index]}
                fill={["#6366F1", "#22c55e", "#f97316"][index]}
                fillOpacity={0.4}
              />
            ))}

            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}