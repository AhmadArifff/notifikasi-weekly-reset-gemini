'use client';

import React, { useState } from 'react';
import { useChronosStore } from '@/lib/store/useChronosStore';
import { Subscription } from '@/lib/supabase/types';
import { Plus, CreditCard, AlertTriangle, Calendar } from 'lucide-react';
import { triggerAndroidHaptics } from '@/lib/haptics/androidVibrate';
import confetti from 'canvas-confetti';

export const SubscriptionsTable: React.FC = () => {
  const { subscriptions } = useChronosStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Calculate monthly burn rate (only for paid accounts)
  const totalBurnRate = subscriptions.reduce((acc, sub) => acc + sub.monthlyCost, 0);

  return (
    <div className="space-y-6">
      {/* FINANCIAL SUMMARY METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="theme-card p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold opacity-75">Monthly Burn Rate (Aktif)</p>
            <h4 className="text-2xl font-black mt-1 text-emerald-500">${totalBurnRate.toFixed(2)}</h4>
            <p className="text-[10px] opacity-70">Antigravity masih $0 (Masa Trial)</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border-2 border-emerald-300 flex items-center justify-center text-emerald-500 font-bold text-xl">
            <CreditCard className="w-6 h-6" />
          </div>
        </div>

        <div className="theme-card p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold opacity-75">Tagihan Bulan Depan (Est.)</p>
            <h4 className="text-2xl font-black mt-1 text-rose-500">${(totalBurnRate + 30).toFixed(2)}</h4>
            <p className="text-[10px] opacity-70">+ $30.00 Antigravity (Bulan ke-5)</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border-2 border-rose-300 flex items-center justify-center text-rose-500 font-bold text-xl">
            <Calendar className="w-6 h-6" />
          </div>
        </div>

        <div className="theme-card p-5 flex items-center justify-between border-2 border-amber-400/40 bg-amber-500/5">
          <div>
            <p className="text-xs font-bold text-amber-600">Peringatan Jatuh Tempo</p>
            <h4 className="text-2xl font-black mt-1 text-amber-600">H-7 Aktif</h4>
            <p className="text-[10px] opacity-75">Antigravity Trial Habis 24 Sept</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border-2 border-amber-300 flex items-center justify-center text-amber-500 font-bold text-xl animate-bounce">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* SUBSCRIPTIONS TABLE */}
      <div className="theme-card overflow-hidden">
        <div className="p-5 border-b border-current/10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-black">Daftar Langganan & Siklus Finansial</h3>
            <p className="text-xs opacity-75">Pemantau masa aktif, durasi langganan, dan tagihan bertahap</p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="squishy-btn px-4 py-2 bg-rose-500 text-white text-xs font-black flex items-center gap-2 shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Langganan</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-black/5 dark:bg-white/5 border-b border-current/10 uppercase tracking-wider font-extrabold text-[10px] opacity-75">
              <tr>
                <th className="p-4">Provider & Paket</th>
                <th className="p-4">Mulai</th>
                <th className="p-4">Durasi</th>
                <th className="p-4">Skema Tagihan</th>
                <th className="p-4">Berakhir</th>
                <th className="p-4">Status & Sisa</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-current/10">
              {subscriptions.map((sub) => (
                <tr key={sub.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                  <td className="p-4 font-black flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-rose-500/15 text-rose-600 flex items-center justify-center font-black">
                      {sub.providerName.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold">{sub.providerName}</p>
                      <p className="text-[10px] opacity-70 font-normal">{sub.plan_name}</p>
                    </div>
                  </td>
                  <td className="p-4 font-semibold opacity-80">{sub.start_date}</td>
                  <td className="p-4 font-bold">{sub.duration}</td>
                  <td className="p-4">
                    <p className="font-bold text-rose-600 dark:text-rose-400">{sub.scheme}</p>
                    <p className="text-[10px] opacity-70">{sub.subScheme}</p>
                  </td>
                  <td className="p-4 font-bold">{sub.end_date}</td>
                  <td className="p-4">
                    <span className={`pill-badge px-2.5 py-0.5 text-[10px] block w-max ${sub.alertBadgeClass}`}>
                      {sub.alertBadge}
                    </span>
                    <span className="text-[10px] font-semibold opacity-75 block mt-0.5">{sub.daysRemaining}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
