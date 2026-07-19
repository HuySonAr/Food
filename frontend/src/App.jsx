import { Route, Routes } from 'react-router-dom';
import ClientRoutes from './routes/ClientRoutes';
import AdminRoutes from './routes/AdminRoutes';
import { AuthProvider } from './provider/AuthProvider';

function App() {
  return (
    <Routes>
      <Route path="/*" element={<ClientRoutes />} />
      <Route
        path="/admin/*"
        element={
          <AuthProvider>
            <AdminRoutes />
          </AuthProvider>
        }
      />
      <Route
        path="/403"
        element={
          <div className="flex flex-col items-center justify-center h-screen gap-4">
            <h1 className="text-4xl font-bold text-red-600">403 - Forbidden</h1>
            <p className="text-lg">
              You do not have permission to access the admin panel.
            </p>
          </div>
        }
      />
    </Routes>
  );
}

export default App;
