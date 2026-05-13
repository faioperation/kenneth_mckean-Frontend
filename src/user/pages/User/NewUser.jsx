import { useState } from "react";
import { Outlet, Navigate, useLocation } from "react-router";
import Sidebar from "./UserPages/layout/Sidebar";
import Header from "./UserPages/layout/Header";

export default function NewUser() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  if (location.pathname === "/user") {
    return <Navigate to="/user/newtask" />;
  }

  return (
    <div className="h-screen w-full bg-[#F8F8F7] text-gray-100 overflow-hidden">
      <div className="flex h-full overflow-hidden">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <div className="flex flex-1 flex-col h-full overflow-hidden">
          <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

          <main className="flex-1 overflow-y-auto px-4 md:px-6 text-white relative ">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
