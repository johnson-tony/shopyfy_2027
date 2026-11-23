'use client';

import React, { useState } from 'react';
import { initialCategories, MockCategory } from '@/lib/mockData';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<MockCategory[]>(initialCategories);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Categories Management</h1>
          <p className="text-xs text-slate-400">Organize catalog hierarchy and icons for all modes</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-blue-500/20 transition">
          <i className="fa-solid fa-plus text-xs"></i>
          <span>Create Category</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((c) => (
          <div key={c._id} className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center text-lg">
                <i className={c.icon}></i>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full">
                {c.mode_slug}
              </span>
            </div>

            <h3 className="font-extrabold text-sm text-white">{c.name}</h3>
            <p className="text-xs text-slate-400 line-clamp-2">{c.description}</p>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-emerald-400 font-semibold text-[11px]">Active</span>
              <button className="text-blue-400 hover:underline font-bold text-xs">Edit Category</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
