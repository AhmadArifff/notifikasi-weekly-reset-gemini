'use client';

import React from 'react';
import { useChronosStore } from '@/lib/store/useChronosStore';
import { AppThemeType } from '@/lib/supabase/types';
import { triggerAndroidHaptics } from '@/lib/haptics/androidVibrate';
import { FleetRecommender } from '@/components/recommender/FleetRecommender';
import { ClientTimeSimulator } from '@/components/simulator/ClientTimeSimulator';
import { DualRadarCard } from '@/components/radar/DualRadarCard';
import { ThreeMascot } from '@/components/mascot/ThreeMascot';
import { FleetGrid } from '@/components/accounts/FleetGrid';
import { SubscriptionsTable } from '@/components/subscriptions/SubscriptionsTable';
import { SlideOverDrawer } from '@/components/notifications/SlideOverDrawer';
import { AndroidBottomNav } from '@/components/navigation/AndroidBottomNav';
import { Bell, LayoutDashboard, Users, CreditCard, Sparkles, ShieldCheck } from 'lucide-react';

export default function HomePage() {
  const { theme, setTheme, activeTab, setActiveTab, notifications, toggleDrawer, accounts } = useChronosStore();
  const unreadCount = notifications.filter((n) => !n.is_read).length;

  const handleThemeChange = (newTheme: AppThemeType) => {
    triggerAndroidHaptics([40]);
    setTheme(newTheme);
  };

  const handleTabChange = (tab: 'dashboard' | 'accounts' | 'subscriptions') => {
    triggerAndroidHaptics([20]);
    setActiveTab(tab);
  };

  const readyAccounts = accounts.filter((a) => a.readiness_status === 'READY').length;

  return (
    <main className="min-h-screen px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto space-y-6">
      {/* TOP HEADER */}
      <header className="theme-card p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
        {/* LOGO & TITLE */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/15 border-2 border-rose-300 flex items-center justify-center font-black text-rose-600 text-xl shadow-sm">
            ⏳
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight">ChronosAI</h1>
              <span className="pill-badge px-2 py-0.5 text-[10px] bg-rose-500/10 text-rose-600 border-rose-300 font-bold">
                v2.0 PWA
              </span>
            </div>
            <p className="text-xs opacity-75 font-medium">AI Fleet Quota & Financial Reset Tracker</p>
          </div>
        </div>

        {/* DESKTOP TAB NAVIGATION */}
        <div className="hidden md:flex items-center gap-1 p-1 rounded-2xl bg-black/5 dark:bg-white/5 border border-current/10">
          <button
            onClick={() => handleTabChange('dashboard')}
            className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition-all ${
              activeTab === 'dashboard'
                ? 'bg-rose-500 text-white shadow-sm'
                : 'opacity-70 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Radar Quota</span>
          </button>
          <button
            onClick={() => handleTabChange('accounts')}
            className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition-all ${
              activeTab === 'accounts'
                ? 'bg-rose-500 text-white shadow-sm'
                : 'opacity-70 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Armada Akun ({readyAccounts}/{accounts.length})</span>
          </button>
          <button
            onClick={() => handleTabChange('subscriptions')}
            className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition-all ${
              activeTab === 'subscriptions'
                ? 'bg-rose-500 text-white shadow-sm'
                : 'opacity-70 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Finansial & Trial</span>
          </button>
        </div>

        {/* THEME SELECTOR & NOTIFICATION BELL */}
        <div className="flex items-center gap-3">
          {/* TRI-THEME SELECTOR */}
          <div className="flex items-center gap-1 p-1 rounded-2xl bg-black/5 dark:bg-white/5 border border-current/10">
            <button
              onClick={() => handleThemeChange('cute')}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-black transition-all ${
                theme === 'cute' ? 'bg-rose-500 text-white shadow-sm' : 'opacity-60 hover:opacity-100'
              }`}
              title="Kawaii Dream Theme"
              aria-label="Kawaii Dream Theme"
            >
              🎀
            </button>
            <button
              onClick={() => handleThemeChange('hacker')}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-black transition-all ${
                theme === 'hacker' ? 'bg-[#00ff41] text-black shadow-sm font-mono' : 'opacity-60 hover:opacity-100'
              }`}
              title="Cyber-Virus Matrix Theme"
              aria-label="Cyber-Virus Matrix Theme"
            >
              ☣️
            </button>
            <button
              onClick={() => handleThemeChange('obsidian')}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-black transition-all ${
                theme === 'obsidian' ? 'bg-emerald-500 text-black shadow-sm' : 'opacity-60 hover:opacity-100'
              }`}
              title="Obsidian Pro Theme"
              aria-label="Obsidian Pro Theme"
            >
              💎
            </button>
          </div>

          {/* NOTIFICATION BELL BUTTON */}
          <button
            onClick={() => {
              triggerAndroidHaptics([30]);
              toggleDrawer(true);
            }}
            className="relative p-2.5 rounded-2xl bg-black/5 dark:bg-white/5 hover:bg-black/10 transition-transform active:scale-95 border border-current/10"
            aria-label="Buka Notifikasi"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-red-500 text-white font-extrabold text-[10px] rounded-full flex items-center justify-center shadow-md animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* CLIENT DEMO SIMULATOR TOOLBAR */}
      <section aria-label="Demo Simulator Toolbar">
        <ClientTimeSimulator />
      </section>

      {/* SMART FLEET RECOMMENDER */}
      <section aria-label="Smart Fleet Recommender">
        <FleetRecommender />
      </section>

      {/* TAB CONTENT SWITCHER */}
      {activeTab === 'dashboard' && (
        <section className="space-y-6" aria-label="Dashboard Radar">
          {/* BENTO GRID: 3D MASCOT + DUAL RADAR */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            <ThreeMascot />
            <DualRadarCard />
          </div>

          {/* QUICK FLEET READINESS STRIP */}
          <div className="theme-card p-4 flex flex-wrap items-center justify-between gap-4 border border-current/10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-600 flex items-center justify-center font-black">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h5 className="text-xs font-black">Status Kesiapan Armada Failover</h5>
                <p className="text-[11px] opacity-75">
                  <span className="font-bold text-emerald-500">{readyAccounts}</span> dari {accounts.length} akun siap
                  digunakan seketika tanpa downtime
                </p>
              </div>
            </div>
            <button
              onClick={() => handleTabChange('accounts')}
              className="squishy-btn px-4 py-1.5 rounded-xl bg-black/5 dark:bg-white/10 hover:bg-black/10 text-xs font-extrabold flex items-center gap-1.5"
            >
              <span>Lihat Detail Semua Akun</span>
              <span className="text-rose-500">→</span>
            </button>
          </div>
        </section>
      )}

      {activeTab === 'accounts' && (
        <section aria-label="Armada Akun AI">
          <FleetGrid />
        </section>
      )}

      {activeTab === 'subscriptions' && (
        <section aria-label="Finansial dan Langganan">
          <SubscriptionsTable />
        </section>
      )}

      {/* SLIDE-OVER DRAWER (ZERO OVERLAP) */}
      <SlideOverDrawer />

      {/* ANDROID PWA BOTTOM THUMB NAVIGATION */}
      <AndroidBottomNav />
    </main>
  );
}
