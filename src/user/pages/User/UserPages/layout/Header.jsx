import { Icon } from "@iconify/react";
import { FaRegUser } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { PiSparkleBold } from "react-icons/pi";

export default function Header({ onMenuClick }) {
  const location = useLocation();
  const hideHeader = location.pathname==="/user/library"
  if(hideHeader) return null ;
  return (
    <header className="sticky top-0 z-10 flex h-16 w-full items-center justify-between bg-[#F8F8F7] px-4 md:px-6">
      
      {/* Left: Mobile Menu & Title */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Mobile Menu Button - Visible only on small screens */}
        <button
          onClick={onMenuClick}
          className="rounded-md p-1 hover:bg-gray-200 md:hidden text-black"
        >
          <Icon icon="material-symbols:menu" width="24" height="24" />
        </button>

        <p className="text-lg md:text-xl text-black font-bold flex gap-2 md:gap-4 items-center whitespace-nowrap">
          QUANTUM AI <span className="hidden sm:inline">2.0</span>
          <span className="text-gray-600 text-sm cursor-pointer">∨</span>
        </p>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-1 md:gap-3 lg:mr-10">
        
    
        <button className="hidden sm:flex btn relative text-gray-300 text-sm md:text-md rounded-full px-4 md:px-8 hover:bg-[#1f2d5c] hover:text-white transition-all border border-gray-300">
          Upgrade
        </button>

       
        <button className="flex items-center justify-center p-2 md:p-3 gap-1 md:gap-2 rounded-full bg-white text-black border border-gray-200 shadow-sm">
          <PiSparkleBold className="text-blue-500 text-md md:text-lg" />
          <span className="text-xs md:text-sm font-bold">300</span>
        </button>

        
        <Link to="/admin/adminprofile" className="hover:opacity-80 transition-opacity">
          <div className="flex items-center gap-2 md:gap-3 p-1 md:p-2">
            <div className="relative">
              <img 
                src="https://i.ibb.co.com/Rp6rKgTs/4c53faf8564996d38193e347c7d2dca522816c71.png" 
                alt="Profile" 
                className="h-9 w-9 md:h-10 md:h-10 rounded-full object-cover border border-gray-200"
              />
            
            </div>
            
         
            <div className="hidden lg:block">
              <h2 className="text-sm text-black font-semibold leading-none">Akash Rahim</h2>
              <p className="text-gray-500 text-[11px] mt-1">Free User</p>
            </div>
          </div>
        </Link>
      </div>
    </header>
  );
}