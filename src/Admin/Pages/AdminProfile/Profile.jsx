import React from "react";
import { LuEyeOff } from "react-icons/lu";
import { AiOutlineLogout } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { tokenStorage } from "../../../lib/tokenStorage";
import { apiGet } from "../../../lib/api";
import { useQuery } from "@tanstack/react-query";

export default function Profile() {
  const navigate = useNavigate();
const getProfile = async () => {
  const res = await apiGet("/admin/profile")
  return res.data;
}
const {data={} , isError, error} = useQuery({
  queryKey:["profile-data"],
  queryFn: getProfile
})
if (isError){
  return(
    <div>
      {error?.message}
    </div>
  )
}
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
              src={data.avatarUrl }
              alt=""
              className="h-20 w-20 rounded-full border-2 border-gray-700 object-cover"
            />
            <div>
              <h2 className="text-xl flex font-semibold">{data.firstname} <span className="ml-2">{data.lastname}</span>
              </h2>
              <p className="text-gray-500 text-sm">
               {data.email}
              </p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <form className="space-y-8">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                First Name
              </label>
              <div
                className="w-full bg-[#11141b] border border-[#1e232b] rounded-xl px-4 py-3 text-sm text-gray-400"
              >{data.firstname}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Last Name
              </label>
              <div
                className="w-full bg-[#11141b] border border-[#1e232b] rounded-xl px-4 py-3 text-sm text-gray-400"
              >{data.lastname}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Gender
              </label>
              <div
                className="w-full bg-[#11141b] border border-[#1e232b] rounded-xl px-4 py-3 text-sm text-gray-400"
              >{data.gender}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Country
              </label>
             <div
                className="w-full bg-[#11141b] border border-[#1e232b] rounded-xl px-4 py-3 text-sm text-gray-400"
              >{data.country}
              </div>
            </div>
          </div>

        
          <div className="flex justify-end pt-10">
            <button
              type="button"
              onClick={handleLogout}
              className="text-red-700 hover:text-red-800 px-8 py-3 rounded-xl  font-semibold text-lg flex items-center gap-2 border border-red-800"
            >
               <AiOutlineLogout /> Logout
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}