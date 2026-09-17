'use client';

import React from 'react';
import { useChronosStore } from '@/lib/store/useChronosStore';
import { vibrateDevice } from '@/lib/haptics/androidVibrate';
import { LayoutDashboard, Users, CreditCard, Bell } from 'lucide-react';

export const AndroidBottomNav: React.FC = () => {
  const { activeTab, setActiveTab, notifications, toggleDrawer } = useChronosStore();
  const unreadCount = notifications.filter((n) => !n.is_read).length;

  const handleTabClick = (tab: 'dashboard' | 'accounts' | 'subscriptions') => {
    vibrateDevice([15]);
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNotificationClick = () => {
    vibrateDevice([20]);
    toggleDrawer(true);
  };

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#12141c]/95 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] px-3 py-2 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
      aria-label="Android Thumb-Zone Navigation"
    >
      <div className="grid grid-cols-4 gap-1 items-center max-w-md mx-auto">
        {/* Tab Dashboard / Radar */}
        <button
          onClick={() => handleTabClick('dashboard')}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl transition-all duration-200 ${
            activeTab === 'dashboard'
              ? 'text-pink-600 dark:text-emerald-400 font-bold scale-105 bg-pink-500/10 dark:bg-emerald-500/10'
              : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
          }`}
          aria-label="Navigasi ke Dashboard Radar"
        >
          <LayoutDashboard className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">Radar</span>
        </button>

        {/* Tab Armada / Accounts */}
        <button
          onClick={() => handleTabClick('accounts')}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl transition-all duration-200 ${
            activeTab === 'accounts'
              ? 'text-pink-600 dark:text-emerald-400 font-bold scale-105 bg-pink-500/10 dark:bg-emerald-500/10'
              : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
          }`}
          aria-label="Navigasi ke Armada Akun"
        >
          <Users className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">Armada</span>
        </button>

        {/* Tab Langganan */}
        <button
          onClick={() => handleTabClick('subscriptions')}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl transition-all duration-200 ${
            activeTab === 'subscriptions'
              ? 'text-pink-600 dark:text-emerald-400 font-bold scale-105 bg-pink-500/10 dark:bg-emerald-500/10'
              : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
          }`}
          aria-label="Navigasi ke Finansial Langganan"
        >
          <CreditCard className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">Langganan</span>
        </button>

        {/* Notifikasi Drawer Button */}
        <button
          onClick={handleNotificationClick}
          className="relative flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-all duration-200 active:scale-95"
          aria-label="Buka Notifikasi"
        >
          <div className="relative">
            <Bell className="w-5 h-5 mb-0.5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1.5 min-w-[16px] h-4 px-1 bg-red-500 text-white font-extrabold text-[9px] rounded-full flex items-center justify-center shadow-sm animate-pulse">
                {unreadCount}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-tight">Waspada</span>
        </button>
      </div>
    </nav>
  );
};
