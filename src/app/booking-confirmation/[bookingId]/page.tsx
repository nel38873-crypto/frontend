"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { fetchApi } from '@/lib/api';
import { CheckCircle, Calendar, MapPin, Phone, Download, MessageCircle, Printer } from 'lucide-react';

export default function BookingConfirmationPage() {
  const params = useParams();
  const bookingId = params.bookingId as string;

  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApi(`/bookings/${bookingId}`)
      .then((data) => {
        setBooking(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [bookingId]);

  if (loading) {
    return (
      <div className="pt-36 pb-20 text-center text-forest">
        <p className="font-serif text-2xl font-bold">Retrieving Booking Details...</p>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="pt-36 pb-20 text-center text-forest max-w-md mx-auto px-4">
        <p className="font-serif text-2xl font-bold">Booking Not Found</p>
        <p className="text-xs text-forest/70 mt-2">Could not find details for Booking ID: {bookingId}</p>
        <Link href="/" className="inline-block mt-4 text-xs font-semibold bg-olive text-cream px-5 py-2.5 rounded-full">
          Return to Homepage
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-3xl mx-auto px-4">
        {/* Success Card Header */}
        <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-luxury border border-sage/40 text-center space-y-4 mb-8">
          <div className="w-16 h-16 bg-sage/30 text-olive rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-10 h-10" />
          </div>
          <span className="text-xs font-bold text-olive uppercase tracking-widest block">
            Booking Confirmed · ID: {booking.bookingId}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-forest">
            Your Stay is Confirmed.
          </h1>
          <p className="text-sm text-forest/80 font-light max-w-lg mx-auto">
            We are delighted to welcome you to Grihum Farms! A copy of your reservation has been saved.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 text-xs font-semibold bg-cream border border-sage/40 text-forest px-4 py-2.5 rounded-full hover:bg-sage/20 transition-colors"
            >
              <Printer className="w-4 h-4" /> Print Receipt
            </button>
            <Link
              href="/my-bookings"
              className="inline-flex items-center gap-1.5 text-xs font-semibold bg-olive text-cream px-5 py-2.5 rounded-full hover:bg-forest transition-colors shadow-md"
            >
              View My Bookings
            </Link>
          </div>
        </div>

        {/* Detailed Reservation Summary */}
        <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-luxury border border-sage/40 space-y-6">
          <h2 className="font-serif text-2xl font-bold text-forest border-b border-sage/20 pb-4">
            Reservation Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
            <div>
              <p className="text-xs text-olive font-bold uppercase tracking-wider mb-1">Accommodation</p>
              <p className="font-bold text-forest text-base">{booking.roomName}</p>
              <p className="text-xs text-forest/70 font-light mt-0.5">Grihum Farms Eco Stay & Water Spring</p>
            </div>

            <div>
              <p className="text-xs text-olive font-bold uppercase tracking-wider mb-1">Stay Dates</p>
              <p className="font-bold text-forest">{booking.checkIn} to {booking.checkOut}</p>
              <p className="text-xs text-forest/70 font-light mt-0.5">{booking.nights} Nights</p>
            </div>

            <div>
              <p className="text-xs text-olive font-bold uppercase tracking-wider mb-1">Guests Registered</p>
              <p className="font-bold text-forest">{booking.guests?.adults || 1} Adults, {booking.guests?.children || 0} Children</p>
            </div>

            <div>
              <p className="text-xs text-olive font-bold uppercase tracking-wider mb-1">Payment Status</p>
              <span className="inline-block text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                ✓ Paid ₹{booking.pricing?.totalAmount?.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Guest info */}
          <div className="pt-4 border-t border-sage/20 space-y-2 text-xs text-forest/80 font-light">
            <p><strong>Primary Guest:</strong> {booking.guestName}</p>
            <p><strong>Email:</strong> {booking.guestEmail}</p>
            <p><strong>Phone:</strong> {booking.guestPhone}</p>
            {booking.specialRequests && <p><strong>Requests:</strong> {booking.specialRequests}</p>}
          </div>

          {/* Host Contact Box */}
          <div className="bg-cream/60 p-6 rounded-2xl border border-sage/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-serif text-lg font-bold text-forest">Need assistance with your arrival?</p>
              <p className="text-xs text-forest/70 font-light">Reach host Kumawat Rythem directly on WhatsApp.</p>
            </div>
            <a
              href="https://wa.me/919829012345"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] text-white text-xs font-semibold px-5 py-2.5 rounded-full flex items-center gap-2 shrink-0 shadow-md"
            >
              <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
