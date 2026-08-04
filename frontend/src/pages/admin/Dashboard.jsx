import { useDashboard, useDashboardCharts } from '@/hooks/useDashboard';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import StatCard from '@/components/admin/dashboard/StatCard';
import { CARDS_CONFIG } from '@/constants/cardStats';
import StatCardSkeleton from '@/components/skeleton/StatCardSkeleton';
import { AlertCircle } from 'lucide-react';
import TrendChart from '@/components/admin/dashboard/TrendChart';
import SegmentedControl from '@/components/SegmentedControl';
import { TIME_RANGES } from '@/constants/buttonTime';
import StatusChart from '@/components/admin/dashboard/StatusChart';
import TrendChartSkeleton from '@/components/skeleton/TrendChartSkeleton';
import StatusChartSkeleton from '@/components/skeleton/StatusChartSkeleton';
import { useAdminReservations } from '@/hooks/useReservation';
import { useAdminContacts } from '@/hooks/useContact';
import DashboardTableCard from '@/components/admin/dashboard/DashboardTableCard';
import { TableCell, TableRow } from '@/components/ui/table';

const headerContact = ['Name', 'Email', 'Subject', 'Time', 'Status'];
const headerReservation = ['Customer', 'Date', 'Guests', 'Time', 'Status'];

const Dashboard = () => {
  const [range, setRange] = useState('week');

  const { stats, loading: statsLoading, error: statsError } = useDashboard();
  const {
    charts,
    loading: chartsLoading,
    error: chartsError,
  } = useDashboardCharts(range);

  const { reservations } = useAdminReservations(1, 5, '', 'pending');
  const { contacts } = useAdminContacts(1, 5, '', 'pending');

  console.log('reservations', reservations);
  console.log('contacts', contacts);

  useEffect(() => {
    if (statsError) {
      toast.error(statsError);
    }
    if (chartsError) {
      toast.error(chartsError);
    }
  }, [statsError, chartsError]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsLoading &&
          Array.from({ length: 4 }).map((_, index) => (
            <StatCardSkeleton key={index} />
          ))}

        {!statsLoading && statsError && (
          <div className="col-span-1 sm:col-span-2 lg:col-span-4 flex flex-col items-center justify-center p-8 bg-red-50/50 border border-red-200 rounded-2xl gap-3">
            <AlertCircle className="size-8 text-red-500" />
            <div className="text-center">
              <h3 className="text-lg font-semibold text-red-700">
                Failed to load statistics
              </h3>
              <p className="text-sm text-red-600 mt-1">{statsError}</p>
            </div>
          </div>
        )}

        {!statsLoading &&
          !statsError &&
          stats &&
          CARDS_CONFIG.map((config, index) => (
            <StatCard
              key={index}
              index={index}
              title={config.title}
              icon={config.icon}
              data={stats[config.dataKey]}
              themeColor={config.themeColor}
              link={config.link}
            />
          ))}
      </div>

      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-1">
        <div className="flex flex-col animate-fade-up">
          <h2 className="text-lg lg:text-2xl font-medium">
            Reservations Analytics
          </h2>
          <p className="text-sm text-muted-foreground hidden lg:block">
            Monitor reservation trends and status distribution over time.
          </p>
        </div>
        <SegmentedControl
          options={TIME_RANGES}
          value={range}
          onValueChange={setRange}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {chartsLoading && (
          <>
            <div className="col-span-1 md:col-span-2">
              <TrendChartSkeleton />
            </div>
            <div className="col-span-1">
              <StatusChartSkeleton />
            </div>
          </>
        )}
        {!chartsLoading && chartsError && (
          <div className="col-span-1 md:col-span-3 flex flex-col items-center justify-center p-8 bg-red-50/50 border border-red-200 rounded-2xl gap-3">
            <AlertCircle className="size-8 text-red-500" />
            <div className="text-center">
              <h3 className="text-lg font-semibold text-red-700">
                Failed to load charts
              </h3>
              <p className="text-sm text-red-600 mt-1">{chartsError}</p>
            </div>
          </div>
        )}
        {!chartsLoading && !chartsError && (
          <>
            <div className="col-span-1 md:col-span-2">
              <TrendChart data={charts?.reservationTrend} />
            </div>
            <div className="col-span-1">
              <StatusChart data={charts?.reservationStatus} />
            </div>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardTableCard
          headers={headerReservation}
          content="Pending Reservations"
          description="Reservations awaiting confirmation"
          link="/admin/reservations"
        >
          {reservations.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item?.customerName}</TableCell>
              <TableCell>{item?.formattedDate}</TableCell>
              <TableCell>{item?.guests}</TableCell>
              <TableCell>{item?.timeSlot}</TableCell>
              <TableCell>{item?.status}</TableCell>
            </TableRow>
          ))}
        </DashboardTableCard>

        <DashboardTableCard
          headers={headerContact}
          content="Pending Contacts"
          description="Customer inquiries awaiting response."
          link="/admin/contacts"
        >
          {contacts.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item?.name}</TableCell>
              <TableCell>{item?.email}</TableCell>
              <TableCell>{item?.subject}</TableCell>
              <TableCell>{item?.formattedCreatedAt}</TableCell>
              <TableCell>{item?.status}</TableCell>
            </TableRow>
          ))}
        </DashboardTableCard>
      </div>
    </>
  );
};

export default Dashboard;
