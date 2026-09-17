-- ============================================================
-- CHRONOSAI PRODUCTION DATABASE SCHEMA (SUPABASE POSTGRESQL 16)
-- Conforms to PRD.md v2.0.0 & RULES.md
-- ============================================================

-- 1. EXTENSIONS & ENUMS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DO $$ BEGIN
    CREATE TYPE reset_cycle_type AS ENUM ('HOURLY', 'DAILY_CALENDAR', 'WEEKLY_CALENDAR', 'MONTHLY_CALENDAR', 'ROLLING_WINDOW', 'CUSTOM_HOURS');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE subscription_status_type AS ENUM ('ACTIVE', 'TRIAL', 'PAUSED', 'CANCELLED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE pricing_scheme_type AS ENUM ('REGULAR', 'DISCOUNTED', 'TRIAL_THEN_PAID');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE account_readiness_type AS ENUM ('READY', 'RESET_IMMINENT', 'RECHARGING');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE notif_category_type AS ENUM ('RESET_ALERT', 'SUBSCRIPTION_H7', 'SUBSCRIPTION_H3', 'SYSTEM');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. PROVIDERS (MASTER PRESETS)
CREATE TABLE IF NOT EXISTS public.providers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL DEFAULT 'CODING_AGENT',
    logo_svg_url TEXT,
    brand_color_hex VARCHAR(10) NOT NULL DEFAULT '#6366f1',
    default_reset_cycle reset_cycle_type NOT NULL DEFAULT 'WEEKLY_CALENDAR',
    default_interval_hours NUMERIC(6,2) NOT NULL DEFAULT 168.00,
    preset_notes TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. AGENT ACCOUNTS (MULTI-ACCOUNT PER USER)
CREATE TABLE IF NOT EXISTS public.agent_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    provider_id UUID NOT NULL REFERENCES public.providers(id) ON DELETE RESTRICT,
    account_label VARCHAR(100) NOT NULL,
    account_identifier_masked VARCHAR(100),
    reset_cycle reset_cycle_type NOT NULL DEFAULT 'WEEKLY_CALENDAR',
    interval_hours NUMERIC(6,2) NOT NULL DEFAULT 168.00,
    anchor_day_of_week INT DEFAULT 1, -- 1 = Senin, 7 = Minggu
    anchor_time TIME NOT NULL DEFAULT '07:00:00',
    anchor_timezone VARCHAR(50) NOT NULL DEFAULT 'UTC',
    last_depleted_at TIMESTAMPTZ,
    next_reset_at TIMESTAMPTZ NOT NULL,
    readiness_status account_readiness_type NOT NULL DEFAULT 'READY',
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. WEEKLY QUOTA TRACKERS (CALENDAR ANCHOR SPECIFICS)
CREATE TABLE IF NOT EXISTS public.weekly_quota_trackers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    account_id UUID NOT NULL REFERENCES public.agent_accounts(id) ON DELETE CASCADE,
    anchor_day_of_week INT NOT NULL DEFAULT 1, -- 1 = Senin
    anchor_time TIME NOT NULL DEFAULT '07:00:00', -- 07:00 UTC = 14:00 WIB
    anchor_timezone VARCHAR(50) NOT NULL DEFAULT 'UTC',
    total_quota_units INT DEFAULT 100,
    remaining_units INT DEFAULT 100,
    last_reset_at TIMESTAMPTZ NOT NULL,
    next_reset_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. SUBSCRIPTIONS (LIFECYCLE, DURATION, PROMO & TRIAL)
CREATE TABLE IF NOT EXISTS public.subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    account_id UUID REFERENCES public.agent_accounts(id) ON DELETE SET NULL,
    provider_id UUID NOT NULL REFERENCES public.providers(id) ON DELETE RESTRICT,
    plan_name VARCHAR(100) NOT NULL,
    pricing_scheme pricing_scheme_type NOT NULL DEFAULT 'REGULAR',
    regular_amount NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    discounted_amount NUMERIC(12, 2),
    is_trial BOOLEAN NOT NULL DEFAULT false,
    trial_duration_months INT DEFAULT 0,
    paid_start_month INT DEFAULT 1,
    currency VARCHAR(5) NOT NULL DEFAULT 'USD',
    start_date DATE NOT NULL DEFAULT CURRENT_DATE,
    duration_months INT NOT NULL DEFAULT 1,
    end_date DATE NOT NULL,
    next_renewal_date DATE NOT NULL,
    alert_h_minus_7 BOOLEAN NOT NULL DEFAULT true,
    alert_h_minus_3 BOOLEAN NOT NULL DEFAULT true,
    status subscription_status_type NOT NULL DEFAULT 'ACTIVE',
    payment_method_note VARCHAR(100),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. NOTIFICATION LOGS (DESKTOP DRAWER & AUDIT)
CREATE TABLE IF NOT EXISTS public.notification_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    account_id UUID REFERENCES public.agent_accounts(id) ON DELETE CASCADE,
    subscription_id UUID REFERENCES public.subscriptions(id) ON DELETE CASCADE,
    category notif_category_type NOT NULL DEFAULT 'RESET_ALERT',
    title VARCHAR(150) NOT NULL,
    body TEXT NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT false,
    action_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. PUSH SUBSCRIPTIONS (ANDROID WEB PUSH VAPID)
CREATE TABLE IF NOT EXISTS public.push_subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    endpoint TEXT NOT NULL UNIQUE,
    p256dh_key TEXT NOT NULL,
    auth_key TEXT NOT NULL,
    user_agent TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. INDEXES FOR HIGH CONCURRENCY & INSTANT QUERIES
CREATE INDEX IF NOT EXISTS idx_agent_accounts_user ON public.agent_accounts (user_id);
CREATE INDEX IF NOT EXISTS idx_agent_accounts_next_reset ON public.agent_accounts (next_reset_at ASC);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user ON public.subscriptions (user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_end_date ON public.subscriptions (end_date ASC);
CREATE INDEX IF NOT EXISTS idx_notification_logs_user ON public.notification_logs (user_id, is_read);
CREATE INDEX IF NOT EXISTS idx_weekly_quota_next_reset ON public.weekly_quota_trackers (next_reset_at ASC);

-- 9. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weekly_quota_trackers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.push_subscriptions ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
    DROP POLICY IF EXISTS "Providers viewable by all authenticated" ON public.providers;
    CREATE POLICY "Providers viewable by all authenticated" ON public.providers FOR SELECT TO authenticated USING (true);
EXCEPTION WHEN undefined_object THEN null; END $$;

DO $$ BEGIN
    DROP POLICY IF EXISTS "Users manage own accounts" ON public.agent_accounts;
    CREATE POLICY "Users manage own accounts" ON public.agent_accounts FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
EXCEPTION WHEN undefined_object THEN null; END $$;

DO $$ BEGIN
    DROP POLICY IF EXISTS "Users manage own subscriptions" ON public.subscriptions;
    CREATE POLICY "Users manage own subscriptions" ON public.subscriptions FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
EXCEPTION WHEN undefined_object THEN null; END $$;

DO $$ BEGIN
    DROP POLICY IF EXISTS "Users manage own notifications" ON public.notification_logs;
    CREATE POLICY "Users manage own notifications" ON public.notification_logs FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
EXCEPTION WHEN undefined_object THEN null; END $$;

DO $$ BEGIN
    DROP POLICY IF EXISTS "Users manage own push subs" ON public.push_subscriptions;
    CREATE POLICY "Users manage own push subs" ON public.push_subscriptions FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
EXCEPTION WHEN undefined_object THEN null; END $$;
