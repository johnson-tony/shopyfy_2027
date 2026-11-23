'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { initialOrders } from '@/lib/mockData';

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/orders')
      .then((res) => res.json())
      .then((data) => {
        if (data.orders) setOrders(data.orders);
        else setOrders(initialOrders);
      })
      .catch(() => setOrders(initialOrders))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">My Orders</h1>
          <p className="text-xs text-slate-500">Track and manage past purchases across all shopping modes</p>
        </div>
        <Link href="/" className="text-xs font-bold text-blue-600 hover:underline">
          Shop More
        </Link>
      </div>

      {isLoading ? (
        <div className="py-20 text-center">
          <i className="fa-solid fa-spinner fa-spin text-3xl text-blue-600"></i>
          <p className="text-xs text-slate-400 mt-2">Loading orders...</p>
        </div>
      ) : orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((o) => (
            <div
              key={o._id || o.order_number}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-xs text-slate-900 dark:text-white">
                    {o.order_number}
                  </span>
                  <span className="bg-blue-500/10 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded-full capitalize">
                    {o.mode_slug || 'shopy'}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full uppercase text-[10px] ${
                      o.status === 'delivered'
                        ? 'bg-emerald-500/10 text-emerald-600'
                        : o.status === 'out-for-delivery'
                        ? 'bg-amber-500/10 text-amber-600 animate-pulse'
                        : 'bg-blue-500/10 text-blue-600'
                    }`}
                  >
                    {o.status}
                  </span>
                  <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                    ₹{o.grand_total?.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Items in order */}
              <div className="space-y-2">
                {o.items?.map((item: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between text-xs gap-3">
                    <div className="flex items-center gap-3 truncate">
                      <img
                        src={item.product_image || 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=100&q=80'}
                        alt={item.product_name}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-slate-700 flex-shrink-0"
                      />
                      <div className="truncate">
                        <p className="font-bold text-slate-900 dark:text-white truncate">{item.product_name}</p>
                        <p className="text-[10px] text-slate-400">
                          Qty: {item.quantity} {item.color && `• Color: ${item.color}`} {item.size && `• Size: ${item.size}`}
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-slate-700 dark:text-slate-300 flex-shrink-0">
                      ₹{(item.unit_price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Actions Footer */}
              <div className="flex flex-wrap items-center justify-end gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                <Link
                  href={`/orders/${o.order_number}/track`}
                  className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-md shadow-blue-500/20 transition"
                >
                  <i className="fa-solid fa-location-crosshairs text-[10px]"></i>
                  <span>Track Live</span>
                </Link>
                <Link
                  href="/support/create"
                  className="inline-flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs px-3.5 py-2 rounded-xl transition"
                >
                  <i className="fa-solid fa-headset text-[10px]"></i>
                  <span>Need Help</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center space-y-3">
          <p className="text-xs text-slate-400">No past orders found.</p>
        </div>
      )}
    </div>
  );
}
