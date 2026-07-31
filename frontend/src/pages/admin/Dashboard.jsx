import { useDashboard } from '@/hooks/useDashboard';
import { useEffect } from 'react';
import { toast } from 'sonner';
import StatCard from '@/components/admin/dashboard/StatCard';
import { CARDS_CONFIG } from '@/constants/cardStats';
import StatCardSkeleton from '@/components/skeleton/StatCardSkeleton';
import { AlertCircle } from 'lucide-react';

const Dashboard = () => {
  const { stats, loading, error } = useDashboard();
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading && (
          Array.from({length: 4}).map((_, index) => (
            <StatCardSkeleton key={index} />
          ))
        )}

        {!loading && error && (
          <div className="col-span-1 sm:col-span-2 lg:col-span-4 flex flex-col items-center justify-center p-8 bg-red-50/50 border border-red-200 rounded-2xl gap-3">
            <AlertCircle className="size-8 text-red-500" />
            <div className="text-center">
              <h3 className="text-lg font-semibold text-red-700">Failed to load statistics</h3>
              <p className="text-sm text-red-600 mt-1">{error}</p>
            </div>
          </div>
        )}
        
        {!loading && !error && stats &&
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
    </>
  );
};

export default Dashboard;
