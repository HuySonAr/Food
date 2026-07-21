import AboutSection from '@/components/client/home/AboutSection';
import aboutImage from '../../assets/about-section(2).jpg';
import AboutContent from '@/components/client/about/AboutContent';
import TestimonialSection from '@/components/client/home/TestimonialSection';
import AboutInfo from '@/components/client/about/AboutInfo';

const AboutPage = () => {
  return (
    <div className="flex flex-col">
      <AboutSection
        image={aboutImage}
        altImage={'About section image'}
        buttonShow={false}
      />
      <AboutContent />

      <AboutInfo />

      <TestimonialSection />
    </div>
  );
};

export default AboutPage;
