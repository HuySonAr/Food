import { SIDEBAR_ITEM } from '@/constants/sidebarItem';
import { getCurrentDateInfo } from '@/utils/formatDate';
import { useLocation } from 'react-router-dom';

const InfoNavbar = () => {
  const { month, fullDate } = getCurrentDateInfo();
  const { pathname } = useLocation();
  const currentPage = SIDEBAR_ITEM.find((item) => item.url === pathname);
  return (
    <div className="px-6 mt-6 opacity-0 animate-fade-in">
      <div className="border rounded-lg p-3 flex items-center justify-between">
        <div key={currentPage?.title} className="relative inline-flex h-8 items-center bg-primary px-3 sm:px-4 text-white text-xs sm:text-sm font-semibold rounded-sm opacity-0 animate-pop-in">
          {currentPage?.title}
        </div>

        <div className="flex flex-col opacity-0 animate-fade-up duration-150">
          <h3 className="text-right text-lg sm:text-xl font-semibold">{month}</h3>
          <p className="text-xs sm:text-sm text-muted-foreground">{fullDate}</p>
        </div>
      </div>
    </div>
  );
};

export default InfoNavbar;
