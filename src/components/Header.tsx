'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
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

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  const modes = [
    { slug: 'shopy', name: 'Shopy Store', shortName: 'Store', icon: 'fa-bag-shopping', color: 'bg-blue-600 text-white' },
    { slug: 'food', name: 'Food Delivery', shortName: 'Food', icon: 'fa-utensils', color: 'bg-orange-500 text-white' },
    { slug: 'minutes', name: '10-Min Groceries', shortName: '10-Min', icon: 'fa-bolt', color: 'bg-emerald-600 text-white' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      {/* 1. Announcement Bar */}
      <div className="bg-slate-950 text-slate-300 text-xs py-1.5 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs truncate">
            <span className="inline-flex items-center gap-1 bg-blue-500/20 text-blue-400 px-1.5 sm:px-2 py-0.5 rounded-full font-semibold text-[10px] sm:text-xs flex-shrink-0">
              <i className="fa-solid fa-bolt text-[10px]"></i> SALE
            </span>
            <span className="truncate">
              Flat ₹50 OFF with code <strong className="text-amber-400 font-bold">WELCOME50</strong>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-3 lg:gap-4 text-slate-400 text-xs">
            <Link href="/support" className="hover:text-white transition">24x7 Help</Link>
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
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Logo & Desktop Shopping Modes */}
        <div className="flex items-center gap-3 sm:gap-6 flex-shrink-0">
          <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group">
            {/* Reduced compact icon on mobile */}
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition flex-shrink-0">
              <i className="fa-solid fa-bag-shopping text-sm sm:text-lg"></i>
            </div>
            {/* Heading text: SHOPYFY (reduced on small screens) */}
            <div className="flex flex-col leading-none">
              <span className="font-extrabold text-base sm:text-xl tracking-tight text-slate-900 dark:text-white">
                SHOPY<span className="text-blue-600">FY</span>
              </span>
              <span className="hidden sm:block text-[9px] sm:text-[10px] font-medium text-slate-500 uppercase tracking-widest mt-0.5">
                Unified Commerce
              </span>
            </div>
          </Link>

          {/* Mode Switcher Tabs (Desktop only) */}
          <div className="hidden md:flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
            {modes.map((m) => {
              const isActive = activeMode === m.slug;
              return (
                <button
                  key={m.slug}
                  onClick={() => setActiveMode(m.slug)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
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

        {/* Global Search Bar (Desktop only) */}
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

        {/* Right Navigation Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Theme Toggle: HIDDEN on small screens (moved inside profile / mobile drawer) */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="hidden md:flex w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 items-center justify-center text-slate-600 dark:text-slate-300 transition"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            <i className={`fa-solid ${theme === 'dark' ? 'fa-sun text-amber-400' : 'fa-moon text-blue-600'} text-sm`}></i>
          </button>

          {/* Wishlist Button: visible on tablet/desktop, accessible via drawer on mobile */}
          <Link
            href="/wishlist"
            className="hidden sm:flex relative w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 items-center justify-center text-slate-600 dark:text-slate-300 transition"
            title="Wishlist"
          >
            <i className="fa-regular fa-heart text-xs sm:text-sm"></i>
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart Button: compact & clear on all screens */}
          <Link
            href="/cart"
            className="relative flex items-center gap-1.5 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full font-bold text-xs transition"
          >
            <i className="fa-solid fa-cart-shopping text-xs sm:text-sm"></i>
            <span className="hidden sm:inline">Cart</span>
            {totalQuantity > 0 && (
              <span className="bg-blue-600 text-white text-[10px] font-black px-1.5 py-0.2 rounded-full min-w-[18px] text-center">
                {totalQuantity}
              </span>
            )}
          </Link>

          {/* User Account Dropdown (Desktop / Tablet) */}
          <div className="relative">
            {user ? (
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-1.5 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                title={user.name}
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden md:inline text-xs font-semibold text-slate-700 dark:text-slate-300 max-w-[90px] truncate">
                  {user.name}
                </span>
                <i className="hidden md:inline fa-solid fa-chevron-down text-[10px] text-slate-400"></i>
              </button>
            ) : (
              <Link
                href="/login"
                className="hidden sm:flex items-center gap-1.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-bold text-xs hover:opacity-90 transition"
              >
                <i className="fa-solid fa-user text-xs"></i>
                <span>Sign In</span>
              </Link>
            )}

            {/* Desktop User Dropdown Menu */}
            {user && userDropdownOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl py-2 z-50">
                <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-700">
                  <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{user.name}</p>
                  <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
                </div>
                <Link
                  href="/profile"
                  onClick={() => setUserDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition"
                >
                  <i className="fa-regular fa-user text-slate-400 w-4"></i> My Profile
                </Link>
                <Link
                  href="/orders"
                  onClick={() => setUserDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition"
                >
                  <i className="fa-solid fa-box text-slate-400 w-4"></i> My Orders
                </Link>
                <Link
                  href="/wishlist"
                  onClick={() => setUserDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition"
                >
                  <i className="fa-regular fa-heart text-slate-400 w-4"></i> Wishlist
                </Link>

                {/* Theme switch inside profile dropdown */}
                <button
                  onClick={() => {
                    toggleTheme();
                  }}
                  className="w-full text-left flex items-center justify-between px-4 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition"
                >
                  <div className="flex items-center gap-2.5">
                    <i className={`fa-solid ${theme === 'dark' ? 'fa-sun text-amber-400' : 'fa-moon text-blue-600'} w-4`}></i>
                    <span>Theme</span>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-400 capitalize">{theme}</span>
                </button>

                <div className="border-t border-slate-100 dark:border-slate-700 my-1"></div>
                <button
                  onClick={() => {
                    setUserDropdownOpen(false);
                    logoutUser();
                  }}
                  className="w-full text-left flex items-center gap-2.5 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition font-semibold"
                >
                  <i className="fa-solid fa-arrow-right-from-bracket w-4"></i> Sign Out
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open Mobile Menu"
            className="md:hidden w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
          >
            <i className="fa-solid fa-bars text-sm"></i>
          </button>
        </div>
      </div>

      {/* 3. Mobile Search Bar (Visible on screens below lg) */}
      <div className="lg:hidden px-3 sm:px-4 pb-2.5 pt-0.5">
        <form onSubmit={handleSearch} className="relative w-full">
          <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
          <input
            type="text"
            placeholder={`Search ${activeMode === 'food' ? 'dishes...' : activeMode === 'minutes' ? 'groceries...' : 'products...'}`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-900 transition"
          />
        </form>
      </div>

      {/* 4. Mobile Mode Switcher Row */}
      <div className="md:hidden px-3 sm:px-4 pb-2.5 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
        {modes.map((m) => {
          const isActive = activeMode === m.slug;
          return (
            <button
              key={m.slug}
              onClick={() => setActiveMode(m.slug)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                isActive
                  ? `${m.color} shadow-sm font-bold scale-[1.01]`
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <i className={`fa-solid ${m.icon} text-[11px]`}></i>
              <span>{m.name}</span>
            </button>
          );
        })}
      </div>

      {/* 5. Mobile Navigation Drawer & Backdrop */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="fixed top-0 right-0 h-full w-[85%] max-w-xs bg-white dark:bg-slate-900 shadow-2xl flex flex-col z-50 border-l border-slate-200 dark:border-slate-800 animate-in slide-in-from-right duration-200">
            {/* Drawer Header: User Profile or Sign In */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50">
              <div className="flex items-center justify-between mb-3">
                <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
                  SHOPY<span className="text-blue-600">FY</span>
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition"
                  aria-label="Close Menu"
                >
                  <i className="fa-solid fa-xmark text-sm"></i>
                </button>
              </div>

              {user ? (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-md flex-shrink-0">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{user.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 pt-1">
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl text-xs font-bold transition shadow-sm"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 text-center bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 py-2 rounded-xl text-xs font-bold transition"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>

            {/* Drawer Body (Scrollable) */}
            <div className="flex-1 overflow-y-auto py-2 px-3 space-y-4">
              {/* Theme Toggle Inside Profile / Mobile Drawer */}
              <div className="bg-slate-100 dark:bg-slate-800/70 p-3 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-200 shadow-sm">
                    <i className={`fa-solid ${theme === 'dark' ? 'fa-moon text-blue-400' : 'fa-sun text-amber-500'} text-xs`}></i>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">Theme Mode</p>
                    <p className="text-[10px] text-slate-500 capitalize">{theme} mode active</p>
                  </div>
                </div>
                <button
                  onClick={toggleTheme}
                  className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold shadow-sm border border-slate-200 dark:border-slate-600 active:scale-95 transition"
                >
                  Switch
                </button>
              </div>

              {/* Shopping Modes */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 mb-1.5">Shopping Modes</p>
                <div className="space-y-1">
                  {modes.map((m) => {
                    const isActive = activeMode === m.slug;
                    return (
                      <button
                        key={m.slug}
                        onClick={() => {
                          setActiveMode(m.slug);
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition ${
                          isActive
                            ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <i className={`fa-solid ${m.icon} text-xs w-4`}></i>
                          <span>{m.name}</span>
                        </div>
                        {isActive && <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full">Active</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 mb-1.5">Navigation</p>
                <div className="space-y-1">
                  <Link
                    href="/wishlist"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <i className="fa-regular fa-heart text-xs w-4"></i>
                      <span>My Wishlist</span>
                    </div>
                    {wishlistCount > 0 && (
                      <span className="bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                        {wishlistCount}
                      </span>
                    )}
                  </Link>

                  <Link
                    href="/cart"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <i className="fa-solid fa-cart-shopping text-xs w-4"></i>
                      <span>My Cart</span>
                    </div>
                    {totalQuantity > 0 && (
                      <span className="bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                        {totalQuantity}
                      </span>
                    )}
                  </Link>

                  {user && (
                    <>
                      <Link
                        href="/profile"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                      >
                        <i className="fa-regular fa-user text-xs w-4"></i>
                        <span>My Profile</span>
                      </Link>

                      <Link
                        href="/orders"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                      >
                        <i className="fa-solid fa-box text-xs w-4"></i>
                        <span>My Orders</span>
                      </Link>
                    </>
                  )}

                  <Link
                    href="/coupons"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  >
                    <i className="fa-solid fa-tags text-xs w-4"></i>
                    <span>Offers & Coupons</span>
                  </Link>

                  <Link
                    href="/support"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  >
                    <i className="fa-solid fa-headset text-xs w-4"></i>
                    <span>24x7 Help Center</span>
                  </Link>
                </div>
              </div>

              {/* Portals */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 mb-1.5">Portals</p>
                <div className="space-y-1">
                  <Link
                    href="/partner/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition"
                  >
                    <i className="fa-solid fa-motorcycle text-xs w-4"></i>
                    <span>Rider / Partner Portal</span>
                  </Link>

                  <Link
                    href="/admin/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition"
                  >
                    <i className="fa-solid fa-shield-halved text-xs w-4"></i>
                    <span>Admin Panel</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Drawer Footer: Logout if logged in */}
            {user && (
              <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logoutUser();
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-rose-50 dark:bg-rose-950/30 text-rose-600 hover:bg-rose-100 py-2.5 rounded-xl text-xs font-bold transition"
                >
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}