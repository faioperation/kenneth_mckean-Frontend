import { Link, useLocation } from "react-router";
import { useState } from "react";
import logo from "../../assets/images/logo.jpeg";
import { HiOutlineBars3 } from "react-icons/hi2";
import { tokenStorage } from "../../lib/tokenStorage";
import { useQuery } from "@tanstack/react-query";
import { apiGet, getImageUrl } from "../../lib/api";

const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const token = tokenStorage.getAccessToken();

  const getProfile = async () => {
    const res = await apiGet("/user/profile");
    return res.data;
  };

  const { data: profileData } = useQuery({
    queryKey: ["profileData"],
    queryFn: getProfile,
    enabled: !!token,
  });

  const renderProfile = () => (
    <Link to="/user/newtask" className="hover:opacity-80 transition-opacity">
      <div className="flex items-center gap-2 md:gap-3">
        <div className="relative">
          <img
            src={getImageUrl(
              profileData?.avatarUrl ||
                "https://i.ibb.co.com/Rp6rKgTs/4c53faf8564996d38193e347c7d2dca522816c71.png",
            )}
            className="h-9 w-9 md:h-10 md:w-10 rounded-full object-cover border border-gray-200"
          />
        </div>

        <div className="hidden lg:block text-left">
          <h2 className="text-sm text-black font-semibold leading-none">
            {profileData?.name}
          </h2>
          <p className="text-blue-400 text-[10px] mt-0.5">
            {profileData?.plan?.name || profileData?.plan || "free"} <span>user</span>
          </p>
        </div>
      </div>
    </Link>
  );

  return (
    <nav className="flex justify-between items-center shadow px-6 md:px-12 lg:px-20 py-5 font-inter fixed top-0 w-full z-50 bg-white">
      {/* Logo */}
      <div className="flex items-center gap-2 cursor-pointer">
        <img src={logo} alt="logo" className="w-7 h-7 md:w-8 md:h-8" />
        <span className="text-xl md:text-2xl lg:text-[28px] font-semibold text-black">
          Algorithms AI
        </span>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6 lg:gap-8 text-base">
        <Link
          to="/features"
          className={
            location.pathname === "/features" ? "text-black" : "text-gray-500"
          }
        >
          Features
        </Link>
        <Link
          to="/pricing"
          className={
            location.pathname === "/pricing" ? "text-black" : "text-gray-500"
          }
        >
          Pricing
        </Link>
        <Link
          to="/about"
          className={
            location.pathname === "/about" ? "text-black" : "text-gray-500"
          }
        >
          About Us
        </Link>
      </div>

      {/* Desktop Buttons / Profile */}
      <div className="hidden md:flex items-center gap-3">
        {token && profileData ? (
          renderProfile()
        ) : (
          <>
            <Link to="/auth/signin">
              <button className="px-5 py-2 bg-black rounded-full text-white text-sm cursor-pointer">
                Sign in
              </button>
            </Link>
            <Link to="/auth/signup">
              <button className="px-5 py-2 border rounded-full text-sm text-gray-700 cursor-pointer">
                Sign Up
              </button>
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden text-gray">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          <HiOutlineBars3 className="size-7" />
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-center gap-4 py-6 md:hidden text-gray">
          <Link onClick={() => setMenuOpen(false)} to="/features">
            Features
          </Link>
          <Link onClick={() => setMenuOpen(false)} to="/pricing">
            Pricing
          </Link>
          <Link onClick={() => setMenuOpen(false)} to="/about">
            About Us
          </Link>
          {token && profileData ? (
            <div onClick={() => setMenuOpen(false)}>
              {renderProfile()}
            </div>
          ) : (
            <>
              <Link onClick={() => setMenuOpen(false)} to="/auth/signin">
                <button className="px-5 py-2 bg-black rounded-full text-white text-sm cursor-pointer">
                  Sign in
                </button>
              </Link>
              <Link onClick={() => setMenuOpen(false)} to="/auth/signup">
                <button className="px-5 py-2 border rounded-full text-sm text-gray-700 cursor-pointer">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
