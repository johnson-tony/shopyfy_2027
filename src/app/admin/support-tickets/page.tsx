'use client';

import React, { useState } from 'react';

export default function AdminSupportTicketsPage() {
  const [tickets, setTickets] = useState([
    {
      id: 'tk_1',
      ticket_number: 'TK-2027-449',
      customer_name: 'Alice Customer',
      customer_phone: '+91 9876543210',
      category: 'Delivery Delay / Rider Not Moving',
      subject: 'Package out for delivery for 40 mins',
      priority: 'high',
      status: 'in_progress',
      rider_called: true,
      date: '10 mins ago',
    },
    {
      id: 'tk_2',
      ticket_number: 'TK-2027-442',
      customer_name: 'Deepak Roy',
      customer_phone: '+91 9876543218',
      category: 'General Inquiry',
      subject: 'Inquiry regarding 10-minute grocery slot in Guindy',
      priority: 'normal',
      status: 'resolved',
      rider_called: false,
      date: 'Yesterday',
    },
  ]);

  const toggleStatus = (id: string) => {
    setTickets(
      tickets.map((t) =>
        t.id === id ? { ...t, status: t.status === 'in_progress' ? 'resolved' : 'in_progress' } : t
      )
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white">Helpdesk Support Tickets</h1>
        <p className="text-xs text-slate-400">Customer dispute tickets, order delays, and courier call escalation</p>
      </div>

      <div className="space-y-4">
        {tickets.map((t) => (
          <div key={t.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-xs text-blue-400">{t.ticket_number}</span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                    t.priority === 'high' ? 'bg-rose-500/20 text-rose-400' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {t.priority}
                </span>
                <span className="text-xs text-slate-400">{t.category}</span>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase ${
                    t.status === 'resolved' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                  }`}
                >
                  {t.status}
                </span>
                <span className="text-xs text-slate-500">{t.date}</span>
              </div>
            </div>

            <div>
              <h3 className="font-extrabold text-sm text-white">{t.subject}</h3>
              <p className="text-xs text-slate-400 mt-1">
                Raised by: <strong className="text-white">{t.customer_name}</strong> ({t.customer_phone})
              </p>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400 flex items-center gap-1.5">
                <i className={`fa-solid ${t.rider_called ? 'fa-phone-volume text-emerald-400' : 'fa-phone-slash text-slate-500'}`}></i>
                <span>{t.rider_called ? 'Rider contacted by staff' : 'Rider call pending'}</span>
              </span>

              <button
                onClick={() => toggleStatus(t.id)}
                className="text-xs font-bold text-blue-400 hover:underline"
              >
                {t.status === 'resolved' ? 'Reopen Ticket' : 'Mark as Resolved'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
