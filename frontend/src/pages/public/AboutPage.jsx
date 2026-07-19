import AboutSection from '@/components/client/home/AboutSection';
import aboutImage from '../../assets/about-section(2).jpg';

const AboutPage = () => {
  return (
    <div className="flex flex-col">
      <AboutSection
        image={aboutImage}
        altImage={'About section image'}
        buttonShow={false}
      />
    </div>
  );
};

export default AboutPage;
