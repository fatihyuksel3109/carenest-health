"use client";

import { useEffect } from 'react';
import { useLanguage } from '@/components/language-provider';

export default function DynamicTitle() {
  const { language } = useLanguage();

  useEffect(() => {
    const meta = {
      en: {
        title: 'Carenest - Home Healthcare Services in Istanbul',
        description: 'Carenest provides professional home healthcare services in Istanbul, including vitamin therapy, IV therapy, vaccination, cupping, leech therapy, wound care, and elderly care.',
        keywords: 'home healthcare Istanbul, home doctor Istanbul, vitamin therapy at home, IV therapy, home vaccination, cupping therapy, leech therapy, elderly care, wound care, serum therapy, home nursing care',
        ogTitle: 'Carenest - Home Healthcare Services in Istanbul',
        ogDescription: 'Expert home healthcare services in Istanbul: vitamin and serum therapy, vaccination, cupping, leech therapy, wound care, and elderly care.',
        ogUrl: 'https://www.ist-carenest.com',
        ogImage: 'https://www.ist-carenest.com/assets/images/carenest-homecare.jpg',
        twitterTitle: 'Carenest - Home Healthcare Services in Istanbul',
        twitterDescription: 'Professional home healthcare services in Istanbul: vitamin therapy, IV therapy, vaccination, cupping, leech therapy, wound care, and elderly care.',
        twitterImage: 'https://www.ist-carenest.com/assets/images/carenest-homecare.jpg',
      },
      tr: {
        title: 'Carenest - İstanbul Evde Sağlık Hizmetleri',
        description: 'Carenest, İstanbul’da evde sağlık hizmetleri sunmaktadır. Vitamin terapisi, serum tedavisi, aşılama, hacamat, sülük tedavisi, yara bakımı ve yaşlı bakımı gibi hizmetler verilmektedir.',
        keywords: 'evde sağlık hizmetleri İstanbul, evde doktor hizmeti İstanbul, evde vitamin terapisi, evde serum tedavisi, evde aşı hizmeti, hacamat terapisi, sülük terapisi, yaşlı bakımı, yara bakımı, evde hemşirelik hizmeti',
        ogTitle: 'Carenest - İstanbul Evde Sağlık Hizmetleri',
        ogDescription: 'İstanbul’da evde sağlık hizmetleri: vitamin ve serum terapisi, aşılama, hacamat, sülük tedavisi, yara bakımı ve yaşlı bakımı.',
        ogUrl: 'https://www.ist-carenest.com',
        ogImage: 'https://www.ist-carenest.com/assets/images/carenest-homecare.jpg',
        twitterTitle: 'Carenest - İstanbul Evde Sağlık Hizmetleri',
        twitterDescription: 'İstanbul’da evde sağlık hizmetleri: vitamin terapisi, serum tedavisi, aşılama, hacamat, sülük tedavisi, yara bakımı ve yaşlı bakımı.',
        twitterImage: 'https://www.ist-carenest.com/assets/images/carenest-homecare.jpg',
      },
    };

    console.log('DynamicTitle updating to:', language);
    document.title = meta[language].title;
    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) descMeta.setAttribute('content', meta[language].description);
    const keywordsMeta = document.querySelector('meta[name="keywords"]');
    if (keywordsMeta) keywordsMeta.setAttribute('content', meta[language].keywords);
    const ogTitleMeta = document.querySelector('meta[property="og:title"]');
    if (ogTitleMeta) ogTitleMeta.setAttribute('content', meta[language].ogTitle);
    const ogDescMeta = document.querySelector('meta[property="og:description"]');
    if (ogDescMeta) ogDescMeta.setAttribute('content', meta[language].ogDescription);
    const ogUrlMeta = document.querySelector('meta[property="og:url"]');
    if (ogUrlMeta) ogUrlMeta.setAttribute('content', meta[language].ogUrl);
    const ogImageMeta = document.querySelector('meta[property="og:image"]');
    if (ogImageMeta) ogImageMeta.setAttribute('content', meta[language].ogImage);
    const twitterTitleMeta = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitleMeta) twitterTitleMeta.setAttribute('content', meta[language].twitterTitle);
    const twitterDescMeta = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescMeta) twitterDescMeta.setAttribute('content', meta[language].twitterDescription);
    const twitterImageMeta = document.querySelector('meta[name="twitter:image"]');
    if (twitterImageMeta) twitterImageMeta.setAttribute('content', meta[language].twitterImage);
    document.documentElement.lang = language;
    console.log('Title set to:', document.title);

    // Force title update by appending a hidden meta tag
    const titleMeta = document.createElement('meta');
    titleMeta.name = 'title';
    titleMeta.content = meta[language].title;
    document.head.appendChild(titleMeta);
  }, [language]);

  return null;
}