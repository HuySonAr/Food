import { Mail, Phone } from 'lucide-react';
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa6';
import { SITE_CONFIG } from '../../../constants/siteConfig';

const iconMap = {
  FaTwitter: FaTwitter,
  FaFacebookF: FaFacebookF,
  FaInstagram: FaInstagram,
  FaGithub: FaGithub,
};

const TopBar = () => {
  return (
    <div className="bg-secondary text-secondary-foreground">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-0 py-2 sm:py-2.5">
        <div className="flex items-center gap-3 sm:gap-6">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Phone className="size-3 sm:size-3.5 shrink-0" />
            <span className="text-xs sm:text-sm md:text-base">
              {SITE_CONFIG.contact.phone}
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <Mail className="size-3.5" />
            <span className="text-base">{SITE_CONFIG.contact.email}</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {SITE_CONFIG.socialLinks.map((social) => {
            const IconComponent = iconMap[social.iconName];
            return (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener"
                aria-label={social.name}
                className="bg-secondary-foreground/12 size-6 sm:size-7 rounded-full flex items-center justify-center"
              >
                {IconComponent && (
                  <IconComponent className="size-3 sm:size-3.5" />
                )}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
