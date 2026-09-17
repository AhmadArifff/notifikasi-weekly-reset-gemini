# Product Requirements Document (PRD)
## Project: ChronosAI (AI Agent Reset & Subscription Pulse)
### Cross-Platform PWA for Multi-Agent Quota Reset & Subscription Management

---

| Document Metadata | Detail |
| :--- | :--- |
| **Project Name** | **ChronosAI** (Weekly & Rolling AI Reset & Subscription Watcher) |
| **Document Version** | `v1.4.0` (Subscription Trial/Discounts, H-7 Alerts & Desktop Notification Center) |
| **Author** | Senior Product Manager, Genjutsu Design Architect & Enterprise System Engineer |
| **Status** | Approved for Development |
| **Target Platforms** | Cross-Platform PWA (Mobile iOS/Android, Tablet, Desktop Web) |
| **Tech Stack Foundation** | Next.js 15+ (App Router) / React 19 / TypeScript (Strict) |
| **Living Prototype Contract** | [prototype.html](file:///c:/Users/ASUS/Documents/Web%20Dev/improving/notifikasi-weekly-reset-gemini/prototype.html) |
| **Design Engines Applied** | Genjutsu (`@paint`, `@cast`), Magic UI, Three.js 3D, Motion (Disney Principles) |
| **Themes Supported** | 1. 🎀 Kawaii Dream (Feminine Pastel) | 2. 💀 Cyber-Virus Matrix | 3. 💎 Obsidian Pro High-Tech |
| **Notification Architecture** | 📱 **Mobile**: Native Web Push PWA (VAPID) <br> 💻 **Laptop/Desktop**: In-App Notification Center (Read/Unread) |
| **Hosting & Deployment** | Vercel (Edge Network + Serverless Functions) |

---

## 1. Executive Summary

**ChronosAI** adalah aplikasi Progressive Web App (PWA) generasi baru yang dirancang untuk memantau kuota mingguan/rolling akun AI (Antigravity, Claude Code, Cursor, OpenCode, Gemini, Codex) serta manajemen siklus penagihan langganan finansial.

Sesuai kebutuhan nyata pengguna di lapangan:
1. **Siklus Langganan, Durasi & Peringatan H-7**: Pengguna menginput **Tanggal Awal Mulai Langganan** dan **Berapa Lama Durasi Langganan** (misal: 1 bulan, 4 bulan, 1 tahun). Sistem otomatis menghitung tanggal berakhir dan memicu peringatan dini **H-7**, **H-3**, dan **H-1** sebelum masa berlaku habis.
2. **Fleksibilitas Promo: Diskon & Masa Trial (Contoh: Antigravity)**: Mendukung konfigurasi harga fleksibel untuk kasus nyata seperti **Trial Gratis 4 Bulan lalu mulai bayar di Bulan ke-5**, atau harga diskon promo khusus (harga coret vs harga bayar).
3. **Arsitektur Notifikasi Terpisah (Mobile Push vs Laptop Read/Unread)**:
   * 📱 **Di HP (Mobile)**: Notifikasi dikirim langsung via **PWA Web Push Native (VAPID)** sehingga berdering di layar kunci HP meskipun aplikasi sedang ditutup.
   * 💻 **Di Laptop / Desktop**: Tersedia **Elemen Pusat Notifikasi (*In-App Notification Center*)** berbentuk ikon lonceng interaktif dengan *badge counter* belum dibaca (*unread count*), serta tombol filter untuk menandai pesan **Sudah Dibaca (*Mark as Read*)** atau **Belum Dibaca (*Mark as Unread*)**. *(Catatan: Integrasi Discord ditiadakan sesuai arahan pengguna)*.
4. **Tri-Theme Personality Engine**:
   * 🎀 **Kawaii Dream (Feminine Pastel)**: Palet strawberry milk, kartu awan putih kontras tinggi, tombol membal squishy mochi, dan maskot 3D kawaii.
   * 💀 **Cyber-Virus Matrix**: Layar hitam pekat dengan Matrix Digital Rain, teks scramble auto-typing, dan cyber skull glitch.
   * 💎 **Obsidian Pro High-Tech**: Glassmorphism gelap premium dengan Border Beam Magic UI.

---

## 2. Living Interactive Prototype Blueprint (`prototype.html`)

Berkas **[prototype.html](file:///c:/Users/ASUS/Documents/Web%20Dev/improving/notifikasi-weekly-reset-gemini/prototype.html)** adalah acuan wajib (*Single Source of Truth*) yang mengimplementasikan seluruh alur interaktif:
* Formulir langganan dengan input tanggal mulai, durasi langganan, dan pengaturan trial/diskon.
* Elemen lonceng notifikasi di header laptop dengan status sudah/belum dibaca.
* Tiga tema interaktif yang berganti secara *real-time*.

---

## 3. Fitur Utama & Functional Requirements (Epics)

### 3.1 EPIC 1: Master Data Provider & Smart Presets
* Master data provider AI dinamis di database Supabase (`providers`).
* Metadata mencakup: Ikon SVG tajam, warna aksen, dan preset reset bawaan (Antigravity 7 hari pool, Claude Code 5 jam rolling, Cursor 500 fast requests).

### 3.2 EPIC 2: Multi-Account Management per Provider
* Menautkan banyak akun per provider dengan label pengenal unik dan identitas yang disamarkan (*masked identifier*).

### 3.3 EPIC 3: Precision Reset & Rolling Window Engine
* Mode jadwal kalender (tahan DST & IANA Timezone).
* Mode Rolling Window dengan tombol aksi cepat **"Limit Kena Sekarang!"** yang seketika memulai hitungan mundur rolling hours.
* Auto-rollover atomik ke siklus berikutnya setelah waktu reset terlewati.

### 3.4 EPIC 4: Smart Fleet Recommender (Readiness Matrix)
* Status Kesiapan Armada: 🟢 `READY NOW (100%)`, 🟡 `RESET IMMINENT`, 🔴 `RECHARGING`.
* Banner rekomendasi cerdas yang menunjuk akun mana yang harus digunakan saat ini.

### 3.5 EPIC 5: Subscription Lifecycle, Durasi & Promo Engine (Diskon & Trial)
* **FR-5.1 (Tanggal Mulai & Durasi)**:
  * Pengguna memasukkan `start_date` (Tanggal Awal Mulai Langganan).
  * Pengguna memilih `duration_months` (Durasi: 1 Bulan, 3 Bulan, 6 Bulan, 12 Bulan, atau Kustom).
  * Sistem otomatis menghitung `end_date = start_date + duration_months`.
* **FR-5.2 (Skema Promo: Diskon & Trial Bertahap)**:
  * Opsi Tipe Biaya:
    1. **Reguler**: Harga standar per bulan (misal $20/bln).
    2. **Diskon Promo**: Menyimpan harga asli (`regular_price`) dan harga diskon (`discounted_price`).
    3. **Trial Bertahap (Contoh: Antigravity)**: Menyimpan `trial_duration_months = 4` (Harga $0 untuk 4 bulan pertama), lalu `paid_start_month = 5` dengan nominal bayar normal (misal $30/bln mulai bulan ke-5).
* **FR-5.3 (Peringatan Dini H-7, H-3, H-1)**:
  * Sistem memicu pengingat tagihan saat H-7 sebelum masa berlaku habis atau sebelum auto-debet bulan ke-5 berlangsung.

### 3.6 EPIC 6: Dual Notification Engine (Mobile Push vs Laptop Notification Center)
* **FR-6.1 (Mobile Web Push PWA)**:
  * Menggunakan Service Worker dan VAPID keys.
  * Mengirim notifikasi native ke smartphone saat H-2 jam sebelum reset akun dan H-7 sebelum langganan habis.
* **FR-6.2 (Laptop/Desktop In-App Notification Center)**:
  * Ikon Lonceng di Header dengan *badge counter* jumlah pesan yang belum dibaca (*unread count*).
  * Menu dropdown notifikasi interaktif yang menampilkan daftar riwayat notifikasi.
  * Status per item: **Belum Dibaca (*Unread*)** vs **Sudah Dibaca (*Read*)**.
  * Tombol aksi:
    * *"Tandai Semua Sudah Dibaca"*
    * Toggle per item: *"Tandai Sudah Dibaca"* / *"Tandai Belum Dibaca"*
    * Filter tab: *Semua* vs *Belum Dibaca*.

### 3.7 EPIC 7: Data Portability (Export & Import JSON)
* Ekspor dan impor konfigurasi akun dan data langganan secara lengkap ke format file `.json`.

---

## 4. Database Schema & Data Models (Supabase PostgreSQL 16)

```sql
-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUMS
CREATE TYPE reset_cycle_type AS ENUM (
    'HOURLY', 
    'DAILY_CALENDAR', 
    'WEEKLY_CALENDAR', 
    'MONTHLY_CALENDAR', 
    'ROLLING_WINDOW', 
    'CUSTOM_HOURS'
);
CREATE TYPE subscription_status_type AS ENUM ('ACTIVE', 'TRIAL', 'PAUSED', 'CANCELLED');
CREATE TYPE pricing_scheme_type AS ENUM ('REGULAR', 'DISCOUNTED', 'TRIAL_THEN_PAID');
CREATE TYPE account_readiness_type AS ENUM ('READY', 'RESET_IMMINENT', 'RECHARGING');
CREATE TYPE app_theme_type AS ENUM ('HACKER', 'CUTE', 'OBSIDIAN');
CREATE TYPE notif_category_type AS ENUM ('RESET_ALERT', 'SUBSCRIPTION_H7', 'SUBSCRIPTION_H3', 'SYSTEM');

-- 3. PROVIDERS (DYNAMIC MASTER DATA)
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

-- 4. AGENT ACCOUNTS
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

-- 5. SUBSCRIPTIONS (LIFECYCLE, DURATION, DISCOUNT & TRIAL SUPPORT)
CREATE TABLE public.subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    account_id UUID REFERENCES public.agent_accounts(id) ON DELETE SET NULL,
    provider_id UUID NOT NULL REFERENCES public.providers(id) ON DELETE RESTRICT,
    plan_name VARCHAR(100) NOT NULL,
    
    -- Pricing Scheme & Trial Logic
    pricing_scheme pricing_scheme_type NOT NULL DEFAULT 'REGULAR',
    regular_amount NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    discounted_amount NUMERIC(12, 2), -- Optional discounted fee
    is_trial BOOLEAN NOT NULL DEFAULT false,
    trial_duration_months INT DEFAULT 0, -- e.g. 4 bulan gratis
    paid_start_month INT DEFAULT 1, -- e.g. bulan ke-5 mulai bayar
    currency VARCHAR(5) NOT NULL DEFAULT 'USD',
    
    -- Dates & Duration
    start_date DATE NOT NULL DEFAULT CURRENT_DATE,
    duration_months INT NOT NULL DEFAULT 1, -- Durasi langganan dalam bulan
    end_date DATE NOT NULL, -- Dihitung: start_date + duration_months
    next_renewal_date DATE NOT NULL,
    
    -- Notification Preferences
    alert_h_minus_7 BOOLEAN NOT NULL DEFAULT true,
    alert_h_minus_3 BOOLEAN NOT NULL DEFAULT true,
    alert_h_minus_1 BOOLEAN NOT NULL DEFAULT true,
    
    status subscription_status_type NOT NULL DEFAULT 'ACTIVE',
    payment_method_note VARCHAR(100),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. IN-APP NOTIFICATION LOGS (DESKTOP READ / UNREAD SYSTEM)
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

-- 7. PUSH SUBSCRIPTIONS (MOBILE WEB PUSH)
CREATE TABLE public.push_subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    endpoint TEXT NOT NULL UNIQUE,
    p256dh_key TEXT NOT NULL,
    auth_key TEXT NOT NULL,
    user_agent TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. INDEXES & RLS POLICIES
CREATE INDEX idx_agent_accounts_user ON public.agent_accounts(user_id);
CREATE INDEX idx_subscriptions_user_end_date ON public.subscriptions(user_id, end_date);
CREATE INDEX idx_notif_logs_user_unread ON public.notification_logs(user_id, is_read);

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

---

## 5. Validasi Alur Interaksi & Verifikasi Prototype

Pengembangan kode produksi wajib memverifikasi fungsionalitas berikut di [prototype.html](file:///c:/Users/ASUS/Documents/Web%20Dev/improving/notifikasi-weekly-reset-gemini/prototype.html):
1. **Form Tambah Langganan**:
   * Memilih tanggal mulai dan durasi (misal: 4 bulan).
   * Memilih skema biaya: Reguler, Diskon, atau Trial 4 bulan gratis (bayar di bulan ke-5).
   * Otomatis mengkalkulasi tanggal jatuh tempo dan mengaktifkan pengingat H-7.
2. **Pusat Notifikasi Laptop**:
   * Ikon lonceng menampilkan counter angka belum dibaca.
   * Klik lonceng membuka dropdown daftar notifikasi.
   * Tombol "Tandai Sudah Dibaca" / "Tandai Belum Dibaca" memperbarui counter secara instan.
3. **PWA Push Mobile**:
   * Mengirim push banner native ke smartphone saat H-2 jam sebelum reset kuota dan H-7 sebelum langganan habis.
