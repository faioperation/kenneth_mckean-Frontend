import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { tokenStorage } from "../../lib/tokenStorage"; 
import { apiClient } from "../../lib/apiClient";

const GoogleSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("accessToken");

    if (token) {
      
      tokenStorage.setAccessToken(token);


      const fetchUserData = async () => {
  try {
    const cleanToken = token.trim();
    
    const response = await apiClient.get("/user/profile", {
      headers: {
        Authorization: `Bearer ${cleanToken}`
      }
    });

    // স্ক্রিনশট অনুযায়ী ডাটা স্ট্রাকচার চেক করুন
    // যদি আপনার প্রোফাইল এন্ডপয়েন্ট 'get tasks' এর মতো হয়, তবে data.profile থাকবে
    const userData = response.data?.data?.profile || response.data?.data; 

    if (userData) {
      localStorage.setItem("user", JSON.stringify({
        ...userData,
        role: "USER" // আপনার UserPrivateRoute এটিই চেক করছে
      }));
      
      // সফল হলে ড্যাশবোর্ডে
      navigate("/user/newtask");
    }
  } catch (error) {
    // এখানে আসল এরর মেসেজটি কনসোলে প্রিন্ট হবে
    console.error("Server Message:", error.response?.data?.message);
    navigate("/auth/signin");
  }
};

      fetchUserData();
    } else {
      navigate("/auth/signin");
    }
  }, [searchParams, navigate]);
  return (
    <div className="flex h-screen items-center justify-center text-black">
      <p>Verifying Google Authentication...</p>
    </div>
  );
};

export default GoogleSuccess;
