import React from "react";
import { LuEyeOff } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { tokenStorage } from "../../../lib/tokenStorage";

export default function Profile() {
  const navigate = useNavigate();

  const handleLogout = () => {
    
    tokenStorage.clear();
    localStorage.removeItem("user");

    navigate("/admin/login");
  };

  return (
    <div className="bg-[#0b0e14] rounded-lg min-h-screen p-4 md:p-10 text-white">
      <div className="max-w-6xl bg-[#0b0e14]">

        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-4">
            <img
              src="https://i.ibb.co.com/VcWhsLp9/Ellipse-25.png"
              alt="Profile"
              className="h-20 w-20 rounded-full border-2 border-gray-700 object-cover"
            />
            <div>
              <h2 className="text-xl font-semibold">Alexa Rawles</h2>
              <p className="text-gray-500 text-sm">
                alexarawles@gmail.com
              </p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <form className="space-y-8">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Alexa Rawles"
                className="w-full bg-[#11141b] border border-[#1e232b] rounded-xl px-4 py-3 text-sm text-gray-400"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Rawles"
                className="w-full bg-[#11141b] border border-[#1e232b] rounded-xl px-4 py-3 text-sm text-gray-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Gender
              </label>
              <input
                type="text"
                placeholder="Man"
                className="w-full bg-[#11141b] border border-[#1e232b] rounded-xl px-4 py-3 text-sm text-gray-400"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Country
              </label>
              <input
                type="text"
                placeholder="USA"
                className="w-full bg-[#11141b] border border-[#1e232b] rounded-xl px-4 py-3 text-sm text-gray-400"
              />
            </div>
          </div>

          {/* Logout Button */}
          <div className="flex justify-end pt-10">
            <button
              type="button"
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl text-sm font-semibold transition"
            >
              Logout
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}