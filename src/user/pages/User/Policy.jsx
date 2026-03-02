import React from "react";

export default function Policy() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 md:p-10">
        
        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          Privacy Policy
        </h1>

        {/* Intro */}
        <p className="text-gray-600 text-sm md:text-base mb-6 leading-relaxed">
          Welcome to our platform. We value your privacy and are committed to
          protecting your personal information. This Privacy Policy explains
          how we collect, use, and safeguard your data when you use our
          services.
        </p>

        {/* Section 1 */}
        <div className="mb-6">
          <h2 className="font-semibold text-gray-800 mb-2">
            1. Personal Information We Collect
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            We may collect personal information such as your name, email
            address, and account details when you register or interact with our
            services.
          </p>
        </div>

        {/* Section 2 */}
        <div className="mb-6">
          <h2 className="font-semibold text-gray-800 mb-2">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc pl-5 text-gray-600 text-sm space-y-1">
            <li>To provide and maintain our services</li>
            <li>To improve user experience</li>
            <li>To communicate updates and support</li>
            <li>To ensure security and prevent fraud</li>
          </ul>
        </div>

        {/* Section 3 */}
        <div className="mb-6">
          <h2 className="font-semibold text-gray-800 mb-2">
            3. Data Sharing & Disclosure
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            We do not sell or trade your personal information. However, we may
            share data with trusted service providers who assist us in
            operating our platform.
          </p>
        </div>

        {/* Section 4 */}
        <div className="mb-6">
          <h2 className="font-semibold text-gray-800 mb-2">
            4. Data Security
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            We implement appropriate security measures to protect your personal
            data from unauthorized access, alteration, or disclosure.
          </p>
        </div>

        {/* Section 5 */}
        <div className="mb-6">
          <h2 className="font-semibold text-gray-800 mb-2">
            5. Your Rights
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            You have the right to access, update, or delete your personal
            information. If you wish to exercise these rights, please contact
            us.
          </p>
        </div>

        {/* Section 6 */}
        <div className="mb-6">
          <h2 className="font-semibold text-gray-800 mb-2">
            6. Changes to This Policy
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page with an updated revision date.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h2 className="font-semibold text-gray-800 mb-2">
            Contact Us
          </h2>
          <p className="text-gray-600 text-sm">
            If you have any questions about this Privacy Policy, please contact
            us at:
          </p>
          <p className="text-gray-700 text-sm mt-1 font-medium">
            support@example.com
          </p>
        </div>

      </div>
    </div>
  );
}