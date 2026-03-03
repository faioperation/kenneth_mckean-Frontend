import {
  Eye,
  Code2,
  Database,
  Folder,
  Settings,
  Share2,
  X,
  AppWindow,
} from "lucide-react";
import { useState } from "react";
import DatabaseEmptyState from "./DatabaseEmptyState";
import FileStorageEmptyState from "./FileStorageEmptyState";
import SettingsLayout from "./SettingsLayout";
import Dashboard from "./Dashboard";

const EveryButton = () => {
  const [activeTab, setActiveTab] = useState("code");
  return (
    <>
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b bg-white text-black border-gray-200">
        {/* Left Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button className="p-2 rounded-lg transition border-2 border-gray-200 cursor-pointer">
            <Eye size={18} />
          </button>

          <button
            onClick={() => setActiveTab("code")}
            className={`p-2 rounded-lg border cursor-pointer ${
              activeTab === "code" ? "bg-gray-200 " : ""
            }`}
          >
            <Code2 size={18} />
          </button>

          <button
            onClick={() => setActiveTab("dashboard")}
            className={`p-2 rounded-lg border cursor-pointer ${
              activeTab === "dashboard" ? "bg-gray-200 " : ""
            }`}
          >
            <AppWindow size={18} />
          </button>

          <button
            onClick={() => setActiveTab("database")}
            className={`p-2 rounded-lg border cursor-pointer ${
              activeTab === "database" ? "bg-gray-200 " : ""
            }`}
          >
            <Database size={18} />
          </button>

          <button
            onClick={() => setActiveTab("folder")}
            className={`p-2 rounded-lg border cursor-pointer ${
              activeTab === "folder" ? "bg-gray-200 " : ""
            }`}
          >
            <Folder size={18} />
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`p-2 rounded-lg border cursor-pointer ${
              activeTab === "settings" ? "bg-gray-200 " : ""
            }`}
          >
            <Settings size={18} />
          </button>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3 cursor-pointer">
          <button className="p-2 rounded-lg bg-gray-100 transition border-2 border-gray-200 ">
            <Share2 size={18} />
          </button>

          <button className="bg-black text-white px-4 py-1.5 rounded-lg text-sm hover:opacity-90 transition">
            Publish
          </button>

          <button className="p-2 rounded-lg bg-gray-100 transition border-2 border-gray-200 ">
            <X size={18} />
          </button>
        </div>
      </div>


      {activeTab === "dashboard" && <Dashboard />}
      {activeTab === "database" && <DatabaseEmptyState />}
      {activeTab === "folder" && <FileStorageEmptyState />}
      {activeTab === "settings" && <SettingsLayout />}
    </>
  );
};

export default EveryButton;
