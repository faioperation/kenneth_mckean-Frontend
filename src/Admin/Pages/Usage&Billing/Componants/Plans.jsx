import React from 'react';
import { HiOutlineCheckCircle } from 'react-icons/hi';

export default function Plans() {
  const pricingPlans = [
    {
      name: "Free",
      price: "0",
      features: ["100K tokens/month", "5 agents", "Basic workflows", "Email support"],
      buttonText: "Free Plan",
      isCurrent: false,
    },
    {
      name: "Pro",
      price: "99",
      features: ["5M tokens/month", "50 agents", "Advanced workflows", "Priority support", "API access"],
      buttonText: "Current Plan",
      isCurrent: true,
    },
    {
      name: "Enterprise",
      price: "499",
      features: ["Unlimited tokens", "Unlimited agents", "Custom workflows", "24/7 dedicated support", "Custom integrations", "SLA guarantee"],
      buttonText: "Enterprise",
      isCurrent: false,
    }
  ];

  return (
    <div className="bg-[#0b0e14] p-6 lg:mx-8 md:p-10 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {pricingPlans.map((plan, index) => (
          <div 
            key={index} 
            className="bg-[#11141b] border border-[#1e232b] rounded-2xl p-8 flex flex-col h-full hover:border-[#2B7FFF55] transition-all duration-300"
          >
            {/* Plan Name & Price */}
            <div className="mb-8">
              <h3 className="text-gray-400 text-lg font-medium mb-4">{plan.name}</h3>
              <div className="flex items-baseline gap-1 text-white">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-gray-500 text-sm">/month</span>
              </div>
            </div>

            {/* Features List */}
            <ul className="flex-1 space-y-4 mb-10">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3 text-gray-300 text-sm">
                  <HiOutlineCheckCircle className="text-emerald-500 shrink-0" size={20} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {/* Action Button */}
            <button 
              className={`w-full py-3 rounded-xl cursor-pointer font-semibold text-sm transition-all ${
                plan.isCurrent 
                ? "bg-[#155DFC33] text-[#51A2FF] border border-[#2B7FFF33] hover:bg-[#155DFC44]" 
                : "bg-[#0A369D] text-white hover:bg-[#0d42bc] shadow-lg shadow-blue-900/20"
              }`}
            >
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}