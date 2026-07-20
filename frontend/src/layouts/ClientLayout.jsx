import { Outlet } from 'react-router-dom';
import Header from '@/components/client/layouts/Header';
import TopBar from '@/components/client/layouts/TopBar';
import Footer from '@/components/client/layouts/Footer';


const ClientLayout = () => {
  return (
    <div className="">
      <TopBar />
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default ClientLayout;
