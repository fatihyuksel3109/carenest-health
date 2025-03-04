"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'tr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.blogs': 'Blogs',
    'nav.contact': 'Contact Us',
    'nav.getService': 'Get Service',
    
    // Hero Section
    'hero.title': 'Complex Care Delivered with Compassion and Dignity at Home',
    'hero.cta': 'Get Service',
    
    // Features Section
    'features.offer.title': 'What do we offer?',
    'features.offer.description': 'Carenest is a leading provider of comprehensive home care services, uniquely specialized for individuals with strict care routines and those requiring complex care. Our commitment to exceptional care is deeply embedded in our approach and is endorsed by the Social Justice Association as their trusted provider. We focus on enhancing your accessibility and community integration, offering tailored support that empowers you to live a fulfilling and independent life.',
    'features.apart.title': 'What sets us apart?',
    'features.apart.description': 'At Carenest, our commitment to creating a healthier environment and strengthening communities through high-quality job creation distinguishes us. We prioritize a supportive and empowering work atmosphere, where every team member feels valued and respected, directly improving the quality of our client care. Our commitment to excellence, compassion, and dignity not only elevates care standards but also enables our clients to lead fulfilling and independent lives. By blending superior care with robust community engagement, we are recognized as a trusted partner in healthcare and community development, dedicated to uplifting both our clients and the community at large.',
    'features.offer.imageAlt': 'A caregiver cleaning a window',
    'features.apart.imageAlt': 'A caregiver assisting a client',
    
    // Values Section
    'values.compassion.title': 'Compassion & dignity',
    'values.compassion.description': 'Bringing compassion and dignity into every interaction',
    'values.community.title': 'Strong community',
    'values.community.description': 'Building strong communities by valuing staff and creating core teams',
    'values.empowering.title': 'Empowering',
    'values.empowering.description': 'Improving well-being and enabling people to make empowering choices',
    
    // Footer
    'footer.description': 'Providing compassionate and dignified complex care at home since 2020.',
    'footer.quickLinks': 'Quick Links',
    'footer.services': 'Services',
    'footer.services.complexCare': 'Complex Care',
    'footer.services.homeSupport': 'Home Support',
    'footer.services.respiteCare': 'Respite Care',
    'footer.services.communityIntegration': 'Community Integration',
    'footer.contact': 'Contact',
    'footer.contact.address': '123 Care Street, City, Country',
    'footer.contact.phone': '+1 (555) 123-4567',
    'footer.contact.email': 'info@carenest.com',
    'footer.rights': 'All rights reserved',
    'footer.social.facebook': 'Facebook',
    'footer.social.twitter': 'Twitter',
    'footer.social.instagram': 'Instagram',
    
    // About Page
    'about.title': 'About Us',
    'about.mission.title': 'Our Mission',
    'about.mission.description': 'To provide compassionate, dignified, and personalized care that empowers individuals to live fulfilling lives in the comfort of their homes.',
    'about.vision.title': 'Our Vision',
    'about.vision.description': 'To be the leading provider of complex home care, recognized for excellence, innovation, and unwavering commitment to enhancing the quality of life for our clients.',
    'about.team.title': 'Our Team',
    'about.team.description': 'Our dedicated team of professionals brings together expertise, compassion, and a shared commitment to delivering exceptional care.',
    
    // Contact Page
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Get in touch with us',
    'contact.form.name': 'Name',
    'contact.form.email': 'Email',
    'contact.form.message': 'Message',
    'contact.form.submit': 'Send Message',
    'contact.form.success': 'Message sent successfully!',
    'contact.form.error': 'Failed to send message. Please try again.',
    
    // Blogs Page
    'blogs.title': 'Our Blog',
    'blogs.subtitle': 'Latest insights and news',
    'blogs.readMore': 'Read More',
    
    // Admin Dashboard
    'admin.title': 'Admin Dashboard',
    'admin.blogs.title': 'Manage Blogs',
    'admin.blogs.create': 'Create New Blog',
    'admin.blogs.edit': 'Edit Blog',
    'admin.blogs.delete': 'Delete Blog',
    'admin.blogs.form.title': 'Title',
    'admin.blogs.form.content': 'Content',
    'admin.blogs.form.image': 'Image URL',
    'admin.blogs.form.submit': 'Save',
    'admin.login.title': 'Admin Login',
    'admin.login.email': 'Email',
    'admin.login.password': 'Password',
    'admin.login.submit': 'Login',
  },
  tr: {
    // Navigation
    'nav.home': 'Ana Sayfa',
    'nav.about': 'Hakkımızda',
    'nav.blogs': 'Blog',
    'nav.contact': 'İletişim',
    'nav.getService': 'Hizmet Al',
    
    // Hero Section
    'hero.title': 'Evde Şefkat ve Saygınlıkla Sunulan Karmaşık Bakım',
    'hero.cta': 'Hizmet Al',
    
    // Features Section
    'features.offer.title': 'Neler sunuyoruz?',
    'features.offer.description': 'Carenest, kapsamlı ev bakım hizmetleri sunan, özellikle sıkı bakım rutinleri olan ve karmaşık bakım gerektiren bireyler için özel olarak uzmanlaşmış lider bir sağlayıcıdır. Olağanüstü bakıma olan bağlılığımız yaklaşımımıza derinden yerleşmiştir ve Sosyal Adalet Derneği tarafından güvenilir sağlayıcıları olarak onaylanmıştır. Erişilebilirliğinizi ve toplum entegrasyonunuzu geliştirmeye odaklanıyor, sizi doyurucu ve bağımsız bir yaşam sürmenizi sağlayan özel destek sunuyoruz.',
    'features.apart.title': 'Bizi farklı kılan nedir?',
    'features.apart.description': 'Carenest\'te, daha sağlıklı bir ortam yaratma ve yüksek kaliteli iş yaratma yoluyla toplulukları güçlendirme taahhüdümüz bizi farklı kılıyor. Her takım üyesinin değerli ve saygı gördüğü, doğrudan müşteri bakımımızın kalitesini artıran destekleyici ve güçlendirici bir çalışma atmosferini önceliklendiriyoruz. Mükemmellik, şefkat ve saygınlığa olan bağlılığımız, sadece bakım standartlarını yükseltmekle kalmaz, aynı zamanda müşterilerimizin tatmin edici ve bağımsız yaşamlar sürmelerini sağlar. Üstün bakımı güçlü toplum katılımıyla birleştirerek, hem müşterilerimizi hem de genel olarak toplumu yükseltmeye adanmış, sağlık hizmetleri ve toplum gelişiminde güvenilir bir ortak olarak tanınıyoruz.',
    'features.offer.imageAlt': 'Bir bakıcı pencereyi temizliyor',
    'features.apart.imageAlt': 'Bir bakıcı müşteriye yardımcı oluyor',
    
    // Values Section
    'values.compassion.title': 'Şefkat ve saygınlık',
    'values.compassion.description': 'Her etkileşime şefkat ve saygınlık getirmek',
    'values.community.title': 'Güçlü topluluk',
    'values.community.description': 'Personeli değerlendirerek ve çekirdek ekipler oluşturarak güçlü topluluklar inşa etmek',
    'values.empowering.title': 'Güçlendirme',
    'values.empowering.description': 'Refahı iyileştirmek ve insanların güçlendirici seçimler yapmasını sağlamak',
    
    // Footer
    'footer.description': '2020’den beri evde şefkatli ve saygın karmaşık bakım sağlıyoruz.',
    'footer.quickLinks': 'Hızlı Bağlantılar',
    'footer.services': 'Hizmetler',
    'footer.services.complexCare': 'Karmaşık Bakım',
    'footer.services.homeSupport': 'Ev Desteği',
    'footer.services.respiteCare': 'Dinlenme Bakımı',
    'footer.services.communityIntegration': 'Toplum Entegrasyonu',
    'footer.contact': 'İletişim',
    'footer.contact.address': '123 Bakım Sokağı, Şehir, Ülke',
    'footer.contact.phone': '+1 (555) 123-4567',
    'footer.contact.email': 'info@carenest.com',
    'footer.rights': 'Tüm hakları saklıdır',
    'footer.social.facebook': 'Facebook',
    'footer.social.twitter': 'Twitter',
    'footer.social.instagram': 'Instagram',
    
    // About Page
    'about.title': 'Hakkımızda',
    'about.mission.title': 'Misyonumuz',
    'about.mission.description': 'Bireylerin evlerinin konforunda tatmin edici yaşamlar sürmelerini sağlayan şefkatli, saygın ve kişiselleştirilmiş bakım sağlamak.',
    'about.vision.title': 'Vizyonumuz',
    'about.vision.description': 'Mükemmellik, yenilikçilik ve müşterilerimizin yaşam kalitesini artırmaya yönelik sarsılmaz bağlılığıyla tanınan, karmaşık ev bakımının önde gelen sağlayıcısı olmak.',
    'about.team.title': 'Ekibimiz',
    'about.team.description': 'Adanmış profesyonellerden oluşan ekibimiz, olağanüstü bakım sunma konusunda uzmanlık, şefkat ve ortak bir bağlılık getiriyor.',
    
    // Contact Page
    'contact.title': 'İletişim',
    'contact.subtitle': 'Bizimle iletişime geçin',
    'contact.form.name': 'İsim',
    'contact.form.email': 'E-posta',
    'contact.form.message': 'Mesaj',
    'contact.form.submit': 'Mesaj Gönder',
    'contact.form.success': 'Mesaj başarıyla gönderildi!',
    'contact.form.error': 'Mesaj gönderilirken hata oluştu. Lütfen tekrar deneyin.',
    
    // Blogs Page
    'blogs.title': 'Blogumuz',
    'blogs.subtitle': 'En son içgörüler ve haberler',
    'blogs.readMore': 'Daha Fazla Oku',
    
    // Admin Dashboard
    'admin.title': 'Yönetici Paneli',
    'admin.blogs.title': 'Blogları Yönet',
    'admin.blogs.create': 'Yeni Blog Oluştur',
    'admin.blogs.edit': 'Blogu Düzenle',
    'admin.blogs.delete': 'Blogu Sil',
    'admin.blogs.form.title': 'Başlık',
    'admin.blogs.form.content': 'İçerik',
    'admin.blogs.form.image': 'Resim URL',
    'admin.blogs.form.submit': 'Kaydet',
    'admin.login.title': 'Yönetici Girişi',
    'admin.login.email': 'E-posta',
    'admin.login.password': 'Şifre',
    'admin.login.submit': 'Giriş',
  }
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: () => '',
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'tr')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};