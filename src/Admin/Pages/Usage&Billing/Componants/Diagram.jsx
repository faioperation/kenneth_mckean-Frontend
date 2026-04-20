import React from 'react';

import { useQuery } from '@tanstack/react-query';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';
import { apiGet } from '../../../../lib/api';

export default function Diagram() {

  const getDiagramData = async () => {
    const res = await apiGet("/admin/usage-billing");

  
    return res.data.chartData.map(item => ({
      date: item.displayDate,
      tokens: item.tokens,
      requests: item.requests
    }));
  };

  const { data: usages = [], isLoading, isError } = useQuery({
    queryKey: ["usage"],
    queryFn: getDiagramData
  });
  if (isLoading) {
    return (
      <div className="text-center py-20 text-green-500">
        Loading chart...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-20 text-red-500">
        Failed to load data
      </div>
    );
  }

  return (
    <div className="bg-[#11141b] border border-[#263e66] p-6  rounded-2xl w-full h-[400px]">
      
      <h2 className="text-gray-200 text-sm font-medium mb-8">
        Api Request Usages (Last 7 Days)
      </h2>

      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={usages} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
            
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#1e232b" 
              vertical={true} 
              horizontal={true} 
            />
            
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6b7280', fontSize: 11 }}
              dy={15}
            />
            
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6b7280', fontSize: 11 }}
              domain={[0, 6000000]}
              ticks={[0, 1500000, 3000000, 4500000, 6000000]}
            />
            
            <Tooltip 
              contentStyle={{ backgroundColor: '#161b22', border: '1px solid #30363d', borderRadius: '8px' }}
              itemStyle={{ color: '#2B7FFF' }}
            />

            <Legend 
              verticalAlign="bottom" 
              align="center" 
              iconType="circle"
              wrapperStyle={{ paddingTop: '35px' }}
            />
            
            <Line 
              type="monotone" 
              dataKey="tokens" 
              name="Tokens"
              stroke="#2B7FFF" 
              strokeWidth={2.5}
              dot={{ fill: '#fff', stroke: '#2B7FFF', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}