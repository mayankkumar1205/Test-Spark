import { useEffect, useState } from "react";
import {
  getTestcases,
  createTestcase,
  updateTestcase,
  deleteTestcase,
} from "../services/evalService";

export default function Testcases() {
  const [testcases, setTestcases] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  const [newPrompt, setNewPrompt] = useState("");
  const [newExpected, setNewExpected] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [bulkJson, setBulkJson] = useState("");
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    async function fetchData() {
      const res = await getTestcases();
      setTestcases(res.data);
      setFiltered(res.data);
      setLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (filterType === "all") {
      setFiltered(testcases);
    } else {
      setFiltered(
        testcases.filter(
          (tc) => tc.generationType === filterType
        )
      );
    }
  }, [filterType, testcases]);

  async function handleCreate() {
    if (!newPrompt || !newExpected) return;

    const res = await createTestcase({
      prompt: newPrompt,
      expectedOutput: newExpected,
      generationType: "manual",
    });

    setTestcases([...testcases, res.data]);
    setNewPrompt("");
    setNewExpected("");
  }

  async function handleUpdate(id) {
    await updateTestcase(id, {
      prompt: newPrompt,
      expectedOutput: newExpected,
    });

    setTestcases(
      testcases.map((tc) =>
        tc._id === id
          ? { ...tc, prompt: newPrompt, expectedOutput: newExpected }
          : tc
      )
    );

    setEditingId(null);
    setNewPrompt("");
    setNewExpected("");
  }

  async function handleDelete(id) {
    await deleteTestcase(id);
    setTestcases(testcases.filter((tc) => tc._id !== id));
  }

  async function handleBulkUpload() {
    try {
      const parsed = JSON.parse(bulkJson);

      if (!Array.isArray(parsed)) {
        alert("Bulk upload must be a JSON array.");
        return;
      }

      const created = [];

      for (let item of parsed) {
        const res = await createTestcase({
          prompt: item.prompt,
          expectedOutput: item.expectedOutput,
          generationType: "manual",
        });
        created.push(res.data);
      }

      setTestcases([...testcases, ...created]);
      setBulkJson("");
    } catch (error) {
      alert("Invalid JSON format.");
    }
  }

  if (loading) return <p>Loading testcases...</p>;

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">
        Test Case Manager
      </h1>

      {/* CREATE / EDIT FORM */}
      <div className="p-6 bg-white dark:bg-gray-800 shadow rounded-xl space-y-4">
        <h2 className="font-semibold">
          {editingId ? "Edit Testcase" : "Create Testcase"}
        </h2>

        <input
          placeholder="Prompt"
          value={newPrompt}
          onChange={(e) => setNewPrompt(e.target.value)}
          className="w-full p-2 border rounded-lg dark:bg-gray-700"
        />

        <input
          placeholder="Expected Output"
          value={newExpected}
          onChange={(e) => setNewExpected(e.target.value)}
          className="w-full p-2 border rounded-lg dark:bg-gray-700"
        />

        <button
          onClick={
            editingId
              ? () => handleUpdate(editingId)
              : handleCreate
          }
          className="px-4 py-2 bg-primary text-white rounded-lg"
        >
          {editingId ? "Update" : "Create"}
        </button>
      </div>

      {/* BULK UPLOAD */}
      <div className="p-6 bg-white dark:bg-gray-800 shadow rounded-xl space-y-4">
        <h2 className="font-semibold">
          Bulk Upload (JSON Array)
        </h2>

        <textarea
          rows={4}
          placeholder='[{"prompt":"What is AI?","expectedOutput":"Artificial Intelligence"}]'
          value={bulkJson}
          onChange={(e) => setBulkJson(e.target.value)}
          className="w-full p-2 border rounded-lg dark:bg-gray-700"
        />

        <button
          onClick={handleBulkUpload}
          className="px-4 py-2 bg-green-500 text-white rounded-lg"
        >
          Upload
        </button>
      </div>

      {/* TABLE + FILTER */}
      <div className="p-6 bg-white dark:bg-gray-800 shadow rounded-xl space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold">
            Testcases List
          </h2>

          <select
            value={filterType}
            onChange={(e) =>
              setFilterType(e.target.value)
            }
            className="p-2 border rounded-lg dark:bg-gray-700"
          >
            <option value="all">All</option>
            <option value="manual">Manual</option>
            <option value="negation">Negation</option>
            <option value="ambiguity">Ambiguity</option>
            <option value="contradiction">Contradiction</option>
          </select>
        </div>

        <table className="w-full text-left">
          <thead>
            <tr className="border-b dark:border-gray-700">
              <th>Prompt</th>
              <th>Expected</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((tc) => (
              <tr
                key={tc._id}
                className="border-b dark:border-gray-700"
              >
                <td className="py-2">{tc.prompt}</td>
                <td>{tc.expectedOutput}</td>
                <td>{tc.generationType}</td>
                <td className="space-x-3">
                  <button
                    onClick={() => {
                      setEditingId(tc._id);
                      setNewPrompt(tc.prompt);
                      setNewExpected(tc.expectedOutput);
                    }}
                    className="text-blue-500"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(tc._id)
                    }
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