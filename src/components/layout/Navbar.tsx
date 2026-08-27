"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Calendar, User as UserIcon, Phone, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

import Image from 'next/image';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout, isAdmin } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'The Farmhouse', href: '/about' },
    { name: 'Rooms', href: '/rooms' },
    { name: 'Experiences', href: '/experiences' },
    { name: 'Amenities', href: '/amenities' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Location', href: '/location' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-cream/95 backdrop-blur-md shadow-soft py-3 border-b border-sage/30'
          : 'bg-gradient-to-b from-forest/80 via-forest/40 to-transparent py-5 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-11 h-11 rounded-full overflow-hidden shadow-md group-hover:scale-105 transition-transform border border-sand/40">
            <Image
              src="/logo.png"
              alt="GRIHUM Farmhouse & Retreat Logo"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div>
            <span
              className={`font-serif text-xl sm:text-2xl font-bold tracking-wide block leading-none ${
                scrolled ? 'text-forest' : 'text-cream'
              }`}
            >
              GRIHUM
            </span>
            <span
              className={`text-[10px] tracking-widest uppercase block mt-0.5 ${
                scrolled ? 'text-olive' : 'text-sand'
              }`}
            >
              Farmhouse & Retreat · Udaipur
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-olive ${
                  scrolled
                    ? isActive
                      ? 'text-olive font-semibold'
                      : 'text-forest/80'
                    : isActive
                    ? 'text-sand font-semibold'
                    : 'text-cream/90'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA & Account */}
        <div className="hidden lg:flex items-center space-x-4">
          {isAdmin && (
            <Link
              href="/owner"
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-terracotta/10 text-terracotta hover:bg-terracotta/20 transition-colors"
            >
              <ShieldCheck className="w-4 h-4" />
              Owner Portal
            </Link>
          )}

          {user ? (
            <div className="flex items-center space-x-2">
              <Link
                href="/my-bookings"
                className={`text-xs font-medium px-3 py-1.5 rounded-full border ${
                  scrolled
                    ? 'border-forest/20 text-forest hover:bg-forest/5'
                    : 'border-white/30 text-cream hover:bg-white/10'
                }`}
              >
                My Bookings
              </Link>
              <button
                onClick={logout}
                className="text-xs text-terracotta hover:underline font-medium"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className={`text-xs font-medium transition-colors ${
                scrolled ? 'text-forest hover:text-olive' : 'text-cream hover:text-sand'
              }`}
            >
              Sign In
            </Link>
          )}

          <Link
            href="/booking"
            className="inline-flex items-center gap-2 bg-olive hover:bg-forest text-cream font-medium text-sm px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
          >
            <Calendar className="w-4 h-4" />
            Book Your Stay
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`lg:hidden p-2 rounded-lg transition-colors ${
            scrolled ? 'text-forest hover:bg-sage/20' : 'text-cream hover:bg-white/10'
          }`}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-cream border-b border-sage/40 px-6 py-6 space-y-4 shadow-luxury animate-fade-in text-forest">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-medium py-1 transition-colors ${
                  pathname === link.href ? 'text-olive font-bold' : 'text-forest/80'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <hr className="border-sage/30 my-3" />

          <div className="flex flex-col space-y-3 pt-1">
            {isAdmin && (
              <Link
                href="/owner"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 text-sm font-medium text-terracotta bg-terracotta/10 px-4 py-2 rounded-lg"
              >
                <ShieldCheck className="w-4 h-4" />
                Owner Portal
              </Link>
            )}

            {user ? (
              <div className="flex justify-between items-center bg-sand/10 p-3 rounded-lg">
                <span className="text-sm font-medium">Hello, {user.name.split(' ')[0]}</span>
                <button onClick={logout} className="text-xs text-terracotta font-semibold">
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm text-center font-medium py-2 border border-forest/20 rounded-full"
              >
                Sign In / Register
              </Link>
            )}

            <Link
              href="/booking"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 bg-olive text-cream font-semibold py-3 rounded-full shadow-md text-base"
            >
              <Calendar className="w-5 h-5" />
              Book Your Stay
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
