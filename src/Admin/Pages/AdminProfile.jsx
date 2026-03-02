import React from 'react';
import { LuEyeOff } from "react-icons/lu"; // Password icon-er jonno

export default function AdminProfile() {
  return (
    <div className="bg-[#0b0e14] min-h-screen p-4 md:p-10 text-white">
      <div className="max-w-6xl mx-auto bg-[#0b0e14]">
        
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
              <p className="text-gray-500 text-sm">alexarawles@gmail.com</p>
            </div>
          </div>
          <button className="bg-[#2B7FFF] hover:bg-blue-600 text-white px-8 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer">
            Edit
          </button>
        </div>

        {/* Form Section */}
        <form className="space-y-8">
          
          {/* Full Name & Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Full Name</label>
              <input 
                type="text" 
                placeholder="Your First Name"
                className="w-full bg-[#11141b] border border-[#1e232b] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-all text-gray-400"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Last Name</label>
              <input 
                type="text" 
                placeholder="Last Name"
                className="w-full bg-[#11141b] border border-[#1e232b] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-all text-gray-400"
              />
            </div>
          </div>

          {/* Gender & Country */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Gender</label>
              <input 
                type="text" 
                placeholder="Man"
                className="w-full bg-[#11141b] border border-[#1e232b] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-all text-gray-400"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Country</label>
              <input 
                type="text" 
                placeholder="USA"
                className="w-full bg-[#11141b] border border-[#1e232b] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-all text-gray-400"
              />
            </div>
          </div>

          {/* Password Section */}
          <div className="space-y-6 pt-4">
            <h3 className="text-md font-semibold text-gray-200">Password</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 relative">
                <label className="text-sm font-medium text-gray-300">Current Password</label>
                <div className="relative">
                  <input 
                    type="password" 
                    className="w-full bg-[#11141b] border border-[#1e232b] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-all"
                  />
                  <LuEyeOff className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer" />
                </div>
              </div>
              
              <div className="space-y-2 relative">
                <label className="text-sm font-medium text-gray-300">New Password</label>
                <div className="relative">
                  <input 
                    type="password" 
                    className="w-full bg-[#11141b] border border-[#1e232b] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-all"
                  />
                  <LuEyeOff className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer" />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-6">
            <button 
              type="submit" 
              className="bg-[#2B7FFF] cursor pointer hover:bg-blue-600 text-white px-10 py-3 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-blue-500/20"
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}