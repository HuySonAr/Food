import { Skeleton } from '@/components/ui/skeleton';

const StatCardSkeleton = () => {
  return (
    <div className="bg-white border p-2 rounded-lg">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Skeleton className="w-8 h-8 rounded-sm" />
          <Skeleton className="h-5 w-32 rounded-md" />
        </div>

        <div className="flex items-center gap-6">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-9 w-20 rounded-md" />
            <Skeleton className="h-4 w-28 rounded-md mt-1" />
          </div>

          <div className="flex-1 w-16 h-16">
            <Skeleton className="w-full h-full rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCardSkeleton;