import { Icon } from "@iconify/react";
import { FaRegUser } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";


export default function Header({ onMenuClick }) {

  return (
    <header className="sticky top-0 z-10 flex h-16 w-full items-center justify-between lg:justify-center bg-[#F8F8F7]  px-6 text-white ">
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="rounded-md p-1 hover:bg-[#1f2d5c] md:hidden lg:hidden"
        >
          <Icon icon="material-symbols:menu" width="24" height="24" />
        </button>
      </div>
      <div className="lg:mr-154  ">
        <label className="input bg-black border-[#1E2939] border">
          <IoSearchSharp className="lg:text-4xl md:text-4xl " />
          <input
            className="lg:w-180 md:w-180 text-white"
            type="Search agents, workflows, logs..."
            required
            placeholder="Search agents, workflows, logs..."
          />
        </label>
      </div>

      {/* Right Side Actions */}
      <div className="flex  gap-2  items-center lg:mr-20">
        <div className="dropdown dropdown-left">
          <div
            tabIndex={0}
            role="button"
            className="btn relative rounded-full  hover:bg-[#1f2d5c] m-1"
          >
            <Icon
              icon="material-symbols:notifications-outline"
              width="20"
              height="20"
            />
            <span className="absolute top-2 l-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-[#111B3C]" />
          </div>
          <ul
            tabIndex="-1"
            className="dropdown-content menu bg-base-100 rounded-box z-1 w-96 p-6 shadow-sm"
          >
         
          </ul>
        </div>
       
    
          <button className="btn relative rounded-full  hover:bg-[#1f2d5c] m-1">
            <FaRegUser className="text-white " />
          </button>
         
 
      </div>
    </header>
  );
}
