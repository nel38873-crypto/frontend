"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fetchApi } from '@/lib/api';
import { Users, Bed, Bath, ArrowRight, ShieldCheck, Check } from 'lucide-react';

export default function RoomsPage() {
  const [rooms, setRooms] = useState<any[]>([]);

  useEffect(() => {
    fetchApi('/rooms').then(setRooms).catch(console.error);
  }, []);

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 text-center mb-16">
        <span className="text-xs font-semibold uppercase tracking-widest text-terracotta">
          Private Accommodations
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-forest mt-3 mb-6">
          Rooms & Suites at Grihum Farms
        </h1>
        <p className="text-base text-forest/80 font-light leading-relaxed">
          Each room is designed with floor-to-ceiling nature views, artisanal wooden furnishings, and complete modern comfort.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 space-y-12">
        {rooms.map((room, idx) => (
          <div
            key={room.slug}
            className="bg-white rounded-3xl overflow-hidden shadow-luxury border border-sage/30 grid grid-cols-1 lg:grid-cols-12 gap-0"
          >
            <div className="lg:col-span-7 relative h-[320px] lg:h-auto min-h-[350px]">
              <Image src={room.coverImage} alt={room.name} fill className="object-cover" />
            </div>

            <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-olive uppercase tracking-widest">
                    ROOM 0{idx + 1}
                  </span>
                  <span className="text-sm font-bold text-forest bg-cream px-3 py-1 rounded-full border border-sage/30">
                    ₹{room.pricePerNight.toLocaleString('en-IN')} <span className="font-normal text-xs text-forest/70">/ night</span>
                  </span>
                </div>

                <h2 className="font-serif text-3xl font-bold text-forest mb-3">{room.name}</h2>
                <p className="text-sm text-forest/70 font-light mb-6 leading-relaxed">
                  {room.description}
                </p>

                {/* Specs */}
                <div className="grid grid-cols-3 gap-3 bg-cream/60 p-4 rounded-2xl border border-sage/30 text-xs font-medium mb-6">
                  <div className="flex items-center gap-1.5 text-forest">
                    <Users className="w-4 h-4 text-olive" />
                    <span>{room.capacity.maxGuests} Guests</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-forest">
                    <Bed className="w-4 h-4 text-olive" />
                    <span>{room.bedrooms} Bedroom</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-forest">
                    <Bath className="w-4 h-4 text-olive" />
                    <span>{room.bathrooms} Bath</span>
                  </div>
                </div>

                {/* Key Amenities */}
                <div className="space-y-2 mb-8">
                  {room.amenities.slice(0, 4).map((item: string, i: number) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-forest/80 font-light">
                      <Check className="w-3.5 h-3.5 text-olive shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-sage/20">
                <Link
                  href={`/rooms/${room.slug}`}
                  className="flex-1 text-center border border-forest/20 text-forest text-xs font-semibold py-3 rounded-full hover:bg-forest/5 transition-colors"
                >
                  View Details & Photos
                </Link>
                <Link
                  href={`/booking?roomId=${room._id}`}
                  className="flex-1 text-center bg-olive text-cream text-xs font-semibold py-3 rounded-full hover:bg-forest transition-colors shadow-md"
                >
                  Book Room
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
