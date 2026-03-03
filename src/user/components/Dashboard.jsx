import dashboard from "../../assets/images/dashboard.png";

const Dashboard = () => {
  return (
    <div className="flex-1 bg-white min-h-[70vh] lg:min-h-screen">
      <div className="max-w-3xl mx-auto w-full ">
        {/* Title */}
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800 mb-3 mt-3">
          Travel Website
        </h2>
        <img src={dashboard} alt="dashboard" />
      </div>
    </div>
  );
};

export default Dashboard;
