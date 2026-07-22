import { Skeleton } from '@/components/ui/skeleton';

const ProductSkeleton = () => {
  return (
    <div className="border overflow-hidden rounded-[12px]">
      <Skeleton className="h-57.5 w-full rounded-none" />

      <div className="p-7.5 flex flex-col items-center gap-2 sm:gap-3.75">
        <Skeleton className="h-7 sm:h-8 w-1/4" />
        <Skeleton className="h-6 sm:h-7 w-2/3 mt-1" />
        <div className="flex flex-col items-center gap-2 w-full mt-2">
          <Skeleton className="h-4 sm:h-5 w-full" />
          <Skeleton className="h-4 sm:h-5 w-4/5" />
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
