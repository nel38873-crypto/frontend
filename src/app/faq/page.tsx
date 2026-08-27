"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

export default function FAQPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    { q: "What time is check-in and check-out at Grihum Farms?", a: "Check-in is at 2:00 PM and check-out is at 11:00 AM. Early check-in or late check-out can be requested depending on room availability." },
    { q: "How many guests can stay at Grihum Farms?", a: "Grihum Farms can accommodate up to 8–12 guests when reserving the Entire Villa, or 2–4 guests per individual suite." },
    { q: "Is breakfast included with our stay?", a: "Yes, you can choose flexible rates with farm breakfast or order authentic home-cooked Rajasthani thalis on request." },
    { q: "Can I book the entire farmhouse for private events or family trips?", a: "Absolutely! You can reserve the Entire Grihum Farms Villa for exclusive access to all suites, lawn gardens, private water spring pool, and outdoor firepit." },
    { q: "Are pets allowed at Grihum Farms?", a: "Yes, we are pet-friendly! Please inform us in advance so we can prepare open garden areas for your furry friends." },
    { q: "Is parking and Wi-Fi available on site?", a: "Free high-speed Wi-Fi is available across all rooms and lawns, along with free secured parking for up to 5 cars." },
    { q: "What is the cancellation policy?", a: "Standard rates offer free cancellation up to 48 hours before check-in. Non-refundable discounted rates are non-cancellable." },
    { q: "How far is Grihum Farms from Udaipur city center?", a: "The farmhouse is located approximately 18 km (~30 minutes drive) from Udaipur City Palace and Lake Pichola." }
  ];

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 text-center mb-16">
        <span className="text-xs font-semibold uppercase tracking-widest text-terracotta">
          Help & FAQs
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-forest mt-3 mb-6">
          Frequently Asked Questions
        </h1>
        <p className="text-base text-forest/80 font-light leading-relaxed">
          Everything you need to know about planning your stay at Grihum Farms.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-sage/30 shadow-soft overflow-hidden">
            <button
              onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              className="w-full text-left p-5 font-serif text-lg font-bold text-forest flex items-center justify-between gap-4"
            >
              <span>{faq.q}</span>
              <ChevronDown className={`w-5 h-5 text-olive transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
            </button>
            {openFaq === idx && (
              <div className="px-5 pb-5 text-sm text-forest/70 font-light leading-relaxed border-t border-sage/20 pt-3">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
