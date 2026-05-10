import { useQuery } from "@tanstack/react-query";
import { getPreview } from "../../api/taskApi";

const Dashboard = ({ taskId }) => {
  const token = localStorage.getItem("token");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["preview-project", taskId],
    queryFn: () => getPreview(taskId, token),
    enabled: !!taskId,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-medium">Loading Preview...</p>
      </div>
    );
  }

  if (isError) {
    return ( 
      <div className="flex items-center justify-center min-h-screen text-red-500">
        {error.message}
      </div>
    );
  }

  const previewUrl = data?.data?.engineResponse?.url;

  return (
    <div className="flex-1 bg-white min-h-[70vh] lg:min-h-screen">
      <div className="max-w-6xl mx-auto w-full p-4">
        <h2 className="text-xl p-4 sm:text-2xl lg:text-3xl font-semibold text-gray-800 mb-5">
           Preview
        </h2>

        {previewUrl ? (
          <iframe
            src={previewUrl}
            title="Project Preview"
            className="w-full h-[80vh] rounded-2xl border border-gray-200 shadow-lg"
          />
        ) : (
          <p>No preview available.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;