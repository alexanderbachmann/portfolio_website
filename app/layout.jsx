import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
/* globals.css must load before any component stylesheet: the shared
   .card / .btn primitives live there and component CSS overrides them. */
import './globals.css';
import NavBar from '@/components/navbar';
import Footer from '@/components/footer';
import MotionProvider from '@/components/shared/MotionProvider';
import Spotlight from '@/components/shared/Spotlight';
import { site } from '@/data/site';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Global Product Owner`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  alternates: {
    canonical: '/',
    types: { 'application/rss+xml': '/rss.xml' },
  },
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: `${site.name} | Global Product Owner`,
    description: site.description,
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} | Global Product Owner`,
    description: site.description,
  },
};

export const viewport = {
  themeColor: '#080d17',
  colorScheme: 'dark',
};

export default function RootLayout({ children }) {
  return (
    /* data-scroll-behavior keeps smooth scrolling during client
       navigation in Next 16, which otherwise resets it. */
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <MotionProvider>
          <NavBar />
          {children}
          <Footer />
        </MotionProvider>
        <Spotlight />
      </body>
    </html>
  );
}
