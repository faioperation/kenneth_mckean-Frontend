import React from "react";
import { NavLink } from "react-router-dom";

export default function Nav({ onClose }) {
  return (
    <div className="bg-[#11141b] border border-[#1e232b] p-1 rounded-4xl flex max-w-2xl mx-8 text-center justify-between">
      <NavLink
        to="."
        end
        className={({ isActive }) =>
          `flex items-center gap-3 rounded-4xl px-6 lg:px-23 py-3 text-sm font-medium transition-colors ${
            isActive
              ? "bg-[#4D81F5] text-white border-l-2 border-[#51A2FF]"
              : "text-gray-400 hover:bg-[#1f2d5c] hover:text-white"
          }`
        }
        onClick={() => window.innerWidth < 768 && onClose?.()}
      >
      API Configuration
      </NavLink>

      <NavLink
        to="key"
        className={({ isActive }) =>
          `flex items-center gap-3 rounded-4xl px-8 lg:px-28 py-3 text-sm font-medium transition-colors  ${
            isActive
              ? "bg-[#4D81F5] text-white border-l-2 border-[#51A2FF]"
              : "text-gray-400 hover:bg-[#1f2d5c] hover:text-white"
          }`
        }
        onClick={() => window.innerWidth < 768 && onClose?.()}
      >
        API Key Management
      </NavLink>
    </div>
  );
}