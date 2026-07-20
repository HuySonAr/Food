import { SITE_CONFIG } from '@/constants/siteConfig';
import logo from '../../../assets/logo-footer.svg';
import footerImage1 from '../../../assets/footer1.jpg';
import footerImage2 from '../../../assets/footer2.jpg';
import footerImage3 from '../../../assets/footer3.jpg';
import footerImage4 from '../../../assets/footer4.jpg';
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const iconMap = {
  FaTwitter: FaTwitter,
  FaFacebookF: FaFacebookF,
  FaInstagram: FaInstagram,
  FaGithub: FaGithub,
};

const listImage = [
  {
    id: 1,
    image: footerImage1,
  },
  {
    id: 2,
    image: footerImage2,
  },
  {
    id: 3,
    image: footerImage3,
  },
  {
    id: 4,
    image: footerImage4,
  },
];

const Footer = () => {
  return (
    <div className="bg-secondary pt-16 sm:pt-22 lg:pt-30 pb-10 sm:pb-16 lg:pb-21.25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-10 lg:gap-8 xl:gap-16">
          {/* left */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col gap-5 sm:gap-7.5">
            <div className="flex items-center gap-1 sm:gap-2">
              <img
                src={logo}
                alt="Food Logo"
                className="size-10 md:size-12 lg:size-14 shrink-0"
              />
              <span className="font-serif text-2xl lg:text-[33px] text-white font-semibold italic lg:leading-7.5 tracking-[-0.4px]">
                Bistro Bliss
              </span>
            </div>

            <p className="text-sm sm:text-base text-[#ADB29E]">
              In the new era of technology we look a in the future with
              certainty and pride to for our company and.
            </p>
            <div className="flex items-center gap-2 sm:gap-3">
              {SITE_CONFIG.socialLinks.map((social) => {
                const IconComponent = iconMap[social.iconName];
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener"
                    aria-label={social.name}
                    className="bg-primary size-7 sm:size-8.75 rounded-full flex items-center justify-center"
                  >
                    {IconComponent && (
                      <IconComponent className="size-3.5 sm:size-4 text-white" />
                    )}
                  </a>
                );
              })}
            </div>
          </div>

          {/* mid */}
          <div className="col-span-1 lg:col-span-3 grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-6 sm:gap-10 w-fit">
              <span className="text-sm sm:text-base text-white font-bold">Pages</span>
              <ul className="flex flex-col gap-4 sm:gap-5 text-accent text-sm sm:text-base">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/menu">Menu</Link>
                </li>
                <li>
                  <Link to="/pricing">Pricing</Link>
                </li>
                <li>
                  <Link to="/blog">Blog</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
                <li>
                  <Link to="/Delivery">Delivery</Link>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-6 sm:gap-10 w-fit">
              <span className="text-sm sm:text-base text-white font-bold">
                Utility Pages
              </span>
              <ul className="flex flex-col gap-4 sm:gap-5 text-accent text-sm sm:text-base">
                <li>
                  <Link to="/">Start here</Link>
                </li>
                <li>
                  <Link to="/">Styleguide</Link>
                </li>
                <li>
                  <Link to="/">PasswordProtected</Link>
                </li>
                <li>
                  <Link to="/404">404 Not Found</Link>
                </li>
                <li>
                  <Link to="/">Licenses</Link>
                </li>
                <li>
                  <Link to="/">Changelog</Link>
                </li>
                <li>
                  <Link to="/">View More</Link>
                </li>
              </ul>
            </div>
          </div>

          {/* right */}
          <div className="col-span-1 lg:col-span-4 flex flex-col gap-6 sm:gap-10">
            <span className="text-sm sm:text-base text-white font-bold">
              Follow Us On Instagram
            </span>
            <div className="grid grid-cols-2 gap-2 sm:gap-3.75">
              {listImage.map((item) => (
                <div
                  key={item.id}
                  className="h-28 sm:h-36 lg:h-40 overflow-hidden rounded-[12px]"
                >
                  <img
                    src={item.image}
                    alt="footer image"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <hr className="border border-muted-foreground mt-16 lg:mt-25 mb-5 lg:mb-7.5" />

        <p className="text-center text-[#ADB29E] text-sm sm:text-base">
          Copywrite &copy; 2023 Hashtag Developer. All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
