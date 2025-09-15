import {
  ResponsiveContainer,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ComposedChart,
  ReferenceLine,
} from "recharts";

import { useAppSelector } from "../store/hooks";

// const data = [
//   { month: "Jan", income: 3500, momGrowth: 0 },
//   { month: "Feb", income: 4750, momGrowth: 40 },
//   { month: "Mar", income: 6750, momGrowth: 20 },
//   { month: "Apr", income: 3250, momGrowth: -50 },
//   { month: "May", income: 5000, momGrowth: 80 },
//   { month: "Jun", income: 0, momGrowth: -100 },
// ];

export default function IncomeTrendChart() {
  const { chartData, loading } = useAppSelector((s) => s.dashboard);

  if (loading) {
    return (
      <div className="w-full max-w-lg mx-auto border-2 border-light_gray rounded-2xl bg-white p-4 animate-pulse">
        <div className="h-6 w-40 bg-gray-200 rounded mb-3"></div>
        <div className="h-4 w-60 bg-gray-200 rounded mb-6"></div>
        <div className="h-72 w-full bg-gray-100 rounded"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto border-2 border-light_gray rounded-2xl bg-white">
      <div className="px-3 py-4 flex flex-col justify-center gap-1">
        <h2 className="text-lg font-medium font-roboto text-gray_brand">
          Income Trend
        </h2>
        <p className="text-lg font-roboto text-gray_brand">
          Your monthly income and growth for the last 6 Months.
        </p>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData}>
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                interval={0}
                tick={{ fill: "#999999", fontSize: 14, fontWeight: 500 }}
              />
              <YAxis
                yAxisId="left"
                orientation="left"
                stroke="#9333ea"
                domain={[0, 8000]}
                tickFormatter={(value) => `$${value / 1000}k`}
                tick={{ fill: "#999999", fontSize: 14, fontWeight: 500 }}
              />

              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#7f1d1d"
                domain={[-100, 100]}
                tickFormatter={(value) => `${value}%`}
                tick={{ fill: "#999999", fontSize: 14, fontWeight: 500 }}
              />
              <Tooltip />
              <Legend
                wrapperStyle={{
                  fontSize: 14,
                  fontWeight: 500,
                }}
              />
              {/* Reference lines mapping income to growth % */}
              {[2000, 4000, 6000, 8000].map((y) => (
                <ReferenceLine key={y} yAxisId="left" y={y} stroke="#e5e7eb" />
              ))}
              {/* <ReferenceLine yAxisId="left" y={2000} stroke="#dedede" />
              <ReferenceLine yAxisId="left" y={4000} stroke="#dedede" />
              <ReferenceLine yAxisId="left" y={6000} stroke="#dedede" />
              <ReferenceLine yAxisId="left" y={8000} stroke="#dedede" /> */}

              <Bar
                yAxisId="left"
                dataKey="income"
                fill="#a855f7"
                radius={[6, 6, 6, 6]}
                name="income"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="momGrowth"
                stroke="#7f1d1d"
                strokeWidth={2}
                name="momGrowth"
                dot={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
