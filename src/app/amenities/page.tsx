"use client";

import React from 'react';
import Link from 'next/link';
import {
  Trees,
  Car,
  Waves,
  Flame,
  Utensils,
  Coffee,
  Wifi,
  Wind,
  Droplets,
  Heart,
  Footprints,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export default function AmenitiesPage() {
  const groups = [
    {
      title: "PROPERTY & GROUNDS",
      icon: Trees,
      items: [
        "Private Natural Spring Pool",
        "Lush Organic Lawn Gardens",
        "Free On-Site Secured Parking (5 Cars)",
        "Outdoor Shaded Lounge Seating",
        "Open-Air Firepit & Star-Deck"
      ]
    },
    {
      title: "FOOD & DINING",
      icon: Utensils,
      items: [
        "Traditional Firewood Kitchen",
        "Farm-to-Table Breakfast Spread",
        "Home-cooked Rajasthani Thalis",
        "Outdoor Garden Dining Setup",
        "24/7 Tea & Organic Coffee Station"
      ]
    },
    {
      title: "COMFORT & CONNECTIVITY",
      icon: Wifi,
      items: [
        "Free High-Speed Wi-Fi Across Property",
        "Air Conditioning in all Suites",
        "24/7 Hot Water from Solar Heaters",
        "Dedicated Work Desk in Rooms",
        "Plush Linen & Natural Toiletries"
      ]
    },
    {
      title: "FAMILY & SECLUSION",
      icon: Heart,
      items: [
        "Children-Friendly Safe Gardens",
        "Spacious Family Villa Layout",
        "100% Private Gated Estate",
        "Pet-Friendly Open Grounds",
        "Friendly On-Site Staff Support"
      ]
    },
    {
      title: "OUTDOOR & EXPERIENCES",
      icon: Footprints,
      items: [
        "Guided Aravalli Hill Trails",
        "Sound of Natural Spring Water",
        "Evening Campfire & Acoustic Music",
        "Birdwatching & Stargazing Spot",
        "Organic Vegetable Patch Tours"
      ]
    }
  ];

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 text-center mb-16">
        <span className="text-xs font-semibold uppercase tracking-widest text-terracotta">
          Thoughtful Comforts
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-forest mt-3 mb-6">
          Farmhouse Amenities
        </h1>
        <p className="text-base text-forest/80 font-light leading-relaxed">
          Every amenity at Grihum Farms has been curated to balance nature, seclusion, and refined modern comfort.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 space-y-10">
        {groups.map((group, idx) => {
          const Icon = group.icon;
          return (
            <div key={idx} className="bg-white p-8 rounded-3xl shadow-luxury border border-sage/30">
              <div className="flex items-center gap-3 mb-6 border-b border-sage/20 pb-4">
                <div className="w-10 h-10 rounded-xl bg-cream flex items-center justify-center text-olive">
                  <Icon className="w-5 h-5" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-forest">{group.title}</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {group.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-cream/40 p-4 rounded-2xl border border-sage/20 text-xs font-medium text-forest">
                    <CheckCircle2 className="w-4 h-4 text-olive shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        <div className="text-center pt-8">
          <Link href="/booking" className="bg-olive hover:bg-forest text-cream font-semibold px-8 py-3.5 rounded-full shadow-md transition-all inline-block text-sm">
            Book Your Stay at Grihum Farms
          </Link>
        </div>
      </div>
    </div>
  );
}
