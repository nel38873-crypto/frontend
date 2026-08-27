"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, MapPin, Heart, ShieldCheck, Waves } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="pt-28 pb-20 min-h-screen">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 text-center mb-16">
        <span className="text-xs font-semibold uppercase tracking-widest text-terracotta">
          The Story of Grihum Farms
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-forest mt-3 mb-6">
          A Sanctuary Born from Nature & Water
        </h1>
        <p className="text-base sm:text-lg text-forest/80 font-light leading-relaxed">
          Grihum Farms was created as a peaceful haven away from city life — where the soothing sounds of a natural water spring harmonize with authentic Rajasthani warmth.
        </p>
      </div>

      {/* Hero Image */}
      <div className="max-w-6xl mx-auto px-4 mb-20">
        <div className="relative h-[450px] sm:h-[550px] rounded-3xl overflow-hidden shadow-luxury">
          <Image
            src="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=1600"
            alt="Grihum Farms Landscape"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Editorial Sections */}
      <div className="max-w-5xl mx-auto px-4 space-y-20">
        {/* Section 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-olive">The Architecture</span>
            <h2 className="font-serif text-3xl font-bold text-forest">Harmony with the Land</h2>
            <p className="text-sm text-forest/80 font-light leading-relaxed">
              Every cottage and suite at Grihum Farms has been built using locally sourced granite stone, teak wood, and terracotta clay. Large glass windows frame uninterrupted views of the surrounding Aravalli hills, welcoming soft morning sunlight and cool mountain breezes.
            </p>
          </div>
          <div className="relative h-80 rounded-2xl overflow-hidden shadow-soft">
            <Image src="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80&w=1000" alt="Cottage Architecture" fill className="object-cover" />
          </div>
        </div>

        {/* Section 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
          <div className="relative h-80 rounded-2xl overflow-hidden shadow-soft md:order-2">
            <Image src="https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=1000" alt="Natural Water Spring" fill className="object-cover" />
          </div>
          <div className="space-y-4 md:order-1">
            <span className="text-xs font-semibold uppercase tracking-widest text-olive">The Natural Water Spring</span>
            <h2 className="font-serif text-3xl font-bold text-forest">Nature's Constant Melody</h2>
            <p className="text-sm text-forest/80 font-light leading-relaxed">
              What truly sets Grihum Farms apart is the natural perennial spring that flows right through the property. The gentle water creates a natural pool for refreshing dips and fills the air with a calming atmosphere day and night.
            </p>
          </div>
        </div>

        {/* Host Bio Card */}
        <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-luxury border border-sage/30 flex flex-col md:flex-row items-center gap-8">
          <div className="relative w-28 h-28 rounded-full overflow-hidden shrink-0 border-4 border-olive">
            <Image src="https://a0.muscache.com/im/pictures/user/User/original/3f877254-66fa-47be-b1d1-b7f5c5f5b205.jpeg" alt="Kumawat Rythem" fill className="object-cover" />
          </div>
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-1 text-xs font-bold text-terracotta bg-terracotta/10 px-3 py-1 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5" /> Superhost
            </div>
            <h3 className="font-serif text-2xl font-bold text-forest">Meet Your Host — Kumawat Rythem</h3>
            <p className="text-sm text-forest/80 font-light leading-relaxed">
              "We opened Grihum Farms to share the genuine beauty of countryside living with guests seeking peace and connection. As your superhosts, we are dedicated to providing home-cooked Rajasthani meals, personal attention, and an unforgettable stay."
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-8">
          <Link href="/booking" className="bg-olive hover:bg-forest text-cream font-semibold px-8 py-3.5 rounded-full shadow-md transition-all inline-block text-sm">
            Book Your Stay at Grihum Farms
          </Link>
        </div>
      </div>
    </div>
  );
}
