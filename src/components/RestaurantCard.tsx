'use client';

import React from 'react';
import Link from 'next/link';
import { MockRestaurant } from '@/lib/mockData';

export default function RestaurantCard({ restaurant }: { restaurant: MockRestaurant }) {
  return (
    <div className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* Banner / Food Image */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute bottom-2.5 left-2.5 bg-slate-950/80 backdrop-blur-md text-white px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5">
          <i className="fa-solid fa-clock text-amber-400 text-xs"></i>
          <span>{restaurant.delivery_time}</span>
        </div>
        {restaurant.is_pure_veg && (
          <div className="absolute top-2.5 right-2.5 bg-emerald-600 text-white px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider">
            Pure Veg
          </div>
        )}
      </div>

      {/* Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-orange-500 transition line-clamp-1">
              {restaurant.name}
            </h3>
            <span className="flex-shrink-0 bg-emerald-600 text-white font-black text-xs px-2 py-0.5 rounded flex items-center gap-1">
              <i className="fa-solid fa-star text-[9px]"></i> {restaurant.rating}
            </span>
          </div>

          <p className="text-xs text-slate-500 mt-1 line-clamp-1">{restaurant.cuisine}</p>
          <p className="text-xs text-slate-400 mt-0.5">{restaurant.address}, {restaurant.city}</p>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            ₹{restaurant.cost_for_two} for two
          </span>
          <Link
            href={`/?mode=food&search=${encodeURIComponent(restaurant.name)}`}
            className="text-orange-600 dark:text-orange-400 font-bold hover:underline flex items-center gap-1"
          >
            <span>View Menu</span>
            <i className="fa-solid fa-arrow-right text-[10px]"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}
