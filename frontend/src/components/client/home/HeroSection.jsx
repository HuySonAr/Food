import { Button } from '@/components/ui/button';
import heroImage from '../../../assets/hero.jpg';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();
  const handleToMenu = () => {
    navigate('/menu');
  };
  return (
    <div
      className="relative w-full min-h-150 md:min-h-175 lg:min-h-200 flex items-center justify-center bg-cover bg-center bg-no-repeat px-4 py-16 sm:py-20"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="flex flex-col items-center text-center w-full max-w-72.5 sm:max-w-120 md:max-w-140 lg:max-w-162.5">
        <span className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[100px] text-foreground font-normal tracking-normal">
          Best food for <br className="hidden sm:inline" /> your taste
        </span>
        <p className="text-sm sm:text-base md:text-lg text-foreground leading-6 sm:leading-7 md:leading-8 font-normal mt-6 md:mt-8 mb-8 md:mb-10 lg:px-16.25">
          Discover delectable cuisine and unforgettable moments in our
          welcoming, culinary haven.
        </p>

        <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto">
          <Button className="w-full sm:w-auto h-auto px-6 py-3.5 sm:px-8 sm:py-5 rounded-[118px] text-sm sm:text-base font-bold leading-6 tracking-normal cursor-pointer">
            Book A Table
          </Button>
          <Button
            variant="outline"
            onClick={handleToMenu}
            className="w-full sm:w-auto h-auto px-6 py-3.5 sm:px-8 sm:py-5 rounded-[118px] text-sm sm:text-base font-bold leading-6 tracking-normal border-[1.5px] border-foreground text-black cursor-pointer"
          >
            Explore Menu
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
