import { Route, Routes } from 'react-router-dom';
import ClientRoutes from './routes/ClientRoutes';
import AdminRoutes from './routes/AdminRoutes';

function App() {
  return (
    <Routes>
      {ClientRoutes()}
      {AdminRoutes()}
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
}

export default App;
