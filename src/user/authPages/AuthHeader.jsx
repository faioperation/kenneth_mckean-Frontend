import logo from "../../assets/images/logo.png";

const AuthHeader = () => {
  return (
    <nav className="flex justify-between items-center shadow px-6 md:px-12 lg:px-20 py-4 font-inter fixed top-0 w-full z-50 bg-white h-25">
      {/* Logo */}
      <div className="flex items-center gap-2 cursor-pointer">
        <img src={logo} alt="logo" className="w-7 h-7 md:w-8 md:h-8" />
        <span className="text-xl md:text-2xl lg:text-[28px] font-semibold text-black">
          Algorithms AI
        </span>
      </div>
    </nav>
  );
};

export default AuthHeader;
