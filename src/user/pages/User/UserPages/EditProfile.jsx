import { FiSearch, FiX } from "react-icons/fi";
import { Link, useNavigate } from "react-router";
import { TbShoppingBagPlus } from "react-icons/tb";
import { LuEyeOff, LuCamera } from "react-icons/lu"; 
import { useState } from "react";
export default function EditProfile({ onClose }) {
     const navigate = useNavigate();
     const [profileImg, setProfileImg] = useState("https://i.ibb.co.com/Rp6rKgTs/4c53faf8564996d38193e347c7d2dca522816c71.png");
     const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImg(URL.createObjectURL(file));
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-6 relative">
        {/* Close Button */}
        <Link to="/user/newtask">
          <button
            onClick={onClose}
            className="absolute cursor-pointer top-4 right-4 text-black border border-gray p-1 text-sm   rounded-full hover:text-black"
          >
            <FiX size={20} />
          </button>
        </Link>

        {/* header */}
        <div className="flex items-center border-b pb-3 mb-4">
          <h1 className="text-black text-l font-semibold ">
            Edit  Profile
          </h1>
        </div>

        {/*edit image */}

    <div className="relative group mb-4">
              <img 
                src={profileImg} 
                alt="Profile" 
                className="h-16 w-16 rounded-full border-2 border-gray-700 object-cover"
              />
              <label htmlFor="imgUpload" className="absolute bottom-0 left-0 bg-[#2B7FFF] p-2 rounded-full cursor-pointer hover:bg-blue-600 transition-all border-2 border-[#0b0e14]">
                <LuCamera size={10} />
                <input 
                  type="file" 
                  id="imgUpload" 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleImageChange}
                />
              </label>
            </div>
        {/* project details */}
        <div className="space-y-4 max-h-72 overflow-y-auto">
          <p className="text-gray-800">Name</p>
          <input
            type="text"
            placeholder="Akash Rahman"
            className="border border-gray-200 w-full rounded-md text-xs text-gray-600 p-2"
          />

          <p className="text-gray-800">E-mail</p>
          <input
            type="text"
            placeholder="akashuser@gmail.com"
            className="border border-gray-200 w-full rounded-md text-xs text-gray-600 p-2"
          />
        </div>

        <div>
          
          <div className="flex justify-end pt-6">
          <Link to="/user/profile">
            <button 
              type="submit" 
              className=" cursor-pointer btn text-white px-10 py-3 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-blue-500/20"
            >
              Save changes
            </button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
