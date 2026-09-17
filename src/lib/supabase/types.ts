export type ResetCycleType =
  | 'HOURLY'
  | 'DAILY_CALENDAR'
  | 'WEEKLY_CALENDAR'
  | 'MONTHLY_CALENDAR'
  | 'ROLLING_WINDOW'
  | 'CUSTOM_HOURS';

export type SubscriptionStatusType = 'ACTIVE' | 'TRIAL' | 'PAUSED' | 'CANCELLED';
export type PricingSchemeType = 'REGULAR' | 'DISCOUNTED' | 'TRIAL_THEN_PAID';
export type AccountReadinessType = 'READY' | 'RESET_IMMINENT' | 'RECHARGING';
export type NotifCategoryType = 'RESET_ALERT' | 'SUBSCRIPTION_H7' | 'SUBSCRIPTION_H3' | 'SYSTEM';
export type AppThemeType = 'cute' | 'hacker' | 'obsidian';

export interface Provider {
  id: string;
  slug: string;
  name: string;
  category: string;
  logo_svg_url?: string;
  brand_color_hex: string;
  default_reset_cycle: ResetCycleType;
  default_interval_hours: number;
  preset_notes?: string;
  is_active: boolean;
  created_at: string;
}

export interface AgentAccount {
  id: string;
  user_id: string;
  provider_id: string;
  providerName: string;
  account_label: string;
  account_identifier_masked: string;
  reset_cycle: ResetCycleType;
  cycleText: string;
  interval_hours: number;
  anchor_day_of_week?: number;
  anchor_time?: string;
  anchor_timezone?: string;
  last_depleted_at?: string;
  next_reset_at: string;
  readiness_status: AccountReadinessType;
  statusBadge: string;
  statusPillClass: string;
  notes: string;
  color: string;
  is_active: boolean;
  created_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  account_id?: string;
  provider_id: string;
  providerName: string;
  plan_name: string;
  pricing_scheme: PricingSchemeType;
  scheme: string;
  subScheme: string;
  regular_amount: number;
  discounted_amount?: number;
  monthlyCost: number;
  is_trial: boolean;
  trial_duration_months: number;
  paid_start_month: number;
  currency: string;
  start_date: string;
  duration_months: number;
  duration: string;
  end_date: string;
  daysRemaining: string;
  alertBadge: string;
  alertBadgeClass: string;
  next_renewal_date: string;
  alert_h_minus_7: boolean;
  alert_h_minus_3: boolean;
  status: SubscriptionStatusType;
  payment_method_note?: string;
  created_at: string;
}

export interface NotificationLog {
  id: string;
  user_id: string;
  account_id?: string;
  subscription_id?: string;
  category: NotifCategoryType;
  title: string;
  body: string;
  is_read: boolean;
  action_url?: string;
  created_at: string;
}
