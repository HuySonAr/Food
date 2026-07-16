import { Route, Routes } from 'react-router-dom';
import ClientLayout from '../layouts/ClientLayout';

const ClientRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ClientLayout />}>
        <Route index element={<h1>Home</h1>} />
        <Route path="about" element={<h1>About</h1>} />
        <Route path="menu" element={<h1>Menu</h1>} />
        <Route path="blog" element={<h1>Blog</h1>} />
        <Route path="blog/:slug" element={<h1>Blog details</h1>} />
        <Route path="contact" element={<h1>Contact</h1>} />
        <Route path="book" element={<h1>Book a table</h1>} />
      </Route>
    </Routes>
  );
};

export default ClientRoutes;
