import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react"; // Added useState
import { Icon } from "@iconify/react";
import { RiBookLine } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { PiBooksFill } from "react-icons/pi";
import { LuNotebookPen } from "react-icons/lu";
import { IoSearch, IoClose } from "react-icons/io5";
import { TbShoppingBagPlus } from "react-icons/tb";
import { LuNotebook } from "react-icons/lu";
import { SiLivechat } from "react-icons/si";
import logo from "../../../../../assets/images/logo.jpeg";

// TanStack Query Imports
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTasks } from "../../../../../api/taskApi";
import { apiGet, apiPost } from "../../../../../lib/api";

export default function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [prompt, setPrompt] = useState("");

  const navLinks = [
    {
      name: "New Task",
      path: "newtask",
      icon: LuNotebookPen,
    },
    { name: "Search Chat", path: "search", icon: IoSearch },
    { name: "Library", path: "library", icon: PiBooksFill },
    {
      name: "New Project",
      path: "project",
      icon: IoSettingsOutline,
    },
    {
      name: "Profile",
      path: "profile",
      icon: IoSettingsOutline,
    },
  ];

  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  const { data: projects = [], isLoading: projectsLoading } = useQuery({
    queryKey: ["Projects"],
    queryFn: async () => {
      const res = await apiGet("/user/project");
      return res.data;
    },
  });
  const { data: projectDetails, isLoading: detailsLoading } = useQuery({
    queryKey: ["ProjectDetails", selectedProjectId],
    queryFn: async () => {
      const res = await apiGet(`/user/project/${selectedProjectId}`);
      return res.data;
    },
    enabled: !!selectedProjectId,
  });

  const createTaskMutation = useMutation({
    mutationFn: async (taskData) => {
      return await apiPost(
        `/user/project/${selectedProjectId}/tasks/create`,
        taskData,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["ProjectDetails", selectedProjectId]);
      setPrompt("");
    },
  });

  const handleCreateTask = () => {
    if (!prompt.trim()) return;
    createTaskMutation.mutate({ prompt: prompt });
  };
  return (
    <div>
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-white transition-opacity md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white transition-transform duration-300 ease-in-out md:static md:translate-x-0 border-r border-[#2B7FFF33] ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-screen  flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between px-8">
            <div className="flex items-center gap-3">
              <img className="h-8 w-8" src={logo} alt="Logo" />
              <h2 className="text-2xl font-semibold text-black tracking-tight">
                Algorithms AI
              </h2>
            </div>
            <button
              onClick={onClose}
              className="rounded-md p-1 hover:bg-[#1f2d5c] md:hidden"
            >
              <Icon icon="material-symbols:close" width="20" height="20" />
            </button>
          </div>

          {/* Nav */}
          <nav className="flex-1 space-y-1 px-3 pt-4 text-black">
            <NavLink
              // to="/user/newtask"
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 text-md font-medium ${
                  isActive
                    ? "bg-[#155DFC33] text-[#53A3FF] border-l-2 border-[#51A2FF]"
                    : "text-[#34322D] hover:bg-[#1f2d5c] hover:text-white"
                }`
              }
              onClick={() => {
                navigate(`/user/newtask?refresh=${Date.now()}`);
                window.innerWidth < 768 && onClose();
              }}
            >
              <LuNotebookPen size={22} />
              <span>New Task</span>
            </NavLink>
            <NavLink
              to="/user/search"
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 text-md font-medium ${
                  isActive
                    ? "bg-[#155DFC33] text-[#53A3FF] border-l-2 border-[#51A2FF]"
                    : "text-[#34322D] hover:bg-[#1f2d5c] hover:text-white"
                }`
              }
              onClick={() => window.innerWidth < 768 && onClose()}
            >
              <IoSearch size={22} />
              <span>Search Chat</span>
            </NavLink>
            {/* Projects */}

            <NavLink
              to={navLinks[3].path}
              className="flex items-center gap-3 rounded-lg px-3 py-3 text-md font-medium text-[#34322D] hover:bg-[#1f2d5c] hover:text-white"
            >
              <TbShoppingBagPlus size={22} />
              <span>{navLinks[3].name}</span>
            </NavLink>
          </nav>

          {/* Bottom */}

          <div className="px-4 flex flex-col justify-between  ">
            {/* project lsit */}
            <div className="">
              <div className="flex items-center justify-between px-4 mb-2">
                <p className="text-gray-500">All Projects</p>
                <p className="text-2xl text-gray-500 cursor-pointer hover:bg-gray-300 rounded-full p-2">
                  <LuNotebook />
                </p>
              </div>

              {projectsLoading ? (
                <p className="text-xs text-gray-400">Loading...</p>
              ) : (
                <div className="h-42 overflow-y-auto space-y-1 px-3">
                  {projects.map((project) => (
                    <div
                      key={project.id || project._id}
                      onClick={() =>
                        setSelectedProjectId(project.id || project._id)
                      }
                      className="px-3 py-2 shadow rounded-md text-sm text-gray-700 hover:bg-gray-100 cursor-pointer truncate"
                    >
                      {project.name}
                    </div>
                  ))}{" "}
                </div>
              )}
            </div>
            {/* TASK LIST */}
            <div className="my-10">
              <div className="flex items-center justify-between p-4">
                <p className="text-gray-500">All Tasks</p>
                <p className="text-2xl text-gray-500 cursor-pointer hover:bg-gray-300 rounded-full p-2">
                  <LuNotebook />
                </p>
              </div>

              {isLoading ? (
                <p className="text-gray-400 text-sm px-4">Loading...</p>
              ) : tasks.length === 0 ? (
                <div className="pb-12 lg:pb-24 text-gray-500 flex flex-col items-center space-y-4">
                  <div className="text-6xl">
                    <SiLivechat />
                  </div>
                  <p>Create New Tasks & Get Started</p>
                </div>
              ) : (
                <div className="h-52 overflow-y-auto space-y-1 px-3">
                  {tasks.map((task) => (
                    <div
                      key={task._id || task.id}
                      onClick={() => {
                        navigate(`/user/newtask?taskId=${task._id || task.id}`);
                        window.innerWidth < 768 && onClose();
                      }}
                      className="px-3 shadow py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 cursor-pointer truncate"
                    >
                      {task.title || task.prompt || "Untitled Task"}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="p-4">
              <NavLink
                to={navLinks[4].path}
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-md font-medium text-[#34322D] hover:bg-[#1f2d5c] hover:text-white"
              >
                <FaRegUser size={22} />
                <span>{navLinks[4].name}</span>
              </NavLink>
            </div>
          </div>
        </div>
      </aside>

      {/* Project Modal */}
      {selectedProjectId && (
        <div className="fixed inset-0 z-100  flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden text-black border border-gray-200">
            <div className="flex items-center justify-between p-5 border-b bg-gray-50">
              <h3 className="text-lg font-bold truncate pr-4 text-blue-600">
                {detailsLoading ? "Loading Project..." : projectDetails?.name}
              </h3>
              <button
                onClick={() => setSelectedProjectId(null)}
                className="p-1 hover:bg-gray-200 rounded-full"
              >
                <IoClose size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Task Creation Section (Based on Screenshot) */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">
                  New Task Prompt
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="what is on your mind"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 outline-none h-20 resize-none"
                />
                <button
                  disabled={createTaskMutation.isPending}
                  onClick={handleCreateTask}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                >
                  {createTaskMutation.isPending
                    ? "Generating AI Response..."
                    : "Create Task"}
                </button>
              </div>

              {/* Displaying Existing Tasks */}
              <div className="max-h-52 overflow-y-auto pt-4 border-t border-gray-100">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                  Project Tasks
                </p>
                {detailsLoading ? (
                  <p className="text-sm text-gray-400">Loading tasks...</p>
                ) : projectDetails?.tasks?.length > 0 ? (
                  <div className="space-y-2">
                    {projectDetails.tasks.map((task, index) => (
                      <div
                        key={task._id || task.id}
                        onClick={() => {
                          navigate(
                            `/user/newtask?taskId=${task._id || task.id}`,
                          );
                          window.innerWidth < 768 && onClose();
                        }}
                        className="p-3 bg-gray-50 rounded-lg border border-gray-100 text-sm"
                      >
                        {task.title || task.prompt}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 italic">
                    No tasks created yet.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { Icon } from "@iconify/react";
// import { RiBookLine } from "react-icons/ri";
// import { IoSettingsOutline } from "react-icons/io5";
// import { FaRegUser } from "react-icons/fa";
// import { FaUsers } from "react-icons/fa";
// import { PiBooksFill } from "react-icons/pi";
// import { LuNotebookPen } from "react-icons/lu";
// import { IoSearch } from "react-icons/io5";
// import { TbShoppingBagPlus } from "react-icons/tb";
// import { LuNotebook } from "react-icons/lu";
// import { SiLivechat } from "react-icons/si";
// import logo from "../../../../../assets/images/logo.jpeg";

// // TanStack Query Imports
// import { useQuery } from "@tanstack/react-query";
// import { getTasks } from "../../../../../api/taskApi";
// import { apiGet } from "../../../../../lib/api";

// export default function Sidebar({ isOpen, onClose }) {
//   const navigate = useNavigate();
//   const navLinks = [
//     {
//       name: "New Task",
//       path: "newtask",
//       icon: LuNotebookPen,
//     },
//     { name: "Search Chat", path: "search", icon: IoSearch },
//     { name: "Library", path: "library", icon: PiBooksFill },
//     {
//       name: "New Project",
//       path: "project",
//       icon: IoSettingsOutline,
//     },
//     {
//       name: "Profile",
//       path: "profile",
//       icon: IoSettingsOutline,
//     },
//   ];

//   const { data: tasks = [], isLoading } = useQuery({
//     queryKey: ["tasks"],
//     queryFn: getTasks,
//   });
//   const getProjects = async () => {
//     const res = await apiGet("/user/project");
//     return res.data;
//   };
//   const { data = [] } = useQuery({
//     queryKey: ["Projects"],
//     queryFn: getProjects,
//   });
//   const getProjectById = async (projectId) => {
//     const res = await apiGet(`/user/project/${projectId}`);
//     return res.data;
//   };
//   return (
//     <>
//       {isOpen && (
//         <div
//           className="fixed inset-0 z-20 bg-white transition-opacity md:hidden"
//           onClick={onClose}
//         />
//       )}

//       <aside
//         className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white transition-transform duration-300 ease-in-out md:static md:translate-x-0 border-r border-[#2B7FFF33] ${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         <div className="flex h-screen flex-col">
//           {/* Logo */}
//           <div className="flex h-16 items-center justify-between px-8">
//             <div className="flex items-center gap-3">
//               <img className="h-8 w-8" src={logo} alt="Logo" />
//               <h2 className="text-2xl font-semibold text-black tracking-tight">
//                 Algorithms AI
//               </h2>
//             </div>
//             <button
//               onClick={onClose}
//               className="rounded-md p-1 hover:bg-[#1f2d5c] md:hidden"
//             >
//               <Icon icon="material-symbols:close" width="20" height="20" />
//             </button>
//           </div>

//           {/* Nav */}
//           <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-6">
//             {navLinks.slice(0, 3).map((item) => (
//               <NavLink
//                 key={item.path}
//                 to={item.path}
//                 className={({ isActive }) =>
//                   `flex items-center gap-3 rounded-lg px-4 py-3 text-md font-medium ${
//                     isActive
//                       ? "bg-[#155DFC33] text-[#53A3FF] border-l-2 border-[#51A2FF]"
//                       : "text-[#34322D] hover:bg-[#1f2d5c] hover:text-white"
//                   }`
//                 }
//                 onClick={() => window.innerWidth < 768 && onClose()}
//               >
//                 <item.icon size={22} />
//                 <span>{item.name}</span>
//               </NavLink>
//             ))}
//           </nav>

//           {/* Bottom */}
//           <div className="p-4 flex flex-col justify-between md:gap-12">
//             {/* Projects */}
//             <div>
//               <div className="flex items-center justify-between p-4">
//                 <p className="text-gray-500">Projects</p>
//                 <p className="text-2xl text-gray-500 cursor-pointer hover:bg-gray-300 rounded-full p-2">
//                   +
//                 </p>
//               </div>

//               <NavLink
//                 to={navLinks[3].path}
//                 className="flex items-center gap-3 rounded-lg px-4 py-3 text-md font-medium text-[#34322D] hover:bg-[#1f2d5c] hover:text-white"
//               >
//                 <TbShoppingBagPlus size={22} />
//                 <span>{navLinks[3].name}</span>
//               </NavLink>
//               <div className="">
//                 <div className="flex items-center justify-between p-4">
//                   <p className="text-gray-500">All Projects</p>
//                   <p className="text-2xl text-gray-500 cursor-pointer hover:bg-gray-300 rounded-full p-2">
//                     <LuNotebook />
//                   </p>
//                 </div>

//                 {isLoading ? (
//                   <p className="text-gray-400 text-sm px-4">Loading...</p>
//                 ) : data.length === 0 ? (
//                   <div className="pb-12 lg:pb-24 text-gray-500 flex flex-col items-center space-y-4">
//                     <div className="text-6xl">
//                       <SiLivechat />
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="flex flex-col space-y-2 px-3">
//                     {data.map((project) => (
//                       <div
//                         key={project.id || project._id}
//                         onClick={() => {
//                           navigate(`/user/project?projectId=${project.id}`);
//                           window.innerWidth < 768 && onClose();
//                         }}
//                         className="px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 cursor-pointer truncate"
//                       >
//                         {project.name || project.prompt || "Untitled Task"}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* TASK LIST */}
//             <div className="mb-18">
//               <div className="flex items-center justify-between p-4">
//                 <p className="text-gray-500">All Tasks</p>
//                 <p className="text-2xl text-gray-500 cursor-pointer hover:bg-gray-300 rounded-full p-2">
//                   <LuNotebook />
//                 </p>
//               </div>

//               {isLoading ? (
//                 <p className="text-gray-400 text-sm px-4">Loading...</p>
//               ) : tasks.length === 0 ? (
//                 <div className="pb-12 lg:pb-24 text-gray-500 flex flex-col items-center space-y-4">
//                   <div className="text-6xl">
//                     <SiLivechat />
//                   </div>
//                   <p>Create New Tasks & Get Started</p>
//                 </div>
//               ) : (
//                 <div className="flex flex-col space-y-2 px-3">
//                   {tasks.map((task) => (
//                     <div
//                       key={task._id || task.id}
//                       onClick={() => {
//                         navigate(`/user/newtask?taskId=${task._id || task.id}`);
//                         window.innerWidth < 768 && onClose();
//                       }}
//                       className="px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 cursor-pointer truncate"
//                     >
//                       {task.title || task.prompt || "Untitled Task"}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Profile */}
//             <div className="p-4">
//               <NavLink
//                 to={navLinks[4].path}
//                 className="flex items-center gap-3 rounded-lg px-4 py-3 text-md font-medium text-[#34322D] hover:bg-[#1f2d5c] hover:text-white"
//               >
//                 <FaRegUser size={22} />
//                 <span>{navLinks[4].name}</span>
//               </NavLink>
//             </div>
//           </div>
//         </div>
//       </aside>
//     </>
//   );
// }
