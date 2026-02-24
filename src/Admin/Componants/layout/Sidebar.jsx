import { Link, NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";
import { RiBookLine } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
export default function Sidebar({ isOpen, onClose }) {
  const navLinks = [
    { name: "Overview", path: "overview", icon: "material-symbols:dashboard-outline" },
    { name: "Usage & Billing", path: "usage", icon: RiBookLine },
    // { name: "Security & Access", path: "security", icon: "material-symbols:person-outline" },
     { name: "API Configuration", path: "configuration", icon: IoSettingsOutline },
    // { name: "Data & Files", path: "data", icon: "material-symbols:person-outline" },
    // Add more links as needed
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 transition-opacity md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-[#13131A] text-white transition-transform duration-300 ease-in-out md:static md:translate-x-0 border-r border-[#2B7FFF33] ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex h-full flex-col">
          {/* Change the compnay logo on this div */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-[#2B7FFF33]">
          <div className="flex items-center gap-4">
             <img className="h-10" src="https://i.ibb.co.com/mrpNqfkD/logo.png" alt="" />
             <div>
              <h2 className="text-lg font-semibold">Algorithms AI</h2>
              <p className="text-sm text-gray-400">Admin Dashboard</p>
             </div>
          </div>
            <button
              onClick={onClose}
              className="rounded-md p-1 hover:bg-[#1f2d5c] md:hidden"
            >
              <Icon icon="material-symbols:close" width="20" height="20" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
            {navLinks.map((item) => {
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${isActive
                      ? "bg-[#155DFC33] text-[#51A2FF] semibold"
                      : "text-gray-300 hover:bg-[#1f2d5c] hover:text-white"
                    }`
                  }
                  onClick={() => {
                    // Close sidebar on mobile when a link is clicked
                    if (window.innerWidth < 768) {
                      onClose();
                    }
                  }}
                >
                   <div className="flex items-center gap-4">
                    {item.icon && (
            typeof item.icon === "string" ? (
              <Icon icon={item.icon} width="20" height="20" />
            ) : (
              <item.icon size={20} />
            )
          )}
          <p className="">{item.name}</p>
                   </div>
                </NavLink>
              );
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="border-t border-[#2B7FFF33] p-4">
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${isActive
                  ? "bg-[#2B7FFF] text-white"
                  : "text-gray-300 hover:bg-[#1f2d5c] hover:text-white"
                }`
              }
            >
              <Icon icon="material-symbols:settings-outline" width="20" height="20" />
              Settings
            </NavLink>
            <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-300 transition-colors hover:bg-[#1f2d5c] hover:text-white">
              <Icon icon="material-symbols:logout" width="20" height="20" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}