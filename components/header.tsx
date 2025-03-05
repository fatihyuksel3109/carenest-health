// app/components/header.tsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Import Image component
import { usePathname } from 'next/navigation';
import { Menu, X, Sun, Moon, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { useLanguage } from './language-provider';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  // Ensure theme-dependent UI renders only after mounting on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'tr' : 'en');
  };

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/about', label: t('nav.about') },
    { href: '/blogs', label: t('nav.blogs') },
    { href: '/contact', label: t('nav.contact') },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled || isMenuOpen
          ? 'bg-background/95 backdrop-blur-sm shadow-md'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-y-2" onClick={closeMenu}>
            <Image
              src="/assets/images/carenestlogo.png"
              alt="Carenest Istanbul Logo"
              width={75} 
              height={75} 
              className="object-contain"
            />
            <Image
              src="/assets/images/carenestlogo-text.png"
              alt="Carenest Istanbul Logo"
              width={150} 
              height={75} 
              className="object-contain block md:hidden lg:block"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  pathname === link.href
                    ? 'text-primary font-semibold'
                    : 'text-muted-foreground'
                )}
              >
                {link.label}
              </Link>
            ))}
            <Button variant="default" size="sm">
              {t('nav.getService')}
            </Button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="Toggle theme"
            >
              {mounted ? (theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />) : null}
            </button>
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-full hover:bg-muted transition-colors flex items-center"
              aria-label="Toggle language"
            >
              <Globe size={20} className="mr-1" />
              <span className="text-xs font-bold">{language.toUpperCase()}</span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="Toggle theme"
            >
              {mounted ? (theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />) : null}
            </button>
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-full hover:bg-muted transition-colors flex items-center"
              aria-label="Toggle language"
            >
              <Globe size={20} className="mr-1" />
              <span className="text-xs font-bold">{language.toUpperCase()}</span>
            </button>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          'fixed inset-x-0 top-[72px] bg-background/95 backdrop-blur-sm shadow-md transition-all duration-300 ease-in-out md:hidden',
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        )}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'py-2 text-base font-medium transition-colors hover:text-primary',
                pathname === link.href
                  ? 'text-primary font-semibold'
                  : 'text-muted-foreground'
              )}
              onClick={closeMenu}
            >
              {link.label}
            </Link>
          ))}
          <Button variant="default" className="w-full" onClick={closeMenu}>
            {t('nav.getService')}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;