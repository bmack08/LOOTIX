"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-zinc-950 z-50 shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-wide text-white">
          LOOTIX
        </Link>

        <nav className="hidden md:flex space-x-8 text-white text-lg">
          <Link href="/">Home</Link>
          <Link href="/collections/fantasy">Collections</Link>
          <Link href="/about">About</Link>
          <Link href="/shop">Shop</Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
            {isOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-zinc-900 py-4 space-y-4 text-center">
          <Link href="/" onClick={() => setIsOpen(false)} className="block text-white text-lg">Home</Link>
          <Link href="/collections/fantasy" onClick={() => setIsOpen(false)} className="block text-white text-lg">Collections</Link>
          <Link href="/about" onClick={() => setIsOpen(false)} className="block text-white text-lg">About</Link>
          <Link href="/shop" onClick={() => setIsOpen(false)} className="block text-white text-lg">Shop</Link>
        </div>
      )}
    </header>
  );
}
