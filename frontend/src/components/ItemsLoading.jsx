import React from "react";
import { Skeleton } from "./ui/skeleton";

const SkeletonVariations = ({ loading }) => {
  return (
    loading && (
      <div className="flex flex-wrap">
        {/* Variation 1 */}
        <div className="w-full px-2 sm:w-1/1 md:w-1/2 lg:w-1/2 xl:w-1/4  flex-1 ">
          <Skeleton className="w-[280px] h-[70px] pt-1 mt-6 rounded-lg p-2 m-1 shadow-md">
            <Skeleton className="w-[50px] h-[20px] rounded-md mt-2 ml-2" />
            <Skeleton className="w-[120px] h-[15px] rounded-md mt-2 ml-2" />
          </Skeleton>
        </div>

        {/* Variation 2 */}
        <div className="w-full px-2 sm:w-1/1 md:w-1/2 lg:w-1/2 xl:w-1/4  flex-1 ">
          <Skeleton className="w-[280px] h-[70px] pt-1 mt-6 rounded-lg p-2 m-1 shadow-md">
            <Skeleton className="w-[80px] h-[20px] rounded-md mt-2 ml-2" />
            <Skeleton className="w-[140px] h-[15px] rounded-md mt-2 ml-2" />
          </Skeleton>
        </div>

        {/* Variation 3 */}
        <div className="w-full px-2 sm:w-1/1 md:w-1/2 lg:w-1/2 xl:w-1/4  flex-1 ">
          <Skeleton className="w-[280px] h-[70px] pt-1 mt-6 rounded-lg p-2 m-1 shadow-md">
            <Skeleton className="w-[90px] h-[20px] rounded-md mt-2 ml-2" />
            <Skeleton className="w-[140px] h-[15px] rounded-md mt-2 ml-2" />
          </Skeleton>
        </div>

        {/* Variation 4 */}
        <div className="w-full px-2 sm:w-1/1 md:w-1/2 lg:w-1/2 xl:w-1/4  flex-1 ">
          <Skeleton className="w-[280px] h-[70px] pt-1 mt-6 rounded-lg p-2 m-1 shadow-md">
            <Skeleton className="w-[60px] h-[20px] rounded-md mt-2 ml-2" />
            <Skeleton className="w-[110px] h-[15px] rounded-md mt-2 ml-2" />
          </Skeleton>
        </div>
      </div>
    )
  );
};

export default SkeletonVariations;
