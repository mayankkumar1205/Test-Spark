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
        <NavLink to="/dashboard" className={linkStyle}>
          Dashboard
        </NavLink>
        <NavLink to="/dashboard/evaluation/custom" className={linkStyle}>
  Custom Evaluation
</NavLink>
<NavLink to="/dashboard/evaluation/benchmark" className={linkStyle}>
  Benchmark Evaluation
</NavLink>
<NavLink to="/dashboard/runs" className={linkStyle}>
  Evaluation Runs
</NavLink>
<NavLink to="/dashboard/generator" className={linkStyle}>
  Test Case Generator
</NavLink>
<NavLink to="/dashboard/evaluation/comprehensive" className={linkStyle}>
  Comprehensive Test
</NavLink>
      </nav>
      
    </aside>
  );
}