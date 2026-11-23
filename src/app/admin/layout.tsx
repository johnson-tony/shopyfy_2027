'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { admin, logoutAdmin } = useAuth();

  // If on admin login page, render children without sidebar/topbar
  if (pathname === '/admin/login') {
    return <div className="min-h-screen bg-slate-900 text-white">{children}</div>;
  }

  const navLinks = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: 'fa-chart-pie' },
    { href: '/admin/products', label: 'Products', icon: 'fa-box-open' },
    { href: '/admin/categories', label: 'Categories', icon: 'fa-layer-group' },
    { href: '/admin/restaurants', label: 'Restaurants', icon: 'fa-utensils' },
    { href: '/admin/modes', label: 'Shopping Modes', icon: 'fa-cubes' },
    { href: '/admin/orders', label: 'Orders & Returns', icon: 'fa-truck-ramp-box' },
    { href: '/admin/delivery-partners', label: 'Delivery Fleet', icon: 'fa-motorcycle' },
    { href: '/admin/coupons', label: 'Coupons & Vouchers', icon: 'fa-ticket' },
    { href: '/admin/reviews', label: 'Product Reviews', icon: 'fa-comments' },
    { href: '/admin/support-tickets', label: 'Support Tickets', icon: 'fa-headset' },
    { href: '/admin/users', label: 'Customers', icon: 'fa-users' },
    { href: '/admin/settings', label: 'System Settings', icon: 'fa-gear' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      {/* 1. Admin Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between p-4 flex-shrink-0">
        <div className="space-y-6">
          {/* Brand */}
          <div className="flex items-center gap-3 px-2 py-1">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/25">
              <i className="fa-solid fa-shield-halved text-sm"></i>
            </div>
            <div>
              <span className="font-extrabold text-sm tracking-wide text-white block">SHOPY ADMIN</span>
              <span className="text-[10px] text-blue-400 font-mono uppercase tracking-wider">Control Panel</span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <i className={`fa-solid ${link.icon} text-sm w-4 text-center`}></i>
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-slate-800 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <span className="flex items-center gap-2">
              <i className="fa-solid fa-arrow-up-right-from-square text-xs"></i>
              <span>View Storefront</span>
            </span>
            <i className="fa-solid fa-chevron-right text-[10px]"></i>
          </Link>

          <button
            onClick={logoutAdmin}
            className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-950/30 transition"
          >
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="bg-emerald-500/10 text-emerald-400 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              Live Admin Session
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-xs">
                A
              </div>
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-white">Root Super Admin</p>
                <p className="text-[10px] text-slate-400 font-mono">superadmin@shopy.test</p>
              </div>
            </div>
          </div>
        </header>

        {/* Children View */}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
