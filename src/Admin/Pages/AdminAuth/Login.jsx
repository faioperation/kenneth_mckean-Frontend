import { useState } from "react";
import AuthContainer from "./AuthContainer";
import { Link, useNavigate } from "react-router";
import { apiPost } from "../../../lib/api";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
 const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      alert("Email and password required");
      return;
    }

    setLoading(true);

    try {
      const res = await apiPost("/admin/auth/login", {
        email: email.trim(),
        password,
      });

      
      const token = res?.data?.tokens?.accessToken;
      const user = res?.data?.user;

      localStorage.setItem("access_token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast(res?.message || "Login successful");

      navigate("/admin");
    } catch (error) {
      alert(
        error?.response?.data?.message ||
          "Login failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContainer>
      <h3 className="text-center text-lg mb-6">Login to Account</h3>

      <input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-4 px-4 py-2 bg-[#1f2937] rounded-lg outline-none"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-2 px-4 py-2 bg-[#1f2937] rounded-lg outline-none"
      />

      <div className="text-right text-sm mb-4">
        <Link to="/admin/forgot-password">
        <button className="text-blue-400 hover:underline">
          Forgot Password?
        </button>
        </Link>
      </div>

       <button
        onClick={handleLogin}
        disabled={loading}
        className="w-full bg-blue-600 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </AuthContainer>
  );
}
