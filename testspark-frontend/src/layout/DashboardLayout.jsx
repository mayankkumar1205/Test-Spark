import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 p-6 pl-10 text-gray-700 dark:text-gray-200 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}