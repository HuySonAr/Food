import { useTheme } from 'next-themes';
import { Toaster as Sonner } from 'sonner';
import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  OctagonXIcon,
  Loader2Icon,
} from 'lucide-react';

const Toaster = ({ ...props }) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      unstyled={true}
      icons={{
        success: <CircleCheckIcon className="size-4 text-emerald-600" />,
        info: <InfoIcon className="size-4 text-sky-600" />,
        warning: <TriangleAlertIcon className="size-4 text-amber-600" />,
        error: <OctagonXIcon className="size-4 text-red-600" />,
        loading: <Loader2Icon className="size-4 animate-spin text-primary" />,
      }}
      toastOptions={{
        classNames: {
          /* Style chung cho khung toast */
          toast:
            'flex items-center gap-3 w-full p-4 rounded-xl border shadow-lg font-sans text-sm !bg-background !text-foreground',
          
          success: '!bg-emerald-50 !border-emerald-400 !text-emerald-900 dark:!bg-emerald-950 dark:!border-emerald-800 dark:!text-emerald-100',
          error: '!bg-red-50 !border-red-400 !text-red-900 dark:!bg-red-950 dark:!border-red-800 dark:!text-red-100',
          warning: '!bg-amber-50 !border-amber-400 !text-amber-900 dark:!bg-amber-950 dark:!border-amber-800 dark:!text-amber-100',
          info: '!bg-sky-50 !border-sky-400 !text-sky-900 dark:!bg-sky-950 dark:!border-sky-800 dark:!text-sky-100',
          loading: '!bg-background !border-border !text-foreground',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };