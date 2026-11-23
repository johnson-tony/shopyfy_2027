'use client';

import React, { useState } from 'react';

export default function SupportPage() {
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('delivery_delay');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Help & Support Center</h1>
        <p className="text-xs text-slate-500">Contact our 24/7 dedicated support team or open a ticket</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-7 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="font-black text-sm text-slate-900 dark:text-white">Open a Support Ticket</h2>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-center space-y-2">
              <i className="fa-solid fa-circle-check text-3xl text-emerald-600"></i>
              <h3 className="font-black text-sm text-emerald-800 dark:text-emerald-200">Ticket Submitted!</h3>
              <p className="text-xs text-emerald-600">Ticket ID: #TK-2027-449. Our staff will respond within 15 minutes.</p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-3 bg-emerald-600 text-white font-bold text-xs px-4 py-2 rounded-xl"
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-500 font-bold mb-1">Issue Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="delivery_delay">Delivery Delay / Rider Not Moving</option>
                  <option value="partner_issue">Delivery Partner Related Issue</option>
                  <option value="damaged_items">Damaged / Missing Items</option>
                  <option value="return_refund">Return Pickup & Refund</option>
                  <option value="payment_issue">Payment / COD Collection Dispute</option>
                  <option value="general">General Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-500 font-bold mb-1">Subject</label>
                <input
                  type="text"
                  required
                  placeholder="Brief summary of your query"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-500 font-bold mb-1">Detailed Message</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Provide all relevant order details and descriptions..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs py-3 rounded-xl shadow-lg shadow-blue-500/25 transition"
              >
                Submit Ticket
              </button>
            </form>
          )}
        </div>

        {/* Quick FAQs */}
        <div className="md:col-span-5 space-y-4">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <h3 className="font-black text-sm text-slate-900 dark:text-white">Quick Help</h3>
            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">How do 10-minute deliveries work?</h4>
                <p className="mt-0.5">Minutes mode uses our local micro-fulfillment centers with assigned direct riders.</p>
              </div>
              <div className="border-t border-slate-100 dark:border-slate-800 pt-2">
                <h4 className="font-bold text-slate-900 dark:text-white">Can I cancel an order?</h4>
                <p className="mt-0.5">Yes, before the rider has picked up the package directly from the order tracking view.</p>
              </div>
              <div className="border-t border-slate-100 dark:border-slate-800 pt-2">
                <h4 className="font-bold text-slate-900 dark:text-white">How do returns work?</h4>
                <p className="mt-0.5">Request a return within 7 days. Our fleet partner will come to inspect and pick up.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
