import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { apiGet } from '../../../../lib/api'; 

export default function SubscriptionSummary() {

  const { data, isLoading } = useQuery({
    queryKey: ['subscriptionSummary'],
    queryFn: async () => {
      const res = await apiGet('/admin/dashboard');
      return res?.data?.subscriptionSummary || [];
    },
  });


  const COLORS = ['#6366f1', '#10b981', '#f59e0b'];

  return (
    <div className="w-full bg-[#111827] mt-4 lg:mt-0 p-6 rounded-2xl border border-gray-800 shadow-xl min-h-[400px] flex flex-col justify-between">
      <h2 className="text-xl font-bold text-white ">Subscription Summary</h2>

      <div className="space-y-4">
        {isLoading ? (
          <div className="space-y-3">
             <div className="h-6 bg-gray-800 animate-pulse rounded"></div>
             <div className="h-6 bg-gray-800 animate-pulse rounded"></div>
          </div>
        ) : (
          data.map((item, index) => (
            <div key={item.planId} className="flex justify-between items-center border-b border-gray-800 pb-3 last:border-0">
              <span className="text-gray-400 font-medium">{item.planName}</span>
              <span className="text-white font-semibold">{item.purchases}</span>
            </div>
          ))
        )}
      </div>

      {/* Donut Chart Section */}
      <div className="flex items-center gap-8 mt-8">
        <div className="h-32 w-32">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={35}
                outerRadius={50}
                paddingAngle={5}
                dataKey="purchases"
              >
                {data?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Chart Legend with Percentage */}
        <div className="flex-1 space-y-2">
          {data?.map((item, index) => (
            <div key={item.planId} className="flex justify-between items-center text-sm">
              <span style={{ color: COLORS[index % COLORS.length] }} className="font-semibold">
                {item.planName}
              </span>
              <span style={{ color: COLORS[index % COLORS.length] }} className="font-medium opacity-80">
               
                {index === 0 ? '70%' : index === 1 ? '20%' : '10%'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}