import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const SearchInput = ({
  value,
  onChange,
  placeholder = 'Search...',
  className,
}) => {
  return (
    <div
      className={cn(
        'flex items-center gap-2 px-3 py-2 border rounded-lg transition-colors duration-150 has-[input:focus]:outline-1 has-[input:focus]:-outline-offset-1 has-[input:focus]:outline-primary',
        className
      )}
    >
      <Search className="size-5 text-muted-foreground shrink-0" />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 min-w-0 bg-transparent outline-none text-sm"
      />
    </div>
  );
};

export default SearchInput;