import { TESTIMONIALS } from '@/mocks/testimonials';

const TestimonialSection = () => {
  return (
    <div className="py-12 sm:py-16 md:py-20 lg:py-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-0">
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[55px] font-medium text-center">
          What Our Customers Say
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 sm:mt-12 lg:mt-16">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="flex h-full flex-col gap-6 sm:gap-8 bg-secondary-foreground px-6 sm:px-8 lg:px-8.75 py-8 lg:pt-11.25 lg:pb-8.75 rounded-[12px]"
            >
              <div className="flex-1 flex flex-col gap-4 sm:gap-6">
                <h3 className="text-xl sm:text-2xl text-primary font-bold">
                  "{item.title}"
                </h3>
                <p className="text-base lg:text-lg text-muted-foreground leading-7">
                  {item.review}
                </p>
              </div>

              <hr className="border" />

              <div className="flex items-center gap-4 sm:gap-5">
                <div className="size-12 sm:size-14 lg:size-17.5 overflow-hidden rounded-full">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    loading='lazy'
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-col gap-0.5 sm:gap-0.75">
                  <span className="text-sm sm:text-base font-bold text-foreground">
                    {item.name}
                  </span>
                  <p className="text-sm sm:text-base font-normal text-muted-foreground">
                    {item.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
