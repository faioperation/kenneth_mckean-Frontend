                    
import React, { useEffect, useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { FaDollarSign } from 'react-icons/fa';

export default function CostAnalytics() {
  const [costs, setCosts] = useState([]);

  useEffect(() => {
    fetch('/CostAnalytics.json')
      .then(res => res.json())
      .then(data => setCosts(data));
  }, []);

  return (
    <div className="bg-[#11141b] border border-[#1e232b] p-5 rounded-2xl w-full h-[350px] md:h-[400px]">
      {/* Header Section */}
      <div className="flex items-center gap-2 mb-6">
        <FaDollarSign className="text-emerald-500 text-lg" />
        <h2 className="text-gray-200 text-sm font-medium">Cost Analytics (6 Months)</h2>
      </div>

      {/* Chart Section */}
      <div className="w-full h-[250px] md:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={costs} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false} 
              stroke="#1e232b" 
            />
            
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6b7280', fontSize: 11 }}
              dy={10}
            />
            
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6b7280', fontSize: 11 }}
              domain={[0, 26000]}
              ticks={[0, 6500, 13000, 19500, 26000]} 
            />
            
            <Tooltip 
              contentStyle={{ backgroundColor: '#161b22', border: '1px solid #30363d', borderRadius: '8px' }}
              itemStyle={{ color: '#10b981', fontSize: '12px' }}
            />
            
            <Line 
              type="monotone" 
              dataKey="cost" 
              stroke="#10b981" 
              strokeWidth={3}
              dot={{ fill: '#fff', stroke: '#10b981', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Optional: Data Map (Jodi tumi list hishebeo dekhte chao) */}
      <div className="hidden">
        {costs.map((cost, index) => (
          <div key={index}>{cost.month}: {cost.cost}</div>
        ))}
      </div>
    </div>
  );
}