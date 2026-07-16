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
              Bạn không có quyền truy cập vào trang quản trị này!
            </p>
          </div>
        }
      />
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
}

export default App;
