"use client";

import React from 'react';
import Link from 'next/link';
import { Calendar } from 'lucide-react';

export default function MobileStickyBookingBar() {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-cream/95 backdrop-blur-md border-t border-sage/40 px-4 py-3 shadow-luxury flex items-center justify-between">
      <div>
        <span className="text-xs text-forest/70 block uppercase font-medium">Grihum Farms</span>
        <span className="text-sm font-semibold text-forest">From ₹5,500 <span className="text-xs font-normal text-forest/60">/ night</span></span>
      </div>

      <Link
        href="/booking"
        className="inline-flex items-center gap-2 bg-olive hover:bg-forest text-cream font-medium text-sm px-5 py-2.5 rounded-full shadow-md transition-all active:scale-95"
      >
        <Calendar className="w-4 h-4" />
        Book Stay
      </Link>
    </div>
  );
}
