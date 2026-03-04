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
import PublishPage from "./PublishPage";

const EveryButton = () => {
  const [activeTab, setActiveTab] = useState("code");
  return (
    <>
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b bg-white text-black border-gray-200">
        {/* Left Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button className="p-2 rounded-lg transition border border-gray-200 cursor-pointer">
            <Eye size={18} />
          </button>

          <button
            onClick={() => setActiveTab("code")}
            className={`p-2 rounded-lg border cursor-pointer border-gray-200 ${
              activeTab === "code" ? "bg-gray-200 border-gray-800 " : ""
            }`}
          >
            <Code2 size={18} />
          </button>

          <button
            onClick={() => setActiveTab("dashboard")}
            className={`p-2 rounded-lg border cursor-pointer border-gray-200 ${
              activeTab === "dashboard" ? "bg-gray-200 border-gray-800 " : ""
            }`}
          >
            <AppWindow size={18} />
          </button>

          <button
            onClick={() => setActiveTab("database")}
            className={`p-2 rounded-lg border cursor-pointer border-gray-200 ${
              activeTab === "database" ? "bg-gray-200 border-gray-800 " : ""
            }`}
          >
            <Database size={18} />
          </button>

          <button
            onClick={() => setActiveTab("folder")}
            className={`p-2 rounded-lg border cursor-pointer border-gray-200 ${
              activeTab === "folder" ? "bg-gray-200 border-gray-800 " : ""
            }`}
          >
            <Folder size={18} />
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`p-2 rounded-lg border cursor-pointer border-gray-200 ${
              activeTab === "settings" ? "bg-gray-200 border-gray-800 " : ""
            }`}
          >
            <Settings size={18} />
          </button>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3 ">
          <button className="p-2 rounded-lg bg-gray-200 transition border-2 border-gray-200 cursor-pointer ">
            <Share2 size={18} />
          </button>

          <button
            onClick={() => setActiveTab("publish")}
            className={`p-2 rounded-lg bg-black text-white cursor-pointer 
            `}
          >
            Publish
          </button>

          <button className="p-2 rounded-lg bg-gray-200 transition border-2 border-gray-200 cursor-pointer  ">
            <X size={18} />
          </button>
        </div>
      </div>

      {activeTab === "dashboard" && <Dashboard />}
      {activeTab === "database" && <DatabaseEmptyState />}
      {activeTab === "folder" && <FileStorageEmptyState />}
      {activeTab === "settings" && <SettingsLayout />}
      {activeTab === "publish" && <PublishPage />}
    </>
  );
};

export default EveryButton;
