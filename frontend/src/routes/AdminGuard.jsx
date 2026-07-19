import { Loader2 } from 'lucide-react';
import { useAuth } from '../context/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

const AdminGuard = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="flex items-center gap-0.5">
          <Loader2 className="size-8 animate-spin" />
          Loading
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  if (user.role !== 'admin') {
    return <Navigate to="/403" replace />;
  }

  return <Outlet />;
};

export default AdminGuard;
