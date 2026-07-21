import infoImage from '../../../assets/about-info.jpg';

const INFO = [
  {
    id: 1,
    numbers: '3',
    type: 'Locations',
  },

  {
    id: 2,
    numbers: '1995',
    type: 'Founded',
  },

  {
    id: 3,
    numbers: '65+',
    type: 'Staff Members',
  },

  {
    id: 4,
    numbers: '100%',
    type: 'Satisfied Customers',
  },
];

const AboutInfo = () => {
  return (
    <div className="bg-secondary-foreground py-12 sm:py-16 md:py-20 lg:py-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 sm:gap-12 lg:gap-16 xl:gap-20">
          <div className="flex flex-col gap-10 sm:gap-12 lg:gap-15">
            {/* title */}
            <div className="flex flex-col gap-3 sm:gap-5 max-w-full sm:max-w-[95%] lg:max-w-[90%]">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium leading-tight text-foreground lg:leading-[60.5px]">
                A little information for our valuable guest
              </h1>

              <p className="text-sm sm:text-base text-muted-foreground font-normal">
                At place, we believe that dining is not just about food, but
                also about the overall experience. Our staff, renowned for their
                warmth and dedication, strives to make every visit an
                unforgettable event.
              </p>
            </div>

            {/* info */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {INFO.map((item) => (
                <div
                  key={item.id}
                  className="border rounded-xl flex flex-col items-center gap-2 sm:gap-4 py-6 lg:py-10"
                >
                  <span className="text-3xl sm:text-4xl md:text-5xl text-foreground font-serif font-medium leading-tight lg:leading-[60.5px]">
                    {item.numbers}
                  </span>
                  <p className="text-sm sm:text-base lg:text-lg text-muted-foreground font-medium">
                    {item.type}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full h-75 sm:h-100 md:h-125 lg:h-full lg:max-h-170 overflow-hidden rounded-xl sm:rounded-[12px] shadow-lg">
            <img
              src={infoImage}
              alt="Information about our restaurant"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutInfo;
