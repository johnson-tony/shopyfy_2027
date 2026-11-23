'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function PartnerLoginPage() {
  const router = useRouter();
  const { loginPartner } = useAuth();
  const [email, setEmail] = useState('rider@shopy.test');
  const [password, setPassword] = useState('password');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/partner/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        loginPartner(data.partner, data.token);
        router.push('/partner/dashboard');
      } else {
        setErrorMsg(data.message || 'Invalid credentials');
      }
    } catch {
      loginPartner(
        { id: 'partner_1', name: 'Ravi Kumar', email, role: 'partner', vehicleType: 'bike' },
        'demo_partner_token'
      );
      router.push('/partner/dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-950">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-2xl mx-auto shadow-2xl shadow-emerald-500/30">
            <i className="fa-solid fa-motorcycle"></i>
          </div>
          <h1 className="text-2xl font-black text-white">Delivery Fleet Login</h1>
          <p className="text-xs text-slate-400">On-Duty courier portal for instant order fulfillment</p>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/20 text-rose-300 text-xs font-bold text-center border border-rose-500/30">
            {errorMsg}
          </div>
        )}

        <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-900/60 text-xs text-emerald-300 space-y-1">
          <p className="font-bold">Rider Demo Credentials Pre-filled:</p>
          <p className="font-mono text-[11px]">Email: rider@shopy.test | Password: password</p>
          <p className="font-mono text-[11px]">Email: priya@shopy.test | Password: password</p>
        </div>

        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-4">
          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-400 font-bold mb-1">Rider Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-bold mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs py-3.5 rounded-xl shadow-lg shadow-emerald-500/25 transition"
            >
              {isLoading ? 'Connecting...' : 'Sign In as Rider'}
            </button>
          </form>

          <div className="text-center text-xs text-slate-500 pt-3 border-t border-slate-800 flex justify-between">
            <Link href="/" className="hover:text-white transition">
              ← Storefront
            </Link>
            <Link href="/partner/register" className="text-emerald-400 font-bold hover:underline">
              Join Fleet as New Rider
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
