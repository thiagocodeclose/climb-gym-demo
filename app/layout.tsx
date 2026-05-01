// @ts-nocheck
import type { Metadata } from 'next';
import { Oswald, Source_Sans_3 } from 'next/font/google';
import './globals.css';
import { getKorivaConfig, buildCssVars } from '@/lib/koriva-config';

import { KorivaLivePreview } from '@/components/KorivaLivePreview';
const oswald = Oswald({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-oswald' });
const sourceSans = Source_Sans_3({ subsets: ['latin'], weight: ['300', '400', '600'], variable: '--font-source' });

export const metadata: Metadata = {
  title: 'Summit Climb | Rock Climbing Gym Denver',
  description: 'Denver\'s premier rock climbing gym. Bouldering, lead, top rope and speed walls. 18,000 sq ft of vertical adventure. Find your next move.',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cfg = await getKorivaConfig();
  const vars = buildCssVars(cfg?.brand);
  return (
    <html lang="en" style={vars as React.CSSProperties}>
      <body className={`${oswald.variable} ${sourceSans.variable}`}>{children}<KorivaLivePreview /></body>
    </html>
  );
}
