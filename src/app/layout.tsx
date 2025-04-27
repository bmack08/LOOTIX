export const metadata = {
    title: 'Lootix | Fantasy x Streetwear',
    description: 'Legendary merch. Next-gen drip.',
  };
  
  export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body className="bg-zinc-950 text-white">{children}</body>
      </html>
    );
  }
  