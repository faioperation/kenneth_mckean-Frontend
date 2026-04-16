import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { apiPost } from "../../lib/api";
import toast from "react-hot-toast";
import { Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * Extract email and OTP (token) passed from the OTPVerification component 
   * via navigation state.
   */
  const email = location.state?.email || "";
  const otp = location.state?.otp || "";

  /**
   * Handles the submission of the new password.
   * Sends the OTP as a 'token' along with the new password to the backend.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password length validation
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    // Confirmation check
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setIsSubmitting(true);

    try {
      /**
       * API call using the endpoint and body structure you provided:
       * { "token": "OTP_CODE", "newPassword": "USER_NEW_PASS" }
       */
      const response = await apiPost("/user/auth/reset-password", {
        token: otp, 
        newPassword: newPassword,
      });

      toast.success(response?.message || "Password reset successful!");
      
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
      {/* Central Card with Responsive Padding */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 sm:p-10 border border-gray-100">
        
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
          {/* New Password Field */}
          <div>
            <label className="text-sm font-bold text-gray-700 block mb-1.5">New Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black bg-gray-50 focus:bg-white transition-all text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-black"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="text-sm font-bold text-gray-700 block mb-1.5">Confirm Password</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black bg-gray-50 focus:bg-white transition-all text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black text-white py-3.5 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-all active:scale-[0.98] disabled:opacity-60 shadow-lg mt-4 cursor-pointer"
          >
            {isSubmitting ? "Updating..." : "Reset Password"}
          </button>
        </form>

        {/* Footer Link */}
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

export default ResetPassword;