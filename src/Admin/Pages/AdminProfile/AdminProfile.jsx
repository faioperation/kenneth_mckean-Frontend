import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function AdminProfile({ onClose }) {
  return (
  <div>
      <div className="bg-[#11141b] border border-[#1e232b] p-1 rounded-4xl flex max-w-2xl mx-8 text-center justify-between">
      <NavLink
        to="."
        end
        className={({ isActive }) =>
          `flex items-center gap-3 rounded-4xl px-6 lg:px-29 py-3 text-sm font-medium transition-colors ${
            isActive
              ? "bg-[#4D81F5] text-white border-l-2 border-[#51A2FF]"
              : "text-gray-400 hover:bg-[#1f2d5c] hover:text-white"
          }`
        }
        onClick={() => window.innerWidth < 768 && onClose?.()}
      >
        Profile
      </NavLink>

      <NavLink
        to="editprofile"
        className={({ isActive }) =>
          `flex items-center gap-3 rounded-4xl px-12 lg:px-40 py-3 text-sm font-medium transition-colors  ${
            isActive
              ? "bg-[#4D81F5] text-white border-l-2 border-[#51A2FF]"
              : "text-gray-400 hover:bg-[#1f2d5c] hover:text-white"
          }`
        }
        onClick={() => window.innerWidth < 768 && onClose?.()}
      >
        Edit Profile
      </NavLink>
    </div>
   <div className="lg:mx-8 my-6">
     <Outlet></Outlet>
   </div>
  </div>
  );
}
