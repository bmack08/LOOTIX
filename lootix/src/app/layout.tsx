import "../styles/globals.css";
import Header from "@/components/Header";

export const metadata = {
  title: 'Lootix | Fantasy x Streetwear',
  description: 'Legendary merch. Next-gen drip.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className="bg-white text-black antialiased">
        <Header />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
