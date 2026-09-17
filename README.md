# notifikasi-weekly-reset-gemini
## ChronosAI v2.0.0 — AI Fleet Quota & Financial Reset Tracker

Aplikasi Next.js 15 App Router & dedicated **Android PWA (Chromium WebAPK / TWA)** serta Laptop/Desktop Web yang dirancang khusus untuk memantau siklus reset kuota mingguan/rolling akun AI (*Antigravity Google DeepMind, Claude Code, Cursor, Gemini, OpenAI Codex*) serta kalkulasi siklus finansial langganan (Trial 4 bulan ke berbayar $30/bulan, H-7/H-3 alerts, Monthly Burn Rate).

---

### 📂 Dokumen & Aset Utama Proyek

1. 📄 **[PRD.md](PRD.md)**: *Product Requirements Document v2.1.0* — Arsitektur teknis lengkap, skema PostgreSQL Supabase dengan RLS, 4-tier feature matrix, 6 dimensi behavioral analytics UX, dan monorepo workflow.
2. 🛡️ **[RULES.md](RULES.md)**: *Engineering Rules & Anti-AI-Slop Standards* — Standar arsitektur ketat: Aturan 10 (Monorepo & Policy Gate HTML Blueprint First), Zero iOS Rule, Rule 7.1 larangan Playwright, Rule 1.3 anti-CLS typewriter headline, dan Zero-Overlap backdrop drawer.
3. 🎨 **[design/prototype.html](design/prototype.html)**: *Living Interactive HTML Blueprint* — Prototipe HTML mandiri interaktif kasar di folder `design/` yang menjadi gerbang evaluasi awal sebelum fitur masuk ke monorepo.
4. 🏗️ **`apps/web/`**: Aplikasi frontend Next.js 15 App Router, TypeScript, Tailwind CSS, Three.js 3D Mascot, Zustand state store (khusus UI tampilan, backend ditunda).
5. 🗄️ **`supabase/`**: Migration SQL PostgreSQL 16 DDL untuk persiapan backend di masa mendatang.

---

### 🚀 Cara Menjalankan Aplikasi (Monorepo Workspace)

```bash
# 1. Install dependensi monorepo
npm install

# 2. Jalankan development server tampilan web (apps/web)
npm run dev
# Buka http://localhost:3000 di browser

# 3. Build produksi frontend tampilan
npm run build
npm run start
```

---

### 📱 Instalasi Dedicated Android PWA (WebAPK)

1. Buka aplikasi di Chrome / Brave di perangkat Android Anda.
2. Muncul banner *"Tambahkan ChronosAI ke Layar Utama"*.
3. Setelah terpasang, aplikasi berjalan standalone tanpa address bar peramban, mendukung haptic vibration (`navigator.vibrate`), dan push notification background sync.

---

### 🎨 Tiga Tema Interaktif (Tri-Theme Visual Engine)

* 🎀 **Kawaii Dream (Feminine Pastel)**: Palet strawberry milk & peach mochi, kartu awan putih kontras tinggi, tombol membal squishy mochi, dan maskot 3D kawaii.
* ☣️ **Cyber-Virus Matrix (Hacker Extreme)**: Layar hitam pekat dengan Matrix Digital Rain canvas 60fps, teks scramble auto-typing, wireframe torus, dan aksen terminal neon `#00ff41`.
* 💎 **Obsidian Pro High-Tech**: Glassmorphism gelap premium dengan Border Beam Magic UI, aksen emerald, dan tipografi Plus Jakarta Sans.

---

### ⚡ Fitur Kunci yang Diimplementasikan

- **Weekly Calendar Pool Reset (Antigravity)**: Setiap Senin 07:00 UTC (14:00 WIB) dengan 7-Day SVG Circular Gauge dan 4-unit Atomic Countdown Clock.
- **Rolling Window Quota (Claude Code)**: Timer hitungan mundur 5 jam dengan tombol Quick Depletion.
- **Smart Fleet Recommender**: Mesin auto-typing typewriter dengan cyber scramble decoding dan zero layout shift (`min-h-[32px]`).
- **Client Demo Simulator Toolbar**: Simulasi instan H-12 Jam, H-5 Detik Reset Boom, Panic Depletion, dan Waktu Riil.
- **Finansial & Skema Bertahap**: Tabel langganan, pelacakan masa trial 4 bulan Antigravity -> bulan ke-5 bayar $30/bulan, peringatan H-7/H-3, dan ringkasan Monthly Burn Rate.
- **Slide-Over Notification Drawer**: Drawer drawer z-[90] zero overlap dengan filter semua/belum dibaca.
- **3D Mascot Interactive Torus**: WebGL Canvas Three.js interaktif yang dapat dirotasi dengan mouse/touch.
