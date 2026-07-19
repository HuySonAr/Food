import { SERVICE_TYPE } from '@/constants/serviceType';

const ServiceSection = () => {
  return (
    <div className="py-12 sm:py-16 md:py-20 lg:py-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-0">
        <h1 className="font-serif font-medium w-full xl:max-w-1/2 text-3xl sm:text-4xl md:text-5xl lg:text-[55px] leading-tight lg:leading-[60.5px] text-foreground mb-10 sm:mb-16">
          We also offer unique services for your events
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 items-center">
          {SERVICE_TYPE.map((item) => (
            <div key={item.type} className="flex flex-col">
              <div className="overflow-hidden rounded-[12px]">
                <img
                  src={item.image}
                  alt={item.image}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 flex flex-col gap-2.5 sm:gap-3.75 pt-6 sm:pt-7.5 sm:pr-6.5">
                <h3 className="text-xl sm:text-2xl font-bold">{item.type}</h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceSection;
