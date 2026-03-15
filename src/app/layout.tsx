import "../styles/globals.css";
import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import MobileStickyBar from "@/components/MobileStickyBar";

export const metadata = {
  title: "Lootix | Win Epic Gaming Prizes",
  description:
    "Enter giveaways for epic gaming prizes - custom PC builds, gift cards, collectibles, and more. Free entry available, bonus entries with every purchase.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Google Fonts - Oswald for display, Inter for body (per design brief) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning={true} className="bg-bg-primary">
        {/* Skip to main content - Accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        {/* Announcement Bar */}
        <AnnouncementBar />

        {/* Header */}
        <Header />

        {/* Main Content */}
        <main id="main-content" className="min-h-screen">{children}</main>

        {/* Mobile Sticky CTA */}
        <MobileStickyBar />

        {/* Footer - Section 5.1 specs */}
        <footer className="bg-bg-dark border-t border-accent-earth/20">
          <div className="max-w-container mx-auto px-6 py-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Brand Column */}
              <div className="md:col-span-1">
                <h3 className="font-display font-bold text-2xl text-text-primary mb-4">
                  LOOTIX
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-4">
                  Look cool and get cool shit.
                </p>

                {/* Social Icons */}
                <div className="flex gap-4 mb-6">
                  <a href="https://instagram.com/getlootix" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-text-primary transition-colors" aria-label="Instagram">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                    </svg>
                  </a>
                  <a href="https://tiktok.com/@getlootix" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-text-primary transition-colors" aria-label="TikTok">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                    </svg>
                  </a>
                  <a href="https://twitter.com/getlootix" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-text-primary transition-colors" aria-label="Twitter">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </a>
                  <a href="https://discord.gg/lootix" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-text-primary transition-colors" aria-label="Discord">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
                    </svg>
                  </a>
                </div>

                {/* Physical Address - Required for sweepstakes legitimacy */}
                <div className="text-text-muted text-sm">
                  <p className="font-semibold text-text-secondary">Lootix LLC</p>
                  <p>Maryland, USA</p>
                  <p className="mt-2">hello@getlootix.com</p>
                </div>
              </div>

              {/* Shop Column */}
              <div>
                <h4 className="font-semibold text-text-primary mb-4 uppercase tracking-wider text-sm">
                  Shop
                </h4>
                <ul className="space-y-2 text-text-secondary text-sm">
                  <li><a href="/new-drops" className="hover:text-text-primary transition-colors">New Drops</a></li>
                  <li><a href="/mens" className="hover:text-text-primary transition-colors">Mens</a></li>
                  <li><a href="/womens" className="hover:text-text-primary transition-colors">Womens</a></li>
                  <li><a href="/quick-entries" className="hover:text-text-primary transition-colors">Quick Entries</a></li>
                </ul>
              </div>

              {/* Info Column */}
              <div>
                <h4 className="font-semibold text-text-primary mb-4 uppercase tracking-wider text-sm">
                  Info
                </h4>
                <ul className="space-y-2 text-text-secondary text-sm">
                  <li><a href="/how-it-works" className="hover:text-text-primary transition-colors">How It Works</a></li>
                  <li><a href="/current-giveaway" className="hover:text-text-primary transition-colors">Current Giveaway</a></li>
                  <li><a href="/past-winners" className="hover:text-text-primary transition-colors">Past Winners</a></li>
                  <li><a href="/faq" className="hover:text-text-primary transition-colors">FAQ</a></li>
                </ul>
              </div>

              {/* Legal Column */}
              <div>
                <h4 className="font-semibold text-text-primary mb-4 uppercase tracking-wider text-sm">
                  Legal
                </h4>
                <ul className="space-y-2 text-text-secondary text-sm">
                  <li><a href="/terms" className="hover:text-text-primary transition-colors">Terms of Service</a></li>
                  <li><a href="/privacy" className="hover:text-text-primary transition-colors">Privacy Policy</a></li>
                  <li><a href="/official-rules" className="hover:text-text-primary transition-colors">Official Rules</a></li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-12 pt-8 border-t border-accent-earth/20 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-text-muted text-sm">
                © {new Date().getFullYear()} Lootix LLC. All rights reserved.
              </p>
              <a href="/official-rules" className="text-text-muted text-sm hover:text-text-secondary underline transition-colors">
                NO PURCHASE NECESSARY
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
