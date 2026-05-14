// import {
//   Eye,
//   Code2,
//   Database,
//   Folder,
//   Settings,
//   Share2,
//   X,
//   AppWindow,
// } from "lucide-react";
// import { useState } from "react";
// import DatabaseEmptyState from "./DatabaseEmptyState";
// import FileStorageEmptyState from "./FileStorageEmptyState";
// import SettingsLayout from "./SettingsLayout";
// import Dashboard from "./Dashboard";
// import PublishPage from "./PublishPage";

// const EveryButton = () => {
//   const [activeTab, setActiveTab] = useState("code");
//   return (
//     <>
//       <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b bg-white text-black border-gray-200">
//         {/* Left Buttons */}
//         <div className="flex items-center gap-2 sm:gap-3">
//           <button className="p-2 rounded-lg transition border border-gray-200 cursor-pointer">
//             <Eye size={18} />
//           </button>

//           <button
//             onClick={() => setActiveTab("code")}
//             className={`p-2 rounded-lg border cursor-pointer border-gray-200 ${
//               activeTab === "code" ? "bg-gray-200 border-gray-800 " : ""
//             }`}
//           >
//             <Code2 size={18} />
//           </button>

//           <button
//             onClick={() => setActiveTab("dashboard")}
//             className={`p-2 rounded-lg border cursor-pointer border-gray-200 ${
//               activeTab === "dashboard" ? "bg-gray-200 border-gray-800 " : ""
//             }`}
//           >
//             <AppWindow size={18} />
//           </button>

//           <button
//             onClick={() => setActiveTab("database")}
//             className={`p-2 rounded-lg border cursor-pointer border-gray-200 ${
//               activeTab === "database" ? "bg-gray-200 border-gray-800 " : ""
//             }`}
//           >
//             <Database size={18} />
//           </button>

//           <button
//             onClick={() => setActiveTab("folder")}
//             className={`p-2 rounded-lg border cursor-pointer border-gray-200 ${
//               activeTab === "folder" ? "bg-gray-200 border-gray-800 " : ""
//             }`}
//           >
//             <Folder size={18} />
//           </button>

//           <button
//             onClick={() => setActiveTab("settings")}
//             className={`p-2 rounded-lg border cursor-pointer border-gray-200 ${
//               activeTab === "settings" ? "bg-gray-200 border-gray-800 " : ""
//             }`}
//           >
//             <Settings size={18} />
//           </button>
//         </div>

//         {/* Right Side */}
//         <div className="flex items-center gap-3 ">
//           <button className="p-2 rounded-lg bg-gray-200 transition border-2 border-gray-200 cursor-pointer ">
//             <Share2 size={18} />
//           </button>

//           <button
//             onClick={() => setActiveTab("publish")}
//             className={`p-2 rounded-lg bg-black text-white cursor-pointer
//             `}
//           >
//             Publish
//           </button>

//           <button className="p-2 rounded-lg bg-gray-200 transition border-2 border-gray-200 cursor-pointer  ">
//             <X size={18} />
//           </button>
//         </div>
//       </div>

//       {activeTab === "dashboard" && <Dashboard />}
//       {activeTab === "database" && <DatabaseEmptyState />}
//       {activeTab === "folder" && <FileStorageEmptyState />}
//       {activeTab === "settings" && <SettingsLayout />}
//       {activeTab === "publish" && <PublishPage />}
//     </>
//   );
// };

// export default EveryButton;

import {
  Eye,
  Code2,
  History,
  Layers,
  Database,
  Settings,
  Github,
  Share2,
  Send,
  Maximize2,
  LogOut,
} from "lucide-react";

const EveryButton = ({ onClose, activeTab, setActiveTab, setIsFullView }) => {
  return (
    <div className="flex items-center justify-between gap-2 px-2 sm:px-4 py-1.5 border-b bg-white text-black border-gray-200 select-none overflow-x-auto scrollbar-hide">
      {/* Left side: Navigation Tabs */}
      <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-xl border border-gray-200 flex-shrink-0">
        <button
          onClick={() => setActiveTab("dashboard")}
          className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium transition-all ${
            activeTab === "dashboard"
              ? "bg-white text-black shadow-sm border border-gray-200"
              : "text-gray-500 hover:text-black hover:bg-gray-100"
          }`}
          title="Preview"
        >
          <Eye size={16} />
          <span className="hidden md:inline">Preview</span>
        </button>
        <button
          onClick={() => setActiveTab("code")}
          className={`p-1.5 rounded-lg transition-all ${
            activeTab === "code"
              ? "bg-white text-black shadow-sm border border-gray-200"
              : "text-gray-500 hover:text-black hover:bg-gray-100"
          }`}
          title="Source Code"
        >
          <Code2 size={18} />
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`p-1.5 rounded-lg transition-all ${
            activeTab === "history"
              ? "bg-white text-black shadow-sm border border-gray-200"
              : "text-gray-500 hover:text-black hover:bg-gray-100"
          }`}
          title="History"
        >
          <History size={18} />
        </button>
        <button
          onClick={() => setActiveTab("layers")}
          className={`p-1.5 rounded-lg transition-all ${
            activeTab === "layers"
              ? "bg-white text-black shadow-sm border border-gray-200"
              : "text-gray-500 hover:text-black hover:bg-gray-100"
          }`}
          title="Layers"
        >
          <Layers size={18} />
        </button>
        <button
          onClick={() => setActiveTab("database")}
          className={`p-1.5 rounded-lg transition-all ${
            activeTab === "database"
              ? "bg-white text-black shadow-sm border border-gray-200"
              : "text-gray-500 hover:text-black hover:bg-gray-100"
          }`}
          title="Database"
        >
          <Database size={18} />
        </button>
        <button
          onClick={() => setActiveTab("settings")}
          className={`p-1.5 rounded-lg transition-all ${
            activeTab === "settings"
              ? "bg-white text-black shadow-sm border border-gray-200"
              : "text-gray-500 hover:text-black hover:bg-gray-100"
          }`}
          title="Settings"
        >
          <Settings size={18} />
        </button>
      </div>

      {/* Right side: Actions */}
      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
        <div className="hidden sm:flex items-center gap-1 mr-1">
          <button className="p-1.5 rounded-lg text-gray-400 hover:text-black hover:bg-gray-100 transition-all">
            <Github size={18} />
          </button>
          <button 
            onClick={() => setActiveTab("share")}
            className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium transition-all ${
              activeTab === "share"
                ? "bg-white text-black shadow-sm border border-gray-200"
                : "text-gray-500 hover:text-black hover:bg-gray-100"
            }`}
          >
            <Share2 size={16} />
            <span className="hidden lg:inline">Share</span>
          </button>
        </div>

        <button 
          onClick={() => setActiveTab("publish")}
          className="flex items-center gap-2 px-2 sm:px-3 py-1 text-gray-500 rounded-lg text-sm font-bold border border-gray-200"
        >
          <Send size={16} />
          <span className="hidden xs:inline">Publish</span>
        </button>

        <div className="h-5 w-[1px] bg-gray-200 mx-0.5 sm:mx-1" />

        <button
          onClick={onClose}
          className="flex items-center gap-1.5 px-2 sm:px-3 py-1 rounded-lg text-xs font-bold text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all border border-gray-200"
        >
          <LogOut size={14} />
          <span className="hidden sm:inline">Exit</span>
        </button>
        
        <button 
          onClick={() => setIsFullView(prev => !prev)}
          className="p-1.5 rounded-lg text-gray-400 hover:text-black hover:bg-gray-100 transition-all"
          title="Toggle Full View"
        >
          <Maximize2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default EveryButton;

