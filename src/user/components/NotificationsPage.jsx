import { useState } from "react";

export default function NotificationsPage() {
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [inAppEnabled, setInAppEnabled] = useState(true);

  return (
    <div className="flex-1 bg-gray-100 min-h-[70vh] lg:min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto w-full">

        {/* Title */}
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800 mb-6">
          Notifications
        </h1>

        {/* First Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm mb-6">
          
          <p className="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed mb-4">
            Ask Algorithm to set up rule-based notifications for your website.
            Get notified whenever your site data changes.
          </p>

          <p className="text-gray-600 font-medium mb-2 text-sm sm:text-base">
            For example:
          </p>

          <ul className="list-disc pl-5 text-gray-600 text-sm sm:text-base lg:text-lg space-y-2 mb-6">
            <li>
              My website collects forms filled out by users. Notify me when a new form is submitted.
            </li>
            <li>
              My website sells products. Notify me when a new product is sold.
            </li>
            <li>
              My website has a comment feature. Notify me when a user leaves a negative review.
            </li>
          </ul>

          <button className="bg-black text-white px-6 py-3 rounded-xl text-sm sm:text-base font-medium hover:bg-gray-900 transition w-full sm:w-auto">
            Ask Manus to set up notifications
          </button>
        </div>

        {/* Second Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm">
          
          <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-800 mb-2">
            Notification delivery preferences
          </h2>

          <p className="text-gray-600 text-sm sm:text-base mb-6 leading-relaxed">
            By default, website notifications are sent via email and in-app messages.
            You can customize your preferences below.
          </p>

          {/* Toggle Email */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <span className="text-gray-700 text-sm sm:text-base">
              Receive email notifications
            </span>

            <button
              onClick={() => setEmailEnabled(!emailEnabled)}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition ${
                emailEnabled ? "bg-blue-500" : "bg-gray-300"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
                  emailEnabled ? "translate-x-5" : ""
                }`}
              />
            </button>
          </div>

          {/* Toggle In-App */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <span className="text-gray-700 text-sm sm:text-base">
              Receive in-app notifications
            </span>

            <button
              onClick={() => setInAppEnabled(!inAppEnabled)}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition ${
                inAppEnabled ? "bg-blue-500" : "bg-gray-300"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
                  inAppEnabled ? "translate-x-5" : ""
                }`}
              />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}