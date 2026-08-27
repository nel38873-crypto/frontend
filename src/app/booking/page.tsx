"use client";

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { fetchApi } from '@/lib/api';
import {
  CreditCard,
  Lock,
  ArrowRight
} from 'lucide-react';
import { addDays } from 'date-fns';

function BookingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const preSelectRoomId = searchParams.get('roomId');
  const preCheckIn = searchParams.get('checkIn');
  const preCheckOut = searchParams.get('checkOut');

  const today = new Date().toISOString().split('T')[0];
  const tomorrow = addDays(new Date(), 1).toISOString().split('T')[0];

  const [rooms, setRooms] = useState<any[]>([]);
  const [experiences, setExperiences] = useState<any[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);

  const [checkIn, setCheckIn] = useState(preCheckIn || today);
  const [checkOut, setCheckOut] = useState(preCheckOut || tomorrow);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rateType, setRateType] = useState<'refundable' | 'non_refundable'>('refundable');

  const [selectedExpIds, setSelectedExpIds] = useState<string[]>([]);

  // Guest details form
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  // Step control: 1 = Selection & Price, 2 = Guest Info & Payment
  const [step, setStep] = useState(1);
  const [pricing, setPricing] = useState<any>(null);

  const [availabilityCheck, setAvailabilityCheck] = useState<{ available: boolean; reason?: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchApi('/rooms').then((data) => {
      setRooms(data);
      if (preSelectRoomId) {
        const found = data.find((r: any) => r._id === preSelectRoomId || r.slug === preSelectRoomId);
        if (found) setSelectedRoom(found);
      } else if (data.length > 0) {
        setSelectedRoom(data[0]);
      }
    }).catch(console.error);

    fetchApi('/experiences').then(setExperiences).catch(console.error);
  }, [preSelectRoomId]);

  // Recalculate price when selection changes
  useEffect(() => {
    if (!selectedRoom || !checkIn || !checkOut) return;

    setError('');

    // Check availability
    fetchApi('/rooms/check-availability', {
      method: 'POST',
      body: JSON.stringify({
        roomId: selectedRoom._id,
        checkIn,
        checkOut,
        guests: { adults, children }
      })
    })
      .then((availRes) => {
        setAvailabilityCheck(availRes);
        if (availRes.available) {
          // Fetch price breakdown
          return fetchApi('/bookings/calculate-price', {
            method: 'POST',
            body: JSON.stringify({
              roomId: selectedRoom._id,
              checkIn,
              checkOut,
              experiences: selectedExpIds,
              rateType
            })
          }).then(setPricing);
        }
      })
      .catch((err) => {
        setError(err.message || 'Error checking availability');
      });
  }, [selectedRoom, checkIn, checkOut, adults, children, selectedExpIds, rateType]);

  const toggleExperience = (expId: string) => {
    setSelectedExpIds((prev) =>
      prev.includes(expId) ? prev.filter((id) => id !== expId) : [...prev, expId]
    );
  };

  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestEmail || !guestPhone) {
      setError('Please provide your full name, email, and phone number.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const newBooking = await fetchApi('/bookings', {
        method: 'POST',
        body: JSON.stringify({
          roomId: selectedRoom._id,
          checkIn,
          checkOut,
          guestName,
          guestEmail,
          guestPhone,
          guests: { adults, children, infants: 0, pets: 0 },
          experiences: selectedExpIds,
          rateType,
          specialRequests,
          paymentMethod: 'Razorpay Instant Verification'
        })
      });

      router.push(`/booking-confirmation/${newBooking.bookingId}`);
    } catch (err: any) {
      setError(err.message || 'Payment simulation failed. Please try again.');
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-10">
      {/* Main Selection Area */}
      <div className="lg:col-span-7 space-y-8">
        {step === 1 ? (
          <>
            {/* 1. Select Room */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-luxury border border-sage/30 space-y-4">
              <h2 className="font-serif text-2xl font-bold text-forest">1. Select Accommodation</h2>
              <div className="space-y-3">
                {rooms.map((room) => (
                  <div
                    key={room.slug}
                    onClick={() => setSelectedRoom(room)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                      selectedRoom?._id === room._id
                        ? 'border-olive bg-cream/60 shadow-soft ring-1 ring-olive'
                        : 'border-sage/30 bg-white hover:border-olive/50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
                        <Image src={room.coverImage} alt={room.name} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="font-serif text-lg font-bold text-forest">{room.name}</p>
                        <p className="text-xs text-forest/70">{room.shortDescription}</p>
                      </div>
                    </div>
                    <span className="font-serif text-base font-bold text-olive">
                      ₹{room.pricePerNight.toLocaleString('en-IN')} <span className="text-[10px] font-normal">/ night</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Select Dates & Guests */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-luxury border border-sage/30 space-y-4">
              <h2 className="font-serif text-2xl font-bold text-forest">2. Dates & Guest Count</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-olive uppercase tracking-wider block mb-1">Check-In Date</label>
                  <input
                    type="date"
                    min={today}
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full bg-cream/40 border border-sage/30 rounded-xl p-3 text-sm font-semibold outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-olive uppercase tracking-wider block mb-1">Check-Out Date</label>
                  <input
                    type="date"
                    min={checkIn}
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full bg-cream/40 border border-sage/30 rounded-xl p-3 text-sm font-semibold outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="text-xs font-bold text-olive uppercase tracking-wider block mb-1">Adults</label>
                  <select
                    value={adults}
                    onChange={(e) => setAdults(Number(e.target.value))}
                    className="w-full bg-cream/40 border border-sage/30 rounded-xl p-3 text-sm font-semibold outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                      <option key={n} value={n}>{n} {n === 1 ? 'Adult' : 'Adults'}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-olive uppercase tracking-wider block mb-1">Children</label>
                  <select
                    value={children}
                    onChange={(e) => setChildren(Number(e.target.value))}
                    className="w-full bg-cream/40 border border-sage/30 rounded-xl p-3 text-sm font-semibold outline-none"
                  >
                    {[0, 1, 2, 3, 4].map((n) => (
                      <option key={n} value={n}>{n} Children</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* 3. Experiences Add-ons */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-luxury border border-sage/30 space-y-4">
              <h2 className="font-serif text-2xl font-bold text-forest">3. Enhance Your Stay (Optional Add-Ons)</h2>
              <div className="space-y-3">
                {experiences.map((exp) => {
                  const isSelected = selectedExpIds.includes(exp._id);
                  return (
                    <div
                      key={exp.slug}
                      onClick={() => toggleExperience(exp._id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                        isSelected ? 'border-olive bg-cream/60 shadow-soft' : 'border-sage/30 hover:border-olive/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {}}
                          className="w-4 h-4 accent-olive rounded"
                        />
                        <div>
                          <p className="font-semibold text-sm text-forest">{exp.title}</p>
                          <p className="text-xs text-forest/60">{exp.shortDescription}</p>
                        </div>
                      </div>
                      <span className="font-bold text-xs text-olive">₹{exp.price}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 4. Rate Option */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-luxury border border-sage/30 space-y-4">
              <h2 className="font-serif text-2xl font-bold text-forest">4. Cancellation Rate Option</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  onClick={() => setRateType('refundable')}
                  className={`p-4 rounded-2xl border cursor-pointer ${
                    rateType === 'refundable' ? 'border-olive bg-cream/60 font-semibold' : 'border-sage/30'
                  }`}
                >
                  <p className="text-sm text-forest">Standard Flexible Rate</p>
                  <p className="text-xs text-forest/70 font-light mt-1">Free cancellation up to 48 hours before check-in.</p>
                </div>
                <div
                  onClick={() => setRateType('non_refundable')}
                  className={`p-4 rounded-2xl border cursor-pointer ${
                    rateType === 'non_refundable' ? 'border-olive bg-cream/60 font-semibold' : 'border-sage/30'
                  }`}
                >
                  <p className="text-sm text-forest">Non-Refundable (Save 10%)</p>
                  <p className="text-xs text-forest/70 font-light mt-1">Pay less. No refunds upon cancellation.</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!availabilityCheck?.available}
              className="w-full bg-olive hover:bg-forest disabled:opacity-50 text-cream font-semibold py-4 rounded-full shadow-luxury transition-all text-base flex items-center justify-center gap-2"
            >
              Continue to Guest Details <ArrowRight className="w-5 h-5" />
            </button>
          </>
        ) : (
          /* Step 2: Guest Details & Payment */
          <form onSubmit={handleConfirmBooking} className="bg-white p-6 sm:p-8 rounded-3xl shadow-luxury border border-sage/30 space-y-6">
            <h2 className="font-serif text-2xl font-bold text-forest">Guest Information</h2>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-forest uppercase tracking-wider block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full bg-cream/40 border border-sage/30 rounded-xl p-3 text-sm outline-none focus:border-olive"
                  placeholder="e.g. Ananya Sharma"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-forest uppercase tracking-wider block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full bg-cream/40 border border-sage/30 rounded-xl p-3 text-sm outline-none focus:border-olive"
                    placeholder="e.g. ananya@example.com"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-forest uppercase tracking-wider block mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full bg-cream/40 border border-sage/30 rounded-xl p-3 text-sm outline-none focus:border-olive"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-forest uppercase tracking-wider block mb-1">Special Requests (Optional)</label>
                <textarea
                  rows={3}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full bg-cream/40 border border-sage/30 rounded-xl p-3 text-sm outline-none focus:border-olive"
                  placeholder="e.g. Estimated arrival time, dietary preferences..."
                />
              </div>
            </div>

            <div className="pt-4 border-t border-sage/20 space-y-4">
              <h3 className="font-serif text-xl font-bold text-forest flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-olive" /> Payment Gateway (Razorpay Simulation)
              </h3>
              <div className="bg-cream/60 p-4 rounded-2xl border border-sage/30 text-xs text-forest/80 font-light leading-relaxed">
                🔒 Secure instant payment processing. All major Indian UPI, Credit/Debit cards, NetBanking supported.
              </div>

              {error && <p className="text-xs text-terracotta font-semibold">{error}</p>}

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 border border-forest/20 text-forest font-semibold py-4 rounded-full text-sm hover:bg-forest/5"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-2/3 bg-olive hover:bg-forest text-cream font-semibold py-4 rounded-full shadow-luxury transition-all text-sm flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  {submitting ? 'Confirming Stay...' : `Pay ₹${pricing?.totalAmount?.toLocaleString('en-IN')}`}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>

      {/* Pricing Summary Sidebar */}
      <div className="lg:col-span-5">
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-luxury border border-sage/40 sticky top-28 space-y-6">
          <h2 className="font-serif text-2xl font-bold text-forest border-b border-sage/20 pb-4">
            Reservation Summary
          </h2>

          {selectedRoom && (
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0">
                <Image src={selectedRoom.coverImage} alt={selectedRoom.name} fill className="object-cover" />
              </div>
              <div>
                <p className="font-serif text-lg font-bold text-forest">{selectedRoom.name}</p>
                <p className="text-xs text-forest/70">{checkIn} to {checkOut} ({pricing?.nights || 1} Nights)</p>
              </div>
            </div>
          )}

          {availabilityCheck?.available === false && (
            <div className="bg-terracotta/10 border border-terracotta/30 text-terracotta p-3.5 rounded-2xl text-xs font-semibold">
              ⚠️ {availabilityCheck.reason}
            </div>
          )}

          {pricing && (
            <div className="space-y-3 pt-2 text-xs font-light text-forest/80 border-t border-sage/20">
              <div className="flex justify-between">
                <span>Room Subtotal ({pricing.nights} nights)</span>
                <span className="font-medium text-forest">₹{pricing.roomSubtotal?.toLocaleString('en-IN')}</span>
              </div>

              {pricing.experiencesTotal > 0 && (
                <div className="flex justify-between">
                  <span>Selected Experiences Add-Ons</span>
                  <span className="font-medium text-forest">₹{pricing.experiencesTotal?.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Cleaning & Service Fee</span>
                <span className="font-medium text-forest">₹{pricing.cleaningFee?.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex justify-between">
                <span>Taxes & GST (12%)</span>
                <span className="font-medium text-forest">₹{pricing.taxes?.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex justify-between text-base font-bold text-forest pt-3 border-t border-sage/30">
                <span>Total Amount</span>
                <span className="font-serif text-xl text-olive">₹{pricing.totalAmount?.toLocaleString('en-IN')}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 text-center mb-12">
        <span className="text-xs font-semibold uppercase tracking-widest text-terracotta">
          Direct Farmhouse Reservation
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-forest mt-2">
          Reserve Your Stay at Grihum Farms
        </h1>
      </div>

      <Suspense fallback={<div className="text-center font-serif text-xl py-12">Loading Reservation Form...</div>}>
        <BookingContent />
      </Suspense>
    </div>
  );
}
