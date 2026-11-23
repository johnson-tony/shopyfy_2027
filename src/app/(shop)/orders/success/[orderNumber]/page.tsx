'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function OrderSuccessPage() {
  const params = useParams();
  const orderNumber = (params?.orderNumber as string) || 'ORD-2027-1001';

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
      {/* Animated Checkmark Badge */}
      <div className="w-24 h-24 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 mx-auto flex items-center justify-center text-4xl shadow-xl shadow-emerald-600/20 animate-pulse">
        <i className="fa-solid fa-circle-check"></i>
      </div>

      <div className="space-y-2">
        <span className="text-xs font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 px-3 py-1 rounded-full">
          Payment Confirmed
        </span>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">Order Confirmed!</h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Thank you for choosing Shopy. Your order has been placed into our fulfillment pipeline.
        </p>
      </div>

      {/* Order Info Card */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-left space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">Order Number</span>
            <p className="text-sm font-black text-slate-900 dark:text-white font-mono">{orderNumber}</p>
          </div>
          <span className="bg-blue-600/10 text-blue-600 dark:text-blue-400 font-bold text-xs px-2.5 py-1 rounded-lg">
            Preparing Dispatch
          </span>
        </div>

        <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-truck-fast text-emerald-500"></i>
            <span>Estimated Delivery: <strong>Today / In Delivery Window</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-bell text-blue-500"></i>
            <span>Real-time SMS & Email tracking updates activated.</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
        <Link
          href={`/orders/${orderNumber}/track`}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs px-6 py-3.5 rounded-xl shadow-lg shadow-blue-500/25 transition"
        >
          <i className="fa-solid fa-location-crosshairs"></i>
          <span>Track Live Delivery</span>
        </Link>
        <Link
          href="/orders"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs px-6 py-3.5 rounded-xl transition"
        >
          <span>View All Orders</span>
        </Link>
        <Link
          href="/"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-blue-600 font-bold text-xs px-4 py-3.5 hover:underline"
        >
          <span>Continue Shopping</span>
        </Link>
      </div>
    </div>
  );
}
