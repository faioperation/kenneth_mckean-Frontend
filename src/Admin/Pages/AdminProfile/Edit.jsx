import React, { useEffect, useState } from "react";
import { LuEyeOff, LuCamera } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { apiGet, apiPut, getImageUrl } from "../../../lib/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function Edit() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [imageFile, setImageFile] = useState(null);
  const [profileImg, setProfileImg] = useState("null");

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    gender: "",
    country: "",
  });

  const getProfile = async () => {
    const res = await apiGet("/admin/profile");
    return res.data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  useEffect(() => {
    if (data) {
      setFormData({
        firstname: data.firstname || "",
        lastname: data.lastname || "",
        gender: data.gender || "",
        country: data.country || "",
      });

      if (data.avatarUrl) {
        setProfileImg(data.avatarUrl);
      }
    }
  }, [data]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setProfileImg(URL.createObjectURL(file));
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (newFormData) =>
      apiPut("/admin/profile", newFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["profile"]);
      navigate("/admin/adminprofile");
    },
  });

  const handleSaveChanges = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("firstname", formData.firstname);
    formDataToSend.append("lastname", formData.lastname);
    formDataToSend.append("gender", formData.gender);
    formDataToSend.append("country", formData.country);

    if (imageFile) {
      formDataToSend.append("avatar", imageFile);
    }

    mutate(formDataToSend);
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
    <div className="bg-[#0b0e14] min-h-screen p-4 md:p-10 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-6">
            <div className="relative group">
              <img
                src={imageFile ? profileImg : getImageUrl(data?.avatarUrl)}
                alt="Profile"
                className="h-24 w-24 rounded-full border-2 border-gray-700 object-cover"
              />

              <label className="absolute bottom-0 right-0 bg-[#2B7FFF] p-2 rounded-full cursor-pointer hover:bg-blue-600 border-2 border-[#0b0e14]">
                <LuCamera size={16} />
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            </div>

            <div>
              <h2 className="text-xl font-semibold">
                {formData.firstname} {formData.lastname}
              </h2>
              <p className="text-gray-500 text-sm">{data?.email}</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form className="space-y-8" onSubmit={handleSaveChanges}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-gray-300">First Name</label>
              <input
                type="text"
                value={formData.firstname}
                onChange={(e) =>
                  setFormData({ ...formData, firstname: e.target.value })
                }
                className="w-full bg-[#11141b] border border-[#1e232b] rounded-xl px-4 py-3 text-sm text-gray-400"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-300">Last Name</label>
              <input
                type="text"
                value={formData.lastname}
                onChange={(e) =>
                  setFormData({ ...formData, lastname: e.target.value })
                }
                className="w-full bg-[#11141b] border border-[#1e232b] rounded-xl px-4 py-3 text-sm text-gray-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-gray-300">Gender</label>
              <select
                value={formData.gender}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
                className="w-full bg-[#11141b] border border-[#1e232b] rounded-xl px-4 py-3 text-sm text-gray-400"
              >
                <option value="male">Man</option>
                <option value="female">Woman</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-300">Country</label>
              <input
                type="text"
                value={formData.country}
                onChange={(e) =>
                  setFormData({ ...formData, country: e.target.value })
                }
                className="w-full bg-[#11141b] border border-[#1e232b] rounded-xl px-4 py-3 text-sm text-gray-400"
              />
            </div>
          </div>

          {/* Submit */}
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
