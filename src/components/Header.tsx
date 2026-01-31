'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'NEW DROPS', href: '/new-drops' },
  { label: 'MENS', href: '/mens', dropdown: [
    { label: 'Shirts', href: '/mens/shirts' },
    { label: 'Hoodies', href: '/mens/hoodies' },
    { label: 'Sweatpants', href: '/mens/sweatpants' },
    { label: 'Tank Tops', href: '/mens/tank-tops' },
  ] },
  { label: 'WOMENS', href: '/womens', dropdown: [
    { label: 'Shirts', href: '/womens/shirts' },
    { label: 'Hoodies', href: '/womens/hoodies' },
    { label: 'Leggings', href: '/womens/leggings' },
    { label: 'Tank Tops', href: '/womens/tank-tops' },
  ] },
  { label: 'YOUTH', href: '/youth', dropdown: [
    { label: 'Kids Shirts', href: '/youth/shirts' },
    { label: 'Kids Hoodies', href: '/youth/hoodies' },
  ] },
  { label: 'QUICK ENTRIES', href: '/quick-entries' },
  { label: 'MEMBERSHIP', href: '/membership' },
];

export default function Header() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
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
      {/* Header - Section 4.5 specs */}
      <header
        className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 h-[72px] lg:h-[72px]
          ${isScrolled
            ? 'bg-bg-dark/95 border-accent-earth/30 shadow-md'
            : 'bg-bg-dark/90 border-accent-earth/20'
          } backdrop-blur-lg border-b`}
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
                <li key={link.label} className="relative">
                  {link.dropdown ? (
                    <div
                      onMouseEnter={() => setOpenDropdown(link.label)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      <button
                        className="uppercase text-text-secondary font-medium tracking-wider transition-colors duration-200 text-sm flex items-center gap-1 hover:text-text-primary"
                        style={{ letterSpacing: '0.05em' }}
                      >
                        {link.label}
                        <svg
                          className={`w-3 h-3 ml-1 transition-transform duration-200 ${
                            openDropdown === link.label ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {/* Dropdown Menu */}
                      <div
                        className={`absolute left-1/2 -translate-x-1/2 top-full mt-2
                          bg-bg-secondary border border-accent-earth/30 rounded-md shadow-lg
                          py-2 min-w-[180px] z-50 transition-all duration-200
                          ${openDropdown === link.label
                            ? 'opacity-100 translate-y-0 visible'
                            : 'opacity-0 -translate-y-2 invisible'}`}
                      >
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            className="block px-4 py-2 text-text-secondary hover:bg-accent-earth/10 hover:text-text-primary text-sm transition-colors duration-200"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      className="uppercase text-text-secondary font-medium tracking-wider transition-colors duration-200 text-sm hover:text-text-primary"
                      style={{ letterSpacing: '0.05em' }}
                    >
                      {link.label}
                    </Link>
                  )}
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
                {link.dropdown ? (
                  <div>
                    <button
                      className="w-full flex items-center justify-between py-4 text-text-primary font-medium text-lg uppercase tracking-wider border-b border-accent-earth/20"
                      onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                    >
                      {link.label}
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${
                          openDropdown === link.label ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-200 ${
                        openDropdown === link.label ? 'max-h-96' : 'max-h-0'
                      }`}
                    >
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="block py-3 pl-4 text-text-secondary hover:text-text-primary transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className="block py-4 text-text-primary font-medium text-lg uppercase tracking-wider border-b border-accent-earth/20"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                )}
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

      {/* Spacer for fixed header */}
      <div className="h-[72px]" />
    </>
  );
}
