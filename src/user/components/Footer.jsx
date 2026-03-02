import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="font-inter text-gray-500 text-sm md:text-base">
      <div className="px-6 md:px-12 lg:px-20">
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-200 py-6 gap-3 md:gap-0 text-center md:text-left">
          <p>
            ©2026 All Rights Reserved by{" "}
            <span className="text-black font-semibold">Algorithms AI</span>
          </p>

         <Link to="/policy">
          <span className="cursor-pointer hover:text-black transition">
            Privacy & Policy
          </span></Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
