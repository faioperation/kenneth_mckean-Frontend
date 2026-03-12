import React from "react";

export default function Notification() {
  const notifications = [
    {
      message: "Today, 4 new users have been successfully added to your system.",
      time: "30m ago",
    },
    {
      message: "The total API cost for today is $40.",
      time: "20m ago",
    },
    {
      message: "A total of 5,000 API requests have been processed today.",
      time: "10m ago",
    },
  ];

  return (
    <div className="flex items-center justify-center ">
      <div className="w-full max-w-lg bg-gradient-to-b from-[#0f172a] to-[#020617] text-gray-300 rounded-xl shadow-xl p-6 space-y-6">
        
        {notifications.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-start gap-4 border-b border-gray-700 pb-4 last:border-none"
          >
            <p className="text-sm sm:text-base leading-relaxed">
              {item.message}
            </p>

            <span className="text-xs sm:text-sm text-gray-400 whitespace-nowrap">
              {item.time}
            </span>
          </div>
        ))}

      </div>
    </div>
  );
}