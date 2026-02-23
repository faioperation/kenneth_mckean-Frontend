import logo from "../../assets/images/logo.png";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center shadow pt-8 pb-6 px-20">
      {/* Logo & Name */}
      <div className="flex items-center justify-between gap-2">
        <img src={logo} alt="logo" className="w-8 h-8 object-contain" />
        <span className="text-[32px] font-semibold">Algorithms AI</span>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-8 text-gray-600 text-sm">
        <a href="#" className="hover:text-black transition">
          Features
        </a>
        <a href="#" className="hover:text-black transition">
          Pricing
        </a>
        <a href="#" className="hover:text-black transition">
          About Us
        </a>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-3">
        <button className="px-4 py-1.5 bg-black text-white rounded-full text-sm hover:opacity-90">
          Sign in
        </button>
        <button className="px-4 py-1.5 border border-gray-300 rounded-full text-sm hover:bg-gray-100">
          Sign Up
        </button>
      </div>
    </nav>
 
  );
};

export default Navbar;
