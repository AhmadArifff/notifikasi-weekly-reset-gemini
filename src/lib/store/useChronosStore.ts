import { create } from 'zustand';
import { AgentAccount, Subscription, NotificationLog, AppThemeType } from '../supabase/types';
import { initialAccountsData, initialSubscriptionsData, initialNotificationsData, fleetRecommendations } from '../data/productionDataset';
import { calculateInitialWeeklySeconds } from '../algorithms/weeklyReset';

interface ChronosState {
  theme: AppThemeType;
  activeTab: 'dashboard' | 'accounts' | 'subscriptions';
  accounts: AgentAccount[];
  subscriptions: Subscription[];
  notifications: NotificationLog[];
  isDrawerOpen: boolean;
  activeRadarMode: 'weekly' | 'rolling';
  
  // Timers
  weeklyRemainingSeconds: number;
  rollingRemainingSeconds: number;
  weeklyStatusText: string;
  weeklyStatusClass: string;

  // Recommender
  activeRecIndex: number;

  // Actions
  setTheme: (theme: AppThemeType) => void;
  setActiveTab: (tab: 'dashboard' | 'accounts' | 'subscriptions') => void;
  toggleDrawer: (open?: boolean) => void;
  switchRadarMode: (mode: 'weekly' | 'rolling') => void;
  setWeeklySeconds: (sec: number) => void;
  setRollingSeconds: (sec: number) => void;
  decrementTimers: () => void;
  
  // CRUD Accounts
  addAccount: (acc: AgentAccount) => void;
  updateAccount: (acc: AgentAccount) => void;
  deleteAccount: (id: string) => void;

  // Notifications
  toggleNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  // Triggers
  triggerQuickDepletion: () => void;
  triggerWeeklyPanic: () => void;
  simulateScenario: (scenario: 'h12' | 'h5s' | 'panic' | 'normal') => void;
  nextRecommendation: () => void;
  setRecommendationIndex: (idx: number) => void;
}

export const useChronosStore = create<ChronosState>((set, get) => ({
  theme: 'cute',
  activeTab: 'dashboard',
  accounts: initialAccountsData,
  subscriptions: initialSubscriptionsData,
  notifications: initialNotificationsData,
  isDrawerOpen: false,
  activeRadarMode: 'weekly',

  weeklyRemainingSeconds: calculateInitialWeeklySeconds(),
  rollingRemainingSeconds: 8325,
  weeklyStatusText: "🟢 100% SEGAR (SIAP PAKAI)",
  weeklyStatusClass: "bg-rose-500/15 text-rose-600 border-rose-300 font-bold",

  activeRecIndex: 0,

  setTheme: (theme) => set({ theme }),
  setActiveTab: (activeTab) => set({ activeTab }),
  toggleDrawer: (open) => set((state) => ({ isDrawerOpen: open !== undefined ? open : !state.isDrawerOpen })),
  switchRadarMode: (activeRadarMode) => set({ activeRadarMode }),
  setWeeklySeconds: (weeklyRemainingSeconds) => set({ weeklyRemainingSeconds }),
  setRollingSeconds: (rollingRemainingSeconds) => set({ rollingRemainingSeconds }),

  decrementTimers: () => {
    const { weeklyRemainingSeconds, rollingRemainingSeconds } = get();
    set({
      weeklyRemainingSeconds: weeklyRemainingSeconds > 0 ? weeklyRemainingSeconds - 1 : 7 * 86400,
      rollingRemainingSeconds: rollingRemainingSeconds > 0 ? rollingRemainingSeconds - 1 : 5 * 3600,
    });
  },

  addAccount: (acc) => set((state) => ({ accounts: [...state.accounts, acc] })),
  updateAccount: (acc) => set((state) => ({
    accounts: state.accounts.map((a) => (a.id === acc.id ? acc : a)),
  })),
  deleteAccount: (id) => set((state) => ({
    accounts: state.accounts.filter((a) => a.id !== id),
  })),

  toggleNotificationRead: (id) => set((state) => ({
    notifications: state.notifications.map((n) =>
      n.id === id ? { ...n, is_read: !n.is_read } : n
    ),
  })),
  markAllNotificationsRead: () => set((state) => ({
    notifications: state.notifications.map((n) => ({ ...n, is_read: true })),
  })),

  triggerQuickDepletion: () => set({
    rollingRemainingSeconds: 5 * 3600,
  }),

  triggerWeeklyPanic: () => set({
    weeklyRemainingSeconds: 4 * 86400 + 18 * 3600,
    weeklyStatusText: "🔴 LIMIT PEKAN INI HABIS (MENUNGGU SENIN)",
    weeklyStatusClass: "bg-red-500/15 text-red-600 border-red-300 font-bold animate-pulse",
    activeRecIndex: 1, // switch recommendation to Claude Code
  }),

  simulateScenario: (scenario) => {
    if (scenario === 'h12') {
      set({
        activeRadarMode: 'weekly',
        weeklyRemainingSeconds: 12 * 3600 + 45,
        weeklyStatusText: "🟡 RESET IMMINENT (12 JAM LAGI)",
        weeklyStatusClass: "bg-amber-500/20 text-amber-600 border-amber-300 font-bold animate-pulse",
      });
    } else if (scenario === 'h5s') {
      set({
        activeRadarMode: 'weekly',
        weeklyRemainingSeconds: 5,
        weeklyStatusText: "🔥 MENGHITUNG MUNDUR (5 DETIK!)",
        weeklyStatusClass: "bg-rose-500 text-white font-black animate-bounce",
      });
    } else if (scenario === 'panic') {
      get().triggerWeeklyPanic();
    } else if (scenario === 'normal') {
      set({
        activeRadarMode: 'weekly',
        weeklyRemainingSeconds: calculateInitialWeeklySeconds(),
        weeklyStatusText: "🟢 100% SEGAR (SIAP PAKAI)",
        weeklyStatusClass: "bg-rose-500/15 text-rose-600 border-rose-300 font-bold",
      });
    }
  },

  nextRecommendation: () => set((state) => ({
    activeRecIndex: (state.activeRecIndex + 1) % fleetRecommendations.length,
  })),
  setRecommendationIndex: (activeRecIndex) => set({ activeRecIndex }),
}));
