import { useState } from 'react';
import { useAuth } from '../context/useAuth';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogout = async () => {
    setLoading(true);
    setError(null);
    try {
      await logout();
    } catch (error) {
      setError(error.response?.data);
      console.log('test', error.response?.data);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="h-screen flex items-center justify-center">
      <h1 className="text-red-500">{error}</h1>
      <button
        onClick={handleLogout}
        disabled={loading}
        className="bg-green-500 p-2 rounded-md text-white cursor-pointer hover:text-black"
      >
        {loading ? 'Loading' : 'Log out'}
      </button>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
