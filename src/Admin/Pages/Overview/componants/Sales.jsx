

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer 
} from 'recharts';
import { apiGet } from '..//../../../lib/api'; 

export default function Sales() {
  const [range, setRange] = useState('day');

  const { data: salesData, isLoading } = useQuery({
    queryKey: ['salesTrack', range],
    queryFn: async () => {
      const res = await apiGet(`/admin/dashboard/sales-track?range=${range}`);
      return res?.data?.series || [];
    },
  });

  const filterOptions = [
    { label: 'Day', value: 'day' },
    { label: 'Week', value: 'week' },
    { label: 'Month', value: 'month' },
  ];

  return (
    <div className="w-full bg-[#111827] p-4 md:p-6 rounded-2xl border border-gray-800 shadow-xl">
      {/* Header with Responsive Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h2 className="text-xl font-bold text-white tracking-tight">Sales Track</h2>
        
        <div className="flex bg-[#1f2937] p-1 rounded-xl w-full sm:w-auto">
          {filterOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setRange(opt.value)}
              className={`flex-1 sm:flex-none px-5 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                range === opt.value 
                ? 'bg-blue-500 text-white shadow-lg' 
                : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Responsive Chart Container */}
      <div className="h-[300px] md:h-[350px] w-full">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <span className="loading loading-spinner loading-lg text-orange-500"></span>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={salesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorPurchases" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                </linearGradient>
              </defs>
              
              {/* Grid Lines - subtle for dark mode */}
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.5} />
              
              <XAxis 
                dataKey="label" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                dy={10}
              />
              
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#9ca3af', fontSize: 12 }} 
              />
              
              {/* Custom Dark Tooltip */}
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: '1px solid #374151', 
                  borderRadius: '12px',
                  color: '#fff'
                }}
                itemStyle={{ fontSize: '12px' }}
              />

              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#10b981" // Emerald-500
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />

              <Area
                type="monotone"
                dataKey="purchases"
                stroke="#f59e0b" // Amber-500
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorPurchases)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}