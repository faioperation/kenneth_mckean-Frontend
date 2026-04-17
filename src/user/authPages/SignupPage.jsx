import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiPost } from "../../lib/api"; // Integrated from your api logic
import { tokenStorage } from "../../lib/tokenStorage"; // Integrated for token management
import toast from "react-hot-toast";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";

// Initial state for the registration form
const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Synchronize input changes with state
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  // Toggle password visibility (show/hide)
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Cleaning data by removing unnecessary whitespace
    const trimmedData = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      password: formData.password,
    };

    // Client-side validation: check for empty fields
    if (!trimmedData.firstName || !trimmedData.lastName || !trimmedData.email || !trimmedData.password) {
      toast.error("Please fill in all fields.");
      return;
    }

    // Client-side validation: check minimum password length
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    setIsSubmitting(true);

    try {
      /**
       * API call using your custom apiPost utility.
       * This automatically uses the baseURL and headers defined in your apiClient.
       */
      const response = await apiPost("/user/auth/register", trimmedData);

      toast.success(response?.message || "Account created! Please verify your email.");

      /**
       * REDIRECT LOGIC:
       * We navigate to the OTP verification notice page.
       * Passing the email in 'state' so the next page knows where to send/verify the OTP.
       */
      setTimeout(() => {
        navigate("/auth/verify-email-notice", {
          state: { email: trimmedData.email }
        });
      }, 1200);

    } catch (error) {
      // Professional error handling using the response interceptor logic
      const message = error.response?.data?.message || error.message || "Unable to create your account.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8 font-inter">
      {/* Main Responsive Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-10">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Create Account</h2>
          <p className="text-sm text-gray-500 mt-2">Enter your details to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* First & Last Name Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-bold text-gray-700 block mb-1.5">First Name</label>
              <div className="relative">
                <input
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="first name"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm bg-gray-50 focus:bg-white transition-all"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-bold text-gray-700 block mb-1.5">Last Name</label>
              <div className="relative">
                <input
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="last name"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm bg-gray-50 focus:bg-white transition-all"
                />
              </div>
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label className="text-sm font-bold text-gray-700 block mb-1.5">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Mail size={18} />
              </div>
              <input
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm bg-gray-50 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="text-sm font-bold text-gray-700 block mb-1.5">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Lock size={18} />
              </div>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm bg-gray-50 focus:bg-white transition-all"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-black cursor-pointer transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black text-white py-3.5 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed shadow-lg"
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Divider */}
        <div className="mt-8 flex items-center">
          <div className="flex-1 bg-gray-200 h-px"></div>
          <span className="px-4 text-[10px] text-gray-400 uppercase font-bold tracking-widest">Or signup with</span>
          <div className="flex-1 bg-gray-200 h-px"></div>
        </div>

        {/* Social Auth */}
        <button
          type="button"
          className="mt-6 w-full flex items-center justify-center gap-3 border-2 border-gray-100 rounded-xl py-3 cursor-pointer hover:bg-gray-50 transition-all active:scale-[0.98]"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span className="text-sm text-gray-700 font-bold">Google</span>
        </button>

        {/* Footer Links */}
        <div className="mt-10 text-center space-y-3">
          <p className="text-sm text-gray-600 font-medium">
            Already have an account?{" "}
            <Link to="/auth/signin" className="text-blue-600 font-bold hover:underline underline-offset-4">
              Sign in
            </Link>
          </p>
          <Link to="/" className="inline-flex items-center text-xs text-gray-400 font-bold hover:text-black transition-all gap-1 uppercase tracking-tighter">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;