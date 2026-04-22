import { FiSearch, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { TbShoppingBagPlus } from "react-icons/tb";
import { LuEyeOff, LuCamera, LuEye } from "react-icons/lu";
import { useEffect, useState } from "react";
import { apiGet, apiPatch, getImageUrl } from "../../../../lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function EditProfile() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const [avatarFile, setAvatarFile] = useState(null);
  const [profileImg, setProfileImg] = useState(
    "",
  );

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 50 * 1024 * 1024) {
      alert("File is too large! Please select a file under 50MB.");
      return;
    }
      setAvatarFile(file);
      setProfileImg(URL.createObjectURL(file));
    }
  };
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    gender: "",
    country: "",
  });

  const getProfile = async () => {
    const res = await apiGet("/user/profile");
    return res.data;
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
  useEffect(() => {
    if (data) {
      setFormData({
      
       name: data.name || "",
       email: data.email || "",
      });

      if (data.avatarUrl) {
        setProfileImg(data.avatarUrl);
      }
    }
  }, [data]);
   const { mutate, isPending } = useMutation({
    mutationFn: async(payload) => {
       await apiPatch("/user/profile", payload.profileData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (payload.passwordData.currentPassword && payload.passwordData.newPassword) {
        await apiPatch("/user/auth/change-password", payload.passwordData);
      }
    },
    
    onSuccess: () => {
      queryClient.invalidateQueries(["profile"]);
      toast("Profile updated successfully!");
      navigate("/user/profile");
    }, onError: (error) => {
      alert(error?.response?.data?.message || "Update failed!");
    },
  });
  const handleSaveChanges = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
   
    formDataToSend.append("gender", formData.gender);
    formDataToSend.append("country", formData.country);

    if (avatarFile) {
      formDataToSend.append("avatar", avatarFile);
    }

   mutate({
      profileData: formDataToSend,
      passwordData: { currentPassword, newPassword },
    });
  };
  if (isLoading) {
    return (
      <div className="text-center py-20 text-green-500">Loading profile...</div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-20 text-red-500">
        Failed to load profile
      </div>
    );
  }

  

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-3 sm:px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-4 sm:p-6 relative">
        {/* Close Button */}
        <button
          onClick={() => navigate(-1)}
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
            src={avatarFile ? profileImg : getImageUrl(data?.avatarUrl)}
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
        <form className="space-y-5 max-h-[65vh] overflow-y-auto pr-1"
        onSubmit={handleSaveChanges}>
          {/* Name */}
          <div className="space-y-1.5">
            <p className="text-gray-800 text-sm sm:text-base">Name</p>
            <input
              type="text"
              value={formData.name}
             onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              placeholder="Name"
              className="border border-gray-200 w-full rounded-md text-sm text-gray-600 p-2.5"
            />
          </div>

          {/* Email (READ ONLY) */}
          <div className="space-y-1.5">
            <p className="text-gray-800 text-sm sm:text-base">Email</p>
            <input
              type="text"
              value={formData.email}
              readOnly
              className="border border-gray-200 w-full rounded-md text-sm text-gray-600 p-2.5 bg-gray-100 cursor-not-allowed"
            />
          </div>

          
         <div className="pt-4 border-t space-y-4">
            <p className="text-sm font-bold text-gray-700">Change Password</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Current Password */}
              <div className="space-y-1 relative">
                <p className="text-sm font-medium">Current Password</p>
                <input
                  type={showCurrent ? "text" : "password"}
                  placeholder="••••••••"
                  value={currentPassword || ""}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="border border-gray-200 text-gray-600 w-full rounded-lg p-2.5 text-sm"
                />
                <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3 top-[34px] text-gray-400">
                  {showCurrent ? <LuEyeOff size={16} /> : <LuEye size={16} />}
                </button>
              </div>

              {/* New Password */}
              <div className="space-y-1 relative">
                <p className="text-sm font-medium">New Password</p>
                <input
                  type={showNew ? "text" : "password"}
                  placeholder="••••••••"
                  value={newPassword || ""}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="border border-gray-200 text-gray-600 w-full rounded-lg p-2.5 text-sm"
                />
                <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-[34px] text-gray-400">
                  {showNew ? <LuEyeOff size={16} /> : <LuEye size={16} />}
                </button>
              </div>
            </div>
          </div>
        <div className="flex justify-end pt-6">
      <button
              type="submit"
              disabled={isPending}
              className="bg-[#2B7FFF] hover:bg-blue-600 px-10 py-3 rounded-xl text-sm font-semibold shadow-lg disabled:opacity-50"
            >
              {isPending ? "Saving..." : "Save changes"}
            </button>
        </div>
        </form>

       
      </div>
    </div>
  );
}
