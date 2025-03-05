// app/components/footer.tsx
"use client";

import Link from 'next/link';
import Image from 'next/image'; // Import Image component
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from './language-provider';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image
                src="/assets/images/carenestlogo-text.png"
                alt="Carenest Istanbul Logo"
                width={120} // Adjust width as needed
                height={120} // Adjust height as needed
                className="object-contain -mt-4"
              />
            </div>
            <p className="text-sm">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-accent-foreground transition-colors" aria-label={t('footer.social.facebook')}>
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-accent-foreground transition-colors" aria-label={t('footer.social.twitter')}>
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-accent-foreground transition-colors" aria-label={t('footer.social.instagram')}>
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm hover:underline">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm hover:underline">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="text-sm hover:underline">
                  {t('nav.blogs')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm hover:underline">
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t('footer.services')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm hover:underline">
                  {t('footer.services.complexCare')}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:underline">
                  {t('footer.services.homeSupport')}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:underline">
                  {t('footer.services.respiteCare')}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:underline">
                  {t('footer.services.communityIntegration')}
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t('footer.contact')}</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-sm">
                <MapPin size={16} className="mr-2" />
                {t('footer.contact.address')}
              </li>
              <li className="flex items-center text-sm">
                <Phone size={16} className="mr-2" />
                {t('footer.contact.phone')}
              </li>
              <li className="flex items-center text-sm">
                <Mail size={16} className="mr-2" />
                {t('footer.contact.email')}
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm">
          <p>
            © {currentYear} Carenest. {t('footer.rights')}.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;