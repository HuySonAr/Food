import { SITE_CONFIG } from '@/constants/siteConfig';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AboutSection = ({ image, altImage, buttonShow = true }) => {
  return (
    <div className="bg-secondary-foreground py-12 sm:py-16 md:py-20 lg:py-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
          <div className="relative lg:w-fit">
            <div className="overflow-hidden rounded-[12px] lg:max-w-150">
              <img
                src={image}
                alt={altImage}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="lg:absolute -right-12.5 -bottom-12.5 bg-secondary text-white rounded-[12px] p-8.5 sm:p-9.5 lg:p-12.5 mt-6">
              <div className="">
                <h3 className="font-bold leading-7.5 text-base sm:text-lg lg:text-2xl mb-7.5 sm:mb-8.5 lg:mb-11.25">
                  Come and visit us
                </h3>
                <div className="flex flex-col gap-4.25 sm:gap-4.5 lg:gap-6.25">
                  <div className="flex items-center gap-3 sm:gap-4 lg:gap-5">
                    <Phone className="size-4 sm:size-5 lg:size-6" />
                    <p className="text-sm sm:text-base text-secondary-foreground">
                      {SITE_CONFIG.contact.phone}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 sm:gap-4 lg:gap-5">
                    <Mail className="size-4 sm:size-5 lg:size-6" />
                    <p className="text-sm sm:text-base text-secondary-foreground">
                      {SITE_CONFIG.contact.email}
                    </p>
                  </div>

                  <div className="flex gap-3 sm:gap-4 lg:gap-5 lg:max-w-77.75">
                    <MapPin className="size-4 sm:size-5 lg:size-6 shrink-0" />
                    <p className="text-sm sm:text-base text-secondary-foreground">
                      {SITE_CONFIG.contact.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col mt-6 lg:mt-0 lg:ml-22.5">
            <div className="mb-7 sm:mb-8 lg:mb-10">
              <h1 className="font-serif font-medium text-3xl sm:text-4xl md:text-5xl lg:text-[55px] leading-tight lg:leading-[60.5px] text-foreground">
                We provide healthy food for your family.
              </h1>
              <p className="font-medium text-base sm:text-lg text-foreground my-4 sm:my-5 lg:my-6">
                Our story began with a vision to create a unique dining
                experience that merges fine dining, exceptional service, and a
                vibrant ambiance. Rooted in city's rich culinary culture, we aim
                to honor our local roots while infusing a global palate.
              </p>
              <p className="font-normal text-sm sm:text-base text-muted-foreground">
                At place, we believe that dining is not just about food, but
                also about the overall experience. Our staff, renowned for their
                warmth and dedication, strives to make every visit an
                unforgettable event.
              </p>
            </div>

            {buttonShow && (
              <Button
                variant="outline"
                className="h-auto lg:w-fit border-[1.5px] rounded-[118px] px-6 py-3.5 sm:px-8 sm:py-5 border-foreground text-sm sm:text-base font-bold"
              >
                More About Us
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
