import React from "react";

const CustomerStats: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow text-center">
      <h3 className="text-lg font-semibold">Customers</h3>
      <div className="flex justify-center my-4">
        <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
          {/* Replace with an actual chart or icon as needed */}
          <span className="text-blue-500 text-2xl font-semibold">●</span>
        </div>
      </div>
      <div className="flex justify-around text-center">
        <div>
          <p className="text-xl font-semibold">34,249</p>
          <p className="text-sm text-gray-500">New Customers</p>
        </div>
        <div>
          <p className="text-xl font-semibold">1,420</p>
          <p className="text-sm text-gray-500">Repeated</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerStats;
