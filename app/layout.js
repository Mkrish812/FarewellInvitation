import { Cinzel, Cinzel_Decorative, Cormorant_Garamond } from 'next/font/google';
import './globals.css';

const cinzel = Cinzel({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-cinzel' });
const cinzelDeco = Cinzel_Decorative({ subsets: ['latin'], weight: ['400', '700', '900'], variable: '--font-cinzel-deco' });
const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['300', '400', '600'], style: ['normal', 'italic'], variable: '--font-cormorant' });

export const metadata = {
  title: 'Farewell — Dept. of Computer Science',
  description: 'Farewell Invitation for HOD Dr. S. Mary Vennila — Department of Computer Science, Presidency College',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cinzel.variable} ${cinzelDeco.variable} ${cormorant.variable}`}>
      <body>{children}</body>
    </html>
  );
}
