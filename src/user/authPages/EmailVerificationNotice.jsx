// import { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { apiPost } from "../../lib/api";
// import toast from "react-hot-toast";

// const EmailVerificationNotice = () => {
//     const navigate = useNavigate();
//     const location = useLocation();

//     // Extract the email address from navigation state; fallback to an empty string
//     const email = location.state?.email || "";
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     /**
//      * Triggers the OTP delivery to the user's email via the API
//      * and navigates to the OTP verification screen on success.
//      */
//     const handleSendOtp = async () => {
//         // Validation: Ensure email exists before making the request
//         if (!email) {
//             toast.error("Email not found. Please sign up again.");
//             return;
//         }

//         setIsSubmitting(true);
//         try {
//             // API call to trigger the OTP generation and delivery
//             const response = await apiPost("/user/auth/send-otp", { email });

//             toast.success(response?.message || "Verification code sent to your email.");

//             // Redirect to the OTP input page after a brief delay for better UX
//             setTimeout(() => {
//                 navigate("/auth/verify-otp", { state: { email } });
//             }, 1000);

//         } catch (error) {
//             // Extract and display the specific error message from the server
//             const message = error.response?.data?.message || "Failed to send OTP. Please try again.";
//             toast.error(message);
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa] px-4 font-inter">
//             {/* Main Content Card - Responsive width and padding */}
//             <div className="w-full max-w-[450px] bg-white rounded-3xl shadow-sm p-8 sm:p-12 border border-gray-100">

//                 {/* Header Section */}
//                 <div className="text-center mb-8">
//                     <h2 className="text-[28px] sm:text-[32px] font-bold text-[#1a1a1a] leading-tight">
//                         Verify Your Email
//                     </h2>
//                     <p className="text-sm sm:text-base text-gray-500 mt-3">
//                         Enter your email address to receive a verification code
//                     </p>
//                 </div>

//                 {/* Email Display Section */}
//                 <div className="text-left mb-8">
//                     <label className="text-sm font-bold text-gray-800 block mb-2 px-1">
//                         Email Address
//                     </label>
//                     <div className="relative group">
//                         {/* Mail Icon Wrapper */}
//                         <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
//                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
//                                 <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
//                             </svg>
//                         </span>
//                         {/* Read-only input to show user which email is being verified */}
//                         <input
//                             type="email"
//                             value={email}
//                             readOnly
//                             className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl bg-white text-gray-700 font-medium focus:outline-none focus:border-black transition-all cursor-default"
//                             placeholder="your.email@example.com"
//                         />
//                     </div>
//                 </div>

//                 {/* Submit Action Button */}
//                 <button
//                     onClick={handleSendOtp}
//                     disabled={isSubmitting}
//                     className="w-full bg-black text-white py-4 rounded-2xl text-[15px] font-bold tracking-wide hover:bg-gray-800 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-sm mb-8 cursor-pointer"
//                 >
//                     {isSubmitting ? "Sending..." : "Verify Email"}
//                 </button>

//                 {/* Footer Navigation Link */}
//                 <div className="border-t border-gray-100 pt-6">
//                     <button
//                         onClick={() => navigate("/auth/signup")}
//                         className="text-sm text-gray-400 hover:text-black font-semibold transition-colors flex items-center justify-center gap-2 w-full group"
//                     >
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 transition-transform group-hover:-translate-x-1">
//                             <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
//                         </svg>
//                         Back to Sign In
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default EmailVerificationNotice;
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { apiPost } from "../../lib/api"; // Centralized API helper
import toast from "react-hot-toast";
import { Mail, ArrowLeft } from "lucide-react"; // Using consistent icons

const EmailVerificationNotice = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Extract state passed from Signup or other pages
    const email = location.state?.email || "";
    const type = location.state?.type || "signup";

    const [isSubmitting, setIsSubmitting] = useState(false);

    // Security Check: If someone visits this URL directly without an email
    useEffect(() => {
        if (!email) {
            toast.error("Invalid session. Please start again.");
            navigate("/auth/signup");
        }
    }, [email, navigate]);

    /**
     * Handles sending the OTP and navigating to the verification screen.
     */
    const handleSendOtp = async () => {
        if (!email) return;

        setIsSubmitting(true);
        try {
            // API call to your centralized backend logic
            const response = await apiPost("/user/auth/send-otp", { email });

            toast.success(response?.message || "Verification code sent!");

            // Navigate to OTP input with full context (email and flow type)
            navigate("/auth/verify-otp", {
                state: { email, type }
            });

        } catch (error) {
            const message = error.response?.data?.message || "Failed to send code. Please try again.";
            toast.error(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 font-inter">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 sm:p-10 border border-gray-100 text-center">

                {/* Visual Icon */}
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-50 rounded-full mb-6">
                    <Mail className="text-black" size={40} />
                </div>

                <div className="mb-8">
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Verify Your Email
                    </h2>
                    <p className="text-sm text-gray-500 mt-3 leading-relaxed">
                        We need to verify your email address <br />
                        <span className="font-bold text-black break-all">{email}</span>
                    </p>
                </div>

                <button
                    onClick={handleSendOtp}
                    disabled={isSubmitting}
                    className="w-full bg-black text-white py-4 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-all active:scale-[0.98] disabled:opacity-60 shadow-lg cursor-pointer"
                >
                    {isSubmitting ? "Sending Code..." : "Send Verification Code"}
                </button>

                <div className="mt-10 pt-6 border-t border-gray-100">
                    <button
                        onClick={() => navigate("/auth/signup")}
                        className="text-xs text-gray-400 hover:text-black font-bold uppercase tracking-tighter flex items-center justify-center gap-2 w-full transition-all group"
                    >
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Registration
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmailVerificationNotice;