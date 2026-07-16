import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import { useAuth } from '../context/useAuth';
import LoginPage from '../pages/admin/LoginPage';

const ProtectedAdmin = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="p-4 text-center">Đang kiểm tra quyền truy cập...</div>
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

const AdminRoutes = () => {
  return (
    <Routes>
      {/* Publish */}
      <Route path="login" element={<LoginPage />} />

      {/* Private */}
      <Route element={<ProtectedAdmin />}>
        <Route element={<AdminLayout />}>
          <Route index element={<h1>Dashboard</h1>} />
          <Route path="products" element={<h1>Manage Products</h1>} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
