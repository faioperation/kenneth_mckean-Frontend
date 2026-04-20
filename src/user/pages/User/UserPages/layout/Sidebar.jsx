// import { Link, NavLink, } from "react-router-dom";
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

// export default function Sidebar({ isOpen, onClose }) {
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

// ;

//   return (
//     <>
//       {/* Mobile Overlay */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 z-20 bg-white transition-opacity md:hidden"
//           onClick={onClose}
//         />
//       )}

//       {/* Sidebar Container */}

//       <aside
//         className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white  transition-transform duration-300 ease-in-out md:static md:translate-x-0 border-r border-[#2B7FFF33] ${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         <div className="flex h-full  flex-col">
//           {/* Logo Section */}
//           <div className="flex h-16  items-center justify-between px-8 ">
//             <div className="flex items-center gap-3">
//               <img
//                 className="h-8 w-8"
//                 src={logo}
//                 alt="Logo"
//               />
//               <div className="">
//                 <h2 className="text-2xl font-semibold text-black tracking-tight">
//                   Algorithms AI
//                 </h2>
//               </div>
//             </div>
//             <button
//               onClick={onClose}
//               className="rounded-md p-1 hover:bg-[#1f2d5c] md:hidden"
//             >
//               <Icon icon="material-symbols:close" width="20" height="20" />
//             </button>
//           </div>

//           {/* Navigation Links */}
//           <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-6">
//             {navLinks.slice(0, 3).map((item) => (
//               <NavLink
//                 key={item.path}
//                 to={item.path}
//                 className={({ isActive }) =>
//                   `flex items-center gap-3 rounded-lg px-4 py-3 text-md font-medium transition-colors ${
//                     isActive
//                       ? "bg-[#155DFC33] text-[#53A3FF] border-l-2 border-[#51A2FF]"
//                       : "text-[#34322D] hover:bg-[#1f2d5c] hover:text-white "
//                   }`
//                 }
//                 onClick={() => window.innerWidth < 768 && onClose()}
//               >
//                 {typeof item.icon === "string" ? (
//                   <Icon icon={item.icon} width="22" height="22" />
//                 ) : (
//                   <item.icon size={22} />
//                 )}
//                 <span>{item.name}</span>
//               </NavLink>
//             ))}
//           </nav>

//           <div className=" p-4  flex flex-wrap  flex-col justify-between  md:gap-12">
//             <div>
//               <div className="flex items-center justify-between p-4">
//                 <p className="text-gray-500">Projects </p>
//                 <p className="text-2xl text-gray-500 cursor-pointer hover:bg-gray-300 rounded-full p-2">
//                   +
//                 </p>
//               </div>
//               <NavLink
//                 to={navLinks[3].path}
//                 className={({ isActive }) =>
//                   `flex items-center gap-3 rounded-lg px-4 py-3 text-md font-medium transition-colors ${
//                     isActive
//                       ? "bg-[#155DFC33] text-[#53A3FF] border-l-2 border-[#51A2FF]"
//                       : "text-[#34322D] hover:bg-[#1f2d5c] hover:text-white"
//                   }`
//                 }
//                 onClick={() => window.innerWidth < 768 && onClose()}
//               >
//                 <TbShoppingBagPlus size={22} className="text-inherit" />
//                 <span>{navLinks[3].name}</span>
//               </NavLink>
//             </div>
//             <div className="mb-18">
//               <div className="flex items-center justify-between p-4">
//                 <p className="text-gray-500">All Tasks </p>
//                 <p className="text-2xl text-gray-500 cursor-pointer hover:bg-gray-300 rounded-full p-2">
//                   <LuNotebook />
//                 </p>
//               </div>
//               <div className="pb-12 lg:pb-24 text-gray-500 flex flex-col items-center space-y-4">
//                <div className="text-6xl">
//                 <SiLivechat></SiLivechat>

//                </div>
//                  <p>Create New Tasks & Get Started</p>
//               </div>
//             </div>

//             <div className=" p-4 ">
//               <NavLink
//                 to={navLinks[4].path}
//                 className={({ isActive }) =>
//                   `flex items-center gap-3 rounded-lg px-4 py-3 text-md font-medium transition-colors ${
//                     isActive
//                       ? "bg-[#155DFC33] text-[#53A3FF] border-l-2 border-[#51A2FF]"
//                       : "text-[#34322D] hover:bg-[#1f2d5c] hover:text-white"
//                   }`
//                 }
//                 onClick={() => window.innerWidth < 768 && onClose()}
//               >
//                 <FaRegUser size={22} className="text-inherit" />
//                 <span>{navLinks[4].name}</span>
//               </NavLink>
//             </div>
//           </div>
//         </div>
//       </aside>
//     </>
//   );
// }


import { Link, NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";
import { RiBookLine } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { PiBooksFill } from "react-icons/pi";
import { LuNotebookPen } from "react-icons/lu";
import { IoSearch } from "react-icons/io5";
import { TbShoppingBagPlus } from "react-icons/tb";
import { LuNotebook } from "react-icons/lu";
import { SiLivechat } from "react-icons/si";
import logo from "../../../../../assets/images/logo.jpeg";


import { useEffect, useState } from "react";
import { getTasks } from "../../../../../api/taskApi";



export default function Sidebar({ isOpen, onClose }) {

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

  //  STATE
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  //  API CALL
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await getTasks();
        setTasks(tasks || []);
      } catch (err) {
        console.error("Task fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-white transition-opacity md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white transition-transform duration-300 ease-in-out md:static md:translate-x-0 border-r border-[#2B7FFF33] ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex h-full flex-col">

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
          <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-6">
            {navLinks.slice(0, 3).map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-4 py-3 text-md font-medium ${isActive
                    ? "bg-[#155DFC33] text-[#53A3FF] border-l-2 border-[#51A2FF]"
                    : "text-[#34322D] hover:bg-[#1f2d5c] hover:text-white"
                  }`
                }
                onClick={() => window.innerWidth < 768 && onClose()}
              >
                <item.icon size={22} />
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>

          {/* Bottom */}
          <div className="p-4 flex flex-col justify-between md:gap-12">

            {/* Projects */}
            <div>
              <div className="flex items-center justify-between p-4">
                <p className="text-gray-500">Projects</p>
                <p className="text-2xl text-gray-500 cursor-pointer hover:bg-gray-300 rounded-full p-2">
                  +
                </p>
              </div>

              <NavLink
                to={navLinks[3].path}
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-md font-medium text-[#34322D] hover:bg-[#1f2d5c] hover:text-white"
              >
                <TbShoppingBagPlus size={22} />
                <span>{navLinks[3].name}</span>
              </NavLink>
            </div>

            {/* TASK LIST */}
            <div className="mb-18">
              <div className="flex items-center justify-between p-4">
                <p className="text-gray-500">All Tasks</p>
                <p className="text-2xl text-gray-500 cursor-pointer hover:bg-gray-300 rounded-full p-2">
                  <LuNotebook />
                </p>
              </div>

              {loading ? (
                <p className="text-gray-400 text-sm px-4">Loading...</p>
              ) : tasks.length === 0 ? (
                <div className="pb-12 lg:pb-24 text-gray-500 flex flex-col items-center space-y-4">
                  <div className="text-6xl">
                    <SiLivechat />
                  </div>
                  <p>Create New Tasks & Get Started</p>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 px-3">
                  {tasks.map((task) => (
                    <div
                      key={task._id || task.id}
                      className="px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 cursor-pointer truncate"
                    >
                      {task.title || "Untitled Task"}
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
    </>
  );
}
