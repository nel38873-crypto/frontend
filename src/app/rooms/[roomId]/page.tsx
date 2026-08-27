"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { fetchApi } from '@/lib/api';
import ImageLightbox from '@/components/common/ImageLightbox';
import {
  Users,
  Bed,
  Bath,
  Wifi,
  Wind,
  Coffee,
  CheckCircle,
  Calendar as CalendarIcon,
  Sparkles,
  ArrowLeft
} from 'lucide-react';

export default function RoomDetailPage() {
  const params = useParams();
  const router = useRouter();
  const roomIdParam = params.roomId as string;

  const [room, setRoom] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [adults, setAdults] = useState(2);

  useEffect(() => {
    fetchApi(`/rooms/${roomIdParam}`)
      .then((data) => {
        setRoom(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [roomIdParam]);

  if (loading) {
    return (
      <div className="pt-36 pb-20 text-center text-forest">
        <p className="font-serif text-2xl font-bold">Loading Room Details...</p>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="pt-36 pb-20 text-center text-forest">
        <p className="font-serif text-2xl font-bold">Room Not Found</p>
        <Link href="/rooms" className="text-olive hover:underline text-sm font-semibold mt-4 inline-block">
          Return to Rooms Catalog
        </Link>
      </div>
    );
  }

  const handleBookNow = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/booking?roomId=${room._id}&checkIn=${checkIn}&checkOut=${checkOut}&adults=${adults}`);
  };

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Back link */}
        <Link href="/rooms" className="inline-flex items-center gap-2 text-xs font-semibold text-olive hover:text-forest mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Rooms Catalog
        </Link>

        {/* Title Header */}
        <div className="mb-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-terracotta">
            Grihum Farms Accommodation
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-forest mt-1">{room.name}</h1>
          <p className="text-sm text-forest/70 font-light mt-2">{room.subtitle}</p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12 rounded-3xl overflow-hidden shadow-luxury">
          <div
            onClick={() => { setLightboxIndex(0); setLightboxOpen(true); }}
            className="md:col-span-2 relative h-[350px] md:h-[450px] cursor-pointer group"
          >
            <Image src={room.coverImage} alt={room.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" priority />
            <div className="absolute inset-0 bg-forest/10 group-hover:bg-forest/30 transition-colors flex items-end p-4">
              <span className="text-xs font-semibold text-cream bg-forest/80 px-3 py-1.5 rounded-full backdrop-blur-md">
                Click to view full photo gallery
              </span>
            </div>
          </div>

          <div className="md:col-span-2 grid grid-cols-2 gap-4">
            {room.images.slice(1, 5).map((imgUrl: string, idx: number) => (
              <div
                key={idx}
                onClick={() => { setLightboxIndex(idx + 1); setLightboxOpen(true); }}
                className="relative h-[170px] md:h-[217px] cursor-pointer group overflow-hidden"
              >
                <Image src={imgUrl} alt={`${room.name} photo ${idx + 2}`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>

        {/* Detail Content & Booking Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Info */}
          <div className="lg:col-span-8 space-y-8">
            {/* Quick Specs Bar */}
            <div className="bg-white p-6 rounded-2xl shadow-soft border border-sage/30 flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-olive" />
                <span><strong>Max Guests:</strong> {room.capacity.maxGuests}</span>
              </div>
              <div className="flex items-center gap-2">
                <Bed className="w-5 h-5 text-olive" />
                <span><strong>Bedrooms:</strong> {room.bedrooms}</span>
              </div>
              <div className="flex items-center gap-2">
                <Bath className="w-5 h-5 text-olive" />
                <span><strong>Bathrooms:</strong> {room.bathrooms}</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-serif text-2xl font-bold text-forest mb-4">About this Suite</h3>
              <p className="text-base text-forest/80 font-light leading-relaxed whitespace-pre-line">
                {room.description}
              </p>
            </div>

            {/* Amenities Grid */}
            <div className="pt-6 border-t border-sage/30">
              <h3 className="font-serif text-2xl font-bold text-forest mb-6">Room Amenities</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {room.amenities.map((amenity: string, i: number) => (
                  <div key={i} className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-sage/30 text-xs font-medium text-forest">
                    <CheckCircle className="w-4 h-4 text-olive shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Booking Widget Card */}
          <div className="lg:col-span-4">
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-luxury border border-sage/40 sticky top-28 space-y-6">
              <div className="flex items-baseline justify-between border-b border-sage/20 pb-4">
                <div>
                  <span className="font-serif text-3xl font-bold text-forest">₹{room.pricePerNight.toLocaleString('en-IN')}</span>
                  <span className="text-xs text-forest/70 font-light"> / night</span>
                </div>
                <span className="text-xs font-semibold text-olive bg-cream px-3 py-1 rounded-full">
                  Best Rate Direct
                </span>
              </div>

              <form onSubmit={handleBookNow} className="space-y-4">
                <div className="grid grid-cols-2 gap-2 border border-sage/30 rounded-xl p-3 bg-cream/30">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-olive block mb-1">Check-In</label>
                    <input
                      type="date"
                      min={today}
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full bg-transparent text-xs font-semibold outline-none"
                    />
                  </div>
                  <div className="border-l border-sage/30 pl-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-olive block mb-1">Check-Out</label>
                    <input
                      type="date"
                      min={checkIn}
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full bg-transparent text-xs font-semibold outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-olive block mb-1">Guests</label>
                  <select
                    value={adults}
                    onChange={(e) => setAdults(Number(e.target.value))}
                    className="w-full bg-cream/40 border border-sage/30 rounded-xl p-3 text-xs font-semibold outline-none"
                  >
                    {[...Array(room.capacity.maxGuests)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-olive hover:bg-forest text-cream font-semibold py-4 rounded-full shadow-md transition-all text-sm flex items-center justify-center gap-2"
                >
                  <CalendarIcon className="w-4 h-4" />
                  Proceed to Book Stay
                </button>
              </form>

              <div className="text-[11px] text-center text-forest/70 font-light">
                🔒 Guaranteed best price when booking directly with Grihum Farms.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <ImageLightbox
        images={room.images}
        isOpen={lightboxOpen}
        initialIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        title={room.name}
      />
    </div>
  );
}
