import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const [activeTab, setActiveTab] = useState("home");
  const [modelName, setModelName] = useState("");
  const [adaptor, setAdaptor] = useState("");
  const [models, setModels] = useState([]);
  const navigate = useNavigate();

  // Mock list of open source models with <3B parameters
  useEffect(() => {
    const openSourceModels = [
      { id: 1, name: "distilbert-base-uncased", size: "66M" },
      { id: 2, name: "albert-base-v2", size: "12M" },
      { id: 3, name: "microsoft/DistilBERT-base-uncased", size: "66M" },
      { id: 4, name: "roberta-base", size: "125M" },
      { id: 5, name: "gpt2", size: "124M" },
      { id: 6, name: "facebook/opt-125m", size: "125M" },
      { id: 7, name: "TinyLlama/TinyLlama-1.1B", size: "1.1B" },
      { id: 8, name: "microsoft/phi-2", size: "2.7B" },
      { id: 9, name: "teknium/OpenHermes-2.5-Mistral-7B", size: "7B" },
      { id: 10, name: "meta-llama/Llama-2-7b-hf", size: "7B" },
    ];
    setModels(openSourceModels);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!modelName.trim()) {
      alert("Please select a Model Name");
      return;
    }
    // Store the selected model and adaptor, navigate to dashboard
    localStorage.setItem(
      "selectedModel",
      JSON.stringify({ modelName, adaptor })
    );
    navigate("/dashboard");
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
              Welcome to TestSpark
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              TestSpark is an LLM evaluation platform that helps you test and
              benchmark your language models with ease. Select your model below
              to get started.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Our platform supports open-source models from Hugging Face and
              provides comprehensive evaluation metrics.
            </p>
          </div>
        );
      case "about":
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
              About TestSpark
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              TestSpark is designed to simplify the evaluation process for large
              language models. With an intuitive interface and powerful
              evaluation tools, you can:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
              <li>Run custom evaluations on your models</li>
              <li>Benchmark against standard datasets</li>
              <li>Generate test cases automatically</li>
              <li>Compare model performance</li>
              <li>Track and analyze evaluation results</li>
            </ul>
          </div>
        );
      case "services":
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
              Our Services
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              TestSpark provides a suite of services tailored for easy and
              comprehensive evaluation of language models:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
              <li>Custom evaluation pipelines for your datasets.</li>
              <li>Benchmarking tools with standard metrics and charts.</li>
              <li>Automated test case generation using heuristics.</li>
              <li>Real-time result tracking and comparison dashboards.</li>
              <li>Support for open-source Hugging Face models & adapters.</li>
            </ul>
          </div>
        );
      case "faqs":
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
              Frequently Asked Questions
            </h3>
            <div className="space-y-2 text-gray-600 dark:text-gray-300">
              <p>
                <strong>Q:</strong> How do I add my model to TestSpark? <br />
                <strong>A:</strong> Select your model from the drop-down on the
                landing page. You can also specify an adaptor if needed.
              </p>
              <p>
                <strong>Q:</strong> What models are supported? <br />
                <strong>A:</strong> Any open-source Hugging Face model with less
                than 3B parameters. We maintain a list that is updated
                regularly.
              </p>
              <p>
                <strong>Q:</strong> Can I use private models or adapters? <br />
                <strong>A:</strong> Currently only public Hugging Face models
                are supported. Adapter field is optional and can be left empty.
              </p>
              <p>
                <strong>Q:</strong> Where do the evaluation results go? <br />
                <strong>A:</strong> Results are stored in your account dashboard
                and can be downloaded as CSV.
              </p>
            </div>
          </div>
        );
      case "contact":
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
              Contact Us
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Have questions or feedback? We'd love to hear from you!
            </p>
            <div className="space-y-2 text-gray-600 dark:text-gray-300">
              <p>
                <strong>Email:</strong> support@testspark.com
              </p>
              <p>
                <strong>GitHub:</strong> github.com/testspark
              </p>
              <p>
                <strong>Documentation:</strong> docs.testspark.com
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Navbar */}
      <header className="bg-white dark:bg-gray-900 shadow">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
            TestSpark
          </h1>
          <nav className="flex space-x-6">
            <button
              onClick={() => setActiveTab("home")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === "home"
                  ? "bg-indigo-600 text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setActiveTab("about")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === "about"
                  ? "bg-indigo-600 text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              About
            </button>
            <button
              onClick={() => setActiveTab("services")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === "services"
                  ? "bg-indigo-600 text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              Services
            </button>
            <button
              onClick={() => setActiveTab("faqs")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === "faqs"
                  ? "bg-indigo-600 text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              FAQs
            </button>
            <button
              onClick={() => setActiveTab("contact")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === "contact"
                  ? "bg-indigo-600 text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              Contact Us
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Tab Content */}
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8">
            {renderTabContent()}
          </div>

          {/* Model Selection Form */}
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              Select Your Model
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Model Name Dropdown */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Model Name <span className="text-red-500">*</span>
                </label>
                <select
                  value={modelName}
                  onChange={(e) => setModelName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  required
                >
                  <option value="">-- Select a Model --</option>
                  {models.map((model) => (
                    <option key={model.id} value={model.name}>
                      {model.name} ({model.size})
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Open-source models with &lt;3B parameters from Hugging Face
                </p>
              </div>

              {/* Adaptor Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Adaptor <span className="text-gray-400">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={adaptor}
                  onChange={(e) => setAdaptor(e.target.value)}
                  placeholder="Enter adaptor name (e.g., LoRA)"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Leave blank if not using any adaptor
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition-colors duration-200"
              >
                Continue to Dashboard
              </button>
            </form>

            {/* Display Selected Model Info */}
            {modelName && (
              <div className="mt-6 p-4 bg-indigo-50 dark:bg-gray-800 border border-indigo-200 dark:border-indigo-600 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>Selected Model:</strong> {modelName}
                </p>
                {adaptor && (
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    <strong>Adaptor:</strong> {adaptor}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
