import React from "react";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, change }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow text-center">
      <h3 className="text-gray-500">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
      <p className={`text-sm mt-1 ${change.startsWith("-") ? "text-red-500" : "text-green-500"}`}>
        {change.startsWith("-") ? "▼" : "▲"} {change} from yesterday
      </p>
    </div>
  );
};

export default StatsCard;
