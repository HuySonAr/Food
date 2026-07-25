import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format, isValid, parse } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';

const CustomDatePicker = ({
  name,
  value,
  placeholder,
  onChange,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const parsedDate = value ? parse(value, 'yyyy-MM-dd', new Date()) : null;
  const selectedDate = isValid(parsedDate) ? parsedDate : null;

  const handleSelect = (date) => {
    if (date) {
      onChange(name, format(date, 'yyyy-MM-dd'));
      setIsOpen(false);
    } else {
      onChange(name, '');
    }
  };
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger
        className={cn(
          'flex w-full items-center justify-between rounded-[72px] border px-4 py-3 sm:px-6 sm:py-4 text-left text-sm sm:text-base focus:border-primary cursor-pointer',
          className,
        )}
      >
        {selectedDate ? format(selectedDate, 'dd/MM/yyyy') : placeholder}
        <CalendarIcon className="size-3.5 sm:size-4 text-foreground" />
      </PopoverTrigger>

      <PopoverContent
        className="w-auto p-0 rounded-2xl border shadow-xs bg-accent"
        align="start"
      >
        <Calendar
          mode="single"
          captionLayout="dropdown"
          disabled={{ before: new Date() }}
          classNames={{ weekday: 'w-full' }}
          selected={selectedDate}
          onSelect={handleSelect}
        />
      </PopoverContent>
    </Popover>
  );
};

export default CustomDatePicker;
