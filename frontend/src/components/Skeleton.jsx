import React from 'react';

/**
 * Loading Skeleton Component
 */
const Skeleton = ({ count = 1, className = '' }) => {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className={`bg-gray-200 rounded-lg animate-pulse ${className}`}
        />
      ))}
    </>
  );
};

export default Skeleton;

/**
 * Product Skeleton Card
 */
export const ProductSkeleton = ({ count = 8 }) => {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <Skeleton className="h-64 w-full" />
          <div className="p-4 space-y-3">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      ))}
    </>
  );
};
