import React from "react";

const FeaturedProduct: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow text-center">
      <h3 className="text-lg font-semibold">Featured Product</h3>
      <div className="my-4">
        {/* Placeholder for product image or icon */}
        <div className="w-full h-20 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
          <span>Image Here</span>
        </div>
      </div>
      <p className="text-md font-semibold mt-2">Beats Headphone 2019</p>
      <p className="text-blue-500 text-lg font-semibold">$89.00</p>
    </div>
  );
};

export default FeaturedProduct;
