import React, { useEffect, useState } from 'react'
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { BsLightningFill } from 'react-icons/bs';

export default function APIusage() {
  const [APIs, setAPIs] = useState([]);

  useEffect(() => {
    fetch('/APIusage.json')
      .then(res => res.json())
      .then(data => setAPIs(data));
  }, []);

  return (
    <div className="bg-[#11141b] border border-[#1e232b] p-5 rounded-2xl w-full h-[350px] md:h-[400px]">
      {/* Header Section */}
      <div className="flex items-center gap-2 mb-6">
        <BsLightningFill className="text-yellow-500 text-lg" />
        <h2 className="text-gray-200 text-sm font-medium">API Usage Trend (Last 24h)</h2>
      </div>

      {/* Chart Section */}
      <div className="w-full h-[250px] md:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          {/* Recharts nijei internal-e map kore, tai baire theke map dorkar hoy na */}
          <AreaChart data={APIs} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
            <defs>
              <linearGradient id="usageGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#eab308" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#eab308" stopOpacity={0}/>
              </linearGradient>
            </defs>
            
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false} 
              stroke="#1e232b" 
            />
            
            <XAxis 
              dataKey="time" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6b7280', fontSize: 11 }}
              dy={10}
            />
            
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6b7280', fontSize: 11 }} 
            />
            
            <Tooltip 
              contentStyle={{ backgroundColor: '#161b22', border: '1px solid #30363d', borderRadius: '8px' }}
              itemStyle={{ color: '#eab308', fontSize: '12px' }}
            />
            
            <Area 
              type="monotone" 
              dataKey="usage" 
              stroke="#eab308" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#usageGradient)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

    
      <div className="hidden">
        {APIs.map((API, index) => (
          <div key={index}>
            {API.time}: {API.usage}
          </div>
        ))}
      </div>
    </div>
  )
}