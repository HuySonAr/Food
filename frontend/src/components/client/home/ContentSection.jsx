import { Clock4, ShoppingCart, TicketPercent } from 'lucide-react';
import contentImage1 from '../../../assets/content1.jpg';
import contentImage2 from '../../../assets/content2.jpg';
import contentImage3 from '../../../assets/content3.jpg';

export const FEATURES = [
  {
    icon: Clock4,
    text: 'Delivery within 30 minutes',
  },
  {
    icon: TicketPercent,
    text: 'Best Offer & Prices',
    rotate: true,
  },
  {
    icon: ShoppingCart,
    text: 'Online Services Available',
  },
];

const ContentSection = () => {
  return (
    <div className="bg-secondary-foreground py-12 sm:py-16 md:py-20 lg:py-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-5 items-center gap-10 lg:gap-22.5">
          <div className="lg:col-span-3 grid grid-cols-5 gap-4 sm:gap-6">
            <div className="col-span-3 overflow-hidden rounded-[12px] -mt-4 lg:-mt-7.5">
              <img
                src={contentImage1}
                alt="Content Image"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="col-span-2 grid grid-rows-5 gap-4 sm:gap-6 -mb-3.5 lg:-mb-6.75">
              <div className="row-span-3 overflow-hidden rounded-[12px]">
                <img
                  src={contentImage2}
                  alt="Content Image"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="row-span-2 overflow-hidden rounded-[12px]">
                <img
                  src={contentImage3}
                  alt="Content Image"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-8 lg:gap-12.5">
            <div className="">
              <h1 className="font-serif font-medium text-3xl sm:text-4xl md:text-5xl lg:text-[55px] text-foreground leading-tight lg:leading-[60.5px]">
                Fastest Food Delivery in City
              </h1>

              <p className="text-sm sm:text-base font-normal text-muted-foreground mt-3 lg:mt-5">
                Our visual designer lets you quickly and of drag a down your way
                to customapps for both keep desktop.
              </p>
            </div>

            <div className="flex flex-col gap-4 lg:gap-5">
              {FEATURES.map(({ icon: Icon, text, rotate }) => (
                <div key={text} className="flex items-center gap-4 lg:gap-5">
                  <div className="p-1.5 sm:p-1.75 rounded-full text-white bg-primary">
                    <Icon className={`size-3 sm:size-4 ${rotate && `rotate-90`}`} />
                  </div>

                  <h3 className="text-base sm:text-lg lg:text-xl font-medium leading-6.5">{text}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentSection;
