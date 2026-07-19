import { Route, Routes } from 'react-router-dom';
import HomePage from '@/pages/public/HomePage';
import ClientLayout from '@/layouts/ClientLayout';
import AboutPage from '@/pages/public/AboutPage';

const ClientRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ClientLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="menu" element={<h1>Menu</h1>} />
        <Route path="blog" element={<h1>Blog</h1>} />
        <Route path="blog/:slug" element={<h1>Blog details</h1>} />
        <Route path="contact" element={<h1>Contact</h1>} />
        <Route path="book" element={<h1>Book a table</h1>} />
      </Route>
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
};

export default ClientRoutes;
