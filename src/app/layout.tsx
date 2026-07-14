import type { Metadata } from 'next';
import { Archivo, Space_Mono } from 'next/font/google';
import '../styles/globals.css';
import SiteHeader from '@/components/lootix/SiteHeader';
import SiteFooter from '@/components/lootix/SiteFooter';

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

export const metadata: Metadata = {
  title: 'LOOTIX — Cop the Gear. Win the Vault.',
  description:
    'Legendary fantasy streetwear, forged for the fearless. Every order earns entries into the launch giveaway — $250 cash + a free merch bundle. No purchase necessary.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Existing pages still use Oswald (display) + Inter (body) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${archivo.variable} ${spaceMono.variable} bg-obsidian text-cream font-archivo`}
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
