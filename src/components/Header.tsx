'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'JUST ARRIVED', href: '/shop', highlight: true },
  { label: 'MENS', href: '/mens' },
  { label: 'WOMENS', href: '/womens' },
  { label: 'ACCESSORIES', href: '/collections/accessories' },
  { label: 'QUICK ENTRIES', href: '/quick-entries' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Header - Sticky Navigation */}
      <header
        className={`w-full sticky top-0 z-50 transition-all duration-300 h-16
          ${isScrolled
            ? 'bg-bg-dark/95 border-accent-earth/30 shadow-md'
            : 'bg-bg-dark'
          } backdrop-blur-[12px] border-b border-accent-earth/20`}
      >
        <div className="max-w-container mx-auto px-4 lg:px-8 h-full">
          <nav className="flex items-center justify-between h-full">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center transition-all duration-300 hover:opacity-80"
            >
              <Image
                src="/images/lootix_logo.png"
                alt="LOOTIX Logo"
                width={100}
                height={40}
                className="object-contain h-10 w-auto"
                priority
              />
            </Link>

            {/* Desktop Navigation Links */}
            <ul className="hidden lg:flex gap-8 items-center">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={`uppercase font-semibold tracking-wider transition-colors duration-200 text-[13px] ${
                      link.highlight ? 'text-cta-primary' : 'text-text-secondary hover:text-text-primary'
                    }`}
                    style={{ letterSpacing: '0.05em' }}
                  >
                    {link.label}
                    {link.highlight && <span className="animate-blink">_</span>}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              {/* Enter Now CTA - Desktop only */}
              <Link
                href="/current-giveaway"
                className="hidden lg:inline-flex btn-primary py-2 px-6 text-sm"
              >
                ENTER NOW
              </Link>

              {/* Cart Icon */}
              <Link href="/cart" className="relative text-text-secondary hover:text-text-primary transition-colors duration-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {/* Cart count badge */}
                <span className="absolute -top-2 -right-2 bg-cta-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </Link>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden flex flex-col justify-center items-center w-6 h-6 gap-1.5"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                <span
                  className={`w-6 h-0.5 bg-text-primary rounded transition-all duration-300 ${
                    isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                  }`}
                />
                <span
                  className={`w-6 h-0.5 bg-text-primary rounded transition-all duration-300 ${
                    isMobileMenuOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`w-6 h-0.5 bg-text-primary rounded transition-all duration-300 ${
                    isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                  }`}
                />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay - Section 4.5 */}
      <div
        className={`lg:hidden fixed inset-0 top-[72px] bg-bg-dark z-40 transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <nav className="p-6">
          <ul className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={`block py-4 font-medium text-lg uppercase tracking-wider border-b border-accent-earth/20 ${
                    link.highlight ? 'text-cta-primary' : 'text-text-primary'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                  {link.highlight && <span className="animate-blink">_</span>}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile CTA */}
          <div className="mt-8">
            <Link
              href="/current-giveaway"
              className="btn-primary w-full justify-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              ENTER GIVEAWAY — FREE
            </Link>
          </div>
        </nav>
      </div>

    </>
  );
}
