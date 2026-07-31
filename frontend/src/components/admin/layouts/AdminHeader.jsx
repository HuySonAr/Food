import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useAuth } from '@/context/useAuth';
import { useIsMobile } from '@/hooks/use-mobile';
import { getGreeting } from '@/utils/greeting';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const AdminHeader = () => {
  const isMobile = useIsMobile();
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);

  const greeting = getGreeting();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
    } catch (error) {
      toast.error(error.response?.data?.msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sticky z-10 top-0 py-4 px-3 flex items-center bg-muted justify-between shadow">
      <div className="flex flex-col">
        <h2 className="text-lg font-semibold">{greeting}, Admin</h2>
        <p className="text-sm text-muted-foreground">Have a great day!</p>
      </div>

      <div className="flex items-center gap-1 sm:gap-3">
        <Button
          disabled={loading}
          onClick={handleLogout}
          className="cursor-pointer text-sm sm:text-base h-auto py-2 px-3"
        >
          {loading ? <Loader2 className="animate-spin" /> : 'Log out'}
        </Button>
        {isMobile && <SidebarTrigger size="icon-lg" className="cursor-pointer" />}
      </div>
    </div>
  );
};

export default AdminHeader;
