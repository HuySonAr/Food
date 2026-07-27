import { Skeleton } from '@/components/ui/skeleton';

const BlogSkeleton = () => {
  return (
    <div className="border border-muted rounded-[12px] overflow-hidden shadow-form">
      <Skeleton className="h-50 w-full rounded-none" />

      <div className="p-7.5 flex flex-col gap-2 sm:gap-3">
        <Skeleton className="h-4 sm:h-5 w-1/4" />
        <div className="flex flex-col gap-0.5">
          <Skeleton className="h-5.5 sm:h-6.5 w-full" />
          <Skeleton className="h-5.5 sm:h-6.5 w-full" />
        </div>
      </div>
    </div>
  );
};

export default BlogSkeleton;
