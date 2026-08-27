"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchApi } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { Calendar, Search, CheckCircle, Clock } from 'lucide-react';

export default function MyBookingsPage() {
  const { user } = useAuth();
  const [email, setEmail] = useState(user?.email || '');
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const fetchBookings = (searchEmail: string) => {
    if (!searchEmail) return;
    setLoading(true);
    fetchApi(`/bookings/my-bookings?email=${encodeURIComponent(searchEmail)}`)
      .then((data) => {
        setBookings(data);
        setSearched(true);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (user?.email) {
      setEmail(user.email);
      fetchBookings(user.email);
    }
  }, [user]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchBookings(email);
  };

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-terracotta">
            Guest Portal
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-forest mt-2">
            My Grihum Farms Reservations
          </h1>
          <p className="text-sm text-forest/70 font-light mt-2">
            View your active, upcoming, and past stays at Grihum Farms.
          </p>
        </div>

        {/* Email Lookup Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-luxury border border-sage/30 mb-10">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex-grow w-full">
              <label className="text-xs font-bold text-olive uppercase tracking-wider block mb-1">
                Lookup Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-cream/40 border border-sage/30 rounded-xl p-3 text-sm font-semibold outline-none focus:border-olive"
                placeholder="Enter email used during booking..."
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto bg-olive hover:bg-forest text-cream font-semibold px-6 py-3.5 rounded-xl shadow-md transition-all text-sm flex items-center justify-center gap-2 self-end"
            >
              <Search className="w-4 h-4" />
              {loading ? 'Searching...' : 'Find Bookings'}
            </button>
          </form>
        </div>

        {/* Results */}
        {searched && (
          <div className="space-y-6">
            {bookings.length === 0 ? (
              <div className="bg-white p-8 rounded-3xl text-center border border-sage/30 text-forest font-light">
                <p className="font-serif text-xl font-bold text-forest mb-2">No bookings found</p>
                <p className="text-xs text-forest/70">No active or past stays found under email "{email}".</p>
                <Link href="/booking" className="inline-block mt-4 text-xs font-semibold bg-olive text-cream px-5 py-2.5 rounded-full">
                  Book a Stay Now
                </Link>
              </div>
            ) : (
              bookings.map((booking) => (
                <div key={booking.bookingId} className="bg-white p-6 sm:p-8 rounded-3xl shadow-luxury border border-sage/30 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-sage/20 pb-4">
                    <div>
                      <span className="text-xs font-bold text-olive uppercase tracking-widest block">
                        ID: {booking.bookingId}
                      </span>
                      <h3 className="font-serif text-2xl font-bold text-forest">{booking.roomName}</h3>
                    </div>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                      ✓ {booking.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                    <div>
                      <p className="text-forest/60">Check-In</p>
                      <p className="font-bold text-forest text-sm">{booking.checkIn}</p>
                    </div>
                    <div>
                      <p className="text-forest/60">Check-Out</p>
                      <p className="font-bold text-forest text-sm">{booking.checkOut}</p>
                    </div>
                    <div>
                      <p className="text-forest/60">Guests</p>
                      <p className="font-bold text-forest text-sm">{booking.guests?.adults || 1} Adults</p>
                    </div>
                    <div>
                      <p className="text-forest/60">Total Paid</p>
                      <p className="font-bold text-olive text-sm">₹{booking.pricing?.totalAmount?.toLocaleString('en-IN')}</p>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <Link
                      href={`/booking-confirmation/${booking.bookingId}`}
                      className="text-xs font-semibold text-olive hover:underline"
                    >
                      View Receipt & Details →
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
