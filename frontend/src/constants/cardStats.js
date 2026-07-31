import {
  ArchiveRestore,
  MessageSquareText,
  Utensils,
  FileText,
} from 'lucide-react';

export const CARDS_CONFIG = [
  {
    title: 'Pending Book',
    icon: ArchiveRestore,
    dataKey: 'reservations',
    themeColor: 'blue',
    link: '/admin/reservations'
  },
  {
    title: 'Noti Contacts',
    icon: MessageSquareText,
    dataKey: 'contacts',
    themeColor: 'amber',
    link: '/admin/contacts'
  },
  {
    title: 'Total Products',
    icon: Utensils,
    dataKey: 'products',
    themeColor: 'emerald',
    link: '/admin/products'
  },
  {
    title: 'Published Blogs',
    icon: FileText,
    dataKey: 'blogs',
    themeColor: 'purple',
    link: '/admin/blogs'
  },
];
