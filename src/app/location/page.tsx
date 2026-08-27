"use client";

import React from 'react';
import Link from 'next/link';
import { MapPin, Navigation, Car, Plane, Train, Compass, Phone } from 'lucide-react';

export default function LocationPage() {
  const distances = [
    { title: "Udaipur City Center", distance: "18 km", time: "~30 mins drive" },
    { title: "Lake Pichola / City Palace", distance: "20 km", time: "~35 mins drive" },
    { title: "Badi Lake Scenic Viewpoint", distance: "12 km", time: "~20 mins drive" },
    { title: "Maharana Pratap Airport (UDR)", distance: "38 km", time: "~50 mins drive" },
    { title: "Udaipur City Railway Station", distance: "19 km", time: "~32 mins drive" },
  ];

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 text-center mb-16">
        <span className="text-xs font-semibold uppercase tracking-widest text-terracotta">
          Location & Access
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-forest mt-3 mb-6">
          How to Reach Grihum Farms
        </h1>
        <p className="text-base text-forest/80 font-light leading-relaxed">
          Tucked peacefully in the Aravalli countryside near Udaipur, Rajasthan — easily accessible by car or taxi.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Distances & Route Guide */}
        <div className="lg:col-span-6 space-y-8">
          <div className="bg-white p-8 rounded-3xl shadow-luxury border border-sage/30">
            <h2 className="font-serif text-2xl font-bold text-forest mb-6 flex items-center gap-2">
              <Compass className="w-6 h-6 text-olive" /> Nearby Distances
            </h2>
            <div className="space-y-4">
              {distances.map((d, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-cream/40 border border-sage/20 text-sm">
                  <div>
                    <p className="font-bold text-forest">{d.title}</p>
                    <p className="text-xs text-forest/60">{d.time}</p>
                  </div>
                  <span className="font-serif font-bold text-olive text-base">{d.distance}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-luxury border border-sage/30 space-y-6">
            <h2 className="font-serif text-2xl font-bold text-forest">Travel Modes</h2>

            <div className="flex items-start gap-4 text-sm">
              <div className="w-10 h-10 rounded-xl bg-cream flex items-center justify-center text-olive shrink-0">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-forest">By Private Car / Taxi</p>
                <p className="text-xs text-forest/70 font-light mt-1">Direct paved road leading up to the farmhouse gate. Free secure private parking available on site.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 text-sm pt-4 border-t border-sage/20">
              <div className="w-10 h-10 rounded-xl bg-cream flex items-center justify-center text-olive shrink-0">
                <Plane className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-forest">Airport Pickup</p>
                <p className="text-xs text-forest/70 font-light mt-1">We can arrange a trusted private taxi pickup directly from Udaipur Airport upon advance request.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Map Card */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div className="bg-white p-8 rounded-3xl shadow-luxury border border-sage/30 flex-grow flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-terracotta text-xs font-bold uppercase tracking-widest mb-2">
                <MapPin className="w-4 h-4" /> Countryside Haven
              </div>
              <h2 className="font-serif text-3xl font-bold text-forest mb-4">Grihum Farms Estate</h2>
              <p className="text-sm text-forest/80 font-light mb-6">
                Udaipur Countryside, Aravalli Hills Range, Rajasthan, India.
              </p>

              {/* Simulated Map Visual */}
              <div className="relative h-64 rounded-2xl overflow-hidden border border-sage/40 bg-sand/20 flex items-center justify-center p-6 text-center shadow-inner mb-6">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-full bg-olive text-cream flex items-center justify-center mx-auto shadow-lg animate-bounce">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <p className="font-serif text-lg font-bold text-forest">Grihum Farms</p>
                  <p className="text-xs text-forest/70 font-light">Natural Spring & Aravalli Escapes</p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold bg-olive text-cream px-4 py-2 rounded-full shadow-md"
                  >
                    Open in Google Maps <Navigation className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-sage/20 flex items-center justify-between text-xs text-forest/80">
              <span>Need live directions?</span>
              <a href="tel:+919829012345" className="font-bold text-olive hover:underline flex items-center gap-1">
                <Phone className="w-3.5 h-3.5" /> Call Host Kumawat Rythem
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
