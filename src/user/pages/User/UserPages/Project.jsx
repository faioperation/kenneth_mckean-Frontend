import { FiSearch, FiX } from "react-icons/fi";
import { Link } from "react-router";
import { TbShoppingBagPlus } from "react-icons/tb";
export default function Project({ onClose }) {
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
            Create New Project
          </h1>
        </div>

        {/* icon */}

        <div className="flex justify-center">
          <div className="text-black text-3xl p-2 border border-gray rounded-full flex justify-center  ">
            <TbShoppingBagPlus></TbShoppingBagPlus>
          </div>
        </div>
        {/* project details */}
        <div className="space-y-4 max-h-72 overflow-y-auto">
          <p className="text-gray-800">project name</p>
          <input
            type="text"
            placeholder="Enter Project Name"
            className="border border-gray-200 w-full rounded-md text-xs text-gray-600 p-2"
          />

          <p className="text-gray-800">Description</p>
          <input
            type="text"
            placeholder="give details"
            className="border border-gray-200 w-full rounded-md text-xs text-gray-600 p-2"
          />
        </div>

        <div>
          <Link to="/user/newtask">
          
            <div className="m-2 flex justify-end">
              <button className="btn mt-2 ">Create Repository</button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
