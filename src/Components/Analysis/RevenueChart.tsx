import React from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = Array.from({ length: 12 }, (_, i) => ({
  month: `M${i + 1}`,
  sales: Math.floor(Math.random() * 100),
  profit: Math.floor(Math.random() * 100),
}));

const RevenueChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="sales" stroke="#A78BFA" fill="#A78BFA" opacity={0.6} />
        <Area type="monotone" dataKey="profit" stroke="#F87171" fill="#F87171" opacity={0.6} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default RevenueChart;
