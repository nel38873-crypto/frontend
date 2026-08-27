"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { fetchApi } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { Lock, Mail, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await fetchApi('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      login(data.token, data.user);
      if (data.user.role === 'admin') {
        router.push('/owner');
      } else {
        router.push('/my-bookings');
      }
    } catch (err: any) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleAdminQuickFill = () => {
    setEmail('admin@grihumfarms.com');
    setPassword('admin123');
  };

  return (
    <div className="pt-32 pb-20 min-h-screen flex items-center justify-center px-4">
      <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-luxury border border-sage/40 max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-olive">Grihum Farms Account</span>
          <h1 className="font-serif text-3xl font-bold text-forest">Sign In</h1>
          <p className="text-xs text-forest/70 font-light">
            Sign in to manage your reservations or access the private owner portal.
          </p>
        </div>

        {/* Quick Admin Fill Helper */}
        <div className="bg-sand/15 p-3 rounded-2xl border border-sand/30 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-forest font-medium">
            <ShieldCheck className="w-4 h-4 text-terracotta" />
            <span>Farmhouse Host Access</span>
          </div>
          <button
            type="button"
            onClick={handleAdminQuickFill}
            className="text-[11px] font-bold text-olive underline hover:text-forest"
          >
            Auto-fill Host Credentials
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-forest uppercase tracking-wider block mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-cream/40 border border-sage/30 rounded-xl p-3 text-sm outline-none focus:border-olive"
              placeholder="e.g. admin@grihumfarms.com"
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
            <Lock className="w-4 h-4" />
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="text-center text-xs text-forest/70 pt-2">
          Don't have an account?{' '}
          <Link href="/register" className="font-semibold text-olive hover:underline">
            Register Guest Account
          </Link>
        </div>
      </div>
    </div>
  );
}
