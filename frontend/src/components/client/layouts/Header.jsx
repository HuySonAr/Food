import { NavLink } from 'react-router-dom';
import logo from '../../../assets/logo.svg';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu, PanelRightClose } from 'lucide-react';

const listNav = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Menu', path: '/menu' },
  { name: 'Pages', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-0 py-4 md:py-6 lg:py-7.5">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src={logo}
            alt="Food Logo"
            className="size-10 md:size-12 lg:size-14 shrink-0"
          />
          <span className="font-serif text-2xl md:text-3xl lg:text-[43px] text-secondary font-semibold italic lg:leading-7.5 tracking-[-0.4px]">
            Bistro Bliss
          </span>
        </div>

        {/* nav */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2">
          {listNav.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `text-base font-medium leading-6 tracking-normal px-4 py-1 rounded-[34px] ${isActive ? 'bg-accent' : ''}`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Button Book */}
        <div className="hidden lg:block">
          <Button
            variant="outline"
            className="h-auto px-5 py-2.5 lg:px-6 lg:py-3 rounded-[118px] text-[#182226] text-sm lg:text-base font-bold tracking-normal leading-6 border-[1.5px] border-foreground cursor-pointer"
          >
            Book A Table
          </Button>
        </div>

        <div className="lg:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button className="lg:hidden p-2 rounded-lg text-foreground cursor-pointer">
                <Menu className="size-6" />
              </button>
            </SheetTrigger>

            <SheetContent showCloseButton={false}>
              <SheetHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <img
                      src={logo}
                      alt="Food Logo"
                      className="size-8 shrink-0"
                    />
                    <span className="font-serif text-xl text-secondary font-semibold italic">
                      Bistro Bliss
                    </span>
                  </div>

                  <button
                    onClick={() => setIsOpen(false)}
                    type="button"
                    className="p-2 text-black cursor-pointer"
                  >
                    <PanelRightClose className="size-5" />
                  </button>
                </div>
              </SheetHeader>

              <nav className="flex flex-col gap-2 px-4">
                {listNav.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `text-base font-medium py-3 px-4 rounded-xl transition-all ${
                        isActive
                          ? 'bg-accent'
                          : 'text-foreground hover:bg-accent/40'
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </nav>

              <SheetFooter>
                <Button
                  variant="outline"
                  className="h-auto py-3 rounded-[118px] text-black text-base font-bold tracking-normal leading-6 border-[1.5px] border-foreground cursor-pointer"
                >
                  Book A Table
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default Header;
