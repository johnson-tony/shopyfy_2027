'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setSubscribed(true);
      setEmail('');
    } catch {
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300 mt-auto border-t border-slate-800">
      {/* 1. Trust Badges Row */}
      <div className="border-b border-slate-800/80 py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center text-xl">
              <i className="fa-solid fa-truck-fast"></i>
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Ultra Fast Delivery</h4>
              <p className="text-xs text-slate-400">10-Min Groceries & Same-Day</p>
            </div>
          </div>
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xl">
              <i className="fa-solid fa-shield-halved"></i>
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">100% Secure Checkout</h4>
              <p className="text-xs text-slate-400">UPI, COD, Cards & Netbanking</p>
            </div>
          </div>
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center text-xl">
              <i className="fa-solid fa-arrow-rotate-left"></i>
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Hassle-Free Returns</h4>
              <p className="text-xs text-slate-400">Instant Doorstep Return Pickup</p>
            </div>
          </div>
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center text-xl">
              <i className="fa-solid fa-headset"></i>
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">24/7 Dedicated Support</h4>
              <p className="text-xs text-slate-400">Ticket & Live Rider Tracking</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
              <i className="fa-solid fa-bag-shopping"></i>
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white">
              SHOPY<span className="text-blue-500">2027</span>
            </span>
          </div>
          <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
            The next-generation unified commerce platform combining e-commerce retail shopping, 10-minute instant quick grocery commerce, and top restaurant food ordering into a single fluid application.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a href="#" className="w-8 h-8 rounded-full bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center text-xs transition">
              <i className="fa-brands fa-x-twitter"></i>
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center text-xs transition">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center text-xs transition">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Shopping Modes</h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li><Link href="/?mode=shopy" className="hover:text-white transition">Shopy Retail Store</Link></li>
            <li><Link href="/?mode=food" className="hover:text-white transition">Restaurant Food Delivery</Link></li>
            <li><Link href="/?mode=minutes" className="hover:text-white transition">10-Minute Grocery Delivery</Link></li>
            <li><Link href="/coupons" className="hover:text-white transition">Active Promo Codes</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Portals & Staff</h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li><Link href="/admin/login" className="hover:text-blue-400 transition">Administrator Panel</Link></li>
            <li><Link href="/partner/login" className="hover:text-emerald-400 transition">Delivery Rider Portal</Link></li>
            <li><Link href="/partner/register" className="hover:text-emerald-400 transition">Join Fleet as Rider</Link></li>
            <li><Link href="/support" className="hover:text-white transition">Order Support & Helpdesk</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Stay Updated</h4>
          <p className="text-xs text-slate-400 mb-3">Receive weekly exclusive flash deals and discount coupons.</p>
          {subscribed ? (
            <div className="bg-emerald-500/20 text-emerald-400 text-xs px-3 py-2 rounded-lg font-semibold flex items-center gap-1.5">
              <i className="fa-solid fa-circle-check"></i> Subscribed successfully!
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-2 rounded-lg transition"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      {/* 3. Bottom Credits */}
      <div className="border-t border-slate-900 py-4 px-4 sm:px-6 text-center text-xs text-slate-500">
        <p>© 2027 Shopy Unified Commerce. Next.js 15 + Tailwind CSS + MongoDB edition. All rights reserved.</p>
      </div>
    </footer>
  );
}
