import logo from "../../assets/images/logo.png";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center shadow pt-8 pb-6 px-20 font-inter ">
      {/* Logo & Name */}
      <div className="flex items-center justify-between gap-2">
        <img src={logo} alt="logo" className="w-8 h-8 object-contain" />
        <span className="text-[32px] font-semibold">Algorithms AI</span>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-8 text-gray text-base font-normal">
        <a href="/features" className="hover:text-black transition">
          Features
        </a>
        <a href="/pricing" className="hover:text-black transition">
          Pricing
        </a>
        <a href="/about" className="hover:text-black transition">
          About Us
        </a>
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
