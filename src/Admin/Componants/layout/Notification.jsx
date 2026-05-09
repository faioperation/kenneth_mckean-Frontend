import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { IoCheckmarkDoneOutline, IoPhonePortraitOutline } from "react-icons/io5";
import { apiGet, apiPatch } from "../../../lib/api";

export default function Notification() {
  const queryClient = useQueryClient();

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

  return (
    <div className="min-h-screen bg-[#000000] text-gray-300 p-4 md:p-10 font-sans">
      <div className="max-w-3xl mx-auto space-y-10">
        
        {/* Section 1: Header */}
        <section className="space-y-2">
          <h1 className="text-3xl font-bold text-white">Notification</h1>
          <p className="text-gray-400 text-lg">Add notification capabilities to your website</p>
        </section>

        {/* Section 2: Promo Card */}
        <div className="bg-[#1c1c1c] border border-gray-800 rounded-2xl p-6 md:p-8 space-y-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">
              Ask  to set up rule-based notifications for your website. 
              Get notified whenever your site data changes.
            </h3>
            <p className="text-gray-400">For example:</p>
            <ul className="list-disc list-inside space-y-3 text-gray-400 ml-2">
              <li>My website collects forms filled out by users. Notify me when a new form is submitted.</li>
              <li>My website sells products. Notify me when a new product is sold.</li>
              <li>My website has a comment feature. Notify me when a user leaves a negative review.</li>
            </ul>
          </div>
          
          <button className="bg-white text-black font-bold py-3 px-6 rounded-lg hover:bg-gray-200 transition-all">
            Ask to set up notifications
          </button>
        </div>

        {/* Section 3: Preferences */}
        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-white">Notification delivery preferences</h2>
            <p className="text-gray-500 text-sm">
              By default, website notifications are sent via email and in-app messages. 
              You can customize your preferences below.
            </p>
          </div>

          <div className="bg-[#1c1c1c] border border-gray-800 rounded-2xl p-6 space-y-6">
            {/* Email Toggle */}
            <div className="flex items-center justify-between">
              <span className="text-gray-200">Receive email notifications</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* In-App Toggle */}
            <div className="flex items-center justify-between">
              <span className="text-gray-200">Receive in-app notifications</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>

          {/* App Download Link */}
          <div className="flex items-start gap-3 text-gray-500 text-sm">
            <IoPhonePortraitOutline className="text-lg mt-0.5" />
            <div>
              <p>Get the mobile app to receive notifications on your phone.</p>
              <a href="#" className="text-blue-500 hover:underline">Get it now</a>
            </div>
          </div>
        </section>

        {/* Section 4: Actual Notification List (Optional integration from your code) */}
        <section className="pt-10 border-t border-gray-800">
           <div className="flex justify-between items-center mb-6">
             <h2 className="text-xl font-bold text-white">Recent Notifications</h2>
             <button 
               onClick={() => markAllReadMutation.mutate()}
               className="text-sm font-semibold text-blue-500 hover:text-blue-400 flex items-center gap-2"
             >
               <IoCheckmarkDoneOutline /> Mark all as read
             </button>
           </div>
           
           <div className="space-y-4">
              {isLoading ? (
                <div className="animate-pulse space-y-4">
                  {[1, 2, 3].map(i => <div key={i} className="h-16 bg-[#1c1c1c] rounded-xl"></div>)}
                </div>
              ) : notifications?.length > 0 ? (
                notifications.map((item) => (
                  <div key={item.id} className="bg-[#1c1c1c] p-4 rounded-xl border border-gray-800 flex justify-between items-center">
                    <div>
                      <p className={item.isRead ? "text-gray-500" : "text-white"}>{item.message}</p>
                      <span className="text-xs text-gray-600">{item.createdAt || "Just now"}</span>
                    </div>
                    {!item.isRead && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-600">No notifications found.</p>
              )}
           </div>
        </section>

      </div>
    </div>
  );
}
