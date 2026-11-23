'use client';

import React, { useState } from 'react';
import { initialAdminSetting } from '@/lib/mockData';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState(initialAdminSetting);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white">System Settings</h1>
        <p className="text-xs text-slate-400">Configure global platform options, payment gateways, and mode dispatch</p>
      </div>

      {saved && (
        <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-bold">
          ✓ System settings updated successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 text-xs">
        <div className="space-y-4">
          <h3 className="font-black text-sm text-white">General Branding</h3>
          <div>
            <label className="block text-slate-400 font-bold mb-1">Site Name</label>
            <input
              type="text"
              value={settings.site_name}
              onChange={(e) => setSettings({ ...settings, site_name: e.target.value })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-slate-400 font-bold mb-1">Merchant UPI ID</label>
            <input
              type="text"
              value={settings.upi_id}
              onChange={(e) => setSettings({ ...settings, upi_id: e.target.value })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none font-mono"
            />
          </div>
        </div>

        <div className="border-t border-slate-800 pt-4 space-y-4">
          <h3 className="font-black text-sm text-white">Payment Method Toggles</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.is_upi_enabled}
                onChange={(e) => setSettings({ ...settings, is_upi_enabled: e.target.checked })}
                className="w-4 h-4 rounded text-blue-600"
              />
              <span>Enable UPI QR & App Payments</span>
            </label>
            <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.is_cod_enabled}
                onChange={(e) => setSettings({ ...settings, is_cod_enabled: e.target.checked })}
                className="w-4 h-4 rounded text-blue-600"
              />
              <span>Enable Cash on Delivery (COD)</span>
            </label>
            <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.is_card_enabled}
                onChange={(e) => setSettings({ ...settings, is_card_enabled: e.target.checked })}
                className="w-4 h-4 rounded text-blue-600"
              />
              <span>Enable Credit / Debit Card Payments</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-lg transition"
        >
          Save Configuration
        </button>
      </form>
    </div>
  );
}
