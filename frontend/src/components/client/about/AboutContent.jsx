import { Play } from 'lucide-react';
import contentImage from '../../../assets/about-content.png';
import menuIcon from '../../../assets/menu-icon.svg';
import orderIcon from '../../../assets/order-icon.svg';
import timeIcon from '../../../assets/time-icon.svg';

const FEATURES = [
  {
    id: 1,
    icon: menuIcon,
    title: 'Multi Cuisine',
    description:
      'In the new era of technology we look in the future with certainty life.',
  },

  {
    id: 2,
    icon: orderIcon,
    title: 'Easy to order',
    description:
      'In the new era of technology we look in the future with certainty life.',
  },

  {
    id: 3,
    icon: timeIcon,
    title: 'Fast Delivery',
    description:
      'In the new era of technology we look in the future with certainty life.',
  },
];

const AboutContent = () => {
  return (
    <div>
      <div
        className="relative flex items-center justify-center w-full min-h-87.5 sm:min-h-145 md:min-h-150 lg:min-h-170 bg-cover bg-position-[center_75%] bg-no-repeat"
        style={{ backgroundImage: `url(${contentImage})` }}
      >
        <div className="absolute inset-0 bg-foreground/84" />
        <div className="relative z-10 flex flex-col items-center gap-6 sm:gap-8.5">
          <div className="size-16 sm:size-20 lg:size-26.5 text-primary rounded-full bg-white flex items-center justify-center">
            <Play className="size-4.5 sm:size-6 fill-current shrink-0" />
          </div>

          <h2 className="max-w-[85%] sm:max-w-[80%] md:max-w-[65%] lg:max-w-[60%] font-serif font-medium text-3xl sm:text-4xl md:text-5xl lg:text-[55px] leading-tight lg:leading-[60.5px] text-white text-center">
            Feel the authentic & original taste from us
          </h2>
        </div>
      </div>

      <div className="py-12 sm:py-16 lg:pt-20 lg:pb-23.75">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12 lg:gap-21.75">
            {FEATURES.map((item) => (
              <div key={item.id} className="flex gap-4 sm:gap-6">
                <img
                  src={item.icon}
                  alt={item.title}
                  className="size-8 sm:size-12 shrink-0"
                />
                <div className="flex flex-col gap-2 lg:gap-4">
                  <span className="text-lg lg:text-xl text-foreground font-bold">
                    {item.title}
                  </span>
                  <p className="text-sm sm:text-base text-muted-foreground font-normal">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutContent;
