import { FiX, FiEdit2, FiLogOut } from "react-icons/fi";
import { Link } from "react-router";

export default function UserProfile({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 relative">
           {/* Close Button */}
        <Link to="/user/newtask">
          <button
            onClick={onClose}
            className="absolute cursor-pointer top-4 right-4 text-black border border-gray p-1 text-sm   rounded-full hover:text-black"
          >
            <FiX size={20} />
          </button>
        </Link>


        {/* Header */}
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Profile</h2>

        {/* User Info */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
             <img 
                src="https://i.ibb.co.com/Rp6rKgTs/4c53faf8564996d38193e347c7d2dca522816c71.png" 
                alt="Profile" 
                className="h-9 w-9 md:h-10 md:h-10 rounded-full object-cover border border-gray-200"
              />
            <div>
              <h3 className="font-medium text-gray-800">Akash Rohman</h3>
              <p className="text-sm text-gray-500">amlgroridim@gmail.com</p>
            </div>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-3">
          <Link to="/user/editprofile">
            <button className="p-2 border rounded-full text-gray-800 hover:bg-gray-100">
              <FiEdit2 size={18} />
            </button></Link>
       <Link to="/auth/signin">
            <button className="p-2 border rounded-full text-red-500 hover:bg-gray-100">
              <FiLogOut size={18} />
            </button></Link>
          </div>
        </div>

        {/* Plan Section */}
        <div className="bg-gray-100 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-gray-800">Free</h4>
            <button className="bg-black text-white text-sm px-4 py-1.5 rounded-full hover:bg-gray-800">
              Upgrade
            </button>
          </div>

          <hr className="mb-4" />

          {/* Daily Refresh Credits */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-gray-800 font-medium">
                ✨ Daily refresh credits
              </p>
              <p className="text-sm text-gray-500">
                Refreshes to 300 at 00:00 every day
              </p>
            </div>
            <p className="text-gray-800 font-semibold">300</p>
          </div>

          {/* Present Credits */}
          <div className="flex items-center justify-between">
            <p className="text-gray-800 font-medium">✨ Present Credits</p>
            <p className="text-gray-800 font-semibold">250</p>
          </div>
        </div>
      </div>
    </div>
  );
}
