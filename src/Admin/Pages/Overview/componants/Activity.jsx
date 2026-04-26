import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { LuActivity } from "react-icons/lu";
import { apiGet } from '../../../../lib/api'; 

export default function Activity() {
 
  const { data: activities, isLoading } = useQuery({
    queryKey: ['recentActivity'],
    queryFn: async () => {
      const res = await apiGet('/admin/dashboard/activity');
      return res?.data || [];
    },
  });


  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]';
      case 'warning': return 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]';
      case 'error': return 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]';
      default: return 'bg-gray-500 shadow-[0_0_8px_rgba(107,114,128,0.6)]';
    }
  };

  return (
    <div className="bg-[#111827] border border-gray-800 p-6 rounded-2xl w-full shadow-xl">
      {/* Header Section */}

      <div className="flex items-center gap-2 mb-6">
        <LuActivity className="text-purple-500 text-lg" />
        <h2 className="text-gray-200 text-md font-medium tracking-tight">Real-time System Activity</h2>
      </div>

      {/* Activity List Container */}
      <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
        {isLoading ? (
          // Loading State
          [1, 2, 3].map((i) => (
            <div key={i} className="bg-[#161b22] border border-gray-800 p-4 rounded-xl animate-pulse h-16 w-full"></div>
          ))
        ) : activities?.length > 0 ? (
          activities.map((activity) => (
            <div 
              key={activity.id} 
              className="bg-[#161b22] border border-gray-800 p-4 rounded-xl flex items-center justify-between group hover:border-gray-700 transition-all duration-300"
            >
              {/* Left Side: Status Dot & Info */}
              <div className="flex items-center gap-4">
                <div className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${getStatusColor(activity.status || 'success')}`}></div>
                <div>
                  <h4 className="text-gray-200 text-sm font-semibold tracking-wide">
                    {activity.user || "System"}
                  </h4>
                  <p className="text-gray-500 text-xs mt-0.5 font-medium leading-relaxed italic">
                    {activity.action}
                  </p>
                </div>
              </div>

              {/* Right Side: Timestamp */}
              <div className="text-gray-400 text-[11px] font-medium whitespace-nowrap bg-gray-800/30 px-2 py-1 rounded-md">
                {activity.timestamp || "Just now"}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-gray-500 text-sm italic">
            No recent activity found.
          </div>
        )}
      </div>
    </div>
  );
}