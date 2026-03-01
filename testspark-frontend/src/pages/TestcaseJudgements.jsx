import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTestcaseJudgements } from "../services/evalService";

export default function TestcaseJudgements() {
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await getTestcaseJudgements(id);
      setData(res.data);
    }
    fetchData();
  }, [id]);

  return (
    <div className="p-6 bg-white dark:bg-gray-800 shadow rounded-xl">
      <h1 className="text-xl font-bold">
        Testcase Judgements
      </h1>

      <ul>
        {data.map((j) => (
          <li key={j.id}>
            {j.id} — {j.score} —{" "}
            {j.passed ? "PASS" : "FAIL"}
          </li>
        ))}
      </ul>
    </div>
  );
}