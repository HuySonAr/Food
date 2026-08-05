import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const ErrorState = ({ title = '', message = '', className }) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-3 rounded-lg border border-red-200 bg-red-50/50 p-8',
        className,
      )}
    >
      <AlertCircle className="size-6 text-red-500" />

      <div className="text-center">
        <h3 className="text-base font-semibold text-red-700">{title}</h3>

        <p className="mt-1 text-sm text-red-600">{message}</p>
      </div>
    </div>
  );
};

export default ErrorState;
