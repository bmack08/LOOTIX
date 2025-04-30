import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import Header from "@/components/header";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LOOTIX - Fantasy Streetwear & Raffles',
  description: 'Fantasy-meets-streetwear apparel brand and raffle-driven eCommerce platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-white text-zinc-900`}>
        <div className="min-h-screen flex flex-col isolate">
          <ThemeProvider defaultTheme="light">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
