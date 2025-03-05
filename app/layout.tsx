import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { ClientProviders } from '@/components/ClientProvider';
import DynamicTitle from '@/components/DynamicTitle';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Carenest - Home Healthcare Services in Istanbul',
  description:
    'Carenest provides professional home healthcare services in Istanbul, including vitamin therapy, IV therapy, vaccination, cupping, leech therapy, wound care, and elderly care.',
  keywords: [
    'home healthcare Istanbul',
    'home doctor Istanbul',
    'vitamin therapy at home',
    'IV therapy',
    'home vaccination',
    'cupping therapy',
    'leech therapy',
    'elderly care',
    'wound care',
    'serum therapy',
    'home nursing care',
  ],
  openGraph: {
    title: 'Carenest - Home Healthcare Services in Istanbul',
    description:
      'Expert home healthcare services in Istanbul: vitamin and serum therapy, vaccination, cupping, leech therapy, wound care, and elderly care.',
    type: 'website',
    url: 'https://www.ist-carenest.com',
    images: [
      {
        url: 'https://www.ist-carenest.com/assets/images/carenest-homecare.jpg',
        width: 1200,
        height: 630,
        alt: 'Carenest Home Healthcare Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Carenest - Home Healthcare Services in Istanbul',
    description:
      'Professional home healthcare services in Istanbul: vitamin therapy, IV therapy, vaccination, cupping, leech therapy, wound care, and elderly care.',
    images: ['https://www.ist-carenest.com/assets/images/carenest-homecare.jpg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Normalize keywords to a string
  const keywordsString = Array.isArray(metadata.keywords)
    ? metadata.keywords.join(', ')
    : String(metadata.keywords ?? '');

  // Normalize Open Graph image to a single URL
  const ogImages = metadata.openGraph?.images;
  const ogImageUrl = ogImages
    ? Array.isArray(ogImages)
      ? (typeof ogImages[0] === 'string'
          ? ogImages[0]
          : 'url' in ogImages[0]
          ? ogImages[0].url
          : ogImages[0].toString()) ?? ''
      : typeof ogImages === 'string'
      ? ogImages
      : 'url' in (ogImages)
      ? (ogImages as { url: string }).url
      : ogImages.toString() ?? ''
    : '';

  // Normalize Twitter image to a single URL
  const twitterImages = metadata.twitter?.images;
  const twitterImageUrl = twitterImages
    ? Array.isArray(twitterImages)
      ? twitterImages[0] ?? ''
      : String(twitterImages ?? '')
    : '';

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="description" content={String(metadata.description ?? '')} />
        <meta name="keywords" content={keywordsString} />
        <meta property="og:title" content={String(metadata.openGraph?.title ?? '')} />
        <meta property="og:description" content={String(metadata.openGraph?.description ?? '')} />
        <meta property="og:url" content={String(metadata.openGraph?.url ?? '')} />
        <meta property="og:image" content={String(ogImageUrl)} />
        <meta name="twitter:title" content={String(metadata.twitter?.title ?? '')} />
        <meta name="twitter:description" content={String(metadata.twitter?.description ?? '')} />
        <meta name="twitter:image" content={String(twitterImageUrl)} />
      </head>
      <body className={inter.className}>
        <ClientProviders>
          <DynamicTitle />
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ClientProviders>
      </body>
    </html>
  );
}