import { Outlet } from 'react-router-dom';
import Header from '@/components/client/layouts/Header';
import TopBar from '@/components/client/layouts/TopBar';


const ClientLayout = () => {
  return (
    <div className="">
      <TopBar />
      <Header />

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default ClientLayout;
