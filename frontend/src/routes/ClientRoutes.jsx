import { Route, Routes } from 'react-router-dom';
import HomePage from '@/pages/public/HomePage';
import ClientLayout from '@/layouts/ClientLayout';
import AboutPage from '@/pages/public/AboutPage';
import MenuPage from '@/pages/public/MenuPage';
import ContactPage from '@/pages/public/ContactPage';
import BookPage from '@/pages/public/BookPage';

const ClientRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ClientLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="menu" element={<MenuPage />} />
        <Route path="blog" element={<h1>Blog</h1>} />
        <Route path="blog/:slug" element={<h1>Blog details</h1>} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="book" element={<BookPage />} />
      </Route>
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
};

export default ClientRoutes;
