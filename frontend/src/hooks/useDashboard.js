import { getDashboardStatsService } from '@/services/dashboard.service';
import { useEffect, useState } from 'react';

export const useDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getDashboardStatsService();
        setStats(response.data);
      } catch (err) {
        setError(err.response?.data?.msg);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
};
