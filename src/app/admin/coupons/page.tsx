'use client';

import React, { useState } from 'react';
import { initialCoupons, MockCoupon } from '@/lib/mockData';

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<MockCoupon[]>(initialCoupons);
  const [code, setCode] = useState('');
  const [value, setValue] = useState(50);
  const [type, setType] = useState<'fixed' | 'percentage' | 'free_delivery'>('fixed');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) return;
    const newCoupon: MockCoupon = {
      _id: 'coup_' + Date.now(),
      code: code.toUpperCase(),
      name: `${code} Promo Code`,
      description: `Instant ${type} discount code`,
      type,
      value,
      min_order_amount: 199,
      status: true,
    };
    setCoupons([...coupons, newCoupon]);
    setCode('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white">Coupons & Promotions</h1>
        <p className="text-xs text-slate-400">Configure promotional vouchers, discount percentages, and free shipping triggers</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form create coupon */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="font-black text-sm text-white">Create New Coupon</h3>
          <form onSubmit={handleAdd} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-400 font-bold mb-1">Coupon Code</label>
              <input
                type="text"
                required
                placeholder="e.g. MEGA100"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono uppercase focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-slate-400 font-bold mb-1">Discount Type</label>
              <select
                value={type}
                onChange={(e: any) => setType(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none"
              >
                <option value="fixed">Fixed Amount (₹)</option>
                <option value="percentage">Percentage (%)</option>
                <option value="free_delivery">Free Delivery (100% off fee)</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-400 font-bold mb-1">Value (₹ or %)</label>
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2.5 rounded-xl shadow-lg transition"
            >
              Add Coupon
            </button>
          </form>
        </div>

        {/* Existing Coupons list */}
        <div className="lg:col-span-8 space-y-3">
          {coupons.map((c) => (
            <div key={c._id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <span className="font-mono font-black text-sm text-blue-400 bg-slate-950 px-3 py-1 rounded-xl">
                  {c.code}
                </span>
                <div>
                  <h4 className="font-bold text-white">{c.name}</h4>
                  <p className="text-[11px] text-slate-400">{c.description}</p>
                </div>
              </div>
              <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
                Active
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
