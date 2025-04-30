import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">About LOOTIX</h3>
            <p className="text-zinc-400">
              Fantasy-meets-streetwear apparel brand and raffle-driven eCommerce platform.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-zinc-400 hover:text-white transition">
                  Shop All
                </Link>
              </li>
              <li>
                <Link href="/collections" className="text-zinc-400 hover:text-white transition">
                  Collections
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-zinc-400 hover:text-white transition">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/shipping" className="text-zinc-400 hover:text-white transition">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-zinc-400 hover:text-white transition">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-zinc-400 hover:text-white transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Stay Updated</h3>
            <p className="text-zinc-400">Subscribe to our newsletter for updates and exclusive offers.</p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-400 focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-zinc-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-zinc-400">© 2024 LOOTIX. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-zinc-400 hover:text-white transition">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-zinc-400 hover:text-white transition">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 