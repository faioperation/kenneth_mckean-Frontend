import { FiSearch, FiX } from "react-icons/fi";
import { Link } from "react-router";
import { TbShoppingBagPlus } from "react-icons/tb";
export default function Apikey({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="w-full max-w-xl bg-black rounded-2xl text-gray-300 shadow-xl p-6 relative">
        {/* Close Button */}
        <Link to="/admin/configuration">
          <button
            onClick={onClose}
            className="absolute cursor-pointer top-4 right-4 text-gray-300 border border-gray p-1 text-sm   rounded-full"
          >
            <FiX size={20} />
          </button>
        </Link>

        {/* header */}
        <div className="flex items-center border-b pb-3 mb-4">
          <h1 className="text-gray-300 text-l font-semibold ">
            Create API Key
          </h1>
        </div>

        {/* project details */}
        <div className="space-y-4 max-h-72 overflow-y-auto">
          <p className="text-gray-400">Name Your Key</p>
          <input
            type="text"
            placeholder="My Secret Key"
            className="border border-gray-200 w-full rounded-md text-xs text-gray-300 p-2"
          />

      
        </div>

        <div className="flex gap-4 justify-end ">
          <Link to="/admin/configuration">
          
            <div className="m-2 btn btn-active cursor-pointer ">
              <button className=" my-2 ">Cancel </button>
            </div>
          </Link>
          <Link to="/admin/configuration">
          
            <div className="m-2 btn btn-primary  cursor pointer ">
              <button className="my-2 ">Create </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
