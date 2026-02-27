import { useState } from "react";
import { Outlet, Navigate, useLocation } from "react-router";
import Sidebar from "./UserPages/layout/Sidebar";
import Header from "./UserPages/layout/Header";



export default function NewUser() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Redirect to /admin/overview if the current path is exactly /admin
  if (location.pathname === "/user") {
    return <Navigate to="/user/newtask" />;
  }

  return (
    <div className="flex h-screen w-full bg-[#F8F8F7] text-gray-100">
      <Sidebar> className="bg-white" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} </Sidebar>
      <div className="flex flex-1 flex-col overflow-hidden ">
        <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main className="flex-1 overflow-y-auto  p-4 md:p-6 text-white relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
