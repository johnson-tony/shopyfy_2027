'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function PartnerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { partner, logoutPartner } = useAuth();

  if (pathname === '/partner/login' || pathname === '/partner/register') {
    return <div className="min-h-screen bg-slate-950 text-white">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Rider Navigation */}
      <header className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-emerald-600 text-white font-black text-sm shadow-lg shadow-emerald-600/30">
              <i className="fa-solid fa-bolt text-xs"></i>
            </span>
            <div className="flex flex-col leading-tight">
              <span className="text-white font-bold text-sm tracking-wide">Shopy Delivery Partner</span>
              <span className="text-[10px] text-emerald-400 font-mono uppercase tracking-widest">On-Duty Fleet Panel</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs text-slate-400 hover:text-white hidden sm:inline transition"
            >
              Public Store
            </Link>
            <button
              onClick={logoutPartner}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold px-3 py-1.5 rounded-lg transition"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6">{children}</main>
    </div>
  );
}
