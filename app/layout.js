import { Cinzel, Cinzel_Decorative, Cormorant_Garamond } from 'next/font/google';
import './globals.css';

const cinzel = Cinzel({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-cinzel' });
const cinzelDeco = Cinzel_Decorative({ subsets: ['latin'], weight: ['400', '700', '900'], variable: '--font-cinzel-deco' });
const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['300', '400', '600'], style: ['normal', 'italic'], variable: '--font-cormorant' });

export const metadata = {
  title: '🎓 Farewell Invitation – Computer Science Alumni',
  description: 'Join us for a memorable farewell! Confirm your presence now.',
  openGraph: {
    title: '🎓 Farewell Invitation – Computer Science Alumni',
    description: 'Join us for a memorable farewell! Confirm your presence now.',
    url: 'https://farewellinvitation-csv9kpg7i-mkris8120-8790s-projects.vercel.app',
    siteName: 'Farewell Invitation',
    images: [
      {
        url: 'https://farewellinvitation-csv9kpg7i-mkris8120-8790s-projects.vercel.app/preview.png', // Ensure you upload preview.jpg to the public/ folder
        width: 1200,
        height: 630,
        alt: 'Farewell Invitation Preview',
      },
    ],
    type: 'website',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#04090F',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cinzel.variable} ${cinzelDeco.variable} ${cormorant.variable}`}>
      <body>{children}</body>
    </html>
  );
}
