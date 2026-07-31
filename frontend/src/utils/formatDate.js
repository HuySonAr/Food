import { format } from 'date-fns';

export const formatDate = (date) => {
  if (!date) return '';
  return format(new Date(date), 'MMMM d, yyyy');
};

export const getCurrentDateInfo = () => {
  const now = new Date();
  return {
    month: format(now, 'MMMM'),
    fullDate: `Today is ${format(now, 'EEEE, MMM do, yyyy')}`,
  };
};
