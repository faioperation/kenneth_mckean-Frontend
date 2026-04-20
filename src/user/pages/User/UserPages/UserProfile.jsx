// import { FiX, FiEdit2, FiLogOut } from "react-icons/fi";
// import { Link, useNavigate } from "react-router";
// import { tokenStorage } from "../../../../lib/tokenStorage";
// import { useEffect, useState } from "react";
// import { getUserProfile } from "../../../../api/profileApi";

// export default function UserProfile({ onClose, onEdit }) {

//   const navigate = useNavigate();

//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);


//   const handleLogout = () => {
//     tokenStorage.clear();
//     localStorage.removeItem("user");
//     navigate("/auth/signin");
//   };

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const data = await getUserProfile();
//         setProfile(data);
//       } catch (error) {
//         console.error("Profile fetch error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
//       <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 relative">

//         {/* Close Button */}

//         <button
//           onClick={onClose}
//           className="absolute cursor-pointer top-4 right-4 text-black border border-gray p-1 text-sm rounded-full hover:text-black"
//         >
//           <FiX size={20} />
//         </button>


//         {/* Header */}
//         <h2 className="text-xl font-semibold text-gray-800 mb-6">Profile</h2>

//         {/* Loading */}
//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           <>
//             {/* User Info */}
//             <div className="flex flex-wrap items-center justify-between mb-6">
//               <div className="flex flex-wrap items-center gap-4">
//                 <img
//                   src={
//                     profile?.avatarUrl ||
//                     "https://i.ibb.co.com/Rp6rKgTs/4c53faf8564996d38193e347c7d2dca522816c71.png"
//                   }
//                   alt="Profile"
//                   className="h-9 w-9 md:h-10 md:h-10 rounded-full object-cover border border-gray-200"
//                 />
//                 <div>
//                   <h3 className="font-medium text-gray-800">
//                     {profile?.name || "No Name"}
//                   </h3>
//                   <p className="text-sm text-gray-500">
//                     {profile?.email || "No Email"}
//                   </p>
//                 </div>
//               </div>

//               {/* Action Icons */}
//               <div className="flex items-center gap-3">

//                 <button className="p-2 border rounded-full text-gray-800 hover:bg-gray-100 cursor-pointer">
//                   <FiEdit2 size={12} />
//                 </button>


//                 <button
//                   onClick={handleLogout}
//                   className="p-2 border rounded-full text-red-500 hover:bg-gray-100 cursor-pointer"
//                 >
//                   <FiLogOut size={12} />
//                 </button>
//               </div>
//             </div>

//             {/* Plan Section */}
//             <div className="bg-gray-100 rounded-2xl p-5">
//               <div className="flex items-center justify-between mb-4">
//                 <h4 className="text-lg font-semibold text-gray-800">
//                   {profile?.plan || "Free"}
//                 </h4>
//                 <button className="bg-black text-white text-sm px-4 py-1.5 rounded-full hover:bg-gray-800 cursor-pointer">
//                   Upgrade
//                 </button>
//               </div>

//               <hr className="mb-4 text-gray-500" />

//               {/* Daily Refresh Credits */}
//               <div className="flex items-start justify-between mb-4">
//                 <div>
//                   <p className="text-gray-800 font-medium">
//                     ✨ Daily refresh credits
//                   </p>
//                   <p className="text-sm text-gray-500 ml-7">
//                     Refreshes to 300 at 00:00 every day
//                   </p>
//                 </div>
//                 <p className="text-gray-800 font-semibold">300</p>
//               </div>

//               {/* Present Credits */}
//               <div className="flex items-center justify-between">
//                 <p className="text-gray-800 font-medium">
//                   ✨ Present Credits
//                 </p>
//                 <p className="text-gray-800 font-semibold">
//                   {profile?.credits ?? 0}
//                 </p>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

import { FiX, FiEdit2, FiLogOut } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { tokenStorage } from "../../../../lib/tokenStorage";
import { useEffect, useState } from "react";
import { getUserProfile } from "../../../../api/profileApi";

export default function UserProfile({ onClose, onEdit }) {

  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);


  const handleLogout = () => {
    tokenStorage.clear();
    localStorage.removeItem("user");
    navigate("/auth/signin");
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        setProfile(data.data);
      } catch (error) {
        console.error("Profile fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 relative">

        {/* Close Button */}
        <button
          onClick={() => {
            if (window.history.length > 1) {
              navigate(-1);
            } else {
              navigate("/user/newtask");
            }
          }}
          className="absolute cursor-pointer top-4 right-4 text-black border border-gray p-1 text-sm rounded-full hover:text-black"
        >
          <FiX size={20} />
        </button>

        {/* Header */}
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Profile</h2>

        {/* Loading */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {/* User Info */}
            <div className="flex flex-wrap items-center justify-between mb-6">
              <div className="flex flex-wrap items-center gap-4">
                <img
                  src={
                    profile?.avatarUrl ||
                    "https://i.ibb.co.com/Rp6rKgTs/4c53faf8564996d38193e347c7d2dca522816c71.png"
                  }
                  alt="Profile"
                  className="h-9 w-9 md:h-10 md:h-10 rounded-full object-cover border border-gray-200"
                />
                <div>
                  <h3 className="font-medium text-gray-800">
                    {profile?.name || "No Name"}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {profile?.email || "No Email"}
                  </p>
                </div>
              </div>

              {/* Action Icons */}
              <div className="flex items-center gap-3">

                <button
                  onClick={() => navigate("/user/editprofile")}
                  className="p-2 border rounded-full text-gray-800 hover:bg-gray-100 cursor-pointer"
                >
                  <FiEdit2 size={12} />
                </button>

                <button
                  onClick={handleLogout}
                  className="p-2 border rounded-full text-red-500 hover:bg-gray-100 cursor-pointer"
                >
                  <FiLogOut size={12} />
                </button>
              </div>
            </div>

            {/* Plan Section */}
            <div className="bg-gray-100 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-800">
                  {profile?.plan || "Free"}
                </h4>
                <button className="bg-black text-white text-sm px-4 py-1.5 rounded-full hover:bg-gray-800 cursor-pointer">
                  Upgrade
                </button>
              </div>

              <hr className="mb-4 text-gray-500" />

              {/* Daily Refresh Credits */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-gray-800 font-medium">
                    ✨ Daily refresh credits
                  </p>
                  <p className="text-sm text-gray-500 ml-7">
                    Refreshes to 300 at 00:00 every day
                  </p>
                </div>
                <p className="text-gray-800 font-semibold">300</p>
              </div>

              {/* Present Credits */}
              <div className="flex items-center justify-between">
                <p className="text-gray-800 font-medium">
                  ✨ Present Credits
                </p>
                <p className="text-gray-800 font-semibold">
                  {profile?.credits ?? 0}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
