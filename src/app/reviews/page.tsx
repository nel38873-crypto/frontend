"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { fetchApi } from '@/lib/api';
import { Star, Plus, CheckCircle } from 'lucide-react';

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const [guestName, setGuestName] = useState('');
  const [guestLocation, setGuestLocation] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchApi('/reviews').then(setReviews).catch(console.error);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const newRev = await fetchApi('/reviews', {
        method: 'POST',
        body: JSON.stringify({
          guestName,
          guestLocation,
          rating,
          comment,
          stayDate: 'Recent Stay',
          roomName: 'Grihum Farms Eco Stay'
        })
      });
      setReviews([newRev, ...reviews]);
      setModalOpen(false);
      setGuestName('');
      setGuestLocation('');
      setComment('');
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 text-center mb-12">
        <span className="text-xs font-semibold uppercase tracking-widest text-terracotta">
          Verified Guest Reviews
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-forest mt-3 mb-4">
          What Guests Say About Grihum Farms
        </h1>
        <div className="flex items-center justify-center gap-2 text-olive font-bold">
          <div className="flex text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-400 stroke-none" />
            ))}
          </div>
          <span>4.92 ★ Overall Rating</span>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="mt-6 inline-flex items-center gap-2 bg-olive hover:bg-forest text-cream font-semibold px-6 py-3 rounded-full text-xs shadow-md transition-all"
        >
          <Plus className="w-4 h-4" /> Write a Guest Review
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {reviews.map((rev, idx) => (
          <div key={idx} className="bg-white p-6 sm:p-8 rounded-3xl shadow-luxury border border-sage/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 stroke-none" />
                  ))}
                </div>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Verified Stay
                </span>
              </div>
              <p className="text-sm text-forest/80 font-light italic leading-relaxed mb-6">
                "{rev.comment}"
              </p>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-sage/20">
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-sage/30 shrink-0">
                {rev.avatar ? (
                  <Image src={rev.avatar} alt={rev.guestName} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-bold text-forest text-sm">
                    {rev.guestName[0]}
                  </div>
                )}
              </div>
              <div>
                <p className="text-sm font-bold text-forest">{rev.guestName}</p>
                <p className="text-xs text-forest/60">{rev.guestLocation} · {rev.stayDate}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Review Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-forest/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-3xl max-w-md w-full shadow-luxury space-y-4">
            <h3 className="font-serif text-2xl font-bold text-forest">Submit Your Review</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-forest block mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full bg-cream/40 border border-sage/30 rounded-xl p-3 text-sm outline-none"
                  placeholder="e.g. Priyanshu Dave"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-forest block mb-1">City / Location</label>
                <input
                  type="text"
                  value={guestLocation}
                  onChange={(e) => setGuestLocation(e.target.value)}
                  className="w-full bg-cream/40 border border-sage/30 rounded-xl p-3 text-sm outline-none"
                  placeholder="e.g. Jaipur, Rajasthan"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-forest block mb-1">Rating</label>
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="w-full bg-cream/40 border border-sage/30 rounded-xl p-3 text-sm outline-none"
                >
                  <option value={5}>5 Stars — Exceptional</option>
                  <option value={4}>4 Stars — Very Good</option>
                  <option value={3}>3 Stars — Average</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-forest block mb-1">Your Review Comment *</label>
                <textarea
                  required
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full bg-cream/40 border border-sage/30 rounded-xl p-3 text-sm outline-none"
                  placeholder="Share your stay experience..."
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="w-1/2 border border-forest/20 text-forest text-xs font-semibold py-3 rounded-full"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-1/2 bg-olive text-cream text-xs font-semibold py-3 rounded-full shadow-md"
                >
                  {submitting ? 'Submitting...' : 'Post Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
