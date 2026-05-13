
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { tokenStorage } from "../../lib/tokenStorage";
import { apiClient } from "../../lib/apiClient";

const GoogleSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("accessToken");

    if (!token) {
      navigate("/auth/signin");
      return;
    }
    
    const handleGoogleAuth = async () => {
      try {
    
        tokenStorage.setAccessToken(token.trim());
        const response = await apiClient.get("/user/profile");

        console.log("Profile response:", response.data);

        const userData =
          response.data?.data?.profile ||
          response.data?.data?.user ||
          response.data?.data ||
          response.data?.user;

        if (userData) {
          tokenStorage.setUser({
            ...userData,
            role: userData.role || "USER",
          });
          navigate("/user/newtask");
        } else {
          console.error("No user data found in response:", response.data);
          navigate("/auth/signin");
        }
      } catch (error) {
        console.error("Google auth error:", error.response?.data);
        navigate("/auth/signin");
      }
    };

    handleGoogleAuth();
  }, [searchParams, navigate]);

  return (
    <div className="flex h-screen items-center justify-center text-black">
      <p>Verifying Google Authentication...</p>
    </div>
  );
};

export default GoogleSuccess;