'use client';

import React, { useState } from 'react';
import { useChronosStore } from '@/lib/store/useChronosStore';
import { AgentAccount, ResetCycleType } from '@/lib/supabase/types';
import { Plus, Edit2, Trash2, Zap } from 'lucide-react';
import { triggerAndroidHaptics } from '@/lib/haptics/androidVibrate';
import confetti from 'canvas-confetti';

export const FleetGrid: React.FC = () => {
  const { accounts, addAccount, updateAccount, deleteAccount } = useChronosStore();
  const [editingAccount, setEditingAccount] = useState<AgentAccount | null>(null);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  // New account form state
  const [newLabel, setNewLabel] = useState('');
  const [newIdentifier, setNewIdentifier] = useState('');
  const [newCycle, setNewCycle] = useState<ResetCycleType>('WEEKLY_CALENDAR');

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAccount) return;
    updateAccount(editingAccount);
    setEditingAccount(null);
    triggerAndroidHaptics([60]);
  };

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLabel) return;
    const newAcc: AgentAccount = {
      id: `acc-${Date.now()}`,
      user_id: 'user-demo',
      provider_id: 'prov-custom',
      providerName: newLabel.split(' ')[0] || 'AI Agent',
      account_label: newLabel,
      account_identifier_masked: newIdentifier || 'user@workspace.dev',
      reset_cycle: newCycle,
      cycleText: newCycle === 'WEEKLY_CALENDAR' ? 'Senin 14:00 WIB' : 'Rolling Window',
      interval_hours: 168,
      next_reset_at: new Date(Date.now() + 7 * 86400000).toISOString(),
      readiness_status: 'READY',
      statusBadge: '🟢 AKTIF (100%)',
      statusPillClass: 'bg-emerald-500/20 text-emerald-600 border-emerald-300',
      notes: 'Akun armada baru',
      color: 'rose',
      is_active: true,
      created_at: new Date().toISOString(),
    };
    addAccount(newAcc);
    setIsNewModalOpen(false);
    setNewLabel('');
    setNewIdentifier('');
    triggerAndroidHaptics([80, 40, 80]);
    confetti({ particleCount: 40, spread: 60 });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-black">Armada Akun AI Terhubung</h3>
          <p className="text-xs opacity-75">Kelola kuota, multi-akun per provider, dan status kesiapan</p>
        </div>
        <button
          onClick={() => setIsNewModalOpen(true)}
          className="squishy-btn px-4 py-2 bg-rose-500 text-white text-xs font-black flex items-center gap-2 shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Tautkan Akun Baru</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {accounts.map((acc) => (
          <div key={acc.id} className="theme-card p-5 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <span className={`pill-badge px-2.5 py-0.5 text-xs font-bold ${acc.statusPillClass}`}>
                  {acc.statusBadge}
                </span>
                <span className="text-xs font-semibold opacity-75">{acc.cycleText}</span>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <div className="w-11 h-11 rounded-2xl bg-rose-500/15 border-2 border-rose-300 flex items-center justify-center font-black text-rose-600 text-sm flex-shrink-0">
                  {acc.providerName.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h4 className="font-black text-sm leading-tight">{acc.account_label}</h4>
                  <p className="text-[11px] opacity-70">{acc.account_identifier_masked}</p>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-black/5 dark:bg-black/30 border border-current/10 space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="opacity-75">Detail Paket:</span>
                <span className="font-bold">{acc.notes}</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-75">Siklus:</span>
                <span className="font-bold">{acc.cycleText}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-current/10 gap-2">
              <button
                onClick={() => setEditingAccount(acc)}
                className="squishy-btn px-3 py-1.5 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 text-xs font-bold flex items-center gap-1.5"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => deleteAccount(acc.id)}
                className="squishy-btn px-3 py-1.5 rounded-lg bg-red-500/15 text-red-600 hover:bg-red-500/25 text-xs font-bold flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Hapus</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT MODAL */}
      {editingAccount && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
          <div className="theme-card max-w-md w-full p-6 space-y-4">
            <h4 className="text-lg font-black">Edit Konfigurasi Akun</h4>
            <form onSubmit={handleSaveEdit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold block mb-1">Nama / Label Akun</label>
                <input
                  type="text"
                  value={editingAccount.account_label}
                  onChange={(e) => setEditingAccount({ ...editingAccount, account_label: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-current/20 font-bold"
                />
              </div>
              <div>
                <label className="font-bold block mb-1">Email / Identifier</label>
                <input
                  type="text"
                  value={editingAccount.account_identifier_masked}
                  onChange={(e) => setEditingAccount({ ...editingAccount, account_identifier_masked: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-current/20 font-bold"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingAccount(null)}
                  className="px-4 py-2 rounded-xl bg-black/5 dark:bg-white/5 font-bold"
                >
                  Batal
                </button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-rose-500 text-white font-black shadow-md">
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* NEW MODAL */}
      {isNewModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
          <div className="theme-card max-w-md w-full p-6 space-y-4">
            <h4 className="text-lg font-black">Tautkan Akun AI Baru</h4>
            <form onSubmit={handleCreateAccount} className="space-y-3 text-xs">
              <div>
                <label className="font-bold block mb-1">Nama Provider / Akun</label>
                <input
                  type="text"
                  placeholder="Misal: Claude Code Backup #2"
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-current/20 font-bold"
                  required
                />
              </div>
              <div>
                <label className="font-bold block mb-1">Email / Identifier</label>
                <input
                  type="text"
                  placeholder="engineer@agency.dev"
                  value={newIdentifier}
                  onChange={(e) => setNewIdentifier(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-current/20 font-bold"
                />
              </div>
              <div>
                <label className="font-bold block mb-1">Tipe Siklus Reset</label>
                <select
                  value={newCycle}
                  onChange={(e) => setNewCycle(e.target.value as ResetCycleType)}
                  className="w-full p-2.5 rounded-xl bg-black/5 dark:bg-zinc-800 border border-current/20 font-bold"
                >
                  <option value="WEEKLY_CALENDAR">Weekly Calendar (Senin 14:00 WIB)</option>
                  <option value="ROLLING_WINDOW">Rolling Window (5 Jam)</option>
                  <option value="MONTHLY_CALENDAR">Monthly Calendar</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsNewModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-black/5 dark:bg-white/5 font-bold"
                >
                  Batal
                </button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-rose-500 text-white font-black shadow-md">
                  Tautkan Sekarang
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
