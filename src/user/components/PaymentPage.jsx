import { CreditCard } from "lucide-react";

export default function 
PaymentPage() {
  return (
    <div className="flex-1 bg-white min-h-[70vh] lg:min-h-screen">
      <div className="max-w-3xl mx-auto w-full">

        {/* Title */}
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800 mb-6">
          Payment
        </h1>

        {/* Stripe Card */}
        <div className="border border-gray-200 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm bg-white">

          {/* Stripe Header */}
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-600 rounded-lg flex items-center justify-center">
              <CreditCard className="text-white w-5 h-5 sm:w-6 sm:h-6" />
            </div>

            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900">
              stripe
            </h2>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
            Algorithms helps you integrate Stripe payments into your website
            so you can generate revenue from your services.
          </p>

          {/* Integration Section */}
          <div className="space-y-4">

            <ul className="list-disc pl-5 text-gray-700 text-sm sm:text-base space-y-2">
              <li>Have Manus help you integrate payment</li>
            </ul>

            <button className="bg-black text-white px-6 py-3 rounded-xl text-sm sm:text-base font-medium hover:bg-gray-900 transition w-full sm:w-auto">
              Start payment integration
            </button>

            <ul className="list-disc pl-5 text-gray-600 text-sm sm:text-base space-y-2 pt-2">
              <li>Claim your sandbox</li>
              <li>Enable live mode</li>
              <li>Test checkout with coupon</li>
            </ul>

          </div>
        </div>

      </div>
    </div>
  );
}