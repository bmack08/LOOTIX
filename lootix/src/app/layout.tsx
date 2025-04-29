import "../styles/globals.css";
import Header from "@/components/Header";

export const metadata = {
  title: 'Lootix | Fantasy x Streetwear',
  description: 'Legendary merch. Next-gen drip.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className="bg-zinc-950 text-white antialiased">
        <Header />
        {children}
      </body>
    </html>
  );
}
