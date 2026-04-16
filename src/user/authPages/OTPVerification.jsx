import { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { apiPost } from "../../lib/api"; // Centralized API helper
import { tokenStorage } from "../../lib/tokenStorage"; // Token management logic
import toast from "react-hot-toast";

/**
 * Reusable OTP Verification Component
 * Handles both Signup and Forgot Password flows dynamically.
 */
const OTPVerification = () => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const inputsRef = useRef([]);
    const navigate = useNavigate();
    const location = useLocation();

    // Dynamically extract email and flow type from navigation state
    const email = location.state?.email || "";
    const type = location.state?.type || "signup"; // Crucial: Detects if it's 'forgot' or 'signup'

    // Security Check: Redirect if access is direct (no email in state)
    useEffect(() => {
        if (!email) {
            toast.error("Unauthorized access. Please start the process again.");
            const redirectPath = type === "forgot" ? "/auth/forgot-password" : "/auth/signup";
            navigate(redirectPath);
        }
    }, [email, navigate, type]);

    const handleChange = (value, index) => {
        if (!/^[0-9]?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            inputsRef.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        // Move focus to previous input on backspace
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputsRef.current[index - 1].focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const otpString = otp.join("");

        if (otpString.length < 6) {
            toast.error("Please enter the complete 6-digit code.");
            return;
        }

        setIsSubmitting(true);

        /**
         * Select endpoint based on the flow type
         * type "forgot" uses password reset verification
         * type "signup" uses account verification
         */
        const endpoint = type === "forgot"
            ? "/user/auth/verify-forgot-password"
            : "/user/auth/verify-otp";

        try {
            const response = await apiPost(endpoint, {
                email: email,
                otp: otpString,
            });

            toast.success(response?.message || "Verification successful!");

            // Automatically store token if backend provides it (common for signup)
            const token = response?.data?.accessToken || response?.accessToken;
            if (token) {
                tokenStorage.setAccessToken(token);
            }

            // Route user based on flow type
            if (type === "forgot") {
                // For password reset, go to update password page
                navigate("/auth/reset-password", { state: { email, otp: otpString } });
            } else {
                // For signup, go to signin
                navigate("/auth/signin");
            }
        } catch (error) {
            const message = error.response?.data?.message || "Invalid or expired OTP.";
            toast.error(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 font-inter">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 sm:p-10 border border-gray-100 text-center">
                <div className="mb-8">
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        {type === "forgot" ? "Verify Code" : "Check Your Email"}
                    </h2>
                    <p className="text-sm text-gray-500 mt-3 leading-relaxed">
                        We've sent a 6-digit code to <br />
                        <span className="font-bold text-black break-all">{email}</span>
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
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
                                className="w-11 h-14 sm:w-14 sm:h-16 border-2 border-gray-200 rounded-xl text-center text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all bg-gray-50 focus:bg-white"
                            />
                        ))}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-black text-white py-4 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-all active:scale-[0.98] disabled:opacity-60 shadow-lg cursor-pointer"
                    >
                        {isSubmitting ? "Verifying..." : "Verify & Continue"}
                    </button>
                </form>

                <div className="mt-10 pt-6 border-t border-gray-100">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-xs text-gray-400 font-bold uppercase tracking-tighter flex items-center justify-center gap-2 w-full transition-all hover:text-black"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                        Back to Previous
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OTPVerification;