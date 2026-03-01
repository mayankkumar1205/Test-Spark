import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getJudgementById } from "../services/evalService";

export default function JudgementDetail() {
  const { judgementId } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await getJudgementById(judgementId);
      setData(res.data);
    }
    fetchData();
  }, [judgementId]);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="p-6 bg-white dark:bg-gray-800 shadow rounded-xl">
      <h1 className="text-xl font-bold">
        Judgement Detail
      </h1>

      <p>Score: {data.score}</p>
      <p>Status: {data.passed ? "PASS" : "FAIL"}</p>
      <p>{data.reasoning}</p>
    </div>
  );
}