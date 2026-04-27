import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FiX } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom"; 
import { TbShoppingBagPlus } from "react-icons/tb";
import { apiPost } from "../../../../lib/api"; 
import { toast } from "react-hot-toast";

export default function Project({ onClose }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  

  const { register, handleSubmit, formState: { errors } } = useForm();


  const createProjectMutation = useMutation({
    mutationFn: async (formData) => {
      const response = await apiPost("/user/project/create", formData);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Project created successfully!");
      queryClient.invalidateQueries(["projects"]); 
      navigate("/user/newtask");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to create project");
    }
  });

  const onSubmit = (data) => {

    createProjectMutation.mutate({
      name: data.name,
      description: data.description 
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-6 relative">
        
        {/* Close Button */}
        <button
          onClick={()=>navigate(-1)}
          className="absolute cursor-pointer top-4 right-4 text-black border border-gray-200 p-1 text-sm rounded-full hover:bg-gray-100"
        >
          <FiX size={20} />
        </button>

        {/* Header */}
        <div className="flex items-center border-b pb-3 mb-4">
          <h1 className="text-black text-lg font-semibold">
            Create New Project
          </h1>
        </div>

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="text-black text-3xl p-4 border border-gray-200 rounded-full flex justify-center bg-gray-50">
            <TbShoppingBagPlus />
          </div>
        </div>

        {/* Project Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-800">Project Name</label>
            <input
              {...register("name", { required: "Project name is required" })}
              type="text"
              placeholder="Enter Project Name"
              className={`border ${errors.name ? 'border-red-500' : 'border-gray-200'} w-full text-gray-700 rounded-md text-sm p-2 focus:outline-none focus:ring-1 focus:ring-blue-500`}
            />
            {errors.name && <p className="text-red-500 text-[10px]">{errors.name.message}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-800">Description (Optional)</label>
            <textarea
              {...register("description")}
              placeholder="Give details about your project"
              rows="3"
              className="border text-gray-700 border-gray-200 w-full rounded-md text-sm p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button 
              type="button"
              onClick={()=>navigate(-1)}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={createProjectMutation.isPending}
              className={`bg-black text-white px-6 py-2 rounded-lg text-sm font-medium transition-opacity ${createProjectMutation.isPending ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}`}
            >
              {createProjectMutation.isPending ? "Creating..." : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// import { FiSearch, FiX } from "react-icons/fi";
// import { Link } from "react-router";
// import { TbShoppingBagPlus } from "react-icons/tb";
// export default function Project({ onClose }) {
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
//       <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-6 relative">
//         {/* Close Button */}
//         <Link to="/user/newtask">
//           <button
//             onClick={onClose}
//             className="absolute cursor-pointer top-4 right-4 text-black border border-gray p-1 text-sm   rounded-full hover:text-black"
//           >
//             <FiX size={20} />
//           </button>
//         </Link>

//         {/* header */}
//         <div className="flex items-center border-b pb-3 mb-4">
//           <h1 className="text-black text-l font-semibold ">
//             Create New Project
//           </h1>
//         </div>

//         {/* icon */}

//         <div className="flex justify-center">
//           <div className="text-black text-3xl p-2 border border-gray rounded-full flex justify-center  ">
//             <TbShoppingBagPlus></TbShoppingBagPlus>
//           </div>
//         </div>
//         {/* project details */}
//         <div className="space-y-4 max-h-72 overflow-y-auto">
//           <p className="text-gray-800">project name</p>
//           <input
//             type="text"
//             placeholder="Enter Project Name"
//             className="border border-gray-200 w-full rounded-md text-xs text-gray-600 p-2"
//           />

//           <p className="text-gray-800">Description</p>
//           <input
//             type="text"
//             placeholder="give details"
//             className="border border-gray-200 w-full rounded-md text-xs text-gray-600 p-2"
//           />
//         </div>

//         <div>
//           <Link to="/user/newtask">
          
//             <div className="m-2 flex justify-end">
//               <button className="btn mt-2 ">Create Repository</button>
//             </div>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }
