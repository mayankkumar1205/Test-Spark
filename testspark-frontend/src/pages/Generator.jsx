import { useState } from "react";
import { generateVariants } from "../services/evalService";

export default function Generator() {
  const [parentPrompt, setParentPrompt] = useState(
    "What is the capital of France?"
  );
  const [types, setTypes] = useState({
    ambiguity: true,
    contradiction: true,
    negation: true,
  });

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  function toggleType(type) {
    setTypes({ ...types, [type]: !types[type] });
  }

  async function handleGenerate(e) {
    e.preventDefault();
    setLoading(true);

    const selectedTypes = Object.keys(types).filter(
      (type) => types[type]
    );

    const response = await generateVariants({
      parentPrompt,
      types: selectedTypes,
    });

    setResults(response.data);
    setLoading(false);
  }

  return (
    <div className="space-y-8">

      <h1 className="text-2xl font-bold">
        Adversarial Test Case Generator
      </h1>

      <form onSubmit={handleGenerate} className="space-y-4">

        <div>
          <label className="block mb-1">Parent Prompt</label>
          <textarea
            value={parentPrompt}
            onChange={(e) => setParentPrompt(e.target.value)}
            rows={3}
            className="w-full p-3 border rounded-lg dark:bg-gray-800"
          />
        </div>

        <div>
          <label className="block mb-2">
            Generation Types
          </label>

          <div className="flex gap-6">
            {Object.keys(types).map((type) => (
              <label key={type} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={types[type]}
                  onChange={() => toggleType(type)}
                />
                {type}
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-2 rounded-lg bg-primary text-white"
        >
          {loading ? "Generating..." : "Generate Variants"}
        </button>

      </form>

      {/* Results */}
      {results.length > 0 && (
        <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow">
          <h2 className="text-xl font-bold mb-4">
            Generated Variants
          </h2>

          <div className="space-y-4">
            {results.map((item) => (
              <div
                key={item._id}
                className="p-4 border rounded-lg dark:border-gray-700"
              >
                <p className="font-medium">
                  {item.prompt}
                </p>
                <span className="text-sm text-gray-500">
                  Type: {item.generationType}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}