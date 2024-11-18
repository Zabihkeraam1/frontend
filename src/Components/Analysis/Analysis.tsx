import React from "react";
import StatsCard from "./StatsCard";
import SalesChart from "./SalesChart";
import DealsTable from "./DealsTable";
import RevenueChart from "./RevenueChart";
import CustomerStats from "./CostumerStats";
import FeaturedProduct from "./FeaturedProduct";
import SalesAnalytics from "./SalesAnalytics";

const Dashboard: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <input
          type="text"
          placeholder="Search"
          className="px-4 py-2 rounded-lg border border-gray-300"
        />
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatsCard title="Total User" value="40,689" change="8.5%" />
        <StatsCard title="Total Order" value="10,293" change="1.3%" />
        <StatsCard title="Total Sales" value="$89,000" change="-4.3%" />
        <StatsCard title="Total Pending" value="2,040" change="1.8%" />
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-lg font-semibold mb-4">Sales Details</h2>
        <SalesChart />
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Deals Details</h2>
        <DealsTable />
      </div>
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-lg font-semibold mb-4">Revenue</h2>
        <RevenueChart />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CustomerStats />
        <FeaturedProduct />
        <SalesAnalytics />
      </div>
    </div>
  );
};

export default Dashboard;
