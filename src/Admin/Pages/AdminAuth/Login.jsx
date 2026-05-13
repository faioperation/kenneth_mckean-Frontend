import { useState } from "react";
import AuthContainer from "./AuthContainer";
import { Link } from "react-router";
import { apiPost } from "../../../lib/api";
import toast from "react-hot-toast";
import { tokenStorage } from "../../../lib/tokenStorage";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // const navigate = useNavigate();
  const handleLogin = async (e) => {
    e?.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast.error("Email and password required");
      return;
    }

    setLoading(true);

    try {
      const res = await apiPost("/admin/auth/login", {
        email: email.trim(),
        password,
      });

      const token = res?.data?.tokens?.accessToken;
      const user = res?.data?.user;

      tokenStorage.setAccessToken(token);
      tokenStorage.setUser(user);

      toast(res?.message || "Login successful");

      // navigate("/admin/overview");
      window.location.href = "/admin/overview";
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContainer>
      <div className="mb-8 text-center">
        <h3 className="text-2xl font-bold text-[#4D81F5] tracking-tight">Log In to Account</h3>
        <p className="text-sm text-gray-400 mt-2">Log In to your admin account</p>
      </div>

      <form onSubmit={handleLogin}>
        <div className="space-y-5">
        {/* Email Input */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">Email Address</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
              <FiMail size={18} />
            </div>
            <input
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-[#1f2937] text-white border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder-gray-500 shadow-sm"
            />
          </div>
        </div>

        {/* Password Input */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">Password</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
              <FiLock size={18} />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-11 pr-12 py-3 bg-[#1f2937] text-white border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder-gray-500 shadow-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-200 transition-colors focus:outline-none"
            >
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end mt-3 mb-6">
        <Link to="/admin/forgot-password">
          <button type="button" className="text-sm text-blue-400 hover:text-blue-300 hover:underline transition-colors focus:outline-none">
            Forgot Password?
          </button>
        </Link>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white font-medium py-3 rounded-xl hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/20 active:scale-[0.98] transition-all disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Logging in...
          </span>
        ) : (
          "Sign In"
        )}
      </button>
      </form>
    </AuthContainer>
  );
}
