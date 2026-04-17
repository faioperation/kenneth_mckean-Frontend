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