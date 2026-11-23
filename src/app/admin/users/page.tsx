'use client';

import React, { useState } from 'react';

export default function AdminUsersPage() {
  const [users, setUsers] = useState([
    {
      id: 'usr_1',
      name: 'Alice Customer',
      email: 'customer@shopy.test',
      phone: '+91 9876543210',
      status: 'active',
      orders_count: 5,
      joined: 'September 2026',
    },
    {
      id: 'usr_2',
      name: 'Rohan Mehta',
      email: 'rohan@example.com',
      phone: '+91 9876543215',
      status: 'active',
      orders_count: 2,
      joined: 'October 2026',
    },
    {
      id: 'usr_3',
      name: 'Blocked User Sample',
      email: 'blocked@shopy.test',
      phone: '+91 9876543299',
      status: 'blocked',
      orders_count: 0,
      joined: 'August 2026',
    },
  ]);

  const toggleUserStatus = (id: string) => {
    setUsers(users.map((u) => (u.id === id ? { ...u, status: u.status === 'active' ? 'blocked' : 'active' } : u)));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white">Customer Accounts Directory</h1>
        <p className="text-xs text-slate-400">View customer activity, order history, and account status controls</p>
      </div>

      <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/60 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Contact Info</th>
                <th className="px-6 py-4">Orders</th>
                <th className="px-6 py-4">Joined</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-800/40 transition">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-xs">
                      {u.name.charAt(0)}
                    </div>
                    <span className="font-bold text-white">{u.name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-white font-medium">{u.email}</p>
                    <span className="text-[10px] text-slate-400">{u.phone}</span>
                  </td>
                  <td className="px-6 py-4 font-bold text-white">{u.orders_count} orders</td>
                  <td className="px-6 py-4 text-slate-400">{u.joined}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase ${
                        u.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => toggleUserStatus(u.id)}
                      className="text-xs font-bold text-slate-300 hover:text-white underline"
                    >
                      {u.status === 'active' ? 'Block Account' : 'Unblock Account'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
