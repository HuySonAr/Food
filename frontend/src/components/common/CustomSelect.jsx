import { Check, ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const CustomSelect = ({ value, options, onChange, placeholder, className }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!ref.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selected = options.find((item) => item.value === value);

  return (
    <div
      ref={ref}
      className={cn(
        'relative rounded-lg has-[button:focus]:outline-1 has-[button-focus]:-outline-offset-1 has-[button:focus]:outline-primary',
        className,
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-between gap-3 w-full text-sm px-3 py-2 border rounded-lg focus:outline-none cursor-pointer"
      >
        <span className={cn(!selected && 'text-muted-foreground')}>
          {selected?.label ?? placeholder}
        </span>

        <ChevronDown
          className={cn('size-4 transition-transform', open && 'rotate-180')}
        />
      </button>

      {open && (
        <div className="absolute left-0 right-0 z-10 mt-1 border rounded-lg overflow-hidden max-h-40 overflow-y-auto no-scrollbar bg-white shadow animate-fade-up">
          {options.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => {
                onChange(item.value);
                setOpen(false);
              }}
              className={cn(
                'flex items-center justify-between text-sm w-full px-3 py-2 text-left hover:bg-muted',
                value === item.value && 'bg-muted',
              )}
            >
              {item.label}

              {value === item.value && (
                <Check className="size-3 text-primary" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
