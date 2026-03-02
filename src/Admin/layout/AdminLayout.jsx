import { useState } from "react";
import { Outlet, Navigate, useLocation } from "react-router";
import Sidebar from "../Componants/layout/Sidebar";
import Header from "../componants/layout/Header";

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Redirect to /admin/overview if the current path is exactly /admin
  if (location.pathname === "/admin") {
    return <Navigate to="/admin/overview" />;
  }

  return (
    <div className="flex h-screen w-full bg-[#0a1024] text-gray-100">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex flex-1 flex-col overflow-hidden ">
        <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main className="flex-1 overflow-y-auto  p-4 md:p-6 text-white relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
