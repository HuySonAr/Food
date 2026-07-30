import {
  ArchiveRestore,
  MessageSquareText,
  Utensils,
  FileText,
} from 'lucide-react';

export const CARDS_CONFIG = [
  {
    title: 'Pending Reservations',
    icon: ArchiveRestore,
    dataKey: 'reservations',
    color: 'border-blue-600',
    hover: 'hover:border-blue-600',
  },
  {
    title: 'Pending Contacts',
    icon: MessageSquareText,
    dataKey: 'contacts',
    color: 'border-amber-600',
    hover: 'hover:border-amber-600',
  },
  {
    title: 'Total Products',
    icon: Utensils,
    dataKey: 'products',
    color: 'border-emerald-600',
    hover: 'hover:border-emerald-600',
  },
  {
    title: 'Published Blogs',
    icon: FileText,
    dataKey: 'blogs',
    color: 'border-purple-600',
    hover: 'hover:border-purple-600',
  },
];
