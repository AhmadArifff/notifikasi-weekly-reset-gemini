'use client';

import React, { useEffect } from 'react';
import { useChronosStore } from '@/lib/store/useChronosStore';
import { formatSecondsToTime, getWeeklyCycleProgress } from '@/lib/algorithms/weeklyReset';
import { triggerAndroidHaptics } from '@/lib/haptics/androidVibrate';
import confetti from 'canvas-confetti';
import { AlertTriangle, RefreshCw, Zap, AlertCircle } from 'lucide-react';

const dayNamesId = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

export const DualRadarCard: React.FC = () => {
  const {
    activeRadarMode,
    switchRadarMode,
    weeklyRemainingSeconds,
    rollingRemainingSeconds,
    weeklyStatusText,
    weeklyStatusClass,
    decrementTimers,
    triggerWeeklyPanic,
    triggerQuickDepletion,
    nextRecommendation,
  } = useChronosStore();

  useEffect(() => {
    const timer = setInterval(() => {
      decrementTimers();
    }, 1000);

    return () => clearInterval(timer);
  }, [decrementTimers]);

  const weeklyTime = formatSecondsToTime(weeklyRemainingSeconds);
  const rollingHrs = Math.floor(rollingRemainingSeconds / 3600);
  const rollingMins = Math.floor((rollingRemainingSeconds % 3600) / 60);
  const rollingSecs = rollingRemainingSeconds % 60;

  const cycleProgress = getWeeklyCycleProgress(weeklyRemainingSeconds);
  const ringOffset = 264 - (cycleProgress / 100) * 264;
  const currentDayName = dayNamesId[new Date().getDay()];

  const handleWeeklyPanic = () => {
    triggerAndroidHaptics([150, 80, 150]);
    triggerWeeklyPanic();
    confetti({ particleCount: 50, spread: 70 });
  };

  const handleRollingPanic = () => {
    triggerAndroidHaptics([80, 40, 80]);
    triggerQuickDepletion();
    confetti({ particleCount: 30, spread: 50 });
  };

  return (
    <div className="theme-card p-5 sm:p-6 md:col-span-2 flex flex-col justify-between space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className={`w-3 h-3 rounded-full animate-pulse ${activeRadarMode === 'weekly' ? 'bg-rose-500' : 'bg-amber-500'}`}></span>
          <span className={`text-xs font-black uppercase tracking-wider ${activeRadarMode === 'weekly' ? 'text-rose-500' : 'text-amber-500'}`}>
            {activeRadarMode === 'weekly' ? '📅 SIKLUS MINGGUAN TETAP' : '⏳ ROLLING WINDOW (5 JAM)'}
          </span>
        </div>

        {/* DUAL MODE TABS */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-black/5 dark:bg-white/5 border border-current/10">
          <button
            onClick={() => switchRadarMode('weekly')}
            className={`px-3 py-1 text-xs font-extrabold rounded-lg transition-all ${
              activeRadarMode === 'weekly' ? 'bg-rose-500 text-white shadow-sm' : 'opacity-70 hover:opacity-100'
            }`}
          >
            📅 Antigravity (Weekly)
          </button>
          <button
            onClick={() => switchRadarMode('rolling')}
            className={`px-3 py-1 text-xs font-extrabold rounded-lg transition-all ${
              activeRadarMode === 'rolling' ? 'bg-amber-500 text-black shadow-sm' : 'opacity-70 hover:opacity-100'
            }`}
          >
            ⏳ Claude Code (Rolling)
          </button>
        </div>
      </div>

      {activeRadarMode === 'weekly' ? (
        /* WEEKLY RADAR VIEW (ANTIGRAVITY) */
        <div className="space-y-6">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border-2 border-rose-300 flex items-center justify-center font-black text-rose-600 text-lg flex-shrink-0">
              AG
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h4 className="text-xl font-black">Antigravity (DeepMind Research Fleet)</h4>
                <span className={`pill-badge px-2.5 py-0.5 text-[11px] ${weeklyStatusClass}`}>
                  {weeklyStatusText}
                </span>
              </div>
              <p className="text-xs opacity-75">Siklus Kalender Mingguan: Setiap Senin 07:00 UTC (14:00 WIB)</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-4 rounded-2xl bg-black/5 dark:bg-black/30 border border-current/10">
            {/* CIRCULAR 7-DAY GAUGE */}
            <div className="relative w-32 h-32 flex items-center justify-center flex-shrink-0">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" stroke="currentColor" stroke-width="8" className="opacity-10" fill="none" />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  stroke="currentColor"
                  stroke-width="8"
                  className="text-rose-500 transition-all duration-1000"
                  fill="none"
                  strokeDasharray="264"
                  strokeDashoffset={ringOffset}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-[9px] font-bold uppercase opacity-70">Hari Ini</span>
                <span className="text-sm font-black">{currentDayName}</span>
                <span className="text-[10px] font-black text-rose-500">{cycleProgress}% Siklus</span>
              </div>
            </div>

            {/* ATOMIC CLOCK */}
            <div className="flex-1 text-center sm:text-left">
              <p className="text-[11px] font-bold opacity-70 uppercase tracking-wider mb-2">
                Hitungan Mundur Reset Senin 14:00 WIB
              </p>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <div className="px-3 py-2 rounded-xl bg-black/5 dark:bg-black/50 border border-current/15 text-center min-w-[55px]">
                  <span className="text-2xl font-black text-rose-500">{String(weeklyTime.days).padStart(2, '0')}</span>
                  <p className="text-[8px] font-bold uppercase opacity-70">Hari</p>
                </div>
                <span className="text-lg font-black opacity-40">:</span>
                <div className="px-3 py-2 rounded-xl bg-black/5 dark:bg-black/50 border border-current/15 text-center min-w-[55px]">
                  <span className="text-2xl font-black text-rose-500">{String(weeklyTime.hours).padStart(2, '0')}</span>
                  <p className="text-[8px] font-bold uppercase opacity-70">Jam</p>
                </div>
                <span className="text-lg font-black opacity-40">:</span>
                <div className="px-3 py-2 rounded-xl bg-black/5 dark:bg-black/50 border border-current/15 text-center min-w-[55px]">
                  <span className="text-2xl font-black text-rose-500">{String(weeklyTime.minutes).padStart(2, '0')}</span>
                  <p className="text-[8px] font-bold uppercase opacity-70">Menit</p>
                </div>
                <span className="text-lg font-black opacity-40">:</span>
                <div className="px-3 py-2 rounded-xl bg-black/5 dark:bg-black/50 border border-current/15 text-center min-w-[55px]">
                  <span className="text-2xl font-black text-rose-500">{String(weeklyTime.seconds).padStart(2, '0')}</span>
                  <p className="text-[8px] font-bold uppercase opacity-70">Detik</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-current/10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-semibold opacity-80">
              <Zap className="w-4 h-4 text-rose-500" />
              <span>Antigravity pool reset otomatis setiap Senin pukul 14:00 WIB</span>
            </div>
            <button
              onClick={handleWeeklyPanic}
              className="squishy-btn px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white text-xs font-black flex items-center gap-2 shadow-md"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Limit Mingguan Habis! (Hot-Swap Cadangan)</span>
            </button>
          </div>
        </div>
      ) : (
        /* ROLLING RADAR VIEW (CLAUDE CODE) */
        <div className="space-y-6">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border-2 border-amber-300 flex items-center justify-center font-black text-amber-600 text-lg flex-shrink-0">
              CC
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h4 className="text-xl font-black">Claude Code (Production Lead Terminal)</h4>
                <span className="pill-badge px-2.5 py-0.5 text-[11px] bg-amber-500/15 text-amber-600 border-amber-300 font-bold">
                  ⏳ ROLLING 5 JAM
                </span>
              </div>
              <p className="text-xs opacity-75">Anthropic Claude 3.7 Sonnet / Opus Pro Tier</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-5 py-3.5 rounded-2xl bg-black/5 dark:bg-black/40 border border-current/15 text-center min-w-[80px]">
              <span className="text-4xl font-black text-amber-500">{String(rollingHrs).padStart(2, '0')}</span>
              <p className="text-[10px] font-bold uppercase opacity-70">Jam</p>
            </div>
            <span className="text-2xl font-black opacity-40">:</span>
            <div className="px-5 py-3.5 rounded-2xl bg-black/5 dark:bg-black/40 border border-current/15 text-center min-w-[80px]">
              <span className="text-4xl font-black text-amber-500">{String(rollingMins).padStart(2, '0')}</span>
              <p className="text-[10px] font-bold uppercase opacity-70">Menit</p>
            </div>
            <span className="text-2xl font-black opacity-40">:</span>
            <div className="px-5 py-3.5 rounded-2xl bg-black/5 dark:bg-black/40 border border-current/15 text-center min-w-[80px]">
              <span className="text-4xl font-black text-amber-500">{String(rollingSecs).padStart(2, '0')}</span>
              <p className="text-[10px] font-bold uppercase opacity-70">Detik</p>
            </div>
          </div>

          <div className="pt-4 border-t border-current/10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-semibold opacity-80">
              <AlertCircle className="w-4 h-4 text-amber-500" />
              <span>Baru saja terkena limit token lagi?</span>
            </div>
            <button
              onClick={handleRollingPanic}
              className="squishy-btn px-5 py-2.5 bg-rose-500 hover:bg-rose-600 text-white text-xs font-black flex items-center gap-2 shadow-lg shadow-rose-500/30"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Limit Kena Sekarang! (Mulai Ulang 5 Jam)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
