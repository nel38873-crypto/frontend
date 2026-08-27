"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar as CalendarIcon, Users, Search, ChevronDown } from 'lucide-react';
import { format, addDays } from 'date-fns';

export default function HeroAvailabilityBar() {
  const router = useRouter();
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = addDays(new Date(), 1).toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [guestDropdownOpen, setGuestDropdownOpen] = useState(false);

  const totalGuests = adults + children;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/booking?checkIn=${checkIn}&checkOut=${checkOut}&adults=${adults}&children=${children}`);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 -mt-10 sm:-mt-14 relative z-30">
      <form
        onSubmit={handleSearch}
        className="bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-luxury border border-sage/40 grid grid-cols-1 md:grid-cols-4 gap-4 items-center"
      >
        {/* Check-In */}
        <div className="flex flex-col border-b md:border-b-0 md:border-r border-sage/30 pb-3 md:pb-0 md:pr-4">
          <label className="text-[11px] uppercase tracking-wider font-semibold text-olive flex items-center gap-1.5 mb-1">
            <CalendarIcon className="w-3.5 h-3.5 text-terracotta" />
            Check-In
          </label>
          <input
            type="date"
            min={today}
            value={checkIn}
            onChange={(e) => {
              setCheckIn(e.target.value);
              if (e.target.value >= checkOut) {
                setCheckOut(addDays(new Date(e.target.value), 1).toISOString().split('T')[0]);
              }
            }}
            className="bg-transparent font-medium text-forest text-sm outline-none cursor-pointer"
          />
        </div>

        {/* Check-Out */}
        <div className="flex flex-col border-b md:border-b-0 md:border-r border-sage/30 pb-3 md:pb-0 md:pr-4">
          <label className="text-[11px] uppercase tracking-wider font-semibold text-olive flex items-center gap-1.5 mb-1">
            <CalendarIcon className="w-3.5 h-3.5 text-terracotta" />
            Check-Out
          </label>
          <input
            type="date"
            min={checkIn}
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="bg-transparent font-medium text-forest text-sm outline-none cursor-pointer"
          />
        </div>

        {/* Guests Dropdown */}
        <div className="relative border-b md:border-b-0 md:border-r border-sage/30 pb-3 md:pb-0 md:pr-4">
          <label className="text-[11px] uppercase tracking-wider font-semibold text-olive flex items-center gap-1.5 mb-1">
            <Users className="w-3.5 h-3.5 text-terracotta" />
            Guests
          </label>
          <button
            type="button"
            onClick={() => setGuestDropdownOpen(!guestDropdownOpen)}
            className="w-full text-left font-medium text-forest text-sm flex items-center justify-between outline-none"
          >
            <span>{totalGuests} {totalGuests === 1 ? 'Guest' : 'Guests'}</span>
            <ChevronDown className="w-4 h-4 text-olive" />
          </button>

          {guestDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-cream p-4 rounded-xl shadow-luxury border border-sage/40 space-y-3 z-50 animate-fade-in text-forest">
              <div className="flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold">Adults</p>
                  <p className="text-forest/60">Age 13+</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setAdults(Math.max(1, adults - 1))}
                    className="w-7 h-7 rounded-full border border-forest/30 flex items-center justify-center font-bold"
                  >
                    -
                  </button>
                  <span className="font-semibold text-sm w-4 text-center">{adults}</span>
                  <button
                    type="button"
                    onClick={() => setAdults(Math.min(10, adults + 1))}
                    className="w-7 h-7 rounded-full border border-forest/30 flex items-center justify-center font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-sage/30">
                <div>
                  <p className="font-semibold">Children</p>
                  <p className="text-forest/60">Ages 2-12</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setChildren(Math.max(0, children - 1))}
                    className="w-7 h-7 rounded-full border border-forest/30 flex items-center justify-center font-bold"
                  >
                    -
                  </button>
                  <span className="font-semibold text-sm w-4 text-center">{children}</span>
                  <button
                    type="button"
                    onClick={() => setChildren(Math.min(6, children + 1))}
                    className="w-7 h-7 rounded-full border border-forest/30 flex items-center justify-center font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setGuestDropdownOpen(false)}
                className="w-full text-center text-xs font-semibold text-olive hover:underline pt-1"
              >
                Done
              </button>
            </div>
          )}
        </div>

        {/* CTA Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-olive hover:bg-forest text-cream font-semibold py-3.5 px-6 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm transform hover:-translate-y-0.5"
          >
            <Search className="w-4 h-4" />
            Check Availability
          </button>
        </div>
      </form>
    </div>
  );
}
