export default function TravelDashboard() {
  const stats = [
    { id: 1, title: "Page View", value: 13, growth: "100%" },
    { id: 2, title: "Visits", value: 13, growth: "100%" },
    { id: 3, title: "Visitors", value: 13, growth: "100%" },
    { id: 4, title: "Duration", value: 13, growth: "100%" },
    { id: 5, title: "Bounce Rate", value: 13, growth: "100%", danger: true },
  ];

  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5 pt-2">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800">
            Travel Website
          </h1>
          <p className="text-gray-500 text-sm sm:text-base mt-2">
            https://travelexplor-7g3kagdc.manus.
          </p>
        </div>

        <button className="bg-black text-white px-5 py-2.5 rounded-lg text-sm sm:text-base font-medium hover:bg-gray-900 transition w-full sm:w-auto cursor-pointer">
          Open Website
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((item) => (
          <div
            key={item.id}
            className="bg-[#F9F9F9] rounded-xl p-4 sm:p-5 shadow-sm border border-gray-200"
          >
            <p className="text-gray-500 text-sm mb-2">{item.title}</p>

            <p className="text-xl sm:text-2xl font-semibold text-gray-800">
              {item.value}
            </p>

            <div className="flex items-center gap-2 mt-3">
              <div
                className={`w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold ${
                  item.danger
                    ? "bg-red-100 text-red-500 border "
                    : "bg-green-100 text-green-600 border"
                }`}
              >
                {item.danger ? "!" : "↑"}
              </div>

              <span
                className={`text-sm ${
                  item.danger ? "text-red-500" : "text-green-600"
                }`}
              >
                {item.growth}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
