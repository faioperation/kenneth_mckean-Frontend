import { Icon } from "@iconify/react";
import { FaRegUser } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
export default function Header({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-10 flex h-16 w-full items-center justify-between lg:justify-center bg-[#13131A] border-b border-[#2B7FFF33] px-6 text-white shadow-sm">
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
         < IoSearchSharp className="lg:text-4xl md:text-4xl "/>
          <input className="lg:w-180 md:w-180 text-white" type="Search agents, workflows, logs..." required placeholder="Search agents, workflows, logs..." />
        </label>
      </div>

      {/* Right Side Actions */}
      <div className="flex  gap-6  items-center lg:mr-20">
        <button className="relative rounded-full  hover:bg-[#1f2d5c]">
          <Icon
            icon="material-symbols:notifications-outline"
            width="20"
            height="20"
          />
          <span className="absolute r-8 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-[#111B3C]" />
        </button>

        <button>
          <FaRegUser className="text-white " />
        </button>
      </div>
    </header>
  );
}
