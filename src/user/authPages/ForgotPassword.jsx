import { useState } from "react";
import { Link } from "react-router-dom";
import { apiPost } from "../../lib/api";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    setIsSubmitting(true);

    try {

      const response = await apiPost("/user/auth/forgot-password", { email: email.trim() });

      toast.success(response?.message || "Reset link sent to your email!");
      setEmail("");

    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong. Please try again.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 font-inter">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 sm:p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-black">Forgot Password?</h2>
          <p className="text-sm text-gray-500 mt-2">
            Enter your email and we'll send you a link to reset your password.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm text-black font-semibold">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm text-black placeholder-gray-400 mt-2 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black text-white py-2.5 rounded-md text-sm font-medium hover:opacity-90 transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Sending Link..." : "Send Reset Link"}
          </button>
        </form>

        <div className="mt-8 text-center text-sm">
          <Link
            to="/auth/signin"
            className="text-gray-500 font-medium hover:text-black hover:underline flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
