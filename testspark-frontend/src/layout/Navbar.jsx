import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <header className="h-16 px-6 flex items-center justify-between border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate("/")}
          className="text-lg font-semibold hover:text-primary transition-colors"
        >
          LLM Evaluation Platform
        </button>
      </div>

      <button
        onClick={toggleTheme}
        className="px-4 py-2 rounded-lg bg-primary text-white"
      >
        {theme === "dark" ? "Light Mode" : "Dark Mode"}
      </button>
    </header>
  );
}