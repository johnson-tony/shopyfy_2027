'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-xl mx-auto shadow-lg shadow-blue-500/25">
          <i className="fa-solid fa-key"></i>
        </div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Reset Password</h1>
        <p className="text-xs text-slate-500">We will send a 6-digit verification OTP to your email</p>
      </div>

      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
        {sent ? (
          <div className="text-center space-y-3 py-4">
            <i className="fa-solid fa-envelope-circle-check text-4xl text-emerald-500"></i>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">OTP Code Dispatched</h3>
            <p className="text-xs text-slate-500">
              A 6-digit OTP code has been sent to <strong>{email}</strong>. Check your inbox and follow the verification steps.
            </p>
            <Link
              href="/login"
              className="inline-block bg-blue-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl mt-2"
            >
              Return to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-500 font-bold mb-1">Email Address</label>
              <input
                type="email"
                required
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs py-3.5 rounded-xl shadow-lg shadow-blue-500/25 transition"
            >
              Send Reset OTP
            </button>
          </form>
        )}

        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
          Remember password?{' '}
          <Link href="/login" className="font-bold text-blue-600 hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
