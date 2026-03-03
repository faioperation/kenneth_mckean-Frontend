import AnalyticsSection from "./AnalyticsSection";
import TokenUsageChart from "./TokenUsageChart";
import TravelDashboard from "./TravelDashboard";

const PublishPage = () => {
  return (
    <div className="flex-1 bg-white min-h-[70vh] lg:min-h-screen p-2 overflow-y-auto">
      <div className="max-w-3xl mx-auto w-full ">
        <TravelDashboard />
        <TokenUsageChart />
        <AnalyticsSection />
      </div>
    </div>
  );
};

export default PublishPage;
