// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { apiPost } from "../../lib/api";
// import toast from "react-hot-toast";
// import { Eye, EyeOff } from "lucide-react";

// const initialForm = {
//   firstName: "",
//   lastName: "",
//   email: "",
//   password: "",
// };

// const SignupPage = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState(initialForm);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData((current) => ({
//       ...current,
//       [name]: value,
//     }));
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const trimmedData = {
//       firstName: formData.firstName.trim(),
//       lastName: formData.lastName.trim(),
//       email: formData.email.trim(),
//       password: formData.password,
//     };

//     if (!trimmedData.firstName || !trimmedData.lastName || !trimmedData.email || !trimmedData.password) {
//       toast.error("Please fill in all fields.");
//       return;
//     }
//     if (formData.password.length < 6) {
//       toast.error("Password must be at least 6 characters long.");
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const response = await apiPost("/user/auth/register", trimmedData);
//       toast.success(response?.message || "User registered successfully.");
//       setFormData(initialForm);

//       setTimeout(() => {
//         // navigate("/auth/signin");
//         navigate("/auth/verify-otp");
//       }, 1200);
//     } catch (error) {
//       const message = error.response?.data?.message || error.message || "Unable to create your account.";
//       toast.error(message);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 font-inter">
//       <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 sm:p-8">
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div>
//               <label className="text-sm text-black font-semibold">First Name</label>
//               <input
//                 name="firstName"
//                 type="text"
//                 value={formData.firstName}
//                 onChange={handleChange}
//                 placeholder="First name"
//                 className="w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm text-black placeholder-gray-400 mt-2"
//               />
//             </div>

//             <div>
//               <label className="text-sm text-black font-semibold">Last Name</label>
//               <input
//                 name="lastName"
//                 type="text"
//                 value={formData.lastName}
//                 onChange={handleChange}
//                 placeholder="Last name"
//                 className="w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm text-black placeholder-gray-400 mt-2"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="text-sm text-black font-semibold">Email</label>
//             <input
//               name="email"
//               type="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Enter your email"
//               className="w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm text-black placeholder-gray-400 mt-2"
//             />
//           </div>

//           {/* Password Field with Show/Hide Icon */}
//           <div>
//             <label className="text-sm text-black font-semibold">Set Password</label>
//             <div className="relative mt-2">
//               <input
//                 name="password"
//                 type={showPassword ? "text" : "password"}
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="Enter a strong password"
//                 className="w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm text-black placeholder-gray-400 transition-all"
//               />
//               <button
//                 type="button"
//                 onClick={togglePasswordVisibility}
//                 className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-black transition-colors cursor-pointer"
//               >
//                 {showPassword ? (
//                   <Eye size={18} />

//                 ) : (
//                   <EyeOff size={18} />
//                 )}
//               </button>
//             </div>
//           </div>

//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="w-full bg-black text-white py-2.5 rounded-md text-sm font-medium hover:opacity-90 transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-70 mt-2"
//           >
//             {isSubmitting ? "Creating Account..." : "Create Account"}
//           </button>
//         </form>

//         <div className="mt-6 flex items-center my-5">
//           <div className="flex-1 bg-gray-300 h-px"></div>
//           <span className="px-3 text-xs text-gray-400">Or</span>
//           <div className="flex-1 bg-gray-300 h-px"></div>
//         </div>

//         <button
//           type="button"
//           className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-md py-2.5 cursor-pointer hover:bg-gray-50 transition"
//         >
//           <img
//             src="https://www.svgrepo.com/show/475656/google-color.svg"
//             alt="google"
//             className="w-4 h-4"
//           />
//           <span className="text-sm text-black font-medium">Continue with Google</span>
//         </button>

//         <div className="mt-6 space-y-2 text-center text-sm">
//           <Link to="/auth/signin" className="block text-black font-semibold">
//             Already have an account? <span className="text-blue-500 hover:underline">Sign in</span>
//           </Link>
//           <Link to="/" className="block text-gray-500 font-semibold hover:text-black hover:underline">
//             Back to home
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignupPage;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiPost } from "../../lib/api";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

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

  // Updates form state dynamically based on input name
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  // Toggles password visibility (show/hide)
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
      // API call to register the user
      const response = await apiPost("/user/auth/register", trimmedData);

      toast.success(response?.message || "User registered successfully.");

      /**
       * On successful registration, navigate to the OTP verification page.
       * CRITICAL: We pass the 'email' in the 'state' object so the OTP page
       * knows where to send/verify the code.
       */
      setTimeout(() => {
        navigate("/auth/verify-otp", {
          state: { email: trimmedData.email }
        });
      }, 1200);

    } catch (error) {
      // Extract error message from API response or fallback to default
      const message = error.response?.data?.message || error.message || "Unable to create your account.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 font-inter py-10">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 sm:p-8">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
          <p className="text-sm text-gray-500 mt-1">Join us today!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* First Name Field */}
            <div>
              <label className="text-sm text-black font-semibold">First Name</label>
              <input
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First name"
                className="w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm text-black placeholder-gray-400 mt-2"
              />
            </div>

            {/* Last Name Field */}
            <div>
              <label className="text-sm text-black font-semibold">Last Name</label>
              <input
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last name"
                className="w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm text-black placeholder-gray-400 mt-2"
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label className="text-sm text-black font-semibold">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm text-black placeholder-gray-400 mt-2"
            />
          </div>

          {/* Password Field with Toggle Visibility Icon */}
          <div>
            <label className="text-sm text-black font-semibold">Set Password</label>
            <div className="relative mt-2">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter a strong password"
                className="w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm text-black placeholder-gray-400 transition-all"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-black transition-colors cursor-pointer"
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black text-white py-2.5 rounded-md text-sm font-medium hover:opacity-90 transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-70 mt-2"
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Decorative Divider */}
        <div className="mt-6 flex items-center my-5">
          <div className="flex-1 bg-gray-300 h-px"></div>
          <span className="px-3 text-xs text-gray-400 uppercase">Or</span>
          <div className="flex-1 bg-gray-300 h-px"></div>
        </div>

        {/* Social Auth Option */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-md py-2.5 cursor-pointer hover:bg-gray-50 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            className="w-4 h-4"
          />
          <span className="text-sm text-black font-medium">Continue with Google</span>
        </button>

        {/* Footer Links */}
        <div className="mt-6 space-y-2 text-center text-sm">
          <p className="text-black font-semibold">
            Already have an account?{" "}
            <Link to="/auth/signin" className="text-blue-500 hover:underline">
              Sign in
            </Link>
          </p>
          <Link to="/" className="block text-gray-500 font-semibold hover:text-black hover:underline">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
