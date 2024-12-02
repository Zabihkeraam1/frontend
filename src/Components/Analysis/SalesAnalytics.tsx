import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { year: 2015, sales: 50, profit: 40 },
  { year: 2016, sales: 60, profit: 50 },
  { year: 2017, sales: 55, profit: 45 },
  { year: 2018, sales: 70, profit: 60 },
  { year: 2019, sales: 85, profit: 75 },
];

const SalesAnalytics: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow text-center">
      <h3 className="text-lg font-semibold">Sales Analytics</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="sales" stroke="#3B82F6" strokeWidth={2} />
          <Line type="monotone" dataKey="profit" stroke="#10B981" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesAnalytics;
