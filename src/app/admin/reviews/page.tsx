'use client';

import React, { useState } from 'react';

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState([
    {
      id: 'rev_1',
      product_name: 'Premium Classic Oxford Cotton Shirt',
      customer_name: 'Alice Customer',
      rating: 5,
      title: 'Fantastic fit & fabric!',
      comment: 'The Oxford cotton shirt feels truly premium. Stays wrinkle-resistant and breathable in humid weather.',
      status: true,
      date: '2 days ago',
    },
    {
      id: 'rev_2',
      product_name: 'Sony WH-1000XM5 Wireless Headphones',
      customer_name: 'Rohan Mehta',
      rating: 4,
      title: 'Great Noise Cancellation',
      comment: 'Sound quality is stellar. Microphone captures clear audio in busy calls.',
      status: true,
      date: '5 days ago',
    },
  ]);

  const toggleStatus = (id: string) => {
    setReviews(reviews.map((r) => (r.id === id ? { ...r, status: !r.status } : r)));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white">Product Reviews & Ratings</h1>
        <p className="text-xs text-slate-400">Moderate customer feedback, star reviews, and photo attachments</p>
      </div>

      <div className="space-y-4">
        {reviews.map((r) => (
          <div key={r.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-extrabold text-sm text-white">{r.product_name}</h3>
                <span className="text-xs text-slate-400">By {r.customer_name} • {r.date}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-amber-400 font-black text-xs">
                  {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
                </span>
                <button
                  onClick={() => toggleStatus(r.id)}
                  className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase ${
                    r.status ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                  }`}
                >
                  {r.status ? 'Approved' : 'Hidden'}
                </button>
              </div>
            </div>

            <p className="text-xs font-bold text-slate-200">{r.title}</p>
            <p className="text-xs text-slate-400 leading-relaxed">{r.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
