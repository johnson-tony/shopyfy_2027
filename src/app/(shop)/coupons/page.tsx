'use client';

import React, { useState, useEffect } from 'react';
import { initialCoupons, MockCoupon } from '@/lib/mockData';

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<MockCoupon[]>([]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/coupons')
      .then((res) => res.json())
      .then((data) => {
        if (data.coupons) setCoupons(data.coupons);
        else setCoupons(initialCoupons);
      })
      .catch(() => setCoupons(initialCoupons));
  }, []);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Discounts & Promo Codes</h1>
        <p className="text-xs text-slate-500">Apply any active coupon code in your cart for immediate savings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {coupons.map((c) => (
          <div
            key={c._id}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border-2 border-dashed border-blue-400 dark:border-blue-700 shadow-sm flex flex-col justify-between space-y-4 relative overflow-hidden"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded-full">
                  {c.type === 'free_delivery' ? 'Zero Delivery Fee' : `${c.value}${c.type === 'percentage' ? '% OFF' : ' FLAT OFF'}`}
                </span>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white mt-1.5">{c.name}</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{c.description}</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-amber-400/10 text-amber-500 flex items-center justify-center text-xl flex-shrink-0">
                <i className="fa-solid fa-gift"></i>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="font-mono font-black text-sm text-slate-900 dark:text-white tracking-widest bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl">
                {c.code}
              </span>

              <button
                onClick={() => handleCopy(c.code)}
                className={`flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl transition ${
                  copiedCode === c.code
                    ? 'bg-emerald-600 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20'
                }`}
              >
                <i className={`fa-solid ${copiedCode === c.code ? 'fa-check' : 'fa-copy'} text-xs`}></i>
                <span>{copiedCode === c.code ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
