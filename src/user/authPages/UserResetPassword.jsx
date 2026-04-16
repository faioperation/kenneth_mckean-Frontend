// import { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { apiPost } from "../../lib/api";
// import toast from "react-hot-toast";
// import { Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";

// const UserResetPassword = () => {
//     const [newPassword, setNewPassword] = useState("");
//     const [confirmPassword, setConfirmPassword] = useState("");
//     const [showPassword, setShowPassword] = useState(false);
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     const navigate = useNavigate();
//     const location = useLocation();

//     /**
//      * Extract email and OTP (token) passed from the OTPVerification component 
//      * via navigation state.
//      */
//     const email = location.state?.email || "";
//     const otp = location.state?.otp || "";

//     /**
//      * Handles the submission of the new password.
//      * Sends the OTP as a 'token' along with the new password to the backend.
//      */
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // Password length validation
//         if (newPassword.length < 6) {
//             toast.error("Password must be at least 6 characters.");
//             return;
//         }

//         // Confirmation check
//         if (newPassword !== confirmPassword) {
//             toast.error("Passwords do not match!");
//             return;
//         }

//         setIsSubmitting(true);

//         try {
//             /**
//              * API call using the endpoint and body structure you provided:
//              * { "token": "OTP_CODE", "newPassword": "USER_NEW_PASS" }
//              */
//             const response = await apiPost("/user/auth/reset-password", {
//                 token: otp,
//                 newPassword: newPassword,
//             });

//             toast.success(response?.message || "Password reset successful!");

//             // Redirect to sign-in page after a short delay
//             setTimeout(() => {
//                 navigate("/auth/signin");
//             }, 1500);

//         } catch (error) {
//             const message = error.response?.data?.message || "Failed to reset password.";
//             toast.error(message);
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 font-inter">
//             {/* Central Card with Responsive Padding */}
//             <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 sm:p-10 border border-gray-100">

//                 <div className="text-center mb-8">
//                     <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-50 rounded-full mb-4">
//                         <Lock className="text-black" size={32} />
//                     </div>
//                     <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">New Password</h2>
//                     <p className="text-sm text-gray-500 mt-2">
//                         Please create a strong password for your account.
//                     </p>
//                 </div>

//                 <form onSubmit={handleSubmit} className="space-y-5">
//                     {/* New Password Field */}
//                     <div>
//                         <label className="text-sm font-bold text-gray-700 block mb-1.5">New Password</label>
//                         <div className="relative">
//                             <input
//                                 type={showPassword ? "text" : "password"}
//                                 required
//                                 value={newPassword}
//                                 onChange={(e) => setNewPassword(e.target.value)}
//                                 placeholder="••••••••"
//                                 className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black bg-gray-50 focus:bg-white transition-all text-sm"
//                             />
//                             <button
//                                 type="button"
//                                 onClick={() => setShowPassword(!showPassword)}
//                                 className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-black"
//                             >
//                                 {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                             </button>
//                         </div>
//                     </div>

//                     {/* Confirm Password Field */}
//                     <div>
//                         <label className="text-sm font-bold text-gray-700 block mb-1.5">Confirm Password</label>
//                         <input
//                             type="password"
//                             required
//                             value={confirmPassword}
//                             onChange={(e) => setConfirmPassword(e.target.value)}
//                             placeholder="••••••••"
//                             className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black bg-gray-50 focus:bg-white transition-all text-sm"
//                         />
//                     </div>

//                     <button
//                         type="submit"
//                         disabled={isSubmitting}
//                         className="w-full bg-black text-white py-3.5 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-all active:scale-[0.98] disabled:opacity-60 shadow-lg mt-4 cursor-pointer"
//                     >
//                         {isSubmitting ? "Updating..." : "Reset Password"}
//                     </button>
//                 </form>

//                 {/* Footer Link */}
//                 <div className="mt-8 text-center border-t border-gray-100 pt-6">
//                     <button
//                         onClick={() => navigate("/auth/signin")}
//                         className="inline-flex items-center text-xs text-gray-400 font-bold hover:text-black transition-all gap-2 uppercase tracking-tighter cursor-pointer"
//                     >
//                         <ArrowLeft size={14} /> Back to Sign In
//                     </button>
//                 </div>

//             </div>
//         </div>
//     );
// };

// export default UserResetPassword;

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { apiPost } from "../../lib/api";
import toast from "react-hot-toast";
import { Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";

const UserResetPassword = () => {
    // State for password inputs
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Separate states to toggle visibility for each password field independently
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Loading state for API submission
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    // Retrieve email and OTP (token) passed from the OTP verification step
    const email = location.state?.email || "";
    const otp = location.state?.otp || "";

    /**
     * Form submission handler
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic Validation: Ensure password meets minimum length requirement
        if (newPassword.length < 6) {
            toast.error("Password must be at least 6 characters.");
            return;
        }

        // Basic Validation: Ensure both password fields match
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        setIsSubmitting(true);

        try {
            /**
             * Send the reset request to the backend.
             * Payload includes the OTP (as 'token') and the new password.
             */
            const response = await apiPost("/user/auth/reset-password", {
                token: otp,
                newPassword: newPassword,
            });

            toast.success(response?.message || "Password reset successful!");

            // Navigate to sign-in page after a success message delay
            setTimeout(() => {
                navigate("/auth/signin");
            }, 1500);

        } catch (error) {
            // Extract error message from API response or use a default one
            const message = error.response?.data?.message || "Failed to reset password.";
            toast.error(message);
        } finally {
            // Stop the loading indicator
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 font-inter">
            {/* Main Container Card */}
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 sm:p-10 border border-gray-100">

                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-50 rounded-full mb-4">
                        <Lock className="text-black" size={32} />
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">New Password</h2>
                    <p className="text-sm text-gray-500 mt-2">
                        Please create a strong password for your account.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* New Password Input Field */}
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
                            {/* Toggle Visibility Button */}
                            <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-black cursor-pointer"
                            >
                                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password Input Field */}
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
                            {/* Toggle Visibility Button */}
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-black cursor-pointer"
                            >
                                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-black text-white py-3.5 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-all active:scale-[0.98] disabled:opacity-60 shadow-lg mt-4 cursor-pointer"
                    >
                        {isSubmitting ? "Updating..." : "Reset Password"}
                    </button>
                </form>

                {/* Footer Navigation */}
                <div className="mt-8 text-center border-t border-gray-100 pt-6">
                    <button
                        onClick={() => navigate("/auth/signin")}
                        className="inline-flex items-center text-xs text-gray-400 font-bold hover:text-black transition-all gap-2 uppercase tracking-tighter cursor-pointer"
                    >
                        <ArrowLeft size={14} /> Back to Sign In
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserResetPassword;