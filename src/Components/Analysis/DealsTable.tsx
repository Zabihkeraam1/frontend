import React from "react";

const DealsTable: React.FC = () => {
  return (
    <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
      <thead>
        <tr>
          <th className="px-4 py-2 border-b">Product Name</th>
          <th className="px-4 py-2 border-b">Location</th>
          <th className="px-4 py-2 border-b">Date - Time</th>
          <th className="px-4 py-2 border-b">Piece</th>
          <th className="px-4 py-2 border-b">Amount</th>
          <th className="px-4 py-2 border-b">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr className="text-center">
          <td className="px-4 py-2 border-b">Apple Watch</td>
          <td className="px-4 py-2 border-b">6096 Marjolaine Landing</td>
          <td className="px-4 py-2 border-b">12.09.2019 - 12:53 PM</td>
          <td className="px-4 py-2 border-b">423</td>
          <td className="px-4 py-2 border-b">$34,295</td>
          <td className="px-4 py-2 border-b text-green-500 font-semibold">Delivered</td>
        </tr>
      </tbody>
    </table>
  );
};

export default DealsTable;
