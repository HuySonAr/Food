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

  console.log('mobile', isMobile);

  const test = true;

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
    <div className="py-4 px-3 flex items-center bg-muted justify-between shadow">
      <div className="flex flex-col">
        <h2 className="text-lg font-semibold">{greeting}. Admin</h2>
        <p className="text-sm text-muted-foreground">Have a great day!</p>
      </div>

      <div className="flex items-center gap-2">
        <Button
          disabled={loading}
          onClick={handleLogout}
          className="cursor-pointer"
        >
          {loading ? <Loader2 className="animate-spin" /> : 'Log out'}
        </Button>
        {isMobile && <SidebarTrigger className="cursor-pointer" />}
      </div>
    </div>
  );
};

export default AdminHeader;
