import { cn } from '@/lib/utils';

const SegmentedControl = ({ options, value, onValueChange, className }) => {
  return (
    <div
      className={cn(
        'grid grid-cols-3 bg-primary rounded-lg p-1 animate-fade-up',
        className,
      )}
    >
      {options.map((option) => {
        const active = value === option.value;

        return (
          <button
            key={option.value}
            onClick={() => onValueChange(option.value)}
            className="relative px-3 sm:px-4 py-2 text-sm font-medium cursor-pointer"
          >
            <span
              className={cn(
                'absolute w-full h-full inset-0 rounded-md bg-white transition-all duration-300',
                active ? 'scale-100 opacity-100' : 'scale-75 opacity-0',
              )}
            />

            <span
              className={cn(
                'relative z-10 transition-colors duration-300',
                active ? 'text-secondary' : 'text-white',
              )}
            >
              {option.value}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default SegmentedControl;
