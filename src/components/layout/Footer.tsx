import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-forest text-cream pt-16 pb-12 border-t border-olive/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-cream/10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden shadow-md border border-sand/40 shrink-0">
                <Image
                  src="/logo.png"
                  alt="GRIHUM Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-wide block text-cream">
                  GRIHUM
                </span>
                <span className="text-[10px] tracking-widest uppercase text-sand block">
                  Farmhouse & Retreat · गृहम्
                </span>
              </div>
            </div>
            <p className="text-sm text-cream/75 leading-relaxed max-w-sm font-light">
              A tranquil farmhouse villa nestled amidst nature in Udaipur, India. Surrounded by the gentle trickle of a natural water spring, lush green hills, and authentic Rajasthani hospitality.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://wa.me/919829012345"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white text-xs font-semibold px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
              >
                <MessageCircle className="w-4 h-4" />
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-sand mb-4">Explore</h4>
            <ul className="space-y-2 text-sm text-cream/80 font-light">
              <li><Link href="/" className="hover:text-sand transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-sand transition-colors">The Farmhouse</Link></li>
              <li><Link href="/rooms" className="hover:text-sand transition-colors">Rooms & Suites</Link></li>
              <li><Link href="/experiences" className="hover:text-sand transition-colors">Experiences</Link></li>
              <li><Link href="/gallery" className="hover:text-sand transition-colors">Photo Gallery</Link></li>
              <li><Link href="/amenities" className="hover:text-sand transition-colors">Amenities</Link></li>
            </ul>
          </div>

          {/* Information & Legal */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-sand mb-4">Information</h4>
            <ul className="space-y-2 text-sm text-cream/80 font-light">
              <li><Link href="/location" className="hover:text-sand transition-colors">Location & Route</Link></li>
              <li><Link href="/contact" className="hover:text-sand transition-colors">Contact Host</Link></li>
              <li><Link href="/faq" className="hover:text-sand transition-colors">FAQs</Link></li>
              <li><Link href="/reviews" className="hover:text-sand transition-colors">Guest Reviews</Link></li>
              <li><Link href="/privacy" className="hover:text-sand transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-sand transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Direct Contact */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-sand mb-4">Contact Farmhouse</h4>
            <div className="space-y-3 text-sm text-cream/80 font-light">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-olive shrink-0 mt-1" />
                <span>Udaipur Countryside, Rajasthan, India</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-olive shrink-0" />
                <a href="tel:+919829012345" className="hover:text-sand">+91 98290 12345</a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-olive shrink-0" />
                <a href="mailto:stay@grihumfarms.com" className="hover:text-sand">stay@grihumfarms.com</a>
              </p>
              <div className="pt-2 text-xs text-sand">
                <p>Hosted by Kumawat Rythem</p>
                <p className="text-[11px] text-cream/60">Superhost · Responds within 1 hour</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-cream/60 font-light">
          <p>© {new Date().getFullYear()} Grihum Farms — Official Farmhouse Website. All rights reserved.</p>
          <div className="mt-4 sm:mt-0 flex space-x-6">
            <Link href="/privacy" className="hover:text-cream">Privacy</Link>
            <Link href="/terms" className="hover:text-cream">Terms</Link>
            <Link href="/owner" className="text-sand/80 hover:text-sand font-medium">Owner Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
