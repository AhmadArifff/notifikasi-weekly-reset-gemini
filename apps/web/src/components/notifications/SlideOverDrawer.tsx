'use client';

import React, { useState } from 'react';
import { useChronosStore } from '@/lib/store/useChronosStore';
import { X, CheckCheck, Bell, Inbox, AlertTriangle, Clock } from 'lucide-react';
import { triggerAndroidHaptics } from '@/lib/haptics/androidVibrate';

export const SlideOverDrawer: React.FC = () => {
  const { isDrawerOpen, toggleDrawer, notifications, toggleNotificationRead, markAllNotificationsRead, setActiveTab } =
    useChronosStore();
  const [filterType, setFilterType] = useState<'all' | 'unread'>('all');

  if (!isDrawerOpen) return null;

  const filteredNotifs =
    filterType === 'unread' ? notifications.filter((n) => !n.is_read) : notifications;

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  const handleItemClick = (targetTab?: string) => {
    toggleDrawer(false);
    if (targetTab === 'subscriptions' || targetTab === 'dashboard' || targetTab === 'accounts') {
      setActiveTab(targetTab);
    }
  };

  const handleMarkAll = () => {
    markAllNotificationsRead();
    triggerAndroidHaptics([50]);
  };

  return (
    <>
      {/* ZERO OVERLAP BACKDROP (RULE 1.1) */}
      <div
        onClick={() => toggleDrawer(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] transition-opacity"
      />

      {/* SLIDE-OVER DRAWER (RULE 1.1) */}
      <aside
        id="notification-drawer"
        className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-zinc-900 z-[100] shadow-2xl p-6 flex flex-col justify-between transform transition-transform duration-300 border-l border-current/15 rounded-none md:rounded-l-3xl"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-current/10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-rose-500/15 text-rose-500 flex items-center justify-center font-bold">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-black text-sm">Pusat Notifikasi</h4>
                <p className="text-[10px] opacity-75">
                  <span className="font-bold text-rose-500">{unreadCount}</span> pesan belum dibaca
                </p>
              </div>
            </div>
            <button
              onClick={() => toggleDrawer(false)}
              className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center hover:bg-black/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* FILTER BUTTONS & MARK ALL */}
          <div className="flex items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1 p-1 rounded-xl bg-black/5 dark:bg-white/5 border border-current/10">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1 rounded-lg font-bold text-xs ${
                  filterType === 'all' ? 'bg-rose-500 text-white shadow-sm' : 'opacity-70'
                }`}
              >
                Semua
              </button>
              <button
                onClick={() => setFilterType('unread')}
                className={`px-3 py-1 rounded-lg font-bold text-xs ${
                  filterType === 'unread' ? 'bg-rose-500 text-white shadow-sm' : 'opacity-70'
                }`}
              >
                Belum Dibaca
              </button>
            </div>

            <button
              onClick={handleMarkAll}
              className="text-[11px] font-bold text-rose-500 hover:underline flex items-center gap-1"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Tandai Semua Dibaca</span>
            </button>
          </div>

          {/* NOTIFICATION LIST */}
          <div className="space-y-3 overflow-y-auto max-h-[calc(100vh-220px)] pr-1">
            {filteredNotifs.length === 0 ? (
              <div className="text-center py-12 opacity-60">
                <Inbox className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p className="text-xs font-bold">Tidak ada notifikasi aktif</p>
              </div>
            ) : (
              filteredNotifs.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => handleItemClick(notif.action_url)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    notif.is_read
                      ? 'opacity-60 bg-black/5 dark:bg-white/5 border-current/10'
                      : 'bg-rose-500/5 border-rose-300 dark:border-rose-500/40 shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {!notif.is_read && <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>}
                      <h5 className="text-xs font-black leading-tight">{notif.title}</h5>
                    </div>
                    <span className="text-[10px] opacity-60 flex-shrink-0">{notif.created_at}</span>
                  </div>
                  <p className="text-[11px] opacity-80 mt-1.5 leading-relaxed">{notif.body}</p>
                  <div className="flex items-center justify-between pt-2 mt-2 border-t border-current/10 text-[10px]">
                    <span className="text-rose-500 font-bold flex items-center gap-1">
                      {notif.category === 'SUBSCRIPTION_H7' ? (
                        <AlertTriangle className="w-3 h-3" />
                      ) : (
                        <Clock className="w-3 h-3" />
                      )}
                      <span>Buka detail</span>
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleNotificationRead(notif.id);
                        triggerAndroidHaptics([40]);
                      }}
                      className="opacity-70 hover:opacity-100 font-bold underline"
                    >
                      {notif.is_read ? 'Tandai Belum Dibaca' : 'Tandai Dibaca'}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="pt-3 border-t border-current/10 text-center">
          <p className="text-[10px] opacity-60">ChronosAI Notification Engine • Zero Overlap Architecture</p>
        </div>
      </aside>
    </>
  );
};
