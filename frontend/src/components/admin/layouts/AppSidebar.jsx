import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import logo from '../../../assets/logo.svg';
import { PanelRightClose, PanelRightOpen } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/useAuth';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getAvatarFallback } from '@/utils/avatar';
import { NavLink } from 'react-router-dom';
import { SIDEBAR_ITEM } from '@/constants/sidebarItem';

const AppSidebar = () => {
  const { user } = useAuth();
  const { open, state, setOpen, toggleSidebar } = useSidebar();
  const isMobile = useIsMobile();

  const collapsed = !isMobile && state === 'collapsed';

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
        <SidebarGroup>
          <SidebarMenu>
            {SIDEBAR_ITEM.map((item) => (
              <SidebarMenuItem key={item.title}>
                <NavLink
                  to={item.url}
                  end={item.end}
                  className="w-full block"
                >
                  {({ isActive }) => (
                    <SidebarMenuButton
                      tooltip={item.title}
                      isActive={isActive}
                      className="cursor-pointer h-auto py-3 w-full gap-2 data-active:bg-primary data-active:text-white data-active:font-normal data-active:hover:bg-primary data-active:hover:text-white"
                    >
                      <item.icon className="" />
                      <span className="text-base">{item.title}</span>
                    </SidebarMenuButton>
                  )}
                </NavLink>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter
        className={`flex-row items-center gap-2 py-4 border-t transition-all duration-200 ${!collapsed && 'px-3'}`}
      >
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
