import BrandSection from '@/components/client/menu/BrandSection';
import ProductSkeleton from '@/components/skeleton/ProductSkeleton';
import { Button } from '@/components/ui/button';
import { FILTER_CATEGORIES } from '@/constants/menuCategories';
import { useMenu } from '@/hooks/useMenu';
import { useSearchParams } from 'react-router-dom';

const MenuPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get('category') || 'all';
  const currentPage = parseInt(searchParams.get('page')) || 1;

  const { products, loading, error } = useMenu(
    currentCategory,
    currentPage,
  );

  const handleCategoryChange = (catId) => {
    setSearchParams(catId === 'all' ? {} : { category: catId, page: 1 });
  };

  return (
    <div className="flex flex-col">
      <div className="py-12 sm:py-16 md:py-20 lg:py-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-0">
          {/* filter menu */}
          <div className="flex flex-col gap-8 sm:gap-12.5 items-center">
            <div className="flex flex-col items-center gap-4 sm:gap-5">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[100px] font-serif font-normal text-center">
                Our Menu
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground w-full sm:max-w-[80%] lg:max-w-[60%] mx-auto text-center">
                We consider all the drivers of change gives you the components
                you need to change to create a truly happens.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center w-full gap-2 sm:gap-3.75">
              {FILTER_CATEGORIES.map((item) => {
                const isActive = currentCategory === item.id;
                return (
                  <Button
                    key={item.id}
                    variant={isActive ? 'default' : 'outline'}
                    onClick={() => handleCategoryChange(item.id)}
                    className={`h-auto py-2 px-4 sm:py-3 sm:px-7 text-xs sm:text-sm md:text-base font-bold rounded-[50px] hover:border-primary cursor-pointer transition-all duration-300 ${isActive ? 'border' : ''}`}
                  >
                    {item.name}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* show products */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
              {Array.from({ length: 4 }).map((_, index) => {
                let displayClass = '';

                if (index === 1) {
                  displayClass = 'hidden sm:block';
                } else if (index === 2) {
                  displayClass = 'hidden lg:block';
                } else if (index === 3) {
                  displayClass = 'hidden xl:block';
                }

                return (
                  <div key={index} className={displayClass}>
                    <ProductSkeleton />
                  </div>
                );
              })}
            </div>
          )}

          {error && (
            <div className="text-center text-destructive mt-10">{error}</div>
          )}

          {!loading && !error && products?.length === 0 && (
            <div className="text-center text-muted-foreground mt-10">
              There are no dishes in this category.
            </div>
          )}

          {!loading && !error && products.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
              {products.map((item) => (
                <div
                  key={item.id}
                  className="border overflow-hidden rounded-[12px]"
                >
                  <div className="h-57.5 overflow-hidden">
                    <img
                      src={item.image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-7.5 flex flex-col items-center gap-2 sm:gap-3.75">
                    <span className="text-xl sm:text-2xl text-primary font-bold leading-[-0.03]">
                      $ {item.price}
                    </span>

                    <h3 className="text-lg sm:text-xl text-center text-foreground font-bold">
                      {item.name}
                    </h3>

                    <p className="text-sm sm:text-base text-center text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <BrandSection />
    </div>
  );
};

export default MenuPage;
