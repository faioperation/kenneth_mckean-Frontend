import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Funnel } from "lucide-react";

const data = [
  { time: "4:00", tokens: 80 },
  { time: "8:00", tokens: 102 },
  { time: "12:00", tokens: 92 },
  { time: "16:00", tokens: 140 },
  { time: "20:00", tokens: 125 },
  { time: "00:00", tokens: 150 },
  { time: "04:00", tokens: 170 },
];

export default function TokenUsageChart() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6 w-full mt-3 mb-3">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-gray-700 font-medium text-sm sm:text-base">
          Token Usage Trend (Last 7 Days)
        </h2>

        <button className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 transition">
          <Funnel size={16} />
          Filter
        </button>
      </div>

      {/* Chart */}
      <div className="w-full h-[250px] sm:h-[300px] md:h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            
            <XAxis
              dataKey="time"
              tick={{ fontSize: 12 }}
              stroke="#9ca3af"
            />

            <YAxis
              tick={{ fontSize: 12 }}
              stroke="#9ca3af"
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="tokens"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}