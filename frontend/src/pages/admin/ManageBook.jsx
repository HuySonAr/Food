import CustomSelect from '@/components/common/CustomSelect';
import SearchInput from '@/components/common/SearchInput';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { FILTER_SORT } from '@/constants/filterSort';
import { STATUS_RESERVATION, TIME_SLOTS } from '@/constants/reservation';
import { useAdminReservations } from '@/hooks/useReservation';
import { formatTimeSlot } from '@/utils/formatDate';
import { Edit, Trash } from 'lucide-react';
import { useState } from 'react';

const ManageBook = () => {
  const [page, setPage] = useState(1);

  const [filters, setFilters] = useState({
    keyword: '',
    status: 'pending',
    time: '',
    sort: 'desc',
  });

  const { reservations, pagination, loading, error } = useAdminReservations({
    page,
    limit: 10,
    ...filters,
  });

  const updateFilter = (key) => (value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    setPage(1);
  };

  return (
    <>
      <div className="relative z-20 grid grid-cols-1 lg:grid-cols-2 gap-3 animate-fade-up">
        <SearchInput
          value={filters.keyword}
          onChange={updateFilter('keyword')}
        />

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="flex-2 flex gap-3 w-full">
            <CustomSelect
              value={filters.status}
              options={STATUS_RESERVATION}
              onChange={updateFilter('status')}
              className="w-full"
            />

            <CustomSelect
              value={filters.time}
              options={TIME_SLOTS}
              onChange={updateFilter('time')}
              placeholder="Time"
              className="w-full"
            />
          </div>
          <div className="flex-1 flex gap-3 w-full">
            <CustomSelect
              value={filters.sort}
              options={FILTER_SORT}
              onChange={updateFilter('sort')}
              className="w-full"
            />

            <Button className="h-auto px-3 py-2 rounded-lg cursor-pointer">
              Search
            </Button>
          </div>
        </div>
      </div>

      <div className="relative z-0 border rounded-lg grid grid-cols-1">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Guests</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reservations.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.customerName}</TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell>{item.formattedDate}</TableCell>
                <TableCell>{formatTimeSlot(item.timeSlot)}</TableCell>
                <TableCell>{item.guests}</TableCell>
                <TableCell>
                  <Badge>{item.status}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className="p-2 bg-green-500 rounded-full cursor-pointer text-white"
                    >
                      <Edit className="size-4" />
                    </button>
                    <button
                      type="button"
                      className="p-2 bg-red-300 rounded-full cursor-pointer text-red-500"
                    >
                      <Trash className="size-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default ManageBook;
