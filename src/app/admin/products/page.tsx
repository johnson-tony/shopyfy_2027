'use client';

import React, { useState } from 'react';
import { initialProducts, MockProduct } from '@/lib/mockData';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<MockProduct[]>(initialProducts);
  const [search, setSearch] = useState('');
  const [filterMode, setFilterMode] = useState('all');

  const filtered = products.filter((p) => {
    const matchMode = filterMode === 'all' || p.mode_slug === filterMode;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchMode && matchSearch;
  });

  const toggleStatus = (id: string) => {
    setProducts(products.map((p) => (p._id === id ? { ...p, status: !p.status } : p)));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Product Catalog</h1>
          <p className="text-xs text-slate-400">Manage all items, prices, inventory, and mode categories</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-blue-500/20 transition">
          <i className="fa-solid fa-plus text-xs"></i>
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
        <div className="relative flex-1 w-full">
          <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs"></i>
          <input
            type="text"
            placeholder="Search products by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-slate-400 font-bold">Mode:</span>
          <select
            value={filterMode}
            onChange={(e) => setFilterMode(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="all">All Modes</option>
            <option value="shopy">Shopy (Retail)</option>
            <option value="food">Food Delivery</option>
            <option value="minutes">10-Min Groceries</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/60 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Product Details</th>
                <th className="px-6 py-4">Mode</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filtered.map((p) => (
                <tr key={p._id} className="hover:bg-slate-800/40 transition">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img src={p.image} alt={p.name} className="w-12 h-12 rounded-xl object-cover border border-slate-800 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-white max-w-xs truncate">{p.name}</p>
                      <span className="text-[10px] text-slate-400 font-mono">SKU: {p.sku}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-slate-800 text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                      {p.mode_slug}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-white">
                    ₹{(p.sale_price ?? p.price).toLocaleString('en-IN')}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`font-bold ${p.stock < 20 ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {p.stock} units
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleStatus(p._id)}
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                        p.status ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                      }`}
                    >
                      {p.status ? 'Active' : 'Disabled'}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-white transition">
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
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
