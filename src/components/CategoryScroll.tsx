'use client';

import React from 'react';
import { MockCategory } from '@/lib/mockData';

interface CategoryScrollProps {
  categories: MockCategory[];
  activeCategory: string | null;
  onSelectCategory: (slug: string | null) => void;
}

export default function CategoryScroll({
  categories,
  activeCategory,
  onSelectCategory,
}: CategoryScrollProps) {
  return (
    <div className="py-4">
      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
        {/* All Products Tab */}
        <button
          onClick={() => onSelectCategory(null)}
          className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold transition shadow-sm ${
            activeCategory === null
              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 scale-105'
              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-400'
          }`}
        >
          <i className="fa-solid fa-layer-group"></i>
          <span>All Items</span>
        </button>

        {/* Category Items */}
        {categories.map((c) => {
          const isSelected = activeCategory === c.slug;
          return (
            <button
              key={c._id}
              onClick={() => onSelectCategory(c.slug)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold transition shadow-sm ${
                isSelected
                  ? 'bg-blue-600 text-white scale-105'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-blue-400'
              }`}
            >
              <i className={`${c.icon} text-sm`}></i>
              <span>{c.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
