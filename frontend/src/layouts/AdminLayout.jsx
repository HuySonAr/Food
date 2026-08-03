import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/admin/layouts/AppSidebar';
import AdminHeader from '@/components/admin/layouts/AdminHeader';
import InfoNavbar from '@/components/admin/layouts/InfoNavbar';

const AdminLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />

        <div className="flex flex-1 flex-col">
          <AdminHeader />
          <InfoNavbar />

          <main className='flex-1 p-6 bg-white space-y-6'>
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
