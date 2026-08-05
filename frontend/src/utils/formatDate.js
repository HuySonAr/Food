import { format, parse } from 'date-fns';

export const formatDate = (date) => {
  if (!date) return '';
  return format(new Date(date), 'MMMM d, yyyy');
};

export const formatTimeSlot = (time) => {
  if (!time) return '';

  return format(
    parse(time, 'HH:mm', new Date()),
    'hh:mm a',
  );
};

export const getCurrentDateInfo = () => {
  const now = new Date();
  return {
    month: format(now, 'MMMM'),
    fullDate: `Today is ${format(now, 'EEEE, MMM do, yyyy')}`,
  };
};
