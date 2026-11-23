'use client';

import React, { useState } from 'react';
import { initialRestaurants, MockRestaurant } from '@/lib/mockData';

export default function AdminRestaurantsPage() {
  const [restaurants, setRestaurants] = useState<MockRestaurant[]>(initialRestaurants);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Food Mode Restaurant Partners</h1>
          <p className="text-xs text-slate-400">Manage dining brands, menus, cuisines, and delivery coverage</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg transition">
          <i className="fa-solid fa-plus text-xs"></i>
          <span>Add Restaurant Partner</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {restaurants.map((r) => (
          <div key={r._id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={r.image}
                  alt={r.name}
                  className="w-14 h-14 rounded-2xl object-cover border border-slate-700"
                />
                <div>
                  <h3 className="font-extrabold text-sm text-white">{r.name}</h3>
                  <p className="text-xs text-slate-400">{r.cuisine}</p>
                </div>
              </div>
              <span className="bg-emerald-500/10 text-emerald-400 text-xs font-black px-2 py-0.5 rounded">
                ★ {r.rating}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 p-3 bg-slate-950 rounded-2xl text-[11px] text-slate-400">
              <div>
                <span className="text-slate-500 text-[10px] uppercase font-bold block">Delivery</span>
                <span className="font-bold text-white">{r.delivery_time}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] uppercase font-bold block">Cost For 2</span>
                <span className="font-bold text-white">₹{r.cost_for_two}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] uppercase font-bold block">Type</span>
                <span className={`font-bold ${r.is_pure_veg ? 'text-emerald-400' : 'text-slate-300'}`}>
                  {r.is_pure_veg ? 'Pure Veg' : 'Non-Veg / Multi'}
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">{r.address}, {r.city}</span>
              <button className="text-orange-400 hover:underline font-bold">Edit Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
