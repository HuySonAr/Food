import { 
  LayoutDashboard,
  CalendarDays, 
  MessageSquareText, 
  Utensils, 
  FileText 
} from 'lucide-react';

export const SIDEBAR_ITEM = [
  {
    title: 'Dashboard',
    url: '/admin',
    icon: LayoutDashboard,
    end: true
  },
  {
    title: 'Reservations',
    url: '/admin/reservations',
    icon: CalendarDays,
  },
  {
    title: 'Contacts',
    url: '/admin/contacts',
    icon: MessageSquareText,
  },
  {
    title: 'Products',
    url: '/admin/products',
    icon: Utensils,
  },
  {
    title: 'Blogs',
    url: '/admin/blogs',
    icon: FileText,
  },
];
