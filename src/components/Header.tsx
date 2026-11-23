'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';

export default function Header() {
  const router = useRouter();
  const { totalQuantity, activeMode, setActiveMode } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { user, logoutUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const modes = [
    { slug: 'shopy', name: 'Shopy Store', icon: 'fa-bag-shopping', color: 'bg-blue-600 text-white' },
    { slug: 'food', name: 'Food Delivery', icon: 'fa-utensils', color: 'bg-orange-500 text-white' },
    { slug: 'minutes', name: '10-Min Groceries', icon: 'fa-bolt', color: 'bg-emerald-600 text-white' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      {/* 1. Announcement Bar */}
      <div className="bg-slate-950 text-slate-300 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full font-semibold">
              <i className="fa-solid fa-bolt text-[10px]"></i> SUPER SALE
            </span>
            <span>Get Flat ₹50 OFF with coupon <strong className="text-amber-400">WELCOME50</strong></span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-slate-400">
            <Link href="/support" className="hover:text-white transition">24x7 Help Center</Link>
            <span>•</span>
            <Link href="/coupons" className="hover:text-white transition">Offers & Coupons</Link>
            <span>•</span>
            <Link href="/partner/dashboard" className="text-emerald-400 hover:text-emerald-300 font-semibold transition">Rider Portal</Link>
            <span>•</span>
            <Link href="/admin/dashboard" className="text-blue-400 hover:text-blue-300 font-semibold transition">Admin Panel</Link>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo & Shopping Modes */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/25 group-hover:scale-105 transition">
              <i className="fa-solid fa-bag-shopping text-lg"></i>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
                SHOPY<span className="text-blue-600">2027</span>
              </span>
              <span className="text-[10px] font-medium text-slate-500 uppercase tracking-widest">
                Unified Commerce
              </span>
            </div>
          </Link>

          {/* Mode Switcher Tabs (Desktop) */}
          <div className="hidden md:flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
            {modes.map((m) => {
              const isActive = activeMode === m.slug;
              return (
                <button
                  key={m.slug}
                  onClick={() => setActiveMode(m.slug)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? `${m.color} shadow-sm font-bold scale-[1.02]`
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <i className={`fa-solid ${m.icon} text-xs`}></i>
                  {m.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="hidden lg:flex flex-1 max-w-md mx-4">
          <form onSubmit={handleSearch} className="relative w-full">
            <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
            <input
              type="text"
              placeholder={`Search ${activeMode === 'food' ? 'restaurants & dishes...' : activeMode === 'minutes' ? '10-minute groceries...' : 'over 10,000+ items...'}`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-900 transition"
            />
          </form>
        </div>

        {/* Action Badges & User Menu */}
        <div className="flex items-center gap-3">
          {/* Dark / Light Mode Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 transition"
          >
            <i className={`fa-solid ${theme === 'dark' ? 'fa-sun text-amber-400' : 'fa-moon text-blue-600'} text-sm`}></i>
          </button>

          {/* Wishlist Button */}
          <Link
            href="/wishlist"
            className="relative w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 transition"
          >
            <i className="fa-regular fa-heart text-sm"></i>
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart Button */}
          <Link
            href="/cart"
            className="relative flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400 px-3.5 py-2 rounded-full font-bold text-xs transition"
          >
            <i className="fa-solid fa-cart-shopping text-sm"></i>
            <span className="hidden sm:inline">Cart</span>
            {totalQuantity > 0 && (
              <span className="bg-blue-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full">
                {totalQuantity}
              </span>
            )}
          </Link>

          {/* User Account Dropdown */}
          <div className="relative">
            {user ? (
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:inline text-xs font-semibold text-slate-700 dark:text-slate-300 max-w-[100px] truncate">
                  {user.name}
                </span>
                <i className="fa-solid fa-chevron-down text-[10px] text-slate-400"></i>
              </button>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2 rounded-full font-bold text-xs hover:opacity-90 transition"
              >
                <i className="fa-solid fa-user text-xs"></i>
                <span>Sign In</span>
              </Link>
            )}

            {/* Dropdown Menu */}
            {user && userDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl py-2 z-50">
                <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-700">
                  <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{user.name}</p>
                  <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
                </div>
                <Link
                  href="/profile"
                  onClick={() => setUserDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition"
                >
                  <i className="fa-regular fa-user text-slate-400"></i> My Profile
                </Link>
                <Link
                  href="/orders"
                  onClick={() => setUserDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition"
                >
                  <i className="fa-solid fa-box text-slate-400"></i> My Orders
                </Link>
                <Link
                  href="/wishlist"
                  onClick={() => setUserDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition"
                >
                  <i className="fa-regular fa-heart text-slate-400"></i> Wishlist
                </Link>
                <Link
                  href="/support"
                  onClick={() => setUserDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition"
                >
                  <i className="fa-solid fa-headset text-slate-400"></i> Help & Support
                </Link>
                <div className="border-t border-slate-100 dark:border-slate-700 my-1"></div>
                <button
                  onClick={() => {
                    setUserDropdownOpen(false);
                    logoutUser();
                  }}
                  className="w-full text-left flex items-center gap-2.5 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition font-semibold"
                >
                  <i className="fa-solid fa-arrow-right-from-bracket"></i> Sign Out
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300"
          >
            <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-sm`}></i>
          </button>
        </div>
      </div>

      {/* 3. Mobile Mode Switcher Row */}
      <div className="md:hidden px-4 pb-2.5 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
        {modes.map((m) => {
          const isActive = activeMode === m.slug;
          return (
            <button
              key={m.slug}
              onClick={() => setActiveMode(m.slug)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                isActive
                  ? `${m.color} shadow-sm font-bold`
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              <i className={`fa-solid ${m.icon} text-[11px]`}></i>
              {m.name}
            </button>
          );
        })}
      </div>
    </header>
  );
}
