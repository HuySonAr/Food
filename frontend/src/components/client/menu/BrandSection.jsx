import bandLogo from '../../../assets/band.svg';

const BrandSection = () => {
  return (
    <div className="bg-secondary-foreground py-12 sm:py-16 md:py-20 lg:py-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-3 items-center lg:gap-10">
          <div className="lg:col-span-1 flex flex-col gap-3 lg:gap-5">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[55px] text-foreground font-medium leading-tight lg:leading-[60.5px]">
              You can order through apps
            </h1>

            <p className="text-sm sm:text-base text-muted-foreground font-normal">
              Lorem ipsum dolor sit amet consectetur adipiscing elit enim
              bibendum sed et aliquet aliquet risus tempor semper.
            </p>
          </div>

          <div className="lg:col-span-2">
            <img
              src={bandLogo}
              alt="Bands Logo"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandSection;
