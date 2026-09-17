# Product Requirements Document (PRD)
## Project: ChronosAI (AI Agent Reset & Subscription Pulse)
### Cross-Platform PWA for Multi-Agent Quota Reset & Subscription Management

---

| Document Metadata | Detail |
| :--- | :--- |
| **Project Name** | **ChronosAI** (Weekly & Rolling AI Reset & Subscription Watcher) |
| **Document Version** | `v1.6.0` (Smart Fleet Typewriter Animation Engine, Zero CLS & Multi-Theme Auto-Typing) |
| **Author** | Senior Product Manager, Genjutsu Design Architect & Enterprise System Engineer |
| **Status** | Approved for Development |
| **Target Platforms** | Cross-Platform PWA (Mobile iOS/Android, Tablet, Desktop Web) |
| **Tech Stack Foundation** | Next.js 15+ (App Router) / React 19 / TypeScript (Strict) |
| **Living Prototype Contract** | [prototype.html](file:///c:/Users/ASUS/Documents/Web%20Dev/improving/notifikasi-weekly-reset-gemini/prototype.html) |
| **Design Engines Applied** | Genjutsu (`@paint`, `@cast`), Magic UI, Three.js 3D, Motion (Disney Principles) |
| **Themes Supported** | 1. 🎀 Kawaii Dream (Feminine Pastel) | 2. 💀 Cyber-Virus Matrix | 3. 💎 Obsidian Pro High-Tech |
| **Notification Architecture** | 📱 **Mobile**: Native Web Push PWA (VAPID) <br> 💻 **Laptop/Desktop**: In-App Slide-Over Drawer (Read/Unread) |
| **Hosting & Deployment** | Vercel (Edge Network + Serverless Functions) |

---

## 1. Executive Summary

**ChronosAI** adalah aplikasi Progressive Web App (PWA) generasi baru yang dirancang untuk memantau kuota mingguan/rolling akun AI (Antigravity, Claude Code, Cursor, OpenCode, Gemini, OpenAI Codex) serta manajemen siklus penagihan langganan finansial.

Pembaruan arsitektur v1.5.0 menyelesaikan kendala antarmuka dan interaksi riil:
1. **Zero Overlap Notification Center (Pusat Notifikasi Slide-Over Drawer)**:
   * Mengeliminasi dropdown yang bertumpukan (*overlapping/clipping*) dengan menggantinya menjadi **Slide-Over Drawer** elegan dengan latar belakang *backdrop blur* (`z-[60]`).
   * Pengguna dapat memfilter pesan *Semua* vs *Belum Dibaca*, menandai pesan dibaca/belum dibaca, dan mengeklik notifikasi untuk langsung berpindah ke akun atau tagihan yang relevan.
2. **Armada Data Produksi Riil (Production Dataset)**:
   * Pengujian semi-final menggunakan data 5 agent AI riil di dunia rekayasa perangkat lunak:
     * **Antigravity (Google DeepMind)**: Kuota pool mingguan (Senin 07:00 UTC), masa trial 4 bulan gratis (Jatuh tempo H-7 aktif, bulan ke-5 bayar $30.00/bln).
     * **Claude Code (Anthropic)**: Rolling window 5 jam ($20.00/bln).
     * **Cursor Pro (Anysphere)**: 500 fast requests pool bulanan (Promo $15.00/bln).
     * **OpenCode (Open-Source Cluster)**: Qwen 2.5 72B / DeepSeek-Coder-V2 rolling 24 jam ($0.00 Self-Hosted).
     * **OpenAI Codex / ChatGPT Team**: GPT-4o & o3-mini rolling 3 jam ($25.00/bln).
3. **Fungsionalitas Interaktif Lengkap (Interactive Completeness)**:
   * Setiap tombol memiliki aksi nyata: **Edit Konfigurasi Akun** (memunculkan modal edit dan menyimpan perubahan), **Hapus Akun**, **Limit Kena Sekarang!**, **Tambah Langganan**, dan **Uji Coba Push HP**.
4. **Smart Fleet Typewriter & Auto-Typing Engine (RULES.md Rule 1.3)**:
   * Menggantikan teks statis pada headline rekomendasi cerdas dengan animasi mengetik otomatis karakter demi karakter.
   * Dilengkapi kursor berkedip GPU-accelerated (`|` / `█`), zero layout shift (`min-h-[32px]`), text-scramble decoding effect untuk tema Cyber Matrix, dan rotasi otomatis antar armada siap pakai.

---

## 2. Living Interactive Prototype Blueprint (`prototype.html`)

Berkas **[prototype.html](file:///c:/Users/ASUS/Documents/Web%20Dev/improving/notifikasi-weekly-reset-gemini/prototype.html)** adalah acuan wajib (*Single Source of Truth*) yang menyajikan alur semi-final aplikasi:
* Pusat notifikasi laptop berupa Slide-Over Drawer dengan backdrop yang bersih dan bebas tumpang tindih.
* Headline rekomendasi armada mengetik sendiri secara dinamis dengan kursor aktif (*typewriter animation engine*).
* Form edit dan tambah akun yang berfungsi secara reaktif (*CRUD in-memory state*).
* Tabel langganan dinamis yang otomatis menghitung ulang *Monthly Burn Rate*.

---

## 3. Fitur Utama & Functional Requirements (Epics)

### 3.1 EPIC 1: Master Data Provider & Smart Presets
* Antigravity (7 hari pool), Claude Code (5 jam rolling), Cursor (500 fast requests), OpenCode (24 jam cluster), OpenAI Codex (3 jam rolling).

### 3.2 EPIC 2: Multi-Account Management per Provider (Full CRUD)
* Menautkan, mengedit konfigurasi, dan menghapus akun agent dari armada.

### 3.3 EPIC 3: Precision Reset & Rolling Window Engine
* Mode jadwal mingguan/bulanan (tahan DST & IANA Timezone).
* Mode Rolling Window dengan tombol aksi cepat **"Limit Kena Sekarang!"** yang langsung memulai hitungan mundur dan memicu efek partikel.

### 3.4 EPIC 4: Smart Fleet Recommender (Readiness Matrix & Typewriter Engine)
* Status Kesiapan: 🟢 `READY NOW (100%)`, 🟡 `RESET IMMINENT`, 🔴 `RECHARGING`.
* Banner rekomendasi cerdas yang menunjuk akun terbaik untuk dipakai saat ini.
* **Typewriter & Auto-Typing Engine (RULES.md Rule 1.3)**:
  - **Zero CLS**: Container headline memiliki tinggi minimum terkunci (`min-h-[32px]`) sehingga tidak terjadi pergeseran layout saat karakter diketik dari panjang 0 hingga penuh.
  - **Blinking Cursor**: Animasi CSS `@keyframes` opacity murni dengan indikator `|` (Kawaii/Obsidian) dan `█` (Cyber-Virus Matrix).
  - **Kecepatan Organik**: Cadence pengetikan bervariasi secara alami antara 45ms - 75ms per karakter, dengan fast-delete 22ms per karakter.
  - **Cyber-Scramble Decoding**: Karakter pada mode hacker didekripsi acak dari simbol matriks (`!@#$%^&*<>_01X#`) sebelum mengunci ke huruf asli.
  - **Rotasi Cerdas & Timeout Cleansing**: Berotasi otomatis antar akun siap pakai dengan jeda baca 4.5 detik dan pembersihan `clearTimeout` aman saat perpindahan tema.

### 3.5 EPIC 5: Subscription Lifecycle, Durasi & Promo Engine (Diskon & Trial)
* Input tanggal awal (`start_date`), durasi (`duration_months`), dan skema promo (Reguler, Diskon, atau Trial 4 bulan gratis).
* Sistem otomatis menghitung `end_date` dan memicu peringatan **H-7**, **H-3**, dan **H-1**.

### 3.6 EPIC 6: Dual Notification Engine (Mobile Push vs Laptop Drawer)
* 📱 **Mobile**: Web Push native (VAPID) saat H-2 jam sebelum reset akun dan H-7 sebelum langganan habis.
* 💻 **Laptop**: Pusat Notifikasi Slide-Over Drawer dengan counter unread dinamis dan filter pesan.

### 3.7 EPIC 7: Data Portability (Export & Import JSON)
* Ekspor dan impor data tervalidasi skema Zod.

---

## 4. Database Schema & Data Models (Supabase PostgreSQL 16)

```sql
-- 1. EXTENSIONS & ENUMS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TYPE reset_cycle_type AS ENUM ('HOURLY', 'DAILY_CALENDAR', 'WEEKLY_CALENDAR', 'MONTHLY_CALENDAR', 'ROLLING_WINDOW', 'CUSTOM_HOURS');
CREATE TYPE subscription_status_type AS ENUM ('ACTIVE', 'TRIAL', 'PAUSED', 'CANCELLED');
CREATE TYPE pricing_scheme_type AS ENUM ('REGULAR', 'DISCOUNTED', 'TRIAL_THEN_PAID');
CREATE TYPE account_readiness_type AS ENUM ('READY', 'RESET_IMMINENT', 'RECHARGING');
CREATE TYPE app_theme_type AS ENUM ('HACKER', 'CUTE', 'OBSIDIAN');
CREATE TYPE notif_category_type AS ENUM ('RESET_ALERT', 'SUBSCRIPTION_H7', 'SUBSCRIPTION_H3', 'SYSTEM');

-- 2. PROVIDERS
CREATE TABLE public.providers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL DEFAULT 'CODING_AGENT',
    logo_svg_url TEXT NOT NULL,
    brand_color_hex VARCHAR(10) NOT NULL DEFAULT '#6366f1',
    default_reset_cycle reset_cycle_type NOT NULL DEFAULT 'WEEKLY_CALENDAR',
    default_interval_hours NUMERIC(6,2) NOT NULL DEFAULT 168.00,
    preset_notes TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. AGENT ACCOUNTS
CREATE TABLE public.agent_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    provider_id UUID NOT NULL REFERENCES public.providers(id) ON DELETE RESTRICT,
    account_label VARCHAR(100) NOT NULL,
    account_identifier_masked VARCHAR(100),
    reset_cycle reset_cycle_type NOT NULL DEFAULT 'WEEKLY_CALENDAR',
    interval_hours NUMERIC(6,2) NOT NULL DEFAULT 168.00,
    anchor_day_of_week INT DEFAULT 1,
    anchor_time TIME NOT NULL DEFAULT '00:00:00',
    anchor_timezone VARCHAR(50) NOT NULL DEFAULT 'UTC',
    last_depleted_at TIMESTAMPTZ,
    next_reset_at TIMESTAMPTZ NOT NULL,
    readiness_status account_readiness_type NOT NULL DEFAULT 'READY',
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. SUBSCRIPTIONS
CREATE TABLE public.subscriptions (
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

-- 5. NOTIFICATION LOGS
CREATE TABLE public.notification_logs (
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

-- 6. PUSH SUBSCRIPTIONS & RLS
CREATE TABLE public.push_subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    endpoint TEXT NOT NULL UNIQUE,
    p256dh_key TEXT NOT NULL,
    auth_key TEXT NOT NULL,
    user_agent TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.push_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Providers viewable by authenticated" ON public.providers FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users manage own accounts" ON public.agent_accounts FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users manage own subscriptions" ON public.subscriptions FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users manage own notifications" ON public.notification_logs FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users manage own push subs" ON public.push_subscriptions FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
```
