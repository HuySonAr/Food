import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import logo from '../../../assets/logo.svg';
import { PanelRightClose, PanelRightOpen } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';

const AppSidebar = () => {
  const { open, state, setOpen, toggleSidebar } = useSidebar();
  const isMobile = useIsMobile();

  const collapsed = !isMobile && state === "collapsed";
  return (
    <Sidebar collapsible="icon" side={`${isMobile ? 'right' : 'left'}`}>
      <SidebarHeader className="flex-row items-center justify-between gap-0 px-3 py-4">
        <div
          className={`flex items-center gap-1 transition-all duration-200 overflow-hidden
                    ${
                    collapsed
                        ? 'opacity-0 w-0 translate-x-2'
                        : 'opacity-100 w-auto translate-x-0'
                    }`}
        >
          <img src={logo} alt="Logo" className="size-8 shrink-0" />

          <span className="font-serif text-xl font-semibold italic whitespace-nowrap">
            Bistro Bliss
          </span>
        </div>

        <Button
          variant="outline"
          onClick={toggleSidebar}
          className="h-auto size-7 gap-0 p-0 rounded-full border-none hover:text-primary cursor-pointer transition-colors duration-150"
        >
          {collapsed ? (
            <PanelRightOpen className="size-4.5" />
          ) : (
            <PanelRightClose className="size-4.5" />
          )}
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default AppSidebar;
