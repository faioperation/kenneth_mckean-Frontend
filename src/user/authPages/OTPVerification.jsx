// import { useRef, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { apiPost } from "../../lib/api";
// import toast from "react-hot-toast";

// /**
//  * Reusable OTP Verification Component
//  * @param {string} type - Can be "forgot" (for password reset) or "signup" (for email verification)
//  */
// const OTPVerification = ({ type = "signup" }) => {
//     const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const inputsRef = useRef([]);
//     const navigate = useNavigate();
//     const location = useLocation();

//     // Extract email passed from the previous page's state
//     const email = location.state?.email || "";

//     const handleChange = (value, index) => {
//         // Only allow numeric input
//         if (!/^[0-9]?$/.test(value)) return;

//         const newOtp = [...otp];
//         newOtp[index] = value;
//         setOtp(newOtp);

//         // Auto-focus next input field
//         if (value && index < 5) {
//             inputsRef.current[index + 1].focus();
//         }
//     };

//     const handleKeyDown = (e, index) => {
//         // Move focus to previous input on backspace if current field is empty
//         if (e.key === "Backspace" && !otp[index] && index > 0) {
//             inputsRef.current[index - 1].focus();
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const otpString = otp.join("");

//         // Validation: Check if OTP is complete
//         if (otpString.length < 6) {
//             toast.error("Please enter the full 6-digit OTP.");
//             return;
//         }

//         // Validation: Ensure email exists
//         if (!email) {
//             toast.error("Email not found. Please try again from the beginning.");
//             return;
//         }

//         setIsSubmitting(true);

//         // Select API endpoint based on the verification type
//         const endpoint = type === "forgot"
//             ? "/user/auth/verify-forgot-password"
//             : "/user/auth/verify-otp";

//         try {
//             const response = await apiPost(endpoint, {
//                 email: email,
//                 otp: otpString,
//             });

//             toast.success(response?.message || "OTP Verified Successfully!");

//             // Navigation logic based on type
//             if (type === "forgot") {
//                 // If password reset, navigate to reset password page
//                 navigate("/auth/reset-password", { state: { email, otp: otpString } });
//             } else {
//                 // If signup verification, navigate to dashboard/new task
//                 navigate("/user/newtask");
//             }
//         } catch (error) {
//             const message = error.response?.data?.message || "Invalid OTP, please try again.";
//             toast.error(message);
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 font-inter">
//             <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 sm:p-8">
//                 <div className="text-center mb-8">
//                     <h2 className="text-2xl font-bold text-black">
//                         {type === "forgot" ? "Verify Reset Code" : "Verify Your Email"}
//                     </h2>
//                     <p className="text-sm text-gray-500 mt-2">
//                         We've sent a 6-digit code to <br />
//                         <span className="font-semibold text-black">{email || "your email"}</span>
//                     </p>
//                 </div>

//                 <form onSubmit={handleSubmit}>
//                     <div className="flex justify-center gap-2 sm:gap-3 mb-8">
//                         {otp.map((digit, index) => (
//                             <input
//                                 key={index}
//                                 type="text"
//                                 maxLength="1"
//                                 value={digit}
//                                 ref={(el) => (inputsRef.current[index] = el)}
//                                 onChange={(e) => handleChange(e.target.value, index)}
//                                 onKeyDown={(e) => handleKeyDown(e, index)}
//                                 className="w-10 h-10 sm:w-12 sm:h-12 border border-gray-300 rounded-md text-center text-lg font-bold focus:outline-none focus:ring-2 focus:ring-black transition-all"
//                             />
//                         ))}
//                     </div>

//                     <button
//                         type="submit"
//                         disabled={isSubmitting}
//                         className="w-full bg-black text-white py-2.5 rounded-md text-sm font-medium hover:opacity-90 transition cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
//                     >
//                         {isSubmitting ? "Verifying..." : "Verify OTP"}
//                     </button>
//                 </form>

//                 <div className="mt-6 text-center">
//                     <button
//                         onClick={() => navigate(-1)}
//                         className="text-sm text-gray-500 hover:text-black font-medium transition"
//                     >
//                         Back to previous page
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default OTPVerification;

import { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { apiPost } from "../../lib/api";
import toast from "react-hot-toast";

/**
 * Reusable OTP Verification Component
 * @param {string} type - Can be "forgot" (for password reset) or "signup" (for email verification)
 */
const OTPVerification = ({ type = "signup" }) => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const inputsRef = useRef([]);
    const navigate = useNavigate();
    const location = useLocation();

    // Extract email passed from the previous page's state
    const email = location.state?.email || "";

    // Security Check: Redirect if email is not found in state
    useEffect(() => {
        if (!email) {
            toast.error("Invalid access. Please try again.");
            // Redirect to signup or forgot-password based on context
            const redirectPath = type === "forgot" ? "/auth/forgot-password" : "/auth/signup";
            navigate(redirectPath);
        }
    }, [email, navigate, type]);

    const handleChange = (value, index) => {
        // Only allow numeric input
        if (!/^[0-9]?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input field
        if (value && index < 5) {
            inputsRef.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        // Move focus to previous input on backspace if current field is empty
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputsRef.current[index - 1].focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const otpString = otp.join("");

        // Validation: Check if OTP is complete
        if (otpString.length < 6) {
            toast.error("Please enter the full 6-digit OTP.");
            return;
        }

        setIsSubmitting(true);

        // Select API endpoint based on the verification type
        const endpoint = type === "forgot"
            ? "/user/auth/verify-forgot-password"
            : "/user/auth/verify-otp";

        try {
            const response = await apiPost(endpoint, {
                email: email,
                otp: otpString,
            });

            toast.success(response?.message || "OTP Verified Successfully!");

            // Navigation logic based on type
            if (type === "forgot") {
                // Navigate to reset password page with email and otp
                navigate("/auth/reset-password", { state: { email, otp: otpString } });
            } else {
                // Navigate to dashboard or success page
                navigate("/user/newtask");
            }
        } catch (error) {
            const message = error.response?.data?.message || "Invalid OTP, please try again.";
            toast.error(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 font-inter">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-10 border border-gray-200 text-center">
                <div className="mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        {type === "forgot" ? "Verify Code" : "Check Your Email"}
                    </h2>
                    <p className="text-sm text-gray-500 mt-3 leading-relaxed">
                        We've sent a 6-digit verification code to <br />
                        <span className="font-semibold text-black break-all">{email || "your email"}</span>
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex justify-center gap-2 sm:gap-3">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                inputMode="numeric"
                                autoComplete="one-time-code"
                                maxLength="1"
                                value={digit}
                                ref={(el) => (inputsRef.current[index] = el)}
                                onChange={(e) => handleChange(e.target.value, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                className="w-10 h-12 sm:w-14 sm:h-16 border-2 border-gray-200 rounded-xl text-center text-xl font-bold focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all bg-gray-50 focus:bg-white"
                            />
                        ))}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-black text-white py-3.5 rounded-xl text-sm font-bold uppercase tracking-wider hover:bg-gray-800 transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? "Verifying..." : "Verify OTP"}
                    </button>
                </form>

                <div className="mt-8 text-center border-t pt-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-sm text-gray-500 hover:text-black font-semibold transition flex items-center justify-center gap-2 w-full"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                        Back to Previous Page
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OTPVerification;