'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'JUST ARRIVED!', href: '/just-arrived' },
  { label: 'MENS', href: '/mens', dropdown: [
    { label: 'Shirts', href: '/mens/shirts' },
    { label: 'Long Body Shirts', href: '/mens/long-body-shirts' },
    { label: 'Hoodies / Long Sleeve', href: '/mens/hoodies' },
    { label: 'Bottoms', href: '/mens/bottoms' },
    { label: 'Tank Tops', href: '/mens/tank-tops' },
  ] },
  { label: 'HEADWEAR', href: '/headwear', dropdown: [
    { label: 'Snapbacks', href: '/headwear/snapbacks' },
    { label: 'Beanies', href: '/headwear/beanies' },
    { label: 'Fitted', href: '/headwear/fitted' },
  ] },
  { label: 'ACCESSORIES', href: '/accessories', dropdown: [
    { label: 'All Accessories', href: '/accessories/all' },
    { label: 'Decals / Banners', href: '/accessories/decals' },
    { label: 'Wallets', href: '/accessories/wallets' },
    { label: 'Backpacks', href: '/accessories/backpacks' },
    { label: 'Keychains', href: '/accessories/keychains' },
  ] },
  { label: 'BUNDLES', href: '/bundles' },
  { label: 'WOMENS', href: '/womens' },
  { label: 'YOUTH', href: '/youth' },
//  { label: 'CLEARANCE', href: '/clearance' },
//  { label: 'CURRENT GIVEAWAY', href: '/current-giveaway', className: 'border border-green-400 text-green-400 px-3 py-1 rounded hover:bg-green-400 hover:text-black transition' },
//  { label: 'PAST WINNERS', href: '/past-winners', className: 'border border-blue-400 text-blue-400 px-3 py-1 rounded hover:bg-blue-400 hover:text-black transition' },
];

export default function Header() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white border-gray-200' 
        : 'bg-white border-gray-200'
    } backdrop-blur border-b`}>
      <div className="max-w-7xl mx-auto px-6">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2 min-w-[80px] transition-transform hover:scale-105"
          >
            <Image
              src="/images/lootix_logo.png"
              alt="LOOTIX Logo"
              width={100}
              height={100}
              className="object-contain h-15 w-auto"
              priority
            />
          </Link>

          {/* Navigation Links */}
          <ul className="hidden lg:flex gap-6 items-center flex-1 justify-center">
            {navLinks.map((link) => (
              <li key={link.label} className="relative group">
                {link.dropdown ? (
                  <>
                    <button
                      className={`uppercase text-black font-medium tracking-wide transition-all duration-200 text-sm flex items-center gap-1 hover:text-primary relative
                        after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-primary 
                        after:transition-all after:duration-300 hover:after:w-full ${link.className || ''}`}
                      onMouseEnter={() => setOpenDropdown(link.label)}
                      onMouseLeave={() => setOpenDropdown(null)}
                      onFocus={() => setOpenDropdown(link.label)}
                      onBlur={() => setOpenDropdown(null)}
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
                    {/* Dropdown */}
                    <div
                      className={`absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-xl 
                        py-2 min-w-[180px] z-50 transition-all duration-200 transform origin-top
                        ${openDropdown === link.label 
                          ? 'opacity-100 translate-y-0 scale-100' 
                          : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'}`}
                      onMouseEnter={() => setOpenDropdown(link.label)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="block px-4 py-2 text-black hover:bg-primary/10 text-sm whitespace-nowrap transition-colors duration-150"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className={`uppercase text-black font-medium tracking-wide transition-all duration-200 text-sm relative
                      after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-primary 
                      after:transition-all after:duration-300 hover:after:w-full hover:text-primary ${link.className || ''}`}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Right Side Icons */}
          <div className="flex items-center gap-6">
            <Link href="/search" className="text-black hover:text-primary transition-colors duration-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </Link>
            <Link href="/cart" className="text-black hover:text-primary transition-colors duration-200 relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="absolute -top-2 -right-2 bg-primary text-xs text-white rounded-full w-5 h-5 flex items-center justify-center">0</span>
            </Link>
            <Link href="/account" className="text-black hover:text-primary transition-colors duration-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
} 