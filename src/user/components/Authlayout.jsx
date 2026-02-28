import { Outlet } from "react-router";
import AuthHeader from "../authPages/AuthHeader";

const Authlayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <AuthHeader/>
      <main className="grow pt-15" >
        <Outlet />
      </main>
    </div>
  );
};

export default Authlayout;
