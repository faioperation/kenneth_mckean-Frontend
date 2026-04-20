import React from 'react';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import { apiGet } from '../../../../lib/api';
import { useQuery } from '@tanstack/react-query';

export default function Plans() {
 
  
const getPlans = async () => {
  const res = await apiGet("/admin/usage-billing/plans")
  return res.data.map((plan)=>({
    id :  plan.id,
    name : plan.name,
    monthlyPrice : plan.monthlyPrice,
    yearlyPrice: plan.yearlyPrice,
    features : plan.features,
    requestLimit : plan.requestLimit,
    agentLimit : plan.agentLimit
  }))
}
const {data: plans=[], isLoading, isError } = useQuery({
  querykey:["plans"],
  queryFn: getPlans
})
if(isLoading){
 return (
    <div className="text-center py-20 text-green-500">
      The plans are Loading.....
    </div>
  )
}
 if (isError) {
    return (
      <div className="text-center py-20 text-red-500">
        Failed to load plans
      </div>
    );
  }
  return (
    <div className=" rounded-md lg:mx-8 md:mx-6 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl ">
        {plans?.map((plan, id) => (
          <div 
            key={id} 
            className="bg-[#11141b] border border-[#213049] rounded-2xl p-8 flex flex-col h-full hover:border-[#2B7FFF55] transition-all duration-300"
          >
            {/* Plan Name & Price */}
            <div className="mb-8">
              <h3 className="text-gray-400 text-lg font-medium mb-4">{plan.name}</h3>
              <div className="flex items-baseline gap-1 text-white">
                <span className="text-4xl font-bold">${plan.monthlyPrice}</span>
                <span className="text-gray-500 text-sm">/Month</span>
              </div>
              <div className="flex items-baseline gap-1 text-white mt-4">
                <span className="text-4xl font-bold">${plan.yearlyPrice}</span>
                <span className="text-gray-500 text-sm">/Year</span>
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
            
            <button 
              className={`w-full py-3 rounded-xl cursor-pointer font-semibold text-sm transition-all ${
                plan.isCurrent 
                ? "bg-[#155DFC33] text-[#51A2FF] border border-[#2B7FFF33] hover:bg-[#155DFC44]" 
                : "bg-[#0A369D] text-white hover:bg-[#0d42bc] shadow-lg shadow-blue-900/20"
              }`}
            >
              {plan.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}