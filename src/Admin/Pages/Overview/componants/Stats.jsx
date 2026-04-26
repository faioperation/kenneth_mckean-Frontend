import React from 'react';
import { HiUsers } from 'react-icons/hi';
import { BsLightningFill } from 'react-icons/bs';
import { FaDollarSign, FaShoppingCart } from 'react-icons/fa';
import { FiTrendingUp } from 'react-icons/fi';
import { useQuery } from '@tanstack/react-query';
import { apiGet } from '../../../../lib/api';
export default function Stats() {
  
  const { data, isLoading, isError } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: async () => {
      const res = await apiGet('/admin/dashboard');
      return res.data; 
    },
  });

  const statItems = [
    {
      label: "Total Users",
      value: data?.totalUsers || 0,
    
      icon: <HiUsers className="text-blue-500 w-6 h-6" />,
    },
    {
      label: "Active Subscriptions",
      value: data?.activeSubscriptions || 0,
      icon: <BsLightningFill className="text-yellow-500 w-6 h-6" />,
    },
    {
      label: "Purchases Today",
      value: data?.purchasesToday || 0,
      icon: <FaShoppingCart className="text-emerald-500 w-6 h-6" />,
    },
    {
      label: "Monthly Revenue",
      value: `$${data?.monthlyRevenue || 0}`,
      icon: <FaDollarSign className="text-purple-500 w-6 h-6" />,
    },
  ];

  if (isError) return <div className="text-red-500 p-4 text-center">Failed to load statistics.</div>;

  return (
    <div className="w-full lg:px-8 ">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8 lg:my-6 my-4">
        {statItems.map((item, index) => (
          <div 
            key={index} 
            className="bg-[#111827] border border-gray-800 p-6 rounded-2xl flex justify-between items-center transition-all hover:border-gray-700 shadow-lg"
          >
            <div className="space-y-1">
              <p className="text-gray-400 text-sm font-medium">{item.label}</p>
              <h2 className="text-2xl font-bold text-white">
                {isLoading ? (
                  <div className="h-8 w-16 bg-gray-700 animate-pulse rounded"></div>
                ) : (
                  item.value
                )}
              </h2>
             
                <div className="flex items-center gap-1 pt-1">
                  <FiTrendingUp className="text-emerald-500 w-4 h-4" />
                  <span className="text-emerald-500 text-xs font-semibold">{item.trend}</span>
                </div>
             
            </div>
            
            <div className="bg-gray-800/60 p-3 rounded-full flex items-center justify-center">
              {item.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}