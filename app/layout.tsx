// @ts-nocheck
import type { Metadata } from 'next';
import { Oswald, Source_Sans_3 } from 'next/font/google';
import './globals.css';

const oswald = Oswald({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-oswald' });
const sourceSans = Source_Sans_3({ subsets: ['latin'], weight: ['300', '400', '600'], variable: '--font-source' });

export const metadata: Metadata = {
  title: 'Summit Climb | Rock Climbing Gym Denver',
  description: 'Denver\'s premier rock climbing gym. Bouldering, lead, top rope and speed walls. 18,000 sq ft of vertical adventure. Find your next move.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${oswald.variable} ${sourceSans.variable}`}>{children}</body>
    </html>
  );
}
