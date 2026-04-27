import { Link, NavLink, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import { RiBookLine } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { apiGet, getImageUrl } from "../../../lib/api";
import { useQuery } from "@tanstack/react-query";
import logo from "../../../assets/images/logo.jpeg";
export default function Sidebar({ isOpen, onClose }) {
  const navLinks = [
    {
      name: "Overview",
      path: "overview",
      icon: "material-symbols:dashboard-outline",
    },
    { name: "User", path: "user", icon: FaUsers },
    { name: "Usage & Billing", path: "usage", icon: RiBookLine },
    {
      name: "API Configuration",
      path: "configuration",
      icon: IoSettingsOutline,
    },
    {
      name: "Admin User",
      path: "adminprofile",
      mail: "Admin@manush.ai",
      icon: IoSettingsOutline,
    },
  ];

  const location = useLocation();
  const getProfile = async () => {
    const res = await apiGet("/admin/profile");
    return res.data;
  };
  const {
    data = {},
    isError,
    error,
  } = useQuery({
    queryKey: ["profile-data"],
    queryFn: getProfile,
  });
  if (isError) {
    return <div>{error?.message}</div>;
  }

  const hideSidebar =
    location.pathname === "/admin/login" ||
    location.pathname === "/admin/login" ||
    location.pathname === "/admin/forgot-password" ||
    location.pathname === "/admin/verify-otp" ||
    location.pathname === "/admin/reset-password" ||
    location.pathname === "/admin/password-changed";
  if (hideSidebar) return null;

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
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-black text-white transition-transform duration-300 ease-in-out md:static md:translate-x-0 border-r border-[#263e66] ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Logo Section */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-[#263e66]">
            <div className="flex items-center gap-3">
              <img
                className="h-8 w-8"
                src={logo}
                alt="Logo"
              />
              <div>
                <h2 className="text-sm font-bold tracking-tight">
                  Algorithms AI
                </h2>
                <p className="text-[10px] text-gray-500 uppercase font-medium">
                  Admin Dashboard
                </p>
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
          <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-6">
            {navLinks.slice(0, 4).map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#155DFC33] text-[#51A2FF] border-l-2 border-[#51A2FF]"
                      : "text-gray-400 hover:bg-[#1f2d5c] hover:text-white"
                  }`
                }
                onClick={() => window.innerWidth < 768 && onClose()}
              >
                {typeof item.icon === "string" ? (
                  <Icon icon={item.icon} width="22" height="22" />
                ) : (
                  <item.icon size={22} />
                )}
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>

          {/* Bottom Actions & User Profile */}

          <div className="border-t border-[#2B7FFF33] p-4 bg-[#0D0D12]">
            {/* User Info Section (New) */}
            <div className="flex items-center gap-1 px-3 py-4 mb-2 bg-[#16161E] rounded-xl border border-[#2B7FFF1A]">
              {data ? ( 
                <div >
                  <img className="rounded-full h-10 w-10 " src={getImageUrl(
                data.avatarUrl
              )} alt="" />
                </div>
              ) : (
                <div className="relative">
                  <div className="h-10 w-10 bg-[#00C950] flex items-center justify-center rounded-full border border-gray-700">
                    <FaRegUser />
                  </div>

                  <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 border-2 border-[#16161E]"></div>
                </div>
              )}

              <NavLink
                key={navLinks[4].path}
                to={navLinks[4].path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#155DFC33] text-[#51A2FF] border-l-2 border-[#51A2FF]"
                      : "text-gray-400 hover:bg-[#1f2d5c] hover:text-white"
                  }`
                }
                onClick={() => window.innerWidth < 768 && onClose()}
              >
                <div className="flex-1 overflow-hidden">
                  <h4 className="text-sm font-semibold truncate">
                    {data?.name}
                  </h4>
                  <p className="text-[11px]  text-gray-500 break-all leading-tight">
                    {data?.email}
                  </p>
                </div>{" "}
              </NavLink>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
