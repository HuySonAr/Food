import FormContact from '@/components/client/contact/FormContact';

const ContactPage = () => {
  return (
    <div className="relative flex flex-col items-center gap-12 md:gap-18 py-12 md:py-30 px-4 md:px-8">
      <div className="absolute inset-0 -z-20 bg-linear-to-b from-secondary-foreground from-50% to-transparent to-50%" />
      <div className="flex flex-col gap-4 sm:gap-6 items-center">
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[100px] text-foreground font-normal tracking-normal">
          Contact Us
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-muted-foreground text-center w-full max-w-[95%] md:max-w-[80%] lg:max-w-[60%]">
          We consider all the drivers of change gives you the components you
          need to change to create a truly happens.
        </p>
      </div>

      <div className="w-full max-w-4xl">
        <FormContact />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-18 w-full max-w-4xl mt-6">
        <div className="flex flex-col gap-3 md:gap-6 text-center sm:text-left">
          <span className="text-foreground text-lg md:text-xl font-bold">
            Call Us:
          </span>
          <span className="font-bold text-xl md:text-2xl text-primary">
            +1-234-567-8900
          </span>
        </div>

        <div className="flex flex-col gap-3 md:gap-6 text-center sm:text-left">
          <span className="text-foreground text-lg md:text-xl font-bold">
            Hours:
          </span>
          <div className="">
            <p className="text-muted-foreground text-base md:text-lg">
              Mon-Fri: 11am - 8pm
            </p>
            <p className="text-muted-foreground text-base md:text-lg">
              Sat, Sun: 9am - 10pm
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 md:gap-6 text-center sm:text-left">
          <span className="text-foreground text-lg md:text-xl font-bold">
            Our Location:
          </span>
          <p className="text-muted-foreground text-base md:text-lg">
            123 Bridge Street Nowhere Land, LA 12345 United States
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
