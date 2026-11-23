'use client';

import React, { useState } from 'react';

export default function AdminDeliveryPartnersPage() {
  const [partners, setPartners] = useState([
    {
      _id: 'part_1',
      name: 'Ravi Kumar',
      email: 'rider@shopy.test',
      phone: '+91 9876543211',
      vehicle_type: 'bike',
      status: 'active',
      is_available: true,
      deliveries: 852,
    },
    {
      _id: 'part_2',
      name: 'Priya Sharma',
      email: 'priya@shopy.test',
      phone: '+91 9876543212',
      vehicle_type: 'scooter',
      status: 'active',
      is_available: true,
      deliveries: 420,
    },
  ]);

  const toggleAvailability = (id: string) => {
    setPartners(partners.map((p) => (p._id === id ? { ...p, is_available: !p.is_available } : p)));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Delivery Fleet Management</h1>
          <p className="text-xs text-slate-400">Oversee active courier riders, vehicles, and on-duty availability</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg transition">
          <i className="fa-solid fa-user-plus text-xs"></i>
          <span>Onboard Rider</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {partners.map((p) => (
          <div key={p._id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center text-xl font-black">
                  {p.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">{p.name}</h3>
                  <p className="text-xs text-slate-400">{p.phone} • {p.email}</p>
                </div>
              </div>

              <button
                onClick={() => toggleAvailability(p._id)}
                className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase transition ${
                  p.is_available
                    ? 'bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {p.is_available ? 'On Duty' : 'Off Duty'}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 p-3 bg-slate-950 rounded-2xl text-xs">
              <div>
                <span className="text-slate-500 text-[10px] uppercase font-bold block">Vehicle</span>
                <span className="font-bold text-white capitalize">{p.vehicle_type}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] uppercase font-bold block">Completed Deliveries</span>
                <span className="font-bold text-white">{p.deliveries} trips</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
