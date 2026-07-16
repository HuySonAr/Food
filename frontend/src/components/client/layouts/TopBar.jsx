import { Mail, Phone } from 'lucide-react';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaGithub,
} from 'react-icons/fa6';
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
      <div className="flex items-center justify-between max-w-7xl mx-auto p-4">
        <div className="flex items-center gap-6.25">
          <div className="flex items-center gap-2">
            <Phone className="size-[13.5px]" />
            <span className="text-[16px]">{SITE_CONFIG.contact.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="size-[13.5px]" />
            <span className="text-[16px]">{SITE_CONFIG.contact.email}</span>
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
                className="bg-secondary-foreground/12 size-[27.17px] rounded-full flex items-center justify-center"
              >
                {IconComponent && <IconComponent className="size-[13.5px]" />}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
