import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { apiPost } from "../../lib/api";
import toast from "react-hot-toast";

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialForm);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const trimmedData = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      password: formData.password,
    };

    if (
      !trimmedData.firstName ||
      !trimmedData.lastName ||
      !trimmedData.email ||
      !trimmedData.password
    ) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    setIsSubmitting(true);


    try {
      const response = await apiPost("/user/auth/register", trimmedData);

      toast.success(response?.message || "User registered successfully.");
      setFormData(initialForm);

      setTimeout(() => {
        navigate("/auth/signin");
      }, 1200);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Unable to create your account right now.";

      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 font-inter">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-black font-semibold">First Name</label>
              <input
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First name"
                className="w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm text-black placeholder-gray-400 mt-2"
              />
            </div>

            <div>
              <label className="text-sm text-black font-semibold">Last Name</label>
              <input
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last name"
                className="w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm text-black placeholder-gray-400 mt-2"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-black font-semibold">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm text-black placeholder-gray-400 mt-2"
            />
          </div>

          <div>
            <label className="text-sm text-black font-semibold">Set Password</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="XXXXXX"
              className="w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm text-black placeholder-gray-400 mt-2"
            />
          </div>

          {errorMessage ? (
            <p className="text-sm text-red-600">{errorMessage}</p>
          ) : null}

          {successMessage ? (
            <p className="text-sm text-green-600">{successMessage}</p>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black text-white py-2.5 rounded-md text-sm font-medium hover:opacity-90 transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="mt-6 flex items-center my-5">
          <div className="flex-1 bg-gray-300 h-px"></div>
          <span className="px-3 text-xs text-gray-400">Or</span>
          <div className="flex-1 bg-gray-300 h-px"></div>
        </div>

        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-md py-2.5 cursor-pointer hover:bg-gray-50 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            className="w-4 h-4"
          />
          <span className="text-sm text-black">Continue with Google</span>
        </button>

        <div className="mt-6 space-y-2 text-center text-sm">
          <Link to="/auth/signin" className="block text-black font-semibold">
            Already have an account? <span className="text-blue-500 font-semibold hover:text-blue-600  hover:underline cursor-pointer">Sign in</span>
          </Link>
          <Link to="/" className="block text-gray-500 font-semibold hover:text-black hover:underline cursor-pointer">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
