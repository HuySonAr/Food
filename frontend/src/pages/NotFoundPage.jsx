import { Link, useNavigate } from 'react-router-dom';
import NotFoundIllustration from '../assets/404.svg?react';
import { Button } from '@/components/ui/button';
const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-between gap-10">
          <div className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left gap-4 sm:gap-6 animate-fade-up">
            <h1
              className="font-serif font-medium text-3xl sm:text-4xl lg:text-[55px] text-foreground leading-tight lg:leading-[60.5px] animate-fade-up
                        [animation-delay:200ms]
                        fill-mode-[both]"
            >
              Sorry, that page could not be found
            </h1>

            <p className="text-base text-muted-foreground animate-fade-up [animation-delay:350ms] fill-mode-[both]">
              The page you requested either doesn't exist or you don't have
              access to it.
            </p>
            <div className="flex items-center gap-6 animate-pop-in [animation-delay:500ms] fill-mode-[both]">
              <Link
                to="/"
                className="self-stretch sm:self-center lg:self-start px-5 py-3 sm:px-7 sm:py-3.5 rounded-[118px] text-sm sm:text-base font-bold bg-primary text-white hover:bg-primary/85"
              >
                Go Home
              </Link>

              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
                className="h-auto px-5 py-3 sm:px-7 sm:py-3.5 rounded-[118px] text-sm sm:text-base font-bold cursor-pointer"
              >
                Go Back
              </Button>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <NotFoundIllustration />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
