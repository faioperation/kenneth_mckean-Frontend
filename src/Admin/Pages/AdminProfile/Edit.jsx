import React, { useState } from 'react'; // useNavigate ekhane thakbe na
import { LuEyeOff, LuCamera } from "react-icons/lu"; 
import { useNavigate } from "react-router-dom"; // useNavigate ekhane thakbe

export default function Edit() {
  const navigate = useNavigate();

  // States
  const [profileImg, setProfileImg] = useState("https://i.ibb.co.com/VcWhsLp9/Ellipse-25.png");
  const [selectedGender, setSelectedGender] = useState("Man");
  const [countrySearch, setCountrySearch] = useState("USA");

  // Form Submit Handler
  const handleSaveChanges = (e) => {
    e.preventDefault(); 
    console.log("Saving changes...");
    navigate('/admin/adminprofile');
  };

  // Image change handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImg(URL.createObjectURL(file));
    }
  };

  return (
    <div className="bg-[#0b0e14] min-h-screen p-4 md:p-10 text-white font-sans">
      <div className="max-w-6xl mx-auto bg-[#0b0e14]">
        
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-6">
            <div className="relative group">
              <img 
                src={profileImg} 
                alt="Profile" 
                className="h-24 w-24 rounded-full border-2 border-gray-700 object-cover"
              />
              <label htmlFor="imgUpload" className="absolute bottom-0 right-0 bg-[#2B7FFF] p-2 rounded-full cursor-pointer hover:bg-blue-600 transition-all border-2 border-[#0b0e14]">
                <LuCamera size={16} />
                <input 
                  type="file" 
                  id="imgUpload" 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleImageChange}
                />
              </label>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Alexa Rawles</h2>
              <p className="text-gray-500 text-sm">alexarawles@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Form Section - handleSaveChanges ekhane connect kora hoyeche */}
        <form className="space-y-8" onSubmit={handleSaveChanges}>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Full Name</label>
              <input 
                type="text" 
                defaultValue="Alexa"
                className="w-full bg-[#11141b] border border-[#1e232b] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-all text-gray-400"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Last Name</label>
              <input 
                type="text" 
                defaultValue="Rawles"
                className="w-full bg-[#11141b] border border-[#1e232b] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-all text-gray-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Gender</label>
              <select 
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
                className="w-full bg-[#11141b] border border-[#1e232b] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-all text-gray-400 appearance-none cursor-pointer"
              >
                <option value="Man">Man</option>
                <option value="Woman">Woman</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Country</label>
              <input 
                type="text" 
                list="countries"
                value={countrySearch}
                onChange={(e) => setCountrySearch(e.target.value)}
                className="w-full bg-[#11141b] border border-[#1e232b] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-all text-gray-400"
              />
              <datalist id="countries">
                <option value="USA" />
                <option value="Bangladesh" />
                <option value="United Kingdom" />
              </datalist>
            </div>
          </div>

          <div className="space-y-6 pt-4">
            <h3 className="text-md font-semibold text-gray-200">Password</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 relative">
                <label className="text-sm font-medium text-gray-300">Current Password</label>
                <div className="relative">
                  <input type="password" className="w-full bg-[#11141b] border border-[#1e232b] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-all" />
                  <LuEyeOff className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer" />
                </div>
              </div>
              <div className="space-y-2 relative">
                <label className="text-sm font-medium text-gray-300">New Password</label>
                <div className="relative">
                  <input type="password" className="w-full bg-[#11141b] border border-[#1e232b] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-all" />
                  <LuEyeOff className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-6">
            <button 
              type="submit" 
              className="bg-[#2B7FFF] cursor-pointer hover:bg-blue-600 text-white px-10 py-3 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-blue-500/20"
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}