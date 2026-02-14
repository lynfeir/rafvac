import { Inter, Rajdhani } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700', '800', '900']
});

const rajdhani = Rajdhani({
  subsets: ['latin'],
  variable: '--font-rajdhani',
  weight: ['500', '600', '700']
});

export const metadata = {
  title: 'RAFVAC Solutions | Central PA HVAC Specialists',
  description:
    'RAFVAC Solutions provides professional HVAC repair, maintenance, and installation across Central Pennsylvania. EPA certified technicians and 24/7 emergency service.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${rajdhani.variable}`}>{children}</body>
    </html>
  );
}
