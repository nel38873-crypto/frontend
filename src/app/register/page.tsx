"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { fetchApi } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { User, Mail, Phone, Lock } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await fetchApi('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, phone, password })
      });
      login(data.token, data.user);
      router.push('/my-bookings');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-20 min-h-screen flex items-center justify-center px-4">
      <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-luxury border border-sage/40 max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-olive">Grihum Farms Account</span>
          <h1 className="font-serif text-3xl font-bold text-forest">Create Guest Account</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-forest uppercase tracking-wider block mb-1">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-cream/40 border border-sage/30 rounded-xl p-3 text-sm outline-none focus:border-olive"
              placeholder="e.g. Vikram Mehta"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-forest uppercase tracking-wider block mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-cream/40 border border-sage/30 rounded-xl p-3 text-sm outline-none focus:border-olive"
              placeholder="e.g. vikram@example.com"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-forest uppercase tracking-wider block mb-1">Phone Number</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-cream/40 border border-sage/30 rounded-xl p-3 text-sm outline-none focus:border-olive"
              placeholder="+91 98765 43210"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-forest uppercase tracking-wider block mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-cream/40 border border-sage/30 rounded-xl p-3 text-sm outline-none focus:border-olive"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-xs text-terracotta font-semibold text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-olive hover:bg-forest text-cream font-semibold py-3.5 rounded-full shadow-md transition-all text-sm flex items-center justify-center gap-2"
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <div className="text-center text-xs text-forest/70 pt-2">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-olive hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
