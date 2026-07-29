import { Route, Routes } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import LoginPage from '../pages/admin/LoginPage';
import ClientOnlyGuard from './ClientOnlyGuard';
import AdminGuard from './AdminGuard';
import NotFoundPage from '@/pages/NotFoundPage';
import ForgotPasswordPage from '@/pages/admin/ForgotPasswordPage';
import ResetPasswordPage from '@/pages/admin/ResetPasswordPage';
import Dashboard from '@/pages/admin/Dashboard';

const AdminRoutes = () => {
  return (
    <Routes>
      {/* Public*/}
      <Route element={<ClientOnlyGuard />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="reset-password" element={<ResetPasswordPage />} />
      </Route>

      {/* --- Private */}
      <Route element={<AdminGuard />}>
        <Route element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<h1>Manage Products</h1>} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AdminRoutes;
