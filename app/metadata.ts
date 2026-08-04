import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Soro Garage Door Services | Professional Garage Door Installation & Repair in GTA',
    template: '%s | Soro Garage Door Services',
  },
  description: 'Professional garage door installation, repairs, spring replacement, and opener installation serving the Greater Toronto Area. Same-day service available with honest pricing and Canadian-made garage doors.',
  keywords: [
    'garage door repair',
    'garage door installation',
    'garage door opener',
    'spring replacement',
    'Toronto garage door',
    'GTA garage door service',
    'emergency garage door repair',
    'same day garage door service',
    'Canadian garage doors',
    'Vaughan garage door',
    'Mississauga garage door',
    'Brampton garage door',
  ],
  authors: [{ name: 'Soro Garage Door Services' }],
  creator: 'Soro Garage Door Services',
  publisher: 'Soro Garage Door Services',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Soro Garage Door Services | Professional Garage Door Installation & Repair',
    description: 'Professional garage door installation, repairs, spring replacement, and opener installation serving the Greater Toronto Area.',
    url: 'http://localhost:3000',
    siteName: 'Soro Garage Door Services',
    locale: 'en_CA',
    type: 'website',
    images: [
      {
        url: '/home-hero.png',
        width: 1200,
        height: 630,
        alt: 'Soro Garage Door Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Soro Garage Door Services | Professional Garage Door Installation & Repair',
    description: 'Professional garage door installation, repairs, spring replacement, and opener installation serving the Greater Toronto Area.',
    images: ['/home-hero.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        url: '/icon.png',
      },
    ],
  },
  manifest: '/manifest.json',
};
