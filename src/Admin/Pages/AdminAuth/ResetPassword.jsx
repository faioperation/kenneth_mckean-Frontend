import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthContainer from "./AuthContainer";
import { apiPost } from "../../../lib/api";
import toast from "react-hot-toast";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { state } = useLocation();

  const token = state?.token; 

  const handleReset = async () => {
    if (!password || !confirm) {                                                                       
      toast.error("All fields are required");
      return;
    }

    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await apiPost("/admin/auth/reset", {
        token,
        newPassword: password,
        confirmPassword: confirm,
      });

      toast.success(res?.message || "Password reset successful");

      navigate("/admin/password-changed");

    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to reset password";

      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthContainer>
      <h3 className="text-center text-lg mb-6">Set New Password</h3>

      <input
        type="password"
        placeholder="New password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-4 px-4 py-2 bg-[#1f2937] rounded-lg outline-none"
      />

      <input
        type="password"
        placeholder="Confirm password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        className="w-full mb-6 px-4 py-2 bg-[#1f2937] rounded-lg outline-none"
      />

      <button
        onClick={handleReset}
        disabled={isSubmitting}
        className="w-full bg-blue-600 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-70"
      >
        {isSubmitting ? "Resetting..." : "Reset Password"}
      </button>
    </AuthContainer>
  );
}