import AboutSection from '@/components/client/home/AboutSection';
import HeroSection from '@/components/client/home/HeroSection';
import MenuSection from '@/components/client/home/MenuSection';
import aboutImage from '../../assets/about-section.jpg';
import ServiceSection from '@/components/client/home/ServiceSection';
import ContentSection from '@/components/client/home/ContentSection';
import TestimonialSection from '@/components/client/home/TestimonialSection';

const HomePage = () => {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <MenuSection />
      <AboutSection
        image={aboutImage}
        altImage={'About section image'}
        buttonShow
      />
      <ServiceSection />
      <ContentSection />
      <TestimonialSection />
    </div>
  );
};

export default HomePage;
