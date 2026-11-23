'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function OrderTrackPage() {
  const params = useParams();
  const orderNumber = (params?.orderNumber as string) || 'ORD-2027-1001';

  const [order, setOrder] = useState<any>(null);
  const [partnerCoords, setPartnerCoords] = useState<{ lat: number; lng: number }>({
    lat: 13.08268,
    lng: 80.270718,
  });

  useEffect(() => {
    fetch(`/api/orders/${orderNumber}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.order) setOrder(data.order);
      })
      .catch(() => {});
  }, [orderNumber]);

  const stages = [
    { title: 'Order Confirmed', time: '10:00 AM', done: true, icon: 'fa-check' },
    { title: 'Processing & Packed', time: '10:10 AM', done: true, icon: 'fa-box' },
    { title: 'Assigned to Rider', time: '10:15 AM', done: true, icon: 'fa-motorcycle' },
    { title: 'Out for Delivery', time: '10:20 AM', done: true, active: true, icon: 'fa-truck-fast' },
    { title: 'Delivered', time: 'Estimated 10:35 AM', done: false, icon: 'fa-house-circle-check' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <span className="text-[10px] font-mono text-blue-600 uppercase font-black">Live GPS Dispatch</span>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Tracking: {orderNumber}</h1>
          <p className="text-xs text-slate-500">Fast doorstep courier delivery in progress</p>
        </div>
        <Link
          href="/orders"
          className="text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 flex items-center gap-1.5"
        >
          <i className="fa-solid fa-arrow-left"></i>
          <span>Back to Orders</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Interactive Map Simulator & Timeline */}
        <div className="lg:col-span-8 space-y-6">
          {/* Simulated Live GPS Map View */}
          <div className="relative h-80 w-full rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-xl flex items-center justify-center">
            {/* Map Background visual */}
            <div
              className="absolute inset-0 opacity-40 bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80')`,
              }}
            ></div>

            {/* Rider Pin */}
            <div className="relative z-10 flex flex-col items-center animate-bounce">
              <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-2xl ring-4 ring-emerald-400/40">
                <i className="fa-solid fa-motorcycle text-lg"></i>
              </div>
              <span className="bg-slate-950/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 border border-emerald-500">
                Rider: Ravi Kumar (2.1 km away)
              </span>
            </div>

            {/* Destination Pin */}
            <div className="absolute top-8 right-8 z-10 flex flex-col items-center">
              <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg">
                <i className="fa-solid fa-house text-xs"></i>
              </div>
              <span className="bg-slate-950/90 text-white text-[9px] font-bold px-2 py-0.5 rounded-full mt-1">
                Your Address
              </span>
            </div>

            {/* Live Status Overlay */}
            <div className="absolute bottom-4 left-4 right-4 bg-slate-950/80 backdrop-blur-md border border-slate-800 p-3 rounded-2xl flex items-center justify-between text-white text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                <span className="font-bold">Live GPS Signal Active</span>
              </div>
              <span className="text-slate-400 font-mono text-[11px]">Lat: {partnerCoords.lat}, Lng: {partnerCoords.lng}</span>
            </div>
          </div>

          {/* Fulfillment Stages Timeline */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <h3 className="font-black text-sm text-slate-900 dark:text-white">Fulfillment Status</h3>
            <div className="space-y-4">
              {stages.map((st, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                      st.active
                        ? 'bg-blue-600 text-white ring-4 ring-blue-500/20'
                        : st.done
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                    }`}
                  >
                    <i className={`fa-solid ${st.icon}`}></i>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-xs text-slate-900 dark:text-white">{st.title}</h4>
                      <span className="text-[10px] font-mono text-slate-400">{st.time}</span>
                    </div>
                    {st.active && (
                      <p className="text-[11px] text-blue-600 font-semibold mt-0.5">
                        Rider is en route to your shipping address.
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Assigned Rider Card & Customer Help */}
        <div className="lg:col-span-4 space-y-6">
          {/* Delivery Partner Card */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-xs uppercase font-extrabold text-slate-400">Assigned Delivery Fleet</h3>
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center text-2xl font-black shadow-lg">
                R
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">Ravi Kumar</h4>
                <p className="text-[11px] text-slate-500">Verified Partner • Hero Splendor (Bike)</p>
                <div className="flex items-center gap-1 text-amber-500 text-xs mt-0.5">
                  <i className="fa-solid fa-star text-[10px]"></i>
                  <span className="font-black">4.9</span>
                  <span className="text-slate-400 text-[10px]">(850+ deliveries)</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="tel:+919876543210"
                className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 rounded-xl transition"
              >
                <i className="fa-solid fa-phone"></i>
                <span>Call Rider</span>
              </a>
              <Link
                href="/support/create"
                className="flex-1 flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs py-2.5 rounded-xl transition"
              >
                <i className="fa-solid fa-headset"></i>
                <span>Helpdesk</span>
              </Link>
            </div>
          </div>

          {/* Shipping Address Summary */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2 text-xs">
            <h3 className="text-xs uppercase font-extrabold text-slate-400">Delivery Destination</h3>
            <p className="font-bold text-slate-900 dark:text-white">Alice Customer</p>
            <p className="text-slate-500">Flat 402, Green Valley Apartments, 12th Main Road, Indiranagar, Chennai - 600001</p>
            <p className="text-slate-400 text-[11px]">Phone: +91 9876543210</p>
          </div>
        </div>
      </div>
    </div>
  );
}
