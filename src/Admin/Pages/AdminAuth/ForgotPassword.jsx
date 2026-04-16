import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContainer from "./AuthContainer";
import { apiPost } from "../../../lib/api";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleSendOtp = async () => {
    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await apiPost("/admin/auth/forgot-password", {
        email: email.trim(),
      });

      toast.success(res?.message || "OTP sent successfully");

      navigate("/admin/verify-otp" , { state: { email } });

    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to send OTP";

      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <AuthContainer>
      <h3 className="text-center text-lg mb-6">Forgot Password?</h3>

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-6 px-4 py-2 bg-[#1f2937] rounded-lg outline-none"
      />

      <button
        onClick={handleSendOtp}
        disabled={isSubmitting}
        className="w-full bg-blue-600 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-70"
      >
        {isSubmitting ? "Sending..." : "Send OTP"}
      </button>
    </AuthContainer>
  );
}