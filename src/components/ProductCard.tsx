'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MockProduct } from '@/lib/mockData';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

export default function ProductCard({ product }: { product: MockProduct }) {
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const wishlisted = isInWishlist(product._id);

  const price = product.sale_price ?? product.price;
  const originalPrice = product.sale_price ? product.price : null;
  const discountPercent = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <div className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-500/30 transition-all duration-300 flex flex-col overflow-hidden">
      {/* Top badges */}
      <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 items-start">
        {discountPercent > 0 && (
          <span className="bg-emerald-600 text-white font-black text-[10px] px-2 py-0.5 rounded-full shadow-sm">
            {discountPercent}% OFF
          </span>
        )}
        {product.is_featured && (
          <span className="bg-blue-600 text-white font-bold text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
            Featured
          </span>
        )}
      </div>

      {/* Wishlist toggle button */}
      <button
        onClick={() => toggleWishlist(product)}
        aria-label="Wishlist"
        className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full flex items-center justify-center transition shadow-md ${
          wishlisted
            ? 'bg-rose-500 text-white scale-110'
            : 'bg-white/90 dark:bg-slate-800/90 text-slate-500 hover:text-rose-500 hover:bg-white'
        }`}
      >
        <i className={`fa-${wishlisted ? 'solid' : 'regular'} fa-heart text-xs`}></i>
      </button>

      {/* Image Container */}
      <Link href={`/product/${product.slug}`} className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {product.mode_slug === 'minutes' && (
          <div className="absolute bottom-2 left-2 bg-emerald-600/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
            <i className="fa-solid fa-bolt text-[9px]"></i> 10 MINS
          </div>
        )}
      </Link>

      {/* Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Restaurant or Brand name */}
          {product.restaurant_name && (
            <span className="text-[11px] font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider block mb-1">
              {product.restaurant_name}
            </span>
          )}

          <Link href={`/product/${product.slug}`} className="block">
            <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white line-clamp-2 group-hover:text-blue-600 transition">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-1.5">
            <span className="inline-flex items-center gap-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-black px-1.5 py-0.5 rounded">
              <i className="fa-solid fa-star text-[9px]"></i> {product.rating || 4.8}
            </span>
            <span className="text-[10px] text-slate-400">({product.ratings_count || 120})</span>
          </div>
        </div>

        {/* Price & Action Button */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                ₹{price.toLocaleString('en-IN')}
              </span>
              {originalPrice && (
                <span className="text-xs text-slate-400 line-through">
                  ₹{originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <span className="text-[10px] text-emerald-600 font-semibold block">
              In Stock ({product.stock})
            </span>
          </div>

          <button
            onClick={() => addItem(product)}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs px-3 py-2 rounded-xl shadow-md shadow-blue-500/20 transition"
          >
            <i className="fa-solid fa-plus text-[10px]"></i>
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
