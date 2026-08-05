import { TableCell, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

const DashboardTableSkeleton = ({ rows = 5, columns = 5 }) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, row) => (
        <TableRow key={row}>
          {Array.from({ length: columns }).map((_, col) => (
            <TableCell key={col}>
              <Skeleton
                className={
                  col === columns - 1 ? 'h-6 w-20 rounded-full' : 'h-4 w-full'
                }
              />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};

export default DashboardTableSkeleton;
