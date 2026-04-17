import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiPost } from "../../lib/api";
import toast from "react-hot-toast";
import { Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";

const UserResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    // Check for the reset token on component mount to handle page refreshes
    useEffect(() => {
        const token = localStorage.getItem("resetToken");
        if (!token) {
            toast.error("Session expired or invalid access. Please verify OTP again.");
            navigate("/auth/forgot-password");
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate password length
        if (newPassword.length < 6) {
            toast.error("Password must be at least 6 characters.");
            return;
        }

        // Check if passwords match
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        setIsSubmitting(true);

        try {
            // Retrieve the token from localStorage
            const resetToken = localStorage.getItem("resetToken");

            const response = await apiPost("/user/auth/reset-password", {
                token: resetToken,
                newPassword: newPassword,
            });

            toast.success(response?.message || "Password reset successful!");

            // Operation successful: remove token from localStorage to prevent reuse
            localStorage.removeItem("resetToken");

            // Redirect to sign-in page after a short delay
            setTimeout(() => {
                navigate("/auth/signin");
            }, 1500);

        } catch (error) {
            const message = error.response?.data?.message || "Failed to reset password.";
            toast.error(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 font-inter">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 sm:p-10 border border-gray-100">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-50 rounded-full mb-4">
                        <Lock className="text-black" size={32} />
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">New Password</h2>
                    <p className="text-sm text-gray-500 mt-2">Please create a strong password for your account.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="text-sm font-bold text-gray-700 block mb-1.5">New Password</label>
                        <div className="relative">
                            <input
                                type={showNewPassword ? "text" : "password"}
                                required
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black bg-gray-50 focus:bg-white transition-all text-sm"
                            />
                            <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-black">
                                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-bold text-gray-700 block mb-1.5">Confirm Password</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black bg-gray-50 focus:bg-white transition-all text-sm"
                            />
                            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-black">
                                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <button type="submit" disabled={isSubmitting} className="w-full bg-black text-white py-3.5 rounded-xl text-sm font-bold hover:bg-gray-800 transition-all active:scale-[0.98] disabled:opacity-60 shadow-lg mt-4 cursor-pointer">
                        {isSubmitting ? "Updating..." : "Reset Password"}
                    </button>
                </form>

                <div className="mt-8 text-center border-t border-gray-100 pt-6">
                    <button onClick={() => navigate("/auth/signin")} className="inline-flex items-center text-xs text-gray-400 font-bold hover:text-black transition-all gap-2 uppercase tracking-tighter">
                        <ArrowLeft size={14} /> Back to Sign In
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserResetPassword;