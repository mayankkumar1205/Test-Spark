import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="h-16 px-6 flex items-center justify-between border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <h2 className="font-semibold">LLM Evaluation Platform</h2>

      <button
        onClick={toggleTheme}
        className="px-4 py-2 rounded-lg bg-primary text-white"
      >
        {theme === "dark" ? "Light Mode" : "Dark Mode"}
      </button>
    </header>
  );
}