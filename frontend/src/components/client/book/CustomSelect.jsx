import { cn } from '@/lib/utils';
import { Check, ChevronDown } from 'lucide-react';
import { useEffect, useRef } from 'react';

const CustomSelect = ({
  name,
  value,
  placeholder,
  options,
  openSelect,
  setOpenSelect,
  onChange,
}) => {
  const wrapperRef = useRef(null);

  const isOpen = openSelect === name;
  const selectedOption = options.find((item) => item.value === value);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpenSelect(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, setOpenSelect]);

  const handleToggle = () => {
    setOpenSelect(isOpen ? null : name);
  };

  const handleSelect = (value) => {
    onChange(name, value);
    setOpenSelect(null);
  };

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={handleToggle}
        className={cn(
          'flex w-full items-center justify-between text-sm sm:text-base rounded-[72px] border px-4 py-3 sm:px-6 sm:py-4 focus:border-primary cursor-pointer',
        )}
      >
        {selectedOption?.label || placeholder}
        <ChevronDown
          className={cn(
            `size-4 transition-transform duration-200`,
            isOpen && 'rotate-180',
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-20 mt-2 max-h-64 overflow-y-auto scrollbar-none rounded-2xl border bg-white p-2 shadow-lg">
          {options.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => handleSelect(item.value)}
              className={cn(
                'flex items-center justify-between w-full rounded-xl px-2 py-3 sm:px-4 text-sm sm:text-base text-left cursor-pointer transition-colors',
                value === item.value
                  ? 'bg-primary text-white'
                  : 'hover:bg-primary hover:text-white',
              )}
            >
              {item.label}

              {value === item.value && <Check className="size-3.5 sm:size-4" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
