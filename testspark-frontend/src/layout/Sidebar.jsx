import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const linkStyle =
    "block px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800";

  return (
    <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-5">
      <h1 className="text-xl font-bold mb-8 text-primary">
        TESTSPARK
      </h1>

      <nav className="space-y-2">
        <NavLink to="/" className={linkStyle}>
          Dashboard
        </NavLink>
        <NavLink to="/evaluation/custom" className={linkStyle}>
  Custom Evaluation
</NavLink>
<NavLink to="/evaluation/benchmark" className={linkStyle}>
  Benchmark Evaluation
</NavLink>
<NavLink to="/runs" className={linkStyle}>
  Evaluation Runs
</NavLink>
<NavLink to="/generator" className={linkStyle}>
  Test Case Generator
</NavLink>
<NavLink to="/judge" className={linkStyle}>
  LLM Judge
</NavLink>
<NavLink to="/compare" className={linkStyle}>
  Model Comparison
</NavLink>
<NavLink to="/evaluation/comprehensive" className={linkStyle}>
  Comprehensive Test
</NavLink>
<NavLink to="/testcases" className={linkStyle}>
  Test Case Manager
</NavLink>
      </nav>
      
    </aside>
  );
}