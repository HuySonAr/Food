import { MENU_CATEGORIES } from '@/constants/menuCategories';
import { Link } from 'react-router-dom';

const MenuSection = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-0">
      <div className="py-12 sm:py-16 md:py-20 lg:pt-23 lg:pb-30 flex flex-col">
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[55px] font-medium text-center">
          Browse Our Menu
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 sm:mt-12 lg:mt-16">
          {MENU_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="border-[1.5px] border-accent rounded-[12px]"
            >
              <div className="p-6 sm:px-8.5 sm:pt-10 sm:pb-8 flex flex-col items-center justify-between">
                <div className="flex items-center justify-center p-5 sm:p-6.5 rounded-full bg-popover/7">
                  <img src={cat.icon} alt={cat.name} className="size-10 sm:size-12 object-contain" />
                </div>

                <div className="text-center my-6 sm:my-7.5">
                  <h1 className="text-xl sm:text-2xl font-bold text-foreground">
                    {cat.name}
                  </h1>
                  <p className="text-sm sm:text-base text-muted-foreground mt-3.75">
                    {cat.description}
                  </p>
                </div>

                <Link
                  to={`/menu?category=${cat.slug}`}
                  className="text-primary font-bold text-sm sm:text-base"
                >
                  Explore Menu
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuSection;
