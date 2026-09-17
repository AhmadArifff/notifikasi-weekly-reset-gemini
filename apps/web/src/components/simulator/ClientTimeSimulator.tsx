'use client';

import React from 'react';
import { useChronosStore } from '@/lib/store/useChronosStore';
import { triggerAndroidHaptics } from '@/lib/haptics/androidVibrate';
import confetti from 'canvas-confetti';

export const ClientTimeSimulator: React.FC = () => {
  const { simulateScenario } = useChronosStore();

  const handleScenario = (scenario: 'h12' | 'h5s' | 'panic' | 'normal') => {
    triggerAndroidHaptics([60]);
    simulateScenario(scenario);
    if (scenario === 'panic') {
      confetti({ particleCount: 60, spread: 70 });
    }
  };

  return (
    <div className="theme-card p-3 md:p-4 flex flex-wrap items-center justify-between gap-3 border border-current/15">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-500 flex items-center justify-center text-base font-black">
          🎮
        </div>
        <div>
          <h5 className="text-xs font-black">Simulator Waktu Demo Klien</h5>
          <p className="text-[10px] opacity-75">Uji coba instan siklus reset tanpa menunggu 7 hari sungguhan</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => handleScenario('h12')}
          className="squishy-btn px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-700 dark:text-amber-300 font-extrabold text-[11px] border border-amber-400/30 flex items-center gap-1.5"
        >
          <span>⚡</span> <span>H-12 Jam (Minggu Malam)</span>
        </button>
        <button
          onClick={() => handleScenario('h5s')}
          className="squishy-btn px-3 py-1.5 rounded-xl bg-emerald-500 text-white font-black text-[11px] shadow-md flex items-center gap-1.5 animate-pulse"
        >
          <span>🚀</span> <span>H-5 Detik (Reset Boom!)</span>
        </button>
        <button
          onClick={() => handleScenario('panic')}
          className="squishy-btn px-3 py-1.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-700 dark:text-rose-300 font-extrabold text-[11px] border border-rose-400/30 flex items-center gap-1.5"
        >
          <span>⚠️</span> <span>Limit Habis (Rabu Siang)</span>
        </button>
        <button
          onClick={() => handleScenario('normal')}
          className="squishy-btn px-3 py-1.5 rounded-xl bg-black/5 dark:bg-white/10 text-current font-extrabold text-[11px] flex items-center gap-1.5"
        >
          <span>🔄</span> <span>Waktu Riil</span>
        </button>
      </div>
    </div>
  );
};
