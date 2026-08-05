import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Link } from 'react-router-dom';

const DashboardTableCard = ({
  headers,
  content,
  description,
  link,
  children,
}) => {
  return (
    <div className="border p-6 rounded-lg flex flex-col gap-2 animate-fade-up">
      <div className="flex items-center justify-between animate-fade-in">
        <div className="flex flex-col">
          <h3 className='text-sm sm:text-lg font-medium'>{content}</h3>
          <p className='text-sm text-muted-foreground hidden lg:block'>{description}</p>
        </div>

        <Link
          to={link}
          className="text-sm px-3 py-2 bg-primary font-medium text-white rounded-md"
        >
          View all
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((header) => (
              <TableHead key={header}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="animate-fade-up">{children}</TableBody>
      </Table>
    </div>
  );
};

export default DashboardTableCard;
