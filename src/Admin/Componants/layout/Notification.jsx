import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { apiGet, apiPatch } from "../../../lib/api";

export default function Notification() {
  const queryClient = useQueryClient();


  const { data: notifications, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const res = await apiGet("/admin/notification/");
      return res?.data || [];
    },
  });

  const markAsReadMutation = useMutation({
    mutationFn: (id) => apiPatch(`/admin/notification/${id}/read`),
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
    },
  });

 
  const markAllReadMutation = useMutation({
    mutationFn: () => apiPatch("/admin/notification/read-all"),
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
     
    },
  });

  return (
    <div className="flex items-center justify-center ">
      <div className="w-full max-w-lg bg-[#111827] border border-gray-800 text-gray-300 rounded-2xl shadow-2xl p-6 space-y-6">
        
        {/* Header with Mark All as Read button */}
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold text-white tracking-tight">Notifications</h2>
          <button 
            onClick={() => markAllReadMutation.mutate()}
            className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <IoCheckmarkDoneOutline className="text-base" />
            Mark all as read
          </button>
        </div>

        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
          {isLoading ? (
            [1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-gray-800/50 animate-pulse rounded-xl"></div>
            ))
          ) : notifications?.length > 0 ? (
            notifications.map((item) => (
              <div
                key={item.id}
                onClick={() => !item.isRead && markAsReadMutation.mutate(item.id)}
                className={`flex justify-between items-start gap-4 border-b border-gray-800 pb-4 last:border-none cursor-pointer group`}
              >
                <div className="space-y-1">
                  <p className={`text-sm sm:text-base leading-relaxed transition-colors ${item.isRead ? 'text-gray-500' : 'text-gray-200 font-medium'}`}>
                    {item.message}
                  </p>
                  <div className="flex items-center gap-2">
                    {!item.isRead && <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full"></span>}
                    <span className="text-[11px] text-gray-500 font-medium uppercase tracking-wider">
                      {item.time || "Recently"}
                    </span>
                  </div>
                </div>

                <span className="text-xs text-gray-600 group-hover:text-emerald-400 transition-colors">
                  {item.isRead ? "Read" : "Mark as read"}
                </span>
              </div>
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500 italic text-sm ">No new notifications.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}