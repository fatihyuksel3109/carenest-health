// app/components/language-provider.tsx
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

    // Hero Section (HeroCarousel)
    'hero.title': 'Complex Care Delivered with Compassion and Dignity at Home',
    'hero.description': 'Providing compassionate home healthcare services in Istanbul.',
    'hero.cta': 'Get Service',

    // Features Section (FeatureSection)
    'features.offer.title': 'What Do We Offer?',
    'features.offer.description': 'Carenest is a leading provider of comprehensive home care services, uniquely specialized for individuals with strict care routines and those requiring complex care. Our commitment to exceptional care is deeply embedded in our approach and is endorsed by the Social Justice Association as their trusted provider. We focus on enhancing your accessibility and community integration, offering tailored support that empowers you to live a fulfilling and independent life.',
    'features.offer.imageAlt': 'A caregiver cleaning a window',
    'features.apart.title': 'What Sets Us Apart?',
    'features.apart.description': 'At Carenest, our commitment to creating a healthier environment and strengthening communities through high-quality job creation distinguishes us. We prioritize a supportive and empowering work atmosphere, where every team member feels valued and respected, directly improving the quality of our client care. Our commitment to excellence, compassion, and dignity not only elevates care standards but also enables our clients to lead fulfilling and independent lives. By blending superior care with robust community engagement, we are recognized as a trusted partner in healthcare and community development, dedicated to uplifting both our clients and the community at large.',
    'features.apart.imageAlt': 'A caregiver assisting a client',

    // Values Section (ValuesSection)
    'values.title': 'Our Values',
    'values.compassion.title': 'Compassion & Dignity',
    'values.compassion.description': 'Bringing compassion and dignity into every interaction.',
    'values.community.title': 'Strong Community',
    'values.community.description': 'Building strong communities by valuing staff and creating core teams.',
    'values.empowering.title': 'Empowering',
    'values.empowering.description': 'Improving well-being and enabling people to make empowering choices.',

    // Footer
    'footer.description': 'Providing compassionate and dignified complex care at home since 2020.',
    'footer.quickLinks': 'Quick Links',
    'footer.services': 'Services',
    'footer.services.complexCare': 'Complex Care',
    'footer.services.homeSupport': 'Home Support',
    'footer.services.respiteCare': 'Respite Care',
    'footer.services.communityIntegration': 'Community Integration',
    'footer.services.homeDoctorVisit': 'Home Doctor Visit',
    'footer.services.homeDoctorVisit.description': 'Receive professional medical care at home with a doctor visit.',
    'footer.services.homeCheckup': 'Home Checkup',
    'footer.services.homeCheckup.description': 'Get a comprehensive health assessment with our home checkup service.',
    'footer.services.bloodTests': 'Blood Tests',
    'footer.services.bloodTests.description': 'Monitor your health with our convenient at-home blood tests.',
    'footer.services.cancerScreening': 'Cancer Screening Tests',
    'footer.services.cancerScreening.description': 'Detect early signs of cancer with at-home screening tests.',
    'footer.services.bpSugarMonitoring': 'Blood Pressure & Sugar Monitoring',
    'footer.services.bpSugarMonitoring.description': 'Keep track of your health with at-home blood pressure and sugar monitoring.',
    'footer.services.injection': 'Injection Services',
    'footer.services.injection.description': 'Protect your health with our safe and convenient at-home injection services.',
    'footer.services.serumTherapy': 'Serum Therapy',
    'footer.services.serumTherapy.description': 'Receive at-home serum therapy to stay hydrated and speed up your recovery.',
    'footer.services.vitaminTherapy': 'Vitamin Therapy',
    'footer.services.vitaminTherapy.description': 'Boost your energy and strengthen your immune system with vitamin therapy.',
    'footer.services.ozoneTherapy': 'Ozone Therapy',
    'footer.services.ozoneTherapy.description': 'Boost your immune system and promote cellular renewal with ozone therapy.',
    'footer.services.prpTherapy': 'PRP Therapy',
    'footer.services.prpTherapy.description': 'Rejuvenate your skin and achieve a youthful glow with PRP therapy.',
    'footer.services.medicalAesthetics': 'Medical Aesthetics',
    'footer.services.medicalAesthetics.description': 'Enhance your natural beauty with our medical aesthetic treatments.',
    'footer.services.cuppingTherapy': 'Cupping Therapy',
    'footer.services.cuppingTherapy.description': 'Detoxify your body and improve circulation with cupping therapy.',
    'footer.services.leechingTherapy': 'Leech Therapy',
    'footer.services.leechingTherapy.description': 'Relieve pain and inflammation naturally with leech therapy.',
    'footer.services.catheterCare': 'Catheter Insertion & Removal',
    'footer.services.catheterCare.description': 'Receive expert assistance for catheter insertion and removal at home.',
    'footer.services.woundCare': 'Wound Care',
    'footer.services.woundCare.description': 'Heal faster with professional at-home wound care services.',
    'footer.contact': 'Contact',
    'footer.contact.address': '123 Care Street, Istanbul, Turkey',
    'footer.contact.phone': '+90 (555) 123-4567',
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
    'about.team.member1.name': 'Dr. Sarah Johnson',
    'about.team.member1.position': 'Chief Medical Officer',
    'about.team.member1.description': 'Dr. Johnson has over 15 years of experience in home healthcare, specializing in complex care and patient advocacy.',
    'about.team.member2.name': 'Emily Davis',
    'about.team.member2.position': 'Head Nurse',
    'about.team.member2.description': 'Emily leads our nursing team with a focus on compassionate care and innovative therapy solutions.',
    'about.team.member3.name': 'Michael Brown',
    'about.team.member3.position': 'Therapy Specialist',
    'about.team.member3.description': 'Michael specializes in alternative therapies, including cupping and leeching, to promote natural healing.',

    'about.approach.title': 'Our Approach',
    'about.approach.personCentered.title': 'Person-Centered Care',
    'about.approach.personCentered.description': 'We believe in tailoring our care to each individual’s unique needs, preferences, and goals. Our person-centered approach ensures that every client receives care that respects their dignity, autonomy, and personal choices.',
    'about.approach.continuousImprovement.title': 'Continuous Improvement',
    'about.approach.continuousImprovement.description': 'We are committed to ongoing learning and improvement. Through regular training, feedback, and evaluation, we continuously enhance our services to provide the highest quality care possible.',
    'about.approach.collaborativeCare.title': 'Collaborative Care',
    'about.approach.collaborativeCare.description': 'We work closely with clients, families, healthcare professionals, and community resources to create a comprehensive care network. This collaborative approach ensures that all aspects of a client’s well-being are addressed.',
    'about.approach.ethicalPractice.title': 'Ethical Practice',
    'about.approach.ethicalPractice.description': 'Our work is guided by strong ethical principles, including respect, integrity, and accountability. We adhere to the highest standards of professional conduct in all our interactions.',

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
    "blogs.notFound": "Blog post not found",
    "blogs.back": "Back to Blogs",
    "blogs.unknownAuthor": "Unknown Author",
    "blogs.loading": "Loading",

    // Admin Dashboard
    'admin.title': 'Admin Dashboard',
    'admin.blogs.title': 'Manage Blogs',
    'admin.blogs.create': 'Create New Blog',
    'admin.blogs.settings': 'Settings',
    'admin.blogs.manage': 'Manage Blogs',
    'admin.blogs.edit': 'Edit Blog',
    'admin.blogs.delete': 'Delete Blog',
    'admin.blogs.form.title': 'Title',
    'admin.blogs.form.content': 'Content',
    'admin.blogs.form.image': 'Image URL',
    'admin.blogs.form.submit': 'Save',
    'admin.blogs.editCreateTitle': 'Select a blog to edit or create a new one',
    'admin.blogs.editCreateText': 'Use the buttons on the left to manage your blog posts',
    'admin.account.settings': 'Account Settings',
    'admin.account.manage': 'Manage your account settings and preferences',
    'admin.login.title': 'Admin Login',
    'admin.login.email': 'Email',
    'admin.login.password': 'Password',
    'admin.login.submit': 'Login',
    'admin.loading': 'Loading',
  },
  tr: {
    // Navigation
    'nav.home': 'Ana Sayfa',
    'nav.about': 'Hakkımızda',
    'nav.blogs': 'Blog',
    'nav.contact': 'İletişim',
    'nav.getService': 'Hizmet Al',

    // Hero Section (HeroCarousel)
    'hero.title': 'Evinizde Şefkat ve Saygınlıkla Sunulan Uzman Bakım',
    'hero.description': 'İstanbul’da şefkatli evde sağlık hizmetleri sunuyoruz.',
    'hero.cta': 'Hizmet Al',

    // Features Section (FeatureSection)
    'features.offer.title': 'Neler Sunuyoruz?',
    'features.offer.description': 'Carenest, kapsamlı ev bakım hizmetleri sunan, özellikle sıkı bakım rutinleri olan ve kapsamlı bakım gerektiren bireyler için özel olarak uzmanlaşmış lider bir sağlayıcıdır. Olağanüstü bakıma olan bağlılığımız yaklaşımımıza derinden yerleşmiştir ve Sosyal Adalet Derneği tarafından güvenilir sağlayıcıları olarak onaylanmıştır. Erişilebilirliğinizi ve toplum entegrasyonunuzu geliştirmeye odaklanıyor, sizi doyurucu ve bağımsız bir yaşam sürmenizi sağlayan özel destek sunuyoruz.',
    'features.offer.imageAlt': 'Bir bakıcı pencereyi temizliyor',
    'features.apart.title': 'Bizi Farklı Kılan Nedir?',
    'features.apart.description': 'Carenest’te, daha sağlıklı bir ortam yaratma ve yüksek kaliteli iş yaratma yoluyla toplulukları güçlendirme taahhüdümüz bizi farklı kılıyor. Her takım üyesinin değerli ve saygı gördüğü, doğrudan müşteri bakımımızın kalitesini artıran destekleyici ve güçlendirici bir çalışma atmosferini önceliklendiriyoruz. Mükemmellik, şefkat ve saygınlığa olan bağlılığımız, sadece bakım standartlarını yükseltmekle kalmaz, aynı zamanda müşterilerimizin tatmin edici ve bağımsız yaşamlar sürmelerini sağlar. Üstün bakımı güçlü toplum katılımıyla birleştirerek, hem müşterilerimizi hem de genel olarak toplumu yükseltmeye adanmış, sağlık hizmetleri ve toplum gelişiminde güvenilir bir ortak olarak tanınıyoruz.',
    'features.apart.imageAlt': 'Bir bakıcı müşteriye yardımcı oluyor',

    // Values Section (ValuesSection)
    'values.title': 'Değerlerimiz',
    'values.compassion.title': 'Şefkat ve Saygınlık',
    'values.compassion.description': 'Her etkileşime şefkat ve saygınlık getiriyoruz.',
    'values.community.title': 'Güçlü Topluluk',
    'values.community.description': 'Personeli değerlendirerek ve çekirdek ekipler oluşturarak güçlü topluluklar inşa ediyoruz.',
    'values.empowering.title': 'Güçlendirme',
    'values.empowering.description': 'Refahı iyileştiriyor ve insanların güçlendirici seçimler yapmasını sağlıyoruz.',

    // Footer
    'footer.description': '2020’den beri evde şefkatli ve saygın kapsamlı bakım sağlıyoruz.',
    'footer.quickLinks': 'Hızlı Bağlantılar',
    'footer.services': 'Hizmetler',
    'footer.services.complexCare': 'Karmaşık Bakım',
    'footer.services.homeSupport': 'Ev Desteği',
    'footer.services.respiteCare': 'Dinlenme Bakımı',
    'footer.services.communityIntegration': 'Toplum Entegrasyonu',
    'footer.services.homeDoctorVisit': 'Evde Doktor Muayenesi',
    'footer.services.homeDoctorVisit.description': 'Evde doktor muayenesi ile sağlık hizmetini ayağınıza getirin.',
    'footer.services.homeCheckup': 'Evde Check-Up',
    'footer.services.homeCheckup.description': 'Evde check-up hizmetimizle genel sağlık durumunuzu değerlendirin.',
    'footer.services.bloodTests': 'Kan Tahlilleri',
    'footer.services.bloodTests.description': 'Evde kan tahlili hizmetimizle sağlığınızı düzenli olarak takip edin.',
    'footer.services.cancerScreening': 'Kanser Tarama Testleri',
    'footer.services.cancerScreening.description': 'Erken teşhis için evde kanser tarama testlerinizi yaptırın.',
    'footer.services.bpSugarMonitoring': 'Tansiyon ve Şeker Takibi',
    'footer.services.bpSugarMonitoring.description': 'Evde tansiyon ve şeker takibi ile sağlığınızı kontrol altında tutun.',
    'footer.services.injection': 'Enjeksiyon Hizmetleri',
    'footer.services.injection.description': 'Evde enjeksiyon hizmetlerimizle sağlığınızı kolay ve güvenli bir şekilde koruyun.',
    'footer.services.serumTherapy': 'Serum Terapisi',
    'footer.services.serumTherapy.description': 'Evde serum terapisi ile sıvı ihtiyacınızı karşılayarak iyileşme sürecinizi hızlandırın.',
    'footer.services.vitaminTherapy': 'Vitamin Terapisi',
    'footer.services.vitaminTherapy.description': 'Vitamin terapisi ile enerji seviyenizi artırın ve bağışıklık sisteminizi güçlendirin.',
    'footer.services.ozoneTherapy': 'Ozon Terapisi',
    'footer.services.ozoneTherapy.description': 'Ozon terapisi ile bağışıklık sisteminizi güçlendirin ve hücresel yenilenmeyi destekleyin.',
    'footer.services.prpTherapy': 'PRP Tedavisi',
    'footer.services.prpTherapy.description': 'PRP tedavisi ile cildinizi yenileyin ve sağlıklı bir görünüm kazanın.',
    'footer.services.medicalAesthetics': 'Medikal Estetik',
    'footer.services.medicalAesthetics.description': 'Medikal estetik uygulamalarımızla doğal güzelliğinizi koruyun.',
    'footer.services.cuppingTherapy': 'Hacamat Terapisi',
    'footer.services.cuppingTherapy.description': 'Hacamat terapisi ile vücudunuzu toksinlerden arındırın ve kan dolaşımınızı iyileştirin.',
    'footer.services.leechingTherapy': 'Sülük Terapisi',
    'footer.services.leechingTherapy.description': 'Sülük terapisi ile ağrı ve iltihabı doğal yollarla azaltın.',
    'footer.services.catheterCare': 'Sonda Takma ve Çıkarma',
    'footer.services.catheterCare.description': 'Sonda takma ve çıkarma işlemlerinizde uzman desteği alın.',
    'footer.services.woundCare': 'Yara Bakımı',
    'footer.services.woundCare.description': 'Evde profesyonel yara bakımı ile daha hızlı iyileşin.',
    'footer.contact': 'İletişim',
    'footer.contact.address': '123 Bakım Sokağı, İstanbul, Türkiye',
    'footer.contact.phone': '+90 (555) 123-4567',
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
    'about.vision.description': 'Mükemmellik, yenilikçilik ve müşterilerimizin yaşam kalitesini artırmaya yönelik sarsılmaz bağlılığıyla tanınan, kapsamlı ev bakımının önde gelen sağlayıcısı olmak.',
    'about.team.title': 'Ekibimiz',
    'about.team.description': 'Adanmış profesyonellerden oluşan ekibimiz, olağanüstü bakım sunma konusunda uzmanlık, şefkat ve ortak bir bağlılık getiriyor.',
    'about.team.member1.name': 'Dr. Sarah Johnson',
    'about.team.member1.position': 'Baş Tıbbi Sorumlu',
    'about.team.member1.description': 'Dr. Johnson, evde sağlık hizmetlerinde 15 yılı aşkın deneyime sahip, kapsamlı bakım ve hasta savunuculuğu konusunda uzmanlaşmıştır.',
    'about.team.member2.name': 'Emily Davis',
    'about.team.member2.position': 'Baş Hemşire',
    'about.team.member2.description': 'Emily, şefkatli bakım ve yenilikçi terapi çözümlerine odaklanarak hemşire ekibimizi yönetiyor.',
    'about.team.member3.name': 'Michael Brown',
    'about.team.member3.position': 'Terapi Uzmanı',
    'about.team.member3.description': 'Michael, hacamat ve sülük terapisi gibi alternatif terapilerde uzmanlaşarak doğal iyileşmeyi teşvik eder.',

    'about.approach.title': 'Yaklaşımımız',
    'about.approach.personCentered.title': 'Kişi Merkezli Bakım',
    'about.approach.personCentered.description': 'Her bireyin benzersiz ihtiyaçlarına, tercihlerine ve hedeflerine göre bakım sunmaya inanıyoruz. Kişi merkezli yaklaşımımız, her müşterinin saygınlık, özerklik ve kişisel seçimlerine saygı duyan bir bakım almasını sağlar.',
    'about.approach.continuousImprovement.title': 'Sürekli İyileştirme',
    'about.approach.continuousImprovement.description': 'Sürekli öğrenme ve iyileştirmeye kararlıyız. Düzenli eğitim, geri bildirim ve değerlendirme yoluyla hizmetlerimizi sürekli geliştirerek mümkün olan en yüksek kalitede bakım sunuyoruz.',
    'about.approach.collaborativeCare.title': 'İşbirlikçi Bakım',
    'about.approach.collaborativeCare.description': 'Müşteriler, aileler, sağlık profesyonelleri ve topluluk kaynaklarıyla yakın bir şekilde çalışarak kapsamlı bir bakım ağı oluşturuyoruz. Bu işbirlikçi yaklaşım, müşterinin tüm refah yönlerinin ele alınmasını sağlar.',
    'about.approach.ethicalPractice.title': 'Etik Uygulama',
    'about.approach.ethicalPractice.description': 'Çalışmalarımız, saygı, dürüstlük ve hesap verebilirlik gibi güçlü etik ilkelerle yönlendirilir. Tüm etkileşimlerimizde en yüksek profesyonel davranış standartlarına bağlıyız.',

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
    'blogs.notFound': 'Blog yazısı bulunamadı',
    'blogs.back': 'Bloglara Geri Dön',
    'blogs.unknownAuthor': 'Bilinmeyen Yazar',
    'blogs.loading': 'Yükleniyor',

    // Admin Dashboard
    'admin.title': 'Yönetici Paneli',
    'admin.blogs.title': 'Blogları Yönet',
    'admin.blogs.create': 'Yeni Blog Oluştur',
    'admin.blogs.settings': 'Ayarlar',
    'admin.blogs.manage': 'Blogları Düzenle',
    'admin.blogs.edit': 'Blogu Düzenle',
    'admin.blogs.delete': 'Blogu Sil',
    'admin.blogs.form.title': 'Başlık',
    'admin.blogs.form.content': 'İçerik',
    'admin.blogs.form.image': 'Resim URL',
    'admin.blogs.form.submit': 'Kaydet',
    'admin.blogs.editCreateTitle': 'Blogları düzenleyin ya da yeni bir blog ekleyin',
    'admin.blogs.editCreateText': 'Bloglarınızı düzenlemek için soldaki butonları kullanın',
    'admin.account.settings': 'Hesap Ayarları',
    'admin.account.manage': 'Hesap ayarlarınızı ve tercihlerinizi düzenleyin',
    'admin.login.title': 'Yönetici Girişi',
    'admin.login.email': 'E-posta',
    'admin.login.password': 'Şifre',
    'admin.login.submit': 'Giriş',
    'admin.loading': 'Yükleniyor',
  },
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: () => '',
});

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem('language') as Language;
      if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'tr')) {
        setLanguage(savedLanguage);
      } else {
        // Detect browser language with fallback
        const browserLang = navigator.language.startsWith('tr') ? 'tr' : 'en';
        setLanguage(browserLang);
        localStorage.setItem('language', browserLang);
      }
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem('language', lang);
    }
  };

  const t = (key: string): string => {
    const translation = translations[language][key as keyof typeof translations[typeof language]];
    if (!translation) {
      console.warn(`Translation missing for key "${key}" in language "${language}"`);
      return key; // Fallback to the key if translation is missing
    }
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};