import { FiSearch, FiX } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { TbShoppingBagPlus } from "react-icons/tb";
import { LuEyeOff, LuCamera, LuEye } from "react-icons/lu";
import { useEffect, useState } from "react";
import { getUserProfile, updateUserProfile } from "../../../../api/profileApi";

export default function EditProfile({ onClose }) {
  const navigate = useNavigate();

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [profileImg, setProfileImg] = useState(
    "https://i.ibb.co.com/Rp6rKgTs/4c53faf8564996d38193e347c7d2dca522816c71.png"
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImg(URL.createObjectURL(file));
      setAvatarFile(file);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getUserProfile();

        setName(res.name);
        setEmail(res.email);
        setProfileImg(
          res.avatarUrl ||
          "https://i.ibb.co.com/Rp6rKgTs/default.png"
        );
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    return () => {
      if (profileImg && profileImg.startsWith("blob:")) {
        URL.revokeObjectURL(profileImg);
      }
    };
  }, [profileImg]);

  const handleSubmit = async () => {
    try {
      if (!name.trim()) {
        alert("Name is required");
        return;
      }

      setLoading(true);

      const formData = new FormData();
      formData.append("name", name);
      if (email) {
        formData.append("email", email);
      }

      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }

      const res = await updateUserProfile(formData);

      console.log("Updated:", res);

   onClose();

    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-3 sm:px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-4 sm:p-6 relative">

        {/* Close Button */}

        <button
          onClick={onClose}
          className="absolute top-4 right-4 border border-gray p-1 rounded-full"
        >
          <FiX size={20} className="text-black" />
        </button>


        {/* header */}
        <div className="flex items-center border-b pb-3 mb-5">
          <h1 className="text-black text-base sm:text-lg font-semibold">
            Edit Profile
          </h1>
        </div>

        {/* edit image */}
        <div className="relative group mb-5">
          <img
            src={profileImg}
            alt="Profile"
            className="h-14 w-14 sm:h-16 sm:w-16 rounded-full border-2 border-gray-700 object-cover"
          />
          <label
            htmlFor="imgUpload"
            className="absolute bottom-0 left-0 bg-[#2B7FFF] p-2 rounded-full cursor-pointer border-2 border-[#0b0e14]"
          >
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

        {/* form */}
        <div className="space-y-5 max-h-[65vh] overflow-y-auto pr-1">

          {/* Name */}
          <div className="space-y-1.5">
            <p className="text-gray-800 text-sm sm:text-base">Name</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="border border-gray-200 w-full rounded-md text-sm text-gray-600 p-2.5"
            />
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <p className="text-gray-800 text-sm sm:text-base">Email</p>
            <input
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-200 w-full rounded-md text-sm text-gray-600 p-2.5"
            />
          </div>

          {/* Password Section */}
          <div className="pt-1.5 border-t space-y-4">

            <div className="space-y-1.5">
              <p className="text-gray-800 text-sm sm:text-base">
                Current Password
              </p>

              <div className="relative">
                <input
                  type={showCurrent ? "text" : "password"}
                  placeholder="Enter current password"
                  className="border border-gray-200 w-full rounded-md text-sm text-gray-600 p-2.5 pr-10"
                />

                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showCurrent ? <LuEyeOff size={16} /> : <LuEye size={16} />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div className="space-y-1.5">
              <p className="text-gray-800 text-sm sm:text-base">
                New Password
              </p>

              <div className="relative">
                <input
                  type={showNew ? "text" : "password"}
                  placeholder="Enter new password"
                  className="border border-gray-200 w-full rounded-md text-sm text-gray-600 p-2.5 pr-10"
                />

                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showNew ? <LuEyeOff size={16} /> : <LuEye size={16} />}
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* button */}
        <div className="flex justify-end pt-6">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="bg-black text-white px-8 sm:px-10 py-2.5 sm:py-3 rounded-xl text-sm font-semibold"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}