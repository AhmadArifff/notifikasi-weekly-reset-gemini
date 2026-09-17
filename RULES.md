# Engineering Rules & Anti-AI-Slop Guidelines (RULES.md)
## Project: ChronosAI (AI Agent Reset & Subscription Pulse)
### Multi-Agent Governance, Living Prototype Contract, Theme Mechanics & Production Standards

---

| Rule Document Metadata | Detail |
| :--- | :--- |
| **Applicable Project** | **ChronosAI** (PWA Multi-Agent Reset & Subscription Watcher) |
| **Target Audience** | All AI Agents (Router, Backend, Frontend, UI/UX, 3D, QA, Security, Critic) & Human Engineers |
| **Enforcement Level** | **STRICT / ZERO TOLERANCE** (Violations block PR & Deployment) |
| **Living Blueprint Contract** | [prototype.html](file:///c:/Users/ASUS/Documents/Web%20Dev/improving/notifikasi-weekly-reset-gemini/prototype.html) |
| **Companion Specification** | [PRD.md](file:///c:/Users/ASUS/Documents/Web%20Dev/improving/notifikasi-weekly-reset-gemini/PRD.md) |

---

## 1. Aturan Khusus Langganan, Durasi, Promo & Trial

Untuk menangani skema langganan riil developer (seperti Antigravity trial 4 bulan gratis atau promo diskon):

### 📅 1.1 Kalkulasi Tanggal Berakhir & Peringatan H-7
* Tanggal berakhir (`end_date`) **WAJIB** dihitung secara presisi menggunakan fungsi tanggal resmi (`addMonths(startDate, durationMonths)` dari `date-fns`), bukan sekadar perkiraan 30 hari manual.
* **Jadwal Pemicu Peringatan**:
  * Peringatan H-7: Terpicu saat $\text{end\_date} - \text{CURRENT\_DATE} = 7\text{ hari}$.
  * Peringatan H-3: Terpicu saat $\text{end\_date} - \text{CURRENT\_DATE} = 3\text{ hari}$.
  * Peringatan H-1: Terpicu saat $\text{end\_date} - \text{CURRENT\_DATE} = 1\text{ hari}$.

### 💰 1.2 Penanganan Masa Trial & Harga Bertahap (Trial-to-Paid)
* Jika `is_trial = true` dengan `trial_duration_months = 4`:
  * Selama bulan ke-1 s/d ke-4, tagihan aktif tercatat senilai **$0.00** (*Free Trial Period*).
  * Pada bulan ke-5 (`paid_start_month = 5`), sistem otomatis memperbarui tagihan ke nominal reguler (misal $30.00/bln).
  * Kalkulasi *Monthly Burn Rate* di dashboard harus cerdas: tidak boleh memasukkan biaya langganan yang masih dalam status *Free Trial*.

---

## 2. Arsitektur Notifikasi: Mobile Web Push vs Laptop Notification Center

> ⚠️ **CATATAN MUTLAK**: Integrasi Discord Webhook **DITIADAKAN SEPENUHNYA**. Jangan membuat kode, endpoint, atau input form untuk Discord.

### 📱 2.1 Notifikasi di Smartphone (Mobile Web Push)
* Menggunakan standar **Web Push API** (VAPID) melalui Service Worker.
* Notifikasi harus mampu berdering dan memunculkan banner di layar kunci HP pengguna meskipun aplikasi PWA dalam kondisi tertutup.
* Notifikasi mencakup:
  * Pengingat H-2 jam sebelum kuota agent di-reset.
  * Pengingat H-7 sebelum langganan habis atau tagihan pertama trial dimulai.

### 💻 2.2 Notifikasi di Laptop / Komputer (In-App Notification Center)
* Di tampilan desktop/laptop, sistem **WAJIB** menyediakan elemen **Pusat Notifikasi Interaktif** berupa:
  1. Ikon Lonceng di Header dengan indikator angka merah/pink untuk pesan yang **Belum Dibaca (*Unread Count*)**.
  2. Dropdown / Panel drawer yang memuat riwayat notifikasi.
  3. Status per notifikasi: **Belum Dibaca** (titik bercahaya) dan **Sudah Dibaca** (redup).
  4. Aksi interaktif instan (*Optimistic UI*):
     * Tombol *"Tandai Semua Sudah Dibaca"*
     * Tombol toggle per item: *"Tandai Dibaca"* / *"Tandai Belum Dibaca"*
     * Filter tab: *Semua* vs *Belum Dibaca*.

---

## 3. Aturan Desain & Styling Tri-Theme (Genjutsu UI)

### 🌸 3.1 Tema Kawaii Dream (Feminine Pastel - Default)
* **Kontras Tinggi Anti-Pudar**: Teks utama wajib menggunakan warna **Deep Berry Plum (`#831843`)** di atas kartu awan putih bersih dengan border pink pastel tegas (`#fbcfe8`). Kontras rasio $\ge 7:1$ (Lolos WCAG AA).
* **Fisika Membal (Mochi Physics)**: Tombol menggunakan efek membal squishy saat hover/active (`scale(1.05)` saat hover, `scale(0.95)` saat klik).

### 💀 3.2 Tema Cyber-Virus Matrix (Hacker Extreme)
* **Matrix Digital Rain Canvas**: Background canvas rintik hujan karakter hijau neon (`#00ff41`) di atas latar hitam pekat. Loop animasi wajib dihentikan saat tema tidak aktif atau tab diminimalkan.
* **Text Scramble Auto-Typing**: Teks decoding karakter acak sebelum menampilkan teks asli. Wajib font monospace (`Fira Code`).

### 💎 3.3 Tema Obsidian Pro High-Tech
* Glassmorphism obsidian gelap premium dengan Border Beam Magic UI dan tipografi bersih.

---

## 4. Keamanan, Validasi Zod & Vercel Deployment

* **Validasi Skema Zod**: Form langganan wajib memvalidasi `start_date` (format ISO tanggal valid), `duration_months` (angka bulat positif $\ge 1$), dan `regular_amount` (angka non-negatif).
* **Zero Secret Leakage**: Variabel `SUPABASE_SERVICE_ROLE_KEY` dan `VAPID_PRIVATE_KEY` hanya ada di server/edge, tidak pernah berawalan `NEXT_PUBLIC_`.
* **Vercel Headers**: Service worker header `Cache-Control: public, max-age=0, must-revalidate` dan security headers lengkap.

---

## 5. Definition of Done (DoD) & Reviewer Verification

Sebelum kode dinyatakan **DONE**:
1. **Pemeriksaan Keselarasan Prototype**: Alur formulir tanggal mulai, durasi langganan, dan pusat notifikasi lonceng laptop sesuai 100% dengan [prototype.html](file:///c:/Users/ASUS/Documents/Web%20Dev/improving/notifikasi-weekly-reset-gemini/prototype.html).
2. **Tidak Ada Sisa Kode Discord**: Memastikan zero dependencies atau fungsi terkait Discord webhook.
3. **Validasi Notifikasi Laptop**: Fitur ubah status pesan sudah dibaca / belum dibaca berjalan secara reaktif.
4. **Independent Review**: Kode disetujui oleh Reviewer (`qa-engineer` atau `tech-critic`).
