// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { apiPost } from "../../lib/api";
// import toast from "react-hot-toast";

// const initialForm = {
//   email: "",
//   password: "",
// };

// const SigninPage = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState(initialForm);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData((current) => ({
//       ...current,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const trimmedData = {
//       email: formData.email.trim(),
//       password: formData.password,
//     };

//     // Validation
//     if (!trimmedData.email || !trimmedData.password) {
//       toast.error("Please enter both email and password.");
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       // Real API Integration
//       const response = await apiPost("/user/auth/login", trimmedData);

//       // Success Toast
//       toast.success(response?.message || "Login successful!");

//       setFormData(initialForm);

//       // Redirect to Dashboard
//       setTimeout(() => {
//         navigate("/user/newtask");
//       }, 1000);

//     } catch (error) {
//       const message =
//         error.response?.data?.message ||
//         error.message ||
//         "Invalid credentials, please try again.";

//       toast.error(message);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 font-inter">
//       <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 sm:p-8">
//         <h2 className="text-2xl font-bold text-center mb-6 text-black">Sign In</h2>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* Email Field */}
//           <div>
//             <label className="text-sm text-black font-semibold">Email</label>
//             <input
//               name="email"
//               type="email"
//               required
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Enter your email"
//               className="w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm text-black placeholder-gray-400 mt-2 transition-all"
//             />
//           </div>

//           {/* Password Field */}
//           <div>
//             <label className="text-sm text-black font-semibold">Password</label>
//             <input
//               name="password"
//               type="password"
//               required
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="XXXXXX"
//               className="w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm text-black placeholder-gray-400 mt-2 transition-all"
//             />
//           </div>

//           {/* Login Button */}
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="w-full bg-black text-white py-2.5 rounded-md text-sm font-medium hover:opacity-90 transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-70 mt-2"
//           >
//             {isSubmitting ? "Signing in..." : "Sign In"}
//           </button>
//         </form>

//         {/* Divider */}
//         <div className="mt-6 flex items-center my-5">
//           <div className="flex-1 bg-gray-300 h-px"></div>
//           <span className="px-3 text-xs text-gray-400 uppercase">Or</span>
//           <div className="flex-1 bg-gray-300 h-px"></div>
//         </div>

//         {/* Social Login */}
//         <button
//           type="button"
//           className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-md py-2.5 cursor-pointer hover:bg-gray-50 transition-all"
//         >
//           <img
//             src="https://www.svgrepo.com/show/475656/google-color.svg"
//             alt="google"
//             className="w-4 h-4"
//           />
//           <span className="text-sm text-black font-medium">Continue with Google</span>
//         </button>

//         {/* Links Section */}
//         <div className="mt-8 space-y-3 text-center text-sm">
//           <p className="text-gray-600">
//             Are you not registered?{" "}
//             <Link
//               to="/auth/signup"
//               className="text-blue-500 font-semibold hover:text-blue-600 hover:underline transition-all"
//             >
//               Sign up
//             </Link>
//           </p>

//           <Link
//             to="/"
//             className="block text-gray-500 font-medium hover:text-black hover:underline transition-all"
//           >
//             Back to home
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SigninPage;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiPost } from "../../lib/api";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

const initialForm = {
  email: "",
  password: "",
};

const SigninPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedData = {
      email: formData.email.trim(),
      password: formData.password,
    };

    if (!trimmedData.email || !trimmedData.password) {
      toast.error("Please enter both email and password.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await apiPost("/user/auth/login", trimmedData);
      toast.success(response?.message || "Login successful!");

      setFormData(initialForm);

      setTimeout(() => {
        navigate("/user/newtask");
      }, 1200);

    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Invalid credentials, please try again.";

      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 font-inter">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-black">Sign In</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div>
            <label className="text-sm text-black font-semibold">Email</label>
            <input
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm text-black placeholder-gray-400 mt-2 transition-all"
            />
          </div>

          {/* Password Field with Show/Hide and Forgot Password Link */}
          <div>
            <div className="flex justify-between items-center">
              <label className="text-sm text-black font-semibold">Password</label>
            </div>
            <div className="relative mt-2">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm text-black placeholder-gray-400 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-black transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="mt-2">
              <Link
                to="/auth/forgot-password"
                className="text-xs text-blue-500 hover:underline font-medium"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black text-white py-2.5 rounded-md text-sm font-medium hover:opacity-90 transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-70 mt-2"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Divider */}
        <div className="mt-6 flex items-center my-5">
          <div className="flex-1 bg-gray-300 h-px"></div>
          <span className="px-3 text-xs text-gray-400 uppercase">Or</span>
          <div className="flex-1 bg-gray-300 h-px"></div>
        </div>

        {/* Social Login */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-md py-2.5 cursor-pointer hover:bg-gray-50 transition-all"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            className="w-4 h-4"
          />
          <span className="text-sm text-black font-medium">Continue with Google</span>
        </button>

        {/* Footer Links */}
        <div className="mt-8 space-y-3 text-center text-sm">
          <p className="text-gray-600 font-medium">
            Are you not registered?{" "}
            <Link
              to="/auth/signup"
              className="text-blue-500 font-semibold hover:text-blue-600 hover:underline transition-all"
            >
              Sign up
            </Link>
          </p>

          <Link
            to="/"
            className="block text-gray-500 font-medium hover:text-black hover:underline transition-all"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
