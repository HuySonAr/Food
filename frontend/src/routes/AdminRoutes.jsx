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
    <>
      <Route path="/admin/login" element={<AdminLayout />} />

      <Route
        path="/admin"
        element={
          <ProtectedAdmin>
            <AdminLayout />
          </ProtectedAdmin>
        }
      >
        <Route index element={<h1>Dashboard</h1>} />
      </Route>
    </>
  );
};

export default AdminRoutes;
