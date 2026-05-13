import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { IoCheckmarkDoneOutline, IoNotificationsOutline } from "react-icons/io5";
import { FiClock } from "react-icons/fi";
import { apiGet, apiPatch } from "../../../lib/api";

export default function Notification() {
  const queryClient = useQueryClient();

  const formatTime = (dateString) => {
    if (!dateString) return "Just now";
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const { data: notifications, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const res = await apiGet("/admin/notification/");
      return res?.data || [];
    },
    retry: false,
  });

  const markAllReadMutation = useMutation({
    mutationFn: () => apiPatch("/admin/notification/read-all"),
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
    },
  });

  const markReadMutation = useMutation({
    mutationFn: (id) => apiPatch(`/admin/notification/${id}/read`),
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
    },
  });

  return (
    <div className="w-full bg-[#11141b] rounded-2xl shadow-2xl border border-[#1e232b] overflow-hidden flex flex-col h-[400px]">
      {/* Header */}
      <div className="p-4 border-b border-[#1e232b] flex justify-between items-center bg-[#161b22]">
        <div className="flex items-center gap-2">
          <IoNotificationsOutline className="text-[#2B7FFF] text-xl" />
          <h2 className="text-white font-semibold text-lg">Notifications</h2>
        </div>
        {notifications?.some(n => !n.isRead) && (
          <button 
            onClick={() => markAllReadMutation.mutate()}
            className="text-xs font-medium text-gray-400 hover:text-[#2B7FFF] transition-colors flex items-center gap-1"
            title="Mark all as read"
          >
            <IoCheckmarkDoneOutline size={16} />
            Mark all read
          </button>
        )}
      </div>

      {/* List */}
      <div className="overflow-y-auto flex-1 p-2 space-y-1 custom-scrollbar">
        {isLoading ? (
           <div className="p-8 flex justify-center">
             <span className="loading loading-spinner text-[#2B7FFF]"></span>
           </div>
        ) : notifications?.length > 0 ? (
          notifications.map((item) => (
            <div 
              key={item.id} 
              onClick={() => {
                if (!item.isRead) markReadMutation.mutate(item.id);
              }}
              className={`p-3 rounded-xl transition-colors cursor-pointer flex gap-3 items-start ${item.isRead ? 'hover:bg-[#1a1f2b]' : 'bg-[#151b2b] border border-[#1e2e4a] hover:bg-[#1a2336]'}`}
            >
              <div className="mt-1.5 flex-shrink-0">
                <div className={`w-2 h-2 rounded-full ${item.isRead ? 'bg-transparent' : 'bg-[#2B7FFF] shadow-[0_0_8px_#2B7FFF]'}`}></div>
              </div>
              <div className="flex-1 space-y-1">
                <p className={`text-sm ${item.isRead ? 'text-gray-400' : 'text-gray-200 font-medium'} leading-snug`}>
                  {item.message}
                </p>
                <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-medium pt-1">
                  <FiClock size={12} />
                  <span>{formatTime(item.createdAt)}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-12 text-center text-gray-500 text-sm flex flex-col items-center gap-3">
             <div className="p-4 bg-[#161b22] rounded-full border border-[#1e232b]">
               <IoNotificationsOutline className="text-3xl text-gray-600" />
             </div>
             <p className="font-medium text-gray-400">No new notifications</p>
             <p className="text-xs text-gray-600">We'll notify you when something arrives.</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-[#1e232b] text-center bg-[#161b22]">
        <button className="text-sm text-[#2B7FFF] hover:text-blue-400 font-medium transition-colors">
          View all notifications
        </button>
      </div>
    </div>
  );
}
