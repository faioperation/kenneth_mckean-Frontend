import React, { useEffect, useState } from 'react';
import { LuActivity } from "react-icons/lu"; // Header icon-er jonno
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

export default function TaskCompletion() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('/TaskCompletion.json')
      .then(res => res.json())
      .then(data => setTasks(data));
  }, []);

  return (
    <div className="bg-[#11141b] border border-[#1e232b] p-6 rounded-2xl w-full h-[400px] flex flex-col">
      {/* Header Section */}
      <div className="flex items-center gap-2 mb-8">
        <LuActivity className="text-blue-500 text-lg" />
        <h2 className="text-gray-200 text-md font-medium">Task Completion Rate</h2>
      </div>

      {/* Chart Section */}
      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={tasks}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            barGap={8}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false} 
              stroke="#1e232b" 
            />
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6b7280', fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6b7280', fontSize: 12 }} 
            />
            <Tooltip 
              cursor={{ fill: '#485f80',  opacity: 0.4 }}
              contentStyle={{ backgroundColor: '#222933', border: '1px solid #30363d', borderRadius: '8px' }}
              itemStyle={{ fontSize: '12px' }}
            />
            <Legend 
              verticalAlign="bottom" 
              align="center" 
              iconType="square"
              iconSize={10}
              wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }}
            />
            
            {/* Completed Bar (Greenish) */}
            <Bar 
              dataKey="completed" 
              fill="#10b981" 
              radius={[4, 4, 0, 0]} 
              name="Completed"
              barSize={22} 
            />
            
            {/* Failed Bar (Reddish) */}
            <Bar 
              dataKey="failed" 
              fill="#ef4444" 
              radius={[4, 4, 0, 0]} 
              name="Failed"
              barSize={22}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}