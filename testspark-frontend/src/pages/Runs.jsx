import { useEffect, useState } from "react";
import {
  getEvaluationRuns,
  createRun,
  deleteRun,
} from "../services/evalService";
import { useNavigate } from "react-router-dom";

export default function Runs() {
  const [runs, setRuns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [newRunName, setNewRunName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchRuns() {
      const response = await getEvaluationRuns();
      setRuns(response.data.runs);
      setLoading(false);
    }
    fetchRuns();
  }, []);

  async function handleCreate() {
    const response = await createRun({ runName: newRunName });
    setRuns([...runs, response.data]);
    setShowCreate(false);
    setNewRunName("");
  }

  async function handleDelete(id) {
    await deleteRun(id);
    setRuns(runs.filter((r) => r._id !== id));
  }

  if (loading) return <p>Loading runs...</p>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Evaluation Runs</h1>

        <button
          onClick={() => setShowCreate(true)}
          className="px-4 py-2 bg-primary text-white rounded-lg"
        >
          Create Run
        </button>
      </div>

      {showCreate && (
        <div className="p-4 bg-white dark:bg-gray-800 shadow rounded-lg">
          <input
            placeholder="Run Name"
            value={newRunName}
            onChange={(e) => setNewRunName(e.target.value)}
            className="w-full p-2 border rounded-lg mb-3 dark:bg-gray-700"
          />
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-green-500 text-white rounded-lg"
          >
            Save
          </button>
        </div>
      )}

      <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b dark:border-gray-700">
              <th className="py-2">Run Name</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {runs.map((run) => (
              <tr key={run._id} className="border-b dark:border-gray-700">
                <td className="py-2">{run.runName}</td>
                <td>{run.status}</td>
                <td className="space-x-3">
                  <button
                    onClick={() => navigate(`/runs/${run._id}`)}
                    className="text-blue-500"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDelete(run._id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}