import { Navigate, Route } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';

const ProtectedAdmin = ({ children }) => {
  const isAdmin = localStorage.getItem('role') === 'admin';
  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

const AdminRoutes = () => {
  return (
    <Route path="admin">
      <Route path="login" element={<h1>Page Login</h1>} />
      <Route
        element={
          <ProtectedAdmin>
            <AdminLayout />
          </ProtectedAdmin>
        }
      >
        <Route index element={<h1>Dashboard</h1>} />
        <Route path="products" element={<h1>Manage Products</h1>} />
      </Route>
    </Route>
  );
};

export default AdminRoutes;
