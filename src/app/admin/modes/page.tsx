'use client';

import React, { useState } from 'react';
import { initialModes, MockMode } from '@/lib/mockData';

export default function AdminModesPage() {
  const [modes, setModes] = useState<MockMode[]>(initialModes);

  const toggleStatus = (id: string) => {
    setModes(modes.map((m) => (m._id === id ? { ...m, status: !m.status } : m)));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Shopping Modes Architecture</h1>
          <p className="text-xs text-slate-400">Toggle business verticals (General Retail, Food, 10-Min Groceries)</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {modes.map((m) => (
          <div key={m._id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center text-xl">
                <i className={m.icon}></i>
              </div>
              <button
                onClick={() => toggleStatus(m._id)}
                className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase transition ${
                  m.status ? 'bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500' : 'bg-rose-500/10 text-rose-400'
                }`}
              >
                {m.status ? 'Enabled' : 'Disabled'}
              </button>
            </div>

            <div>
              <h3 className="font-extrabold text-base text-white">{m.name}</h3>
              <span className="font-mono text-xs text-slate-500">Slug: {m.slug}</span>
              <p className="text-xs text-slate-400 mt-2">{m.description}</p>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Sort Priority: #{m.sort_order}</span>
              <span className="text-blue-400 font-bold">System Default</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
