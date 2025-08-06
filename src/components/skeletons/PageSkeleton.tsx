
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const PageSkeleton = () => {
  return (
    <div className="pt-[44px] pb-16 px-3">
      {/* Hero Skeleton */}
      <Skeleton className="w-full h-40 rounded-lg mb-4" />
      
      {/* Categories Skeleton */}
      <div className="grid grid-cols-5 gap-2 mb-4">
        {Array(5).fill(0).map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            <Skeleton className="w-12 h-12 rounded-full mb-1" />
            <Skeleton className="w-16 h-3" />
          </div>
        ))}
      </div>
      
      {/* Content Sections */}
      {Array(3).fill(0).map((_, i) => (
        <div key={i} className="mb-4">
          <Skeleton className="w-40 h-5 mb-3" />
          <div className="grid grid-cols-2 gap-3">
            {Array(4).fill(0).map((_, j) => (
              <div key={j} className="bg-white rounded-md overflow-hidden border border-gray-100">
                <Skeleton className="w-full aspect-square" />
                <div className="p-2">
                  <Skeleton className="h-4 w-full mb-1.5" />
                  <Skeleton className="h-4 w-2/3 mb-1.5" />
                  <Skeleton className="h-3 w-1/2 mb-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PageSkeleton;
