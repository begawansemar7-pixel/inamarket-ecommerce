import React from 'react';

const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      <div className="animate-pulse flex flex-col h-full">
        {/* Image Placeholder */}
        <div className="w-full h-48 bg-gray-300"></div>
        
        {/* Content Placeholder */}
        <div className="p-4 flex flex-col flex-grow">
          {/* Category */}
          <div className="h-3 bg-gray-300 rounded w-1/3 mb-2"></div>
          
          {/* Title */}
          <div className="h-5 bg-gray-300 rounded w-full"></div>
          
          {/* Price */}
          <div className="h-6 bg-gray-300 rounded w-1/2 mt-2"></div>
          
          {/* Seller */}
          <div className="h-4 bg-gray-300 rounded w-2/3 mt-3"></div>

          {/* Rating */}
          <div className="h-4 w-20 bg-gray-300 rounded mt-2"></div>

          {/* Buttons */}
          <div className="mt-auto pt-4 space-y-2">
              <div className="h-9 bg-gray-300 rounded-md w-full"></div>
              <div className="h-9 bg-gray-200 rounded-md w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
