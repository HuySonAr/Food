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
import { useAuth } from '@/context/useAuth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getAvatarFallback } from '@/utils/avatar';

const AppSidebar = () => {
  const { user } = useAuth();
  const { open, state, setOpen, toggleSidebar } = useSidebar();
  const isMobile = useIsMobile();

  const collapsed = !isMobile && state === 'collapsed';
  console.log('user', user);
  return (
    <Sidebar collapsible="icon" side={`${isMobile ? 'right' : 'left'}`}>
      <SidebarHeader className="flex-row items-center justify-between h-20 px-3 gap-0 bg-muted border-b">
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

        {isMobile ? (
          <SidebarTrigger
            size="icon-lg"
            className="cursor-pointer hover:text-primary"
          />
        ) : (
          <Button
            variant="outline"
            onClick={toggleSidebar}
            className="h-auto gap-0 p-0 rounded-full border-none hover:text-primary cursor-pointer transition-colors duration-150"
          >
            {collapsed ? (
              <PanelRightClose className="size-5.5" />
            ) : (
              <PanelRightOpen className="size-5.5" />
            )}
          </Button>
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter className={`flex-row items-center gap-2 py-4 border-t transition-all duration-200 ${!collapsed && "px-3"}`}>
        <Avatar className="shrink-0">
          <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
            {getAvatarFallback(user.email)}
          </AvatarFallback>
        </Avatar>
        <div
          className={`overflow-hidden transition-all duration-200 ${collapsed ? 'opacity-0 w-0 translate-x-2' : 'opacity-100 w-auto flex-1 translate-x-0'}`}
        >
          <p className="truncate text-base font-semibold">{user.email}</p>
          <p className="text-sm text-muted-foreground">{user.role}</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
