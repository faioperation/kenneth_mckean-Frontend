import { Link } from "react-router";
import AuthNavbar from "./AuthNavbar";

const ForgotPassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 font-inter font-bold">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 sm:p-8">
        <AuthNavbar
          title={"Forgot Password?"}
          subTitle={"Please enter your email to get verification code"}
        />

        {/* From */}
        <label className="text-sm text-black font-semibold">Email</label>
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm text-gray-200 font-semibold  placeholder-gray-400  placeholder:font-semibold  mt-2"
        />
        <Link to={"/auth/verify"}>
          <button className="w-full bg-black text-white py-2.5 rounded-md text-sm font-medium hover:opacity-90 transition cursor-pointer mt-4">
            Continue
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
