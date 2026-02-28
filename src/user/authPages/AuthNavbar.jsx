import logo from "../../assets/images/logo.png";

const AuthNavbar = ({ title, subTitle, para }) => {
  return (
    <div className="text-center mb-6">
      <div className="flex items-center gap-2 cursor-pointer w-fit mx-auto">
        <img src={logo} alt="logo" className="w-7 h-7 md:w-8 md:h-8" />
        <span className="text-xl md:text-2xl lg:text-[28px] font-semibold text-black">
          Algorithms AI
        </span>
      </div>
      <p className="text-black text-2xl mt-1">{title}</p>
      <p className="text-gray text-sm mt-1">{subTitle}</p>
      <p className="text-gray text-sm mt-1"> {para}</p>
    </div>
  );
};

export default AuthNavbar;
