import { Link, useLocation } from "react-router";
import { useState } from "react";
import logo from "../../assets/images/logo.png";
import { HiOutlineBars3 } from "react-icons/hi2";

const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center shadow px-6 md:px-12 lg:px-20 py-4 font-inter fixed top-0 w-full z-50 bg-white h-25">
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

      {/* Desktop Buttons */}
      <div className="hidden md:flex items-center gap-3">
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

          <button className="px-6 py-2 bg-black text-white rounded-full">
            Sign in
          </button>
          <button className="px-6 py-2 border rounded-full">Sign Up</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
