"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageLightboxProps {
  images: string[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export default function ImageLightbox({ images, initialIndex = 0, isOpen, onClose, title }: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  if (!isOpen || images.length === 0) return null;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="fixed inset-0 z-50 bg-forest/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8 text-cream animate-fade-in">
      {/* Top Header */}
      <div className="flex items-center justify-between z-10">
        <div>
          <h3 className="font-serif text-lg sm:text-xl font-semibold text-sand">{title || 'Grihum Farms Gallery'}</h3>
          <p className="text-xs text-cream/70">Image {currentIndex + 1} of {images.length}</p>
        </div>
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-cream/10 hover:bg-cream/20 flex items-center justify-center transition-colors text-cream"
          aria-label="Close Lightbox"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Image View */}
      <div className="relative flex-grow flex items-center justify-center my-4 overflow-hidden">
        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-6 z-20 w-12 h-12 rounded-full bg-forest/60 hover:bg-olive text-cream flex items-center justify-center transition-all border border-cream/20"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-6 z-20 w-12 h-12 rounded-full bg-forest/60 hover:bg-olive text-cream flex items-center justify-center transition-all border border-cream/20"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        <div className="relative w-full h-full max-h-[75vh] max-w-5xl">
          <Image
            src={images[currentIndex]}
            alt={`Gallery photo ${currentIndex + 1}`}
            fill
            className="object-contain transition-all duration-300 rounded-xl"
            priority
          />
        </div>
      </div>

      {/* Bottom Thumbnail Strip */}
      {images.length > 1 && (
        <div className="flex items-center justify-center gap-2 overflow-x-auto py-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative w-16 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                idx === currentIndex ? 'border-sand scale-105 opacity-100' : 'border-transparent opacity-50 hover:opacity-80'
              }`}
            >
              <Image src={img} alt={`Thumb ${idx}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
