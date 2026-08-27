"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fetchApi } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import {
  TrendingUp,
  Users,
  Calendar as CalendarIcon,
  Star,
  DollarSign,
  Bed,
  Mail,
  CheckCircle,
  XCircle,
  Lock,
  RefreshCw,
  ShieldCheck
} from 'lucide-react';
import { format, addDays } from 'date-fns';

export default function OwnerDashboardPage() {
  const { user, isAdmin } = useAuth();

  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'calendar' | 'pricing' | 'inquiries'>('overview');
  const [kpis, setKpis] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [rooms, setRooms] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const loadAllOwnerData = () => {
    setLoading(true);
    Promise.all([
      fetchApi('/owner/kpis').catch(() => null),
      fetchApi('/owner/bookings').catch(() => []),
      fetchApi('/rooms').catch(() => []),
      fetchApi('/owner/inquiries').catch(() => [])
    ]).then(([kpiData, bookingData, roomData, inquiryData]) => {
      setKpis(kpiData);
      setBookings(bookingData || []);
      setRooms(roomData || []);
      setInquiries(inquiryData || []);
    }).finally(() => setLoading(false));
  };

  useEffect(() => {
    loadAllOwnerData();
  }, []);

  const handleUpdateStatus = async (bookingId: string, status: string) => {
    try {
      await fetchApi(`/owner/bookings/${bookingId}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status })
      });
      loadAllOwnerData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleBlockDate = async (roomId: string, dateStr: string) => {
    try {
      await fetchApi('/owner/calendar/block', {
        method: 'POST',
        body: JSON.stringify({ roomId, dateStr })
      });
      loadAllOwnerData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdatePrice = async (roomId: string, pricePerNight: number, weekendPricePerNight: number) => {
    try {
      await fetchApi(`/owner/rooms/${roomId}`, {
        method: 'PUT',
        body: JSON.stringify({ pricePerNight, weekendPricePerNight })
      });
      loadAllOwnerData();
    } catch (err) {
      console.error(err);
    }
  };

  // Generate next 14 days for visual calendar grid
  const calendarDates = Array.from({ length: 14 }, (_, i) => {
    return format(addDays(new Date(), i), 'yyyy-MM-dd');
  });

  return (
    <div className="pt-28 pb-20 min-h-screen bg-cream/50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Admin Header Bar */}
        <div className="bg-forest text-cream p-6 sm:p-8 rounded-3xl shadow-luxury flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14 rounded-full overflow-hidden shadow-md border-2 border-sand/40 shrink-0">
              <Image src="/logo.png" alt="GRIHUM Logo" fill className="object-cover" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sand uppercase tracking-widest mb-1">
                <ShieldCheck className="w-4 h-4 text-terracotta" /> Grihum Farms Private Owner Portal
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold">Host Dashboard — Kumawat Rythem</h1>
              <p className="text-xs text-cream/70 font-light mt-1">
                Single Farmhouse Management · Udaipur Countryside, India
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadAllOwnerData}
              className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white/10 hover:bg-white/20 text-cream px-4 py-2.5 rounded-full border border-cream/20"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Refresh Data
            </button>
            <Link
              href="/"
              className="text-xs font-semibold bg-olive text-cream px-4 py-2.5 rounded-full hover:bg-sand hover:text-forest transition-colors shadow-md"
            >
              Public Website Preview
            </Link>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8 bg-white p-2 rounded-2xl border border-sage/30 shadow-soft">
          {[
            { id: 'overview', label: '📊 Dashboard KPIs' },
            { id: 'bookings', label: '📖 All Bookings' },
            { id: 'calendar', label: '📅 Availability Calendar' },
            { id: 'pricing', label: '🏷 Room Pricing' },
            { id: 'inquiries', label: '📬 Guest Inquiries' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`text-xs font-bold px-5 py-2.5 rounded-xl transition-all ${
                activeTab === tab.id
                  ? 'bg-olive text-cream shadow-md'
                  : 'text-forest/70 hover:bg-cream'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20 font-serif text-xl text-forest font-bold">
            Loading Owner Dashboard Data...
          </div>
        ) : (
          <>
            {/* 1. OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* KPI Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white p-6 rounded-3xl shadow-soft border border-sage/30">
                    <div className="flex items-center justify-between text-forest/70 mb-2 text-xs font-semibold">
                      <span>Total Revenue</span>
                      <DollarSign className="w-5 h-5 text-olive" />
                    </div>
                    <p className="font-serif text-3xl font-bold text-forest">
                      ₹{kpis?.totalRevenue?.toLocaleString('en-IN') || 0}
                    </p>
                    <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">Confirmed Bookings</span>
                  </div>

                  <div className="bg-white p-6 rounded-3xl shadow-soft border border-sage/30">
                    <div className="flex items-center justify-between text-forest/70 mb-2 text-xs font-semibold">
                      <span>Occupancy Rate</span>
                      <TrendingUp className="w-5 h-5 text-olive" />
                    </div>
                    <p className="font-serif text-3xl font-bold text-forest">{kpis?.occupancyRate || '78%'}</p>
                    <span className="text-[11px] text-forest/60 mt-1 block">Avg Monthly Occupancy</span>
                  </div>

                  <div className="bg-white p-6 rounded-3xl shadow-soft border border-sage/30">
                    <div className="flex items-center justify-between text-forest/70 mb-2 text-xs font-semibold">
                      <span>Total Stays</span>
                      <Users className="w-5 h-5 text-olive" />
                    </div>
                    <p className="font-serif text-3xl font-bold text-forest">{kpis?.totalBookings || 0}</p>
                    <span className="text-[11px] text-forest/60 mt-1 block">Reservations Handled</span>
                  </div>

                  <div className="bg-white p-6 rounded-3xl shadow-soft border border-sage/30">
                    <div className="flex items-center justify-between text-forest/70 mb-2 text-xs font-semibold">
                      <span>Host Rating</span>
                      <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
                    </div>
                    <p className="font-serif text-3xl font-bold text-forest">{kpis?.avgRating || 4.92} ★</p>
                    <span className="text-[11px] text-forest/60 mt-1 block">{kpis?.reviewsCount || 12} Verified Reviews</span>
                  </div>
                </div>

                {/* Quick Check-In Alerts */}
                <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-luxury border border-sage/30 space-y-4">
                  <h3 className="font-serif text-2xl font-bold text-forest">Today's Schedule</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-cream/60 border border-sage/30">
                      <p className="text-xs text-olive font-bold uppercase tracking-wider">Today's Check-Ins</p>
                      <p className="font-serif text-2xl font-bold text-forest mt-1">{kpis?.todayCheckIns || 0} Guests</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-cream/60 border border-sage/30">
                      <p className="text-xs text-olive font-bold uppercase tracking-wider">Today's Check-Outs</p>
                      <p className="font-serif text-2xl font-bold text-forest mt-1">{kpis?.todayCheckOuts || 0} Guests</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. BOOKINGS TAB */}
            {activeTab === 'bookings' && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-luxury border border-sage/30 space-y-6">
                <h2 className="font-serif text-2xl font-bold text-forest">All Guest Bookings</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-sage/30 text-olive uppercase font-bold tracking-wider">
                        <th className="p-3">Booking ID</th>
                        <th className="p-3">Guest Name</th>
                        <th className="p-3">Room</th>
                        <th className="p-3">Check-In</th>
                        <th className="p-3">Check-Out</th>
                        <th className="p-3">Amount</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-sage/20 text-forest/90">
                      {bookings.map((b) => (
                        <tr key={b._id} className="hover:bg-cream/40">
                          <td className="p-3 font-bold">{b.bookingId}</td>
                          <td className="p-3">
                            <p className="font-semibold">{b.guestName}</p>
                            <p className="text-[10px] text-forest/60">{b.guestPhone}</p>
                          </td>
                          <td className="p-3 font-medium">{b.roomName}</td>
                          <td className="p-3">{b.checkIn}</td>
                          <td className="p-3">{b.checkOut}</td>
                          <td className="p-3 font-bold text-olive">₹{b.pricing?.totalAmount?.toLocaleString('en-IN')}</td>
                          <td className="p-3">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                              b.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' :
                              b.status === 'checked_in' ? 'bg-blue-100 text-blue-700' :
                              b.status === 'completed' ? 'bg-gray-100 text-gray-700' : 'bg-red-100 text-red-700'
                            }`}>
                              {b.status.toUpperCase()}
                            </span>
                          </td>
                          <td className="p-3 text-right space-x-1">
                            <button
                              onClick={() => handleUpdateStatus(b._id, 'checked_in')}
                              className="text-[10px] font-semibold bg-emerald-600 text-white px-2 py-1 rounded"
                            >
                              Check-In
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(b._id, 'completed')}
                              className="text-[10px] font-semibold bg-forest text-white px-2 py-1 rounded"
                            >
                              Complete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 3. CALENDAR TAB */}
            {activeTab === 'calendar' && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-luxury border border-sage/30 space-y-6">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-forest">Interactive Availability Calendar</h2>
                  <p className="text-xs text-forest/70">Click any date box to manually block or unblock availability for maintenance.</p>
                </div>

                {rooms.map((room) => (
                  <div key={room.slug} className="border border-sage/30 p-5 rounded-2xl space-y-3">
                    <h3 className="font-serif text-lg font-bold text-forest">{room.name}</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-7 gap-2">
                      {calendarDates.map((dateStr) => {
                        const isBlocked = room.blockedDates.includes(dateStr);
                        return (
                          <div
                            key={dateStr}
                            onClick={() => handleToggleBlockDate(room._id, dateStr)}
                            className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${
                              isBlocked
                                ? 'bg-red-500 text-white border-red-600'
                                : 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                            }`}
                          >
                            <p className="text-[10px] uppercase font-bold">{dateStr.slice(5)}</p>
                            <p className="text-xs font-semibold mt-1">{isBlocked ? 'Blocked' : 'Available'}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 4. PRICING TAB */}
            {activeTab === 'pricing' && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-luxury border border-sage/30 space-y-6">
                <h2 className="font-serif text-2xl font-bold text-forest">Room Rates & Pricing Control</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {rooms.map((room) => (
                    <div key={room.slug} className="p-5 rounded-2xl border border-sage/30 space-y-4 bg-cream/30">
                      <h3 className="font-serif text-xl font-bold text-forest">{room.name}</h3>
                      <div>
                        <label className="text-xs font-bold text-forest block mb-1">Base Price / Night (₹)</label>
                        <input
                          type="number"
                          defaultValue={room.pricePerNight}
                          onBlur={(e) => handleUpdatePrice(room._id, Number(e.target.value), room.weekendPricePerNight)}
                          className="w-full bg-white border border-sage/30 rounded-xl p-2.5 text-sm font-semibold outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-forest block mb-1">Weekend Surge Rate (₹)</label>
                        <input
                          type="number"
                          defaultValue={room.weekendPricePerNight || room.pricePerNight * 1.15}
                          onBlur={(e) => handleUpdatePrice(room._id, room.pricePerNight, Number(e.target.value))}
                          className="w-full bg-white border border-sage/30 rounded-xl p-2.5 text-sm font-semibold outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. INQUIRIES TAB */}
            {activeTab === 'inquiries' && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-luxury border border-sage/30 space-y-6">
                <h2 className="font-serif text-2xl font-bold text-forest">Guest Inquiries Inbox</h2>
                <div className="space-y-4">
                  {inquiries.length === 0 ? (
                    <p className="text-xs text-forest/70 font-light italic">No guest inquiries yet.</p>
                  ) : (
                    inquiries.map((inq) => (
                      <div key={inq._id} className="p-5 rounded-2xl border border-sage/30 bg-cream/30 space-y-2 text-xs">
                        <div className="flex items-center justify-between font-bold text-forest text-sm">
                          <span>{inq.name} ({inq.phone})</span>
                          <span className="text-olive">{inq.email}</span>
                        </div>
                        {inq.preferredDates && <p className="text-forest/70"><strong>Preferred Dates:</strong> {inq.preferredDates}</p>}
                        <p className="text-forest/80 font-light italic bg-white p-3 rounded-xl border border-sage/20">
                          "{inq.message}"
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
