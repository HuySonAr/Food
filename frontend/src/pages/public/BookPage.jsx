import BookForm from '@/components/client/book/BookForm';
import mapImage from '../../assets/map.png';

const BookPage = () => {
  return (
    <div className="relative flex flex-col items-center gap-12 md:gap-18 py-12 md:py-30 px-4 md:px-8">
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${mapImage})` }}
      />
      <div className="absolute inset-0 h-1/2 -z-10 bg-secondary-foreground" />
      <div className="flex flex-col gap-4 sm:gap-6 items-center">
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[100px] text-foreground font-normal tracking-normal">
          Book A Table
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-muted-foreground text-center w-full max-w-[95%] md:max-w-[80%] lg:max-w-[60%]">
          We consider all the drivers of change gives you the components you
          need to change to create a truly happens.
        </p>
      </div>

      <div className="w-full max-w-3xl">
        <BookForm />
      </div>
    </div>
  );
};

export default BookPage;
