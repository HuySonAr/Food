import { NavLink, Outlet } from 'react-router-dom';
import TopBar from '../components/client/layouts/TopBar';

const ClientLayout = () => {
  const listNav = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Menu', path: '/menu' },
    { name: 'Pages', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];
  return (
    <div className="">
        <TopBar />
      <header className="flex justify-center items-center gap-10 p-2">
        {listNav.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `${isActive ? 'text-red-400' : ''}`}
          >
            {item.name}
          </NavLink>
        ))}
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default ClientLayout;
