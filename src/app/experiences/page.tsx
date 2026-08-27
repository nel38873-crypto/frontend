"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fetchApi } from '@/lib/api';
import { Sparkles, Clock, Tag, ArrowRight } from 'lucide-react';

export default function ExperiencesPage() {
  const [experiences, setExperiences] = useState<any[]>([]);

  useEffect(() => {
    fetchApi('/experiences').then(setExperiences).catch(console.error);
  }, []);

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 text-center mb-16">
        <span className="text-xs font-semibold uppercase tracking-widest text-terracotta">
          Curated Farm Experiences
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-forest mt-3 mb-6">
          Unforgettable Countryside Moments
        </h1>
        <p className="text-base text-forest/80 font-light leading-relaxed">
          From firewood slow-cooked Rajasthani thalis to evening bonfires by the spring stream, enrich your stay at Grihum Farms.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
        {experiences.map((exp) => (
          <div
            key={exp.slug}
            className="bg-white rounded-3xl overflow-hidden shadow-luxury border border-sage/30 flex flex-col group"
          >
            <div className="relative h-72 w-full overflow-hidden">
              <Image
                src={exp.image}
                alt={exp.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-terracotta text-cream text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                {exp.category}
              </div>
            </div>

            <div className="p-8 flex flex-col flex-grow">
              <div className="flex items-center justify-between text-xs text-olive font-semibold mb-3">
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {exp.duration}</span>
                <span className="font-bold text-sm text-forest">₹{exp.price} <span className="text-xs font-normal text-forest/70">{exp.priceUnit}</span></span>
              </div>

              <h2 className="font-serif text-2xl font-bold text-forest mb-3">{exp.title}</h2>
              <p className="text-sm text-forest/70 font-light mb-6 leading-relaxed flex-grow">
                {exp.description}
              </p>

              <div className="pt-4 border-t border-sage/20 flex items-center justify-between">
                <span className="text-xs text-forest/60">Can be added during booking</span>
                <Link
                  href={`/booking?expId=${exp._id}`}
                  className="bg-olive hover:bg-forest text-cream font-semibold text-xs px-5 py-2.5 rounded-full transition-colors flex items-center gap-1.5"
                >
                  Add to Booking <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
