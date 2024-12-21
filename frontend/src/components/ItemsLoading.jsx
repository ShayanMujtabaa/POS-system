// SkeletonVariations.jsx
import React from 'react';
import { Skeleton } from './ui/skeleton';

const SkeletonVariations = ({ loading }) => {
  return (
    loading && (
      <div className="flex gap-4">
        {/* Variation 1 */}
        <Skeleton className="w-[300px] h-[70px] rounded-md">
          <Skeleton className="w-[90px] h-[30px] rounded-md mt-2 ml-2" />
          <Skeleton className="w-[120px] h-[20px] rounded-md mt-2 ml-2" />
        </Skeleton>

        {/* Variation 2 */}
        <Skeleton className="w-[250px] h-[70px] rounded-md">
          <Skeleton className="w-[100px] h-[25px] rounded-md mt-2 ml-2" />
          <Skeleton className="w-[130px] h-[18px] rounded-md mt-2 ml-2" />
        </Skeleton>

        {/* Variation 3 */}
        <Skeleton className="w-[320px] h-[80px] rounded-md">
          <Skeleton className="w-[110px] h-[35px] rounded-md mt-2 ml-2" />
          <Skeleton className="w-[140px] h-[22px] rounded-md mt-2 ml-2" />
        </Skeleton>

        {/* Variation 4 */}
        <Skeleton className="w-[280px] h-[70px] rounded-md">
          <Skeleton className="w-[80px] h-[28px] rounded-md mt-2 ml-2" />
          <Skeleton className="w-[110px] h-[18px] rounded-md mt-2 ml-2" />
        </Skeleton>

        {/* Variation 5 */}
        <Skeleton className="w-[300px] h-[75px] rounded-md">
          <Skeleton className="w-[95px] h-[32px] rounded-md mt-2 ml-2" />
          <Skeleton className="w-[125px] h-[19px] rounded-md mt-2 ml-2" />
        </Skeleton>

        {/* Variation 6 */}
        <Skeleton className="w-[350px] h-[90px] rounded-md">
          <Skeleton className="w-[120px] h-[40px] rounded-md mt-2 ml-2" />
          <Skeleton className="w-[150px] h-[15px] rounded-md mt-2 ml-2" />
        </Skeleton>
      </div>
    )
  );
};

export default SkeletonVariations;
