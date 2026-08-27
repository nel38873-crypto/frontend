import React from 'react';

export default function TermsPage() {
  return (
    <div className="pt-28 pb-20 max-w-4xl mx-auto px-4 text-forest leading-relaxed">
      <h1 className="font-serif text-4xl font-bold mb-6">Terms & Conditions</h1>
      <p className="text-xs text-olive font-semibold mb-8">Effective Date: January 1, 2026</p>

      <div className="space-y-6 text-sm font-light text-forest/80">
        <p>Welcome to Grihum Farms! By accessing or making a booking reservation on this website, you agree to comply with and be bound by the following terms and conditions.</p>

        <h2 className="font-serif text-xl font-bold text-forest pt-4">1. Single Farmhouse Policy</h2>
        <p>Grihum Farms is an exclusive single-property farmhouse retreat located in Udaipur, India. Bookings apply solely to the selected suite or entire farmhouse villa at Grihum Farms.</p>

        <h2 className="font-serif text-xl font-bold text-forest pt-4">2. Check-In & House Rules</h2>
        <p>Standard check-in begins at 2:00 PM and check-out is by 11:00 AM. Guests are kindly requested to respect the natural surroundings, quiet hours after 10:00 PM, and treat property grounds with care.</p>

        <h2 className="font-serif text-xl font-bold text-forest pt-4">3. Cancellation & Refunds</h2>
        <p>Flexible rate bookings permit free cancellation up to 48 hours prior to check-in. Non-refundable promotional rates are non-refundable once payment is completed.</p>
      </div>
    </div>
  );
}
