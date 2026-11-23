'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>({
    totalRevenue: 284500,
    totalOrders: 142,
    activeCustomers: 89,
    activeRiders: 12,
    modeDistribution: [
      { mode: 'Shopy (Retail)', revenue: 168000, percentage: 59 },
      { mode: 'Food Delivery', revenue: 74500, percentage: 26 },
      { mode: 'Minutes (Quick)', revenue: 42000, percentage: 15 },
    ],
    recentOrders: [
      { order_number: 'ORD-2027-1001', customer: 'Alice Customer', total: 1354, status: 'out-for-delivery', date: 'Just now' },
      { order_number: 'ORD-2027-0998', customer: 'Rohan Mehta', total: 420, status: 'delivered', date: '2 hours ago' },
      { order_number: 'ORD-2027-0995', customer: 'Deepak Roy', total: 26990, status: 'processing', date: '5 hours ago' },
    ],
  });

  useEffect(() => {
    fetch('/api/admin/dashboard')
      .then((res) => res.json())
      .then((data) => {
        if (data.stats) setStats(data.stats);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-white">Platform Analytics</h1>
        <p className="text-xs text-slate-400">Live operational overview of revenue, orders, and delivery fleet</p>
      </div>

      {/* 1. Metric Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-blue-500">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Gross Revenue</span>
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-lg">
              <i className="fa-solid fa-indian-rupee-sign"></i>
            </div>
          </div>
          <h3 className="text-2xl font-black text-white">₹{stats.totalRevenue.toLocaleString('en-IN')}</h3>
          <p className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
            <i className="fa-solid fa-arrow-trend-up"></i> +14.2% from last week
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-emerald-500">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Orders</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-lg">
              <i className="fa-solid fa-truck-ramp-box"></i>
            </div>
          </div>
          <h3 className="text-2xl font-black text-white">{stats.totalOrders}</h3>
          <p className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
            <i className="fa-solid fa-arrow-trend-up"></i> +8.5% new volume
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-purple-500">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Active Customers</span>
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-lg">
              <i className="fa-solid fa-users"></i>
            </div>
          </div>
          <h3 className="text-2xl font-black text-white">{stats.activeCustomers}</h3>
          <p className="text-[11px] text-purple-400 font-semibold">92% retention rate</p>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-amber-500">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Riders On-Duty</span>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-lg">
              <i className="fa-solid fa-motorcycle"></i>
            </div>
          </div>
          <h3 className="text-2xl font-black text-white">{stats.activeRiders} Riders</h3>
          <p className="text-[11px] text-emerald-400 font-semibold">All zones covered</p>
        </div>
      </div>

      {/* 2. Mode-Wise Revenue & Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Mode Distribution */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-sm space-y-4">
          <h3 className="font-extrabold text-sm text-white">Mode Revenue Distribution</h3>
          <p className="text-xs text-slate-400">Share of volume between general retail, food, and 10-min groceries</p>

          <div className="space-y-4 pt-2">
            {stats.modeDistribution.map((m: any, i: number) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-300">{m.mode}</span>
                  <span className="text-white">₹{m.revenue.toLocaleString('en-IN')} ({m.percentage}%)</span>
                </div>
                <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      i === 0 ? 'bg-blue-600' : i === 1 ? 'bg-orange-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${m.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders List */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-white">Recent Orders Feed</h3>
            <Link href="/admin/orders" className="text-xs text-blue-400 hover:underline font-bold">
              Manage All Orders →
            </Link>
          </div>

          <div className="divide-y divide-slate-800">
            {stats.recentOrders.map((ord: any, idx: number) => (
              <div key={idx} className="py-3 flex items-center justify-between text-xs gap-3">
                <div>
                  <span className="font-mono font-bold text-white block">{ord.order_number}</span>
                  <span className="text-slate-400 text-[11px]">{ord.customer} • {ord.date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                      ord.status === 'delivered'
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : ord.status === 'out-for-delivery'
                        ? 'bg-amber-500/10 text-amber-400'
                        : 'bg-blue-500/10 text-blue-400'
                    }`}
                  >
                    {ord.status}
                  </span>
                  <span className="font-extrabold text-white">₹{ord.total}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
