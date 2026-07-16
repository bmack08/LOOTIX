import type { Metadata } from 'next';
import { Archivo, Space_Mono, IBM_Plex_Mono } from 'next/font/google';
import '../styles/globals.css';
import SiteHeader from '@/components/lootix/v2/SiteHeader';
import SiteFooter from '@/components/lootix/v2/SiteFooter';

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-archivo',
  display: 'swap',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
});

// v2 — labels, prices, countdown digits, eyebrows
const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'LOOTIX — Earn It. Wear It. Loot It.',
  description:
    'Fantasy streetwear, forged for the fearless. Every order earns entries into the live-drawn Loot Vault — $250 + a full merch bundle. No purchase necessary.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        suppressHydrationWarning
        className={`${archivo.variable} ${spaceMono.variable} ${plexMono.variable} bg-ink text-parchment font-archivo`}
        style={{ overflowX: 'hidden' }}
      >
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
