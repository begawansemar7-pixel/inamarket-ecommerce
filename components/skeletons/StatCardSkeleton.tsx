import React from 'react';

const StatCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 animate-pulse">
      <div className="bg-gray-300 p-3 rounded-full w-12 h-12"></div>
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="h-8 bg-gray-300 rounded w-3/4"></div>
      </div>
    </div>
  );
};

export default StatCardSkeleton;
