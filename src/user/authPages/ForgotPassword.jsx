// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { apiPost } from "../../lib/api";
// import toast from "react-hot-toast";

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!email) {
//       toast.error("Please enter your email address.");
//       return;
//     }

//     setIsSubmitting(true);

//     try {

//       const response = await apiPost("/user/auth/forgot-password", { email: email.trim() });

//       toast.success(response?.message || "Reset link sent to your email!");
//       setEmail("");

//     } catch (error) {
//       const message =
//         error.response?.data?.message ||
//         error.message ||
//         "Something went wrong. Please try again.";
//       toast.error(message);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 font-inter">
//       <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 sm:p-8">
//         <div className="text-center mb-8">
//           <h2 className="text-2xl font-bold text-black">Forgot Password?</h2>
//           <p className="text-sm text-gray-500 mt-2">
//             Enter your email and we'll send you a link to reset your password.
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label className="text-sm text-black font-semibold">Email Address</label>
//             <input
//               type="email"
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Enter your email"
//               className="w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm text-black placeholder-gray-400 mt-2 transition-all"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="w-full bg-black text-white py-2.5 rounded-md text-sm font-medium hover:opacity-90 transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
//           >
//             {isSubmitting ? "Sending Link..." : "Send Reset Link"}
//           </button>
//         </form>

//         <div className="mt-8 text-center text-sm">
//           <Link
//             to="/auth/signin"
//             className="text-gray-500 font-medium hover:text-black hover:underline flex items-center justify-center gap-2"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
//             Back to Sign In
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiPost } from "../../lib/api"; // Integrated from your api logic
import toast from "react-hot-toast";
import { Mail, ArrowLeft } from "lucide-react"; // Consistent icon usage

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  /**
   * Handles the form submission to request a password reset OTP.
   * On success, it passes the email and 'type' to the OTP verification page.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim();

    // Basic validation
    if (!trimmedEmail) {
      toast.error("Please enter your email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      /**
       * API call using your custom apiPost utility.
       * This automatically handles baseURL, timeout, and headers.
       */
      const response = await apiPost("/user/auth/forgot-password", {
        email: trimmedEmail
      });

      toast.success(response?.message || "Reset code sent to your email!");

      /**
       * NAVIGATION LOGIC:
       * IMPORTANT: We must pass 'type: "forgot"' so the OTPVerification component 
       * knows to call the correct endpoint and navigate to ResetPassword afterward.
       */
      navigate("/auth/verify-otp", {
        state: {
          email: trimmedEmail,
          type: "forgot" // This is the crucial fix
        }
      });

    } catch (error) {
      // Professional error extraction
      const message = error.response?.data?.message || error.message || "Failed to send reset code.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 font-inter">
      {/* Centralized Card Component */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 sm:p-10 border border-gray-100">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-50 rounded-full mb-4">
            <Mail className="text-black" size={32} />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Forgot Password?</h2>
          <p className="text-sm text-gray-500 mt-3 leading-relaxed">
            No worries! Enter your email below and we'll send you a 6-digit code to reset your account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-sm font-bold text-gray-700 block mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm bg-gray-50 focus:bg-white transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black text-white py-3.5 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed shadow-lg"
          >
            {isSubmitting ? "Sending Code..." : "Send Reset Code"}
          </button>
        </form>

        <div className="mt-10 text-center border-t border-gray-100 pt-6">
          <Link
            to="/auth/signin"
            className="inline-flex items-center text-xs text-gray-400 font-bold hover:text-black transition-all gap-2 uppercase tracking-tighter group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
