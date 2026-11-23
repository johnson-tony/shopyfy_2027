'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function PartnerDashboardPage() {
  const [isOnDuty, setIsOnDuty] = useState(true);
  const [activeTab, setActiveTab] = useState<'deliveries' | 'returns'>('deliveries');

  const [orders, setOrders] = useState([
    {
      id: 'ord_1',
      order_number: 'ORD-2027-1001',
      customer_name: 'Alice Customer',
      customer_phone: '+91 9876543210',
      address: 'Flat 402, Green Valley Apartments, 12th Main Road, Indiranagar, Chennai',
      items_count: 1,
      total_amount: 1354,
      payment_type: 'COD (Collect ₹1354)',
      status: 'out-for-delivery',
      delivered: false,
    },
  ]);

  const [proofNote, setProofNote] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const handleDeliver = (orderId: string) => {
    setOrders(orders.map((o) => (o.id === orderId ? { ...o, status: 'delivered', delivered: true } : o)));
    setSelectedOrder(null);
    setProofNote('');
  };

  return (
    <div className="space-y-6">
      {/* On-Duty Status Card */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black text-white ${
              isOnDuty ? 'bg-emerald-600 shadow-lg shadow-emerald-500/25 ring-4 ring-emerald-500/20' : 'bg-slate-800'
            }`}
          >
            <i className={`fa-solid ${isOnDuty ? 'fa-bolt' : 'fa-power-off'}`}></i>
          </div>
          <div>
            <h2 className="text-lg font-black text-white">Rider Shift: {isOnDuty ? 'ON DUTY' : 'OFF DUTY'}</h2>
            <p className="text-xs text-slate-400">
              {isOnDuty ? 'Receiving real-time orders in Chennai Guindy & Central zones' : 'Shift paused. Switch to ON DUTY to accept delivery orders.'}
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsOnDuty(!isOnDuty)}
          className={`px-6 py-3 rounded-2xl font-extrabold text-xs transition shadow-lg ${
            isOnDuty
              ? 'bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 border border-rose-500/30'
              : 'bg-emerald-600 hover:bg-emerald-500 text-white'
          }`}
        >
          {isOnDuty ? 'Pause Shift (Go Off Duty)' : 'Start Shift (Go On Duty)'}
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center">
          <span className="text-[10px] uppercase font-bold text-slate-400">Today's Earnings</span>
          <p className="text-xl font-black text-emerald-400 mt-1">₹1,240</p>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center">
          <span className="text-[10px] uppercase font-bold text-slate-400">Completed Trips</span>
          <p className="text-xl font-black text-white mt-1">14</p>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center">
          <span className="text-[10px] uppercase font-bold text-slate-400">Customer Rating</span>
          <p className="text-xl font-black text-amber-400 mt-1">★ 4.9</p>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center">
          <span className="text-[10px] uppercase font-bold text-slate-400">On-Time Rate</span>
          <p className="text-xl font-black text-blue-400 mt-1">98.5%</p>
        </div>
      </div>

      {/* Assigned Orders Queue */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('deliveries')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === 'deliveries'
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Assigned Deliveries ({orders.filter((o) => !o.delivered).length})
            </button>
            <button
              onClick={() => setActiveTab('returns')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === 'returns'
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Return Pickups (0)
            </button>
          </div>
        </div>

        {orders.map((o) => (
          <div
            key={o.id}
            className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-sm space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="font-mono text-xs font-black text-white">{o.order_number}</span>
                <span className="ml-2 bg-amber-500/10 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  {o.status}
                </span>
              </div>
              <span className="text-xs font-black text-emerald-400">{o.payment_type}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-slate-500 text-[10px] uppercase font-bold block">Customer & Contact</span>
                <p className="font-bold text-white text-sm">{o.customer_name}</p>
                <a href={`tel:${o.customer_phone}`} className="text-emerald-400 font-bold hover:underline flex items-center gap-1.5 pt-1">
                  <i className="fa-solid fa-phone text-xs"></i>
                  <span>{o.customer_phone}</span>
                </a>
              </div>

              <div className="space-y-1">
                <span className="text-slate-500 text-[10px] uppercase font-bold block">Delivery Location</span>
                <p className="text-slate-300 leading-relaxed">{o.address}</p>
              </div>
            </div>

            {/* Proof of delivery action */}
            {selectedOrder === o.id ? (
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 pt-3">
                <h4 className="font-bold text-xs text-white">Proof of Delivery (POD)</h4>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Delivery Notes / Handover confirmation:</label>
                  <input
                    type="text"
                    placeholder="Handed over to customer / security guard"
                    value={proofNote}
                    onChange={(e) => setProofNote(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleDeliver(o.id)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2 rounded-xl transition"
                  >
                    Confirm Doorstep Delivery
                  </button>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : o.delivered ? (
              <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl text-xs font-bold flex items-center gap-2">
                <i className="fa-solid fa-check"></i>
                <span>Order successfully completed & delivered!</span>
              </div>
            ) : (
              <div className="pt-2 flex items-center justify-end gap-3">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(o.address)}`}
                  target="_blank"
                  className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition"
                >
                  <i className="fa-solid fa-diamond-turn-right text-xs"></i>
                  <span>Open Navigation</span>
                </a>
                <button
                  onClick={() => setSelectedOrder(o.id)}
                  className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg transition"
                >
                  <i className="fa-solid fa-camera text-xs"></i>
                  <span>Mark as Delivered</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
