import { useState } from "react";
import {
  FiSettings,
  FiGlobe,
  FiBell,
  FiCreditCard,
  FiSearch,
  FiKey,
  FiGithub,
} from "react-icons/fi";
import GeneralContent from "./GeneralContent";
import DomainsPage from "./DomainsPage";
import Notification from "../../Admin/componants/layout/Notification";
import PaymentPage from "./PaymentPage";
import SEOPage from "../SEOPage";
import SecretsPage from "./SecretsPage";
import GitHubPage from "./GitHubPage";

export default function SettingsLayout() {
  const [activeTab, setActiveTab] = useState("general");

  const menu = [
    { id: "general", label: "General", icon: <FiSettings /> },
    { id: "domains", label: "Domains", icon: <FiGlobe /> },
    { id: "notifications", label: "Notifications", icon: <FiBell /> },
    { id: "payment", label: "Payment", icon: <FiCreditCard /> },
    { id: "seo", label: "SEO", icon: <FiSearch /> },
    { id: "secrets", label: "Secrets", icon: <FiKey /> },
    { id: "github", label: "GitHub", icon: <FiGithub /> },
  ];

  return (
    <div className="flex h-screen bg-white text-black">
      
      {/* LEFT SIDEBAR */}
      <div className="w-64 bg-white border-r p-4 border-gray-200">
  

        <div className="space-y-2">
          {menu.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 w-full p-3 rounded-lg text-left transition cursor-pointer ${
                activeTab === item.id
                  ? "bg-gray-200 font-medium"
                  : "hover:bg-gray-100"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT CONTENT */}
      <div className="flex-1 p-6 overflow-y-auto">
        {activeTab === "general" && <GeneralContent />}
        {activeTab === "domains" && <DomainsPage />}
        {activeTab === "notifications" && <Notification />}
        {activeTab === "payment" && <PaymentPage />}
        {activeTab === "seo" && <SEOPage />}
        {activeTab === "secrets" && <SecretsPage />}
        {activeTab === "github" && <GitHubPage />}
      </div>
    </div>
  );
}