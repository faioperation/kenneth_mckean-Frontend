import React, { useEffect, useState } from 'react';
import { LuActivity } from "react-icons/lu"; // Header icon

export default function Activity() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetch('/Activity.json')
      .then(res => res.json())
      .then(data => setActivities(data));
  }, []);

  // Status onujayi dot-er color define korar function
  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]';
      case 'warning': return 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]';
      case 'error': return 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-[#11141b] border border-[#1e232b] p-6 rounded-2xl w-full">
      {/* Header Section */}
      <div className="flex items-center gap-2 mb-6">
        <LuActivity className="text-purple-500 text-lg" />
        <h2 className="text-gray-200 text-md font-medium">Real-time System Activity</h2>
      </div>

      {/* Activity List Container */}
      <div className="flex flex-col gap-3">
        {activities.map((activity) => (
          <div 
            key={activity.id} 
            className="bg-[#161b22] border border-[#1e232b] p-4 rounded-xl flex items-center justify-between group hover:border-gray-700 transition-all duration-300"
          >
            {/* Left Side: Status Dot & Info */}
            <div className="flex items-center gap-4">
              <div className={`h-2 w-2 rounded-full ${getStatusColor(activity.status)}`}></div>
              <div>
                <h4 className="text-gray-200 text-sm font-semibold tracking-wide">
                  {activity.user}
                </h4>
                <p className="text-gray-500 text-xs mt-0.5 font-medium">
                  {activity.action}
                </p>
              </div>
            </div>

            {/* Right Side: Timestamp */}
            <div className="text-gray-600 text-[11px] font-medium whitespace-nowrap">
              {activity.timestamp}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}