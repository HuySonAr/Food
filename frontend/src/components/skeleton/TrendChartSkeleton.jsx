import { Skeleton } from '@/components/ui/skeleton';

const TrendChartSkeleton = () => {
  return (
    <div className="border rounded-lg p-6">
      <div className="h-75 w-full flex flex-col">
        <div className="flex-1 flex gap-4">
          <div className="flex flex-col justify-between h-full py-2 w-6.25">
            <Skeleton className="w-full h-3" />
            <Skeleton className="w-full h-3" />
            <Skeleton className="w-full h-3" />
            <Skeleton className="w-full h-3" />
          </div>
          
          <Skeleton className="flex-1 h-full rounded-t-lg" />
        </div>
        
        <div className="flex justify-between mt-4 pl-10.25">
          <Skeleton className="w-12 h-3" />
          <Skeleton className="w-12 h-3" />
          <Skeleton className="w-12 h-3" />
          <Skeleton className="w-12 h-3" />
          <Skeleton className="w-12 h-3" />
        </div>
      </div>
    </div>
  );
};

export default TrendChartSkeleton;