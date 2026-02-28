import { Link } from "react-router";
import AuthNavbar from "./AuthNavbar";

const SignupPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 font-inter font-bold cursor-pointer">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 sm:p-8">
        <AuthNavbar
          title={"Create new Account"}
          subTitle={"Start with Quantam AI "}
        />
        {/* Form */}
        <div className="space-y-4">
          <label className="text-sm text-black font-semibold">Name</label>
          <input
            type="email"
            placeholder="Enter your name"
            className="w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm text-gray-200 font-semibold  placeholder-gray-400  placeholder:font-semibold  mt-2"
          />
          <label className="text-sm text-black font-semibold">Email</label>
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm text-gray-200 font-semibold  placeholder-gray-400  placeholder:font-semibold  mt-2"
          />
          <label className="text-sm text-black font-semibold">
            Set Password
          </label>

          <input
            type="password"
            placeholder="XXXXXX"
            className="w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm text-gray-200 font-extrabold  placeholder-gray-400 placeholder:font-semibold   mt-2"
          />
        </div>

        {/* Forgot Password */}
        <div className="text-right mt-2 cursor-pointer">
          <Link
            to="/auth/forgot-password"
            className="text-xs text-gray-500 hover:text-black"
          >
            Forgot password?
          </Link>
        </div>

        {/* Buttons */}
        <div className="mt-5 space-y-3 ">
          <Link to={"/auth/signIn-successful"} className="block">
            <button className="w-full bg-black text-white py-2.5 rounded-md text-sm font-medium hover:opacity-90 transition cursor-pointer">
              Continue
            </button>
          </Link>

          <Link to={"#"} className="block">
            <button className="w-full py-2.5 rounded-md text-sm font-medium hover:bg-gray-50 transition text-black border border-black cursor-pointer">
              Create Account
            </button>
          </Link>
        </div>

        {/* Divider */}
        <div className="flex items-center my-5">
          <div className="flex-1 bg-gray-300"></div>
          <span className="px-3 text-xs text-gray-400">Or</span>
          <div className="flex-1 bg-gray-300"></div>
        </div>

        {/* Google Button */}
        <div className="flex items-center justify-center gap-2 border border-gray-200 rounded-md py-2.5 cursor-pointer hover:bg-gray-50 transition">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            className="w-4 h-4"
          />
          <span className="text-sm text-black">Continue with Google</span>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
