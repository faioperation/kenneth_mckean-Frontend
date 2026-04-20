import React, { useState } from 'react';
import { FiX } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { apiPost } from "../../../../lib/api"; // আপনার এপিআই ইনট্যান্স
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function Apikey({ onClose }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [keyName, setKeyName] = useState("");

  
  const createMutation = useMutation({
    mutationFn: (newKey) => apiPost("/admin/api-configuration/keys", newKey),
    onSuccess: () => {
   
      queryClient.invalidateQueries(['apiKeysManagement']);
      alert("API Key created successfully!");
      navigate("/admin/configuration");
    },
    onError: (error) => {
      console.error("Creation Error:", error);
      alert("Failed to create API key");
    }
  });


  const handleCreate = (e) => {
    e.preventDefault();
    if (!keyName.trim()) {
      alert("Please enter a key name");
      return;
    }

    createMutation.mutate({
      name: keyName,
      key: `sk-${Math.random().toString(36).substring(2, 15)}` 
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="w-full max-w-xl bg-black rounded-2xl text-gray-300 shadow-xl p-6 relative border border-gray-800">
        

        <button
          onClick={() => navigate("/admin/configuration")}
          className="absolute cursor-pointer top-4 right-4 text-gray-300 border border-gray-700 p-1 text-sm rounded-full hover:bg-gray-800"
        >
          <FiX size={20} />
        </button>

   
        <div className="flex items-center border-b border-gray-800 pb-3 mb-4">
          <h1 className="text-gray-300 text-lg font-semibold ">
            Create API Key
          </h1>
        </div>


        <div className="space-y-4 mb-8">
          <p className="text-gray-400 text-sm">Name Your Key</p>
          <input
            type="text"
            value={keyName}
            onChange={(e) => setKeyName(e.target.value)}
            placeholder="e.g. My Secret Key"
            className="border border-gray-700 bg-transparent w-full rounded-md text-sm text-gray-300 p-3 focus:outline-none focus:border-blue-500 transition-all"
          />
        </div>


        <div className="flex gap-4 justify-end">
          <button 
            onClick={() => navigate("/admin/configuration")}
            className="px-6 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors text-sm font-medium"
          >
            Cancel
          </button>
          
          <button 
            onClick={handleCreate}
            disabled={createMutation.isPending}
            className={`px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-50`}
          >
            {createMutation.isPending ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}