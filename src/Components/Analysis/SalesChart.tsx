import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = Array.from({ length: 12 }, (_, i) => ({
  month: `Month ${i + 1}`,
  sales: Math.floor(Math.random() * 10000),
}));

const SalesChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="sales" stroke="#4A90E2" strokeWidth={2} dot={true} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SalesChart;
