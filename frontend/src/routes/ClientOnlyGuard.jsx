import { useAuth } from '../context/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

const ClientOnlyGuard = () => {
  const { user, loading } = useAuth();
  if (loading) return null;

  if (user && user.role === 'admin') {
    return <Navigate to="/admin" replace />;
  }
  return <Outlet />;
};

export default ClientOnlyGuard;
