import { Link, useLocation } from "react-router";
import logo from "../../assets/images/logo.png";
import { useState } from "react";
import video from "../../assets/videos/video.mp4";

const Navbar = () => {
  const [showVideo, setShowVideo] = useState(false);

  const loaction = useLocation();

  return (
    <nav className="flex justify-between items-center shadow pt-8 pb-6 px-20 font-inter mb-15 ">
      {/* Logo & Name */}
      <div
        onClick={() => setShowVideo(true)}
        className="flex items-center justify-between gap-2 cursor-pointer"
      >
        <img src={logo} alt="logo" className="w-8 h-8 object-contain" />
        <span className="text-[32px] font-semibold">Algorithms AI</span>
      </div>

      {/* Play Video part */}
      {/* {showVideo && (
        <div className="fixed inset-0 bg-white bg-opacity-70 flex items-center justify-center z-50 cursor-pointer">
          <div className="relative bg-black p-2 rounded-lg">
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-2 right-4 text-white text-xl font-bold"
            >
              ✕
            </button>

            <video width="600" controls autoPlay>
              <source src={video} type="video/mp4" />
            </video>
          </div>
        </div>
      )} */}

      {/* Navigation Links */}
      <div className="flex items-center gap-8 text-gray text-base font-normal">
        <Link
          to="/features"
          className={location.pathname === "/features" ? "text-black" : ""}
        >
          Features
        </Link>
        <Link
          to="/pricing"
          className={location.pathname === "/pricing" ? "text-black" : ""}
        >
          Pricing
        </Link>
        <Link
          to="/about"
          className={location.pathname === "/about" ? "text-black" : ""}
        >
          About Us
        </Link>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-3">
        <button className="px-8 py-3 bg-black rounded-full text-[#D8D8D8]  cursore-pointer ">
          Sign in
        </button>
        <button className="px-8 py-3 border border-[#D8D8D8] rounded-full text-[#34322D] cursore-pointer ">
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
