import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { tokenStorage } from "../../lib/tokenStorage"; 

const GoogleSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("accessToken");

    if (token) {
      tokenStorage.setAccessToken(token);

      navigate("/user/newtask");
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
