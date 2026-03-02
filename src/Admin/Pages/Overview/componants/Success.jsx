import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { BsRobot } from 'react-icons/bs';

export default function Success() {

  const data = [
    { name: 'Completed', value: 95 },
    { name: 'Failed', value: 5 },
  ];


  const COLORS = ['#10b981', '#ef4444'];

  return (
    <div className="bg-[#11141b] border border-[#1e232b] p-6 rounded-2xl w-full h-[350px] md:h-[400px] flex flex-col">
      {/* Header Section */}
      <div className="flex items-center gap-2 mb-4">
        <BsRobot className="text-emerald-500 text-lg" />
        <h2 className="text-gray-200 text-md font-medium">Agent Success vs Failure</h2>
      </div>

      {/* Chart Section */}
      <div className="flex-1 w-full flex items-center justify-center relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={0} 
              outerRadius="80%"
              paddingAngle={0}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: '#161b22', border: '1px solid #30363d', borderRadius: '8px', color: '#fff' }}
              itemStyle={{ color: '#fff' }}
            />
          </PieChart>
        </ResponsiveContainer>

     
        <div className="absolute top-10 left-10 md:left-20">
            <p className="text-[#10b981] text-xs font-semibold">Completed 95%</p>
        </div>
        <div className="absolute bottom-20 right-10 md:right-20">
            <p className="text-[#ef4444] text-xs font-semibold">Failed 5%</p>
        </div>
      </div>
    </div>
  );
}