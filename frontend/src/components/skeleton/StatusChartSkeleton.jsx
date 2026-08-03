import { Skeleton } from '@/components/ui/skeleton';

const StatusChartSkeleton = () => {
  return (
    <div className="border rounded-lg p-6">
      <div className="h-75 w-full flex flex-col items-center justify-between">
        <div className="flex-1 flex items-center justify-center">
          <Skeleton className="w-40 h-40 rounded-full" />
        </div>
        
        <div className="flex items-center justify-center gap-4 mt-4 h-9">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
    </div>
  );
};

export default StatusChartSkeleton;