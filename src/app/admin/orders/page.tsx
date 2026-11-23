'use client';

import React, { useState } from 'react';
import { initialOrders } from '@/lib/mockData';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>(initialOrders);

  const updateStatus = (orderNumber: string, newStatus: string) => {
    setOrders(orders.map((o) => (o.order_number === orderNumber ? { ...o, status: newStatus } : o)));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white">Order Fulfillment & Returns</h1>
        <p className="text-xs text-slate-400">Track shipments, dispatch riders, and process return claims</p>
      </div>

      <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/60 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Order #</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Assigned Fleet</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {orders.map((o) => (
                <tr key={o._id} className="hover:bg-slate-800/40 transition">
                  <td className="px-6 py-4 font-mono font-bold text-white">{o.order_number}</td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-white">{o.user_name}</p>
                    <span className="text-[10px] text-slate-400">{o.user_email}</span>
                  </td>
                  <td className="px-6 py-4 font-extrabold text-white">₹{o.grand_total}</td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-emerald-400 font-bold">{o.delivery_partner?.name || 'Unassigned'}</span>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={o.status}
                      onChange={(e) => updateStatus(o.order_number, e.target.value)}
                      className="bg-slate-950 border border-slate-800 text-xs text-white rounded-xl px-2.5 py-1 focus:outline-none"
                    >
                      <option value="confirmed">Confirmed</option>
                      <option value="processing">Processing</option>
                      <option value="ready-for-delivery">Ready For Delivery</option>
                      <option value="out-for-delivery">Out For Delivery</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-blue-400 hover:underline font-bold">Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
