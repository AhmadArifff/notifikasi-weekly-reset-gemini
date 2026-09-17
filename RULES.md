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

## 1. Zero Overlap & Layer Stacking Standards (Anti-Tumpang Tindih)

Untuk mencegah dialog, dropdown, atau notifikasi saling tumpang tindih (*z-index conflict / layout clipping*):

### 🚫 Aturan 1.1: Stacking Context & Portal Layering
* **DILARANG** meletakkan dropdown notifikasi mengambang secara `absolute` di dalam header yang memiliki properti `overflow` atau `flex-wrap` tanpa backdrop pembatas. Hal ini memicu elemen terpotong (*clipped*) atau menabrak tombol lain di layar mobile/laptop.
* **WAJIB MENGGUNAKAN POLA SLIDE-OVER DRAWER / BACKDROP MODAL**:
  * Pusat Notifikasi Laptop **WAJIB** memiliki layer backdrop semi-transparan (`fixed inset-0 bg-black/50 backdrop-blur-sm z-50`) dengan panel kartu berbayang tegas di sisi kanan (`fixed top-0 right-0 h-full w-full max-w-md z-50`).
  * Klik di area luar backdrop atau tombol silang (*esc / close*) **WAJIB** menutup panel secara instan tanpa mengacaukan layout di belakangnya.
  * Toast Notifikasi diletakkan pada layer paling atas terpisah (`z-[100]`) di pojok layar dengan batas margin aman (*safe area padding*).

### 🎯 Aturan 1.2: Interactive Completeness Contract (Semua Elemen Wajib Fungsional)
* **DILARANG MENYISAKAN TOMBOL MATI**: Setiap tombol di dalam prototipe dan aplikasi (`Edit Konfigurasi`, `Tautkan Akun`, `Limit Kena Sekarang`, `Tandai Dibaca`, `Filter Notif`, `Uji Push HP`, `Export JSON`, dll.) **WAJIB MEMILIKI AKSI NYATA**:
  * Tombol `Edit Konfigurasi` pada kartu akun wajib memunculkan modal edit yang terisi data akun tersebut dan dapat disimpan atau dihapus secara nyata.
  * Tombol notifikasi yang diklik wajib langsung mengarahkan pengguna ke tab/kartu terkait (misal: klik alert H-7 langsung membuka tab Langganan dan menyorot Antigravity).

---

## 2. Standar Data Produksi Nyata (Production Dataset)

* **DILARANG MENGGUNAKAN DATA ASAL-ASALAN**: Prototipe dan testing wajib menggunakan armada akun AI riil:
  1. **Antigravity (Google DeepMind)**: `deepmind-core-fleet@alpha.corp`, kuota mingguan pool (Senin 07:00 UTC / 14:00 WIB), masa trial 4 bulan gratis (Bulan ke-4 aktif, jatuh tempo H-7, bulan ke-5 bayar $30.00/bln).
  2. **Claude Code (Anthropic)**: `lead-engineer@agency.dev`, rolling window 5 jam ($20.00/bln).
  3. **Cursor Pro (Anysphere)**: `arif.workspace@cursor.sh`, 500 fast requests bulanan (Promo $15.00/bln).
  4. **OpenCode (Open-Source Cluster)**: `vllm-cluster-01.local`, Qwen 2.5 72B & DeepSeek-Coder-V2, rolling 24 jam ($0.00 Self-Hosted).
  5. **OpenAI Codex / ChatGPT Team**: `team-backup@openai.org`, GPT-4o & o3-mini (80 msgs / 3 jam rolling, $25.00/bln).

---

## 3. Aturan Khusus Langganan, Durasi, Promo & Trial

### 📅 3.1 Kalkulasi Tanggal Berakhir & Peringatan H-7
* Tanggal berakhir (`end_date`) **WAJIB** dihitung presisi menggunakan fungsi tanggal resmi (`addMonths(startDate, durationMonths)`).
* Peringatan H-7 aktif saat $\text{end\_date} - \text{CURRENT\_DATE} = 7\text{ hari}$.

### 💰 3.2 Penanganan Masa Trial & Harga Bertahap (Trial-to-Paid)
* Jika `is_trial = true` dengan `trial_duration_months = 4`:
  * Selama bulan ke-1 s/d ke-4, tagihan aktif tercatat senilai **$0.00** (*Free Trial Period*).
  * Pada bulan ke-5 (`paid_start_month = 5`), tagihan beralih ke tarif reguler ($30.00/bln).
  * *Monthly Burn Rate* hanya menghitung akun yang telah aktif membayar.

---

## 4. Arsitektur Notifikasi: Mobile Web Push vs Laptop Notification Drawer

> ⚠️ **CATATAN MUTLAK**: Integrasi Discord Webhook **DITIADAKAN SEPENUHNYA**.

### 📱 4.1 Notifikasi di Smartphone (Mobile Web Push)
* Menggunakan standar **Web Push API** (VAPID) melalui Service Worker.
* Menampilkan native push banner di layar HP saat H-2 jam sebelum reset kuota dan H-7 sebelum langganan habis.

### 💻 4.2 Notifikasi di Laptop / Komputer (In-App Slide-Over Drawer)
* Ikon Lonceng di Header dengan *badge counter* dinamis.
* Drawer samping yang bersih, bebas tumpang tindih, dengan tombol:
  * *"Tandai Semua Sudah Dibaca"*
  * Toggle status per notifikasi (Sudah / Belum Dibaca)
  * Filter tab (*Semua* vs *Belum Dibaca*)
  * Hapus notifikasi (*Delete*)
  * Klik item notifikasi untuk langsung bernavigasi ke akun / tagihan terkait.

---

## 5. Aturan Desain Tri-Theme (Genjutsu UI)

### 🌸 5.1 Tema Kawaii Dream (Feminine Pastel - Default)
* **Kontras Tinggi Anti-Pudar**: Teks utama wajib menggunakan warna **Deep Berry Plum (`#831843`)** di atas kartu awan putih bersih dengan border pink pastel tegas (`#fbcfe8`). Kontras rasio $\ge 7:1$ (Lolos WCAG AA).
* **Fisika Membal (Mochi Physics)**: Tombol menggunakan efek membal squishy saat hover/active (`scale(1.05)` saat hover, `scale(0.95)` saat klik).

### 💀 5.2 Tema Cyber-Virus Matrix (Hacker Extreme)
* **Matrix Digital Rain Canvas**: Background canvas rintik hujan karakter hijau neon (`#00ff41`) di atas latar hitam pekat. Loop animasi wajib dihentikan saat tema tidak aktif atau tab diminimalkan.
* **Text Scramble Auto-Typing**: Teks decoding karakter acak sebelum menampilkan teks asli. Wajib font monospace (`Fira Code`).

### 💎 5.3 Tema Obsidian Pro High-Tech
* Glassmorphism obsidian gelap premium dengan Border Beam Magic UI dan tipografi bersih.

---

## 6. Definition of Done (DoD) & Reviewer Verification

Sebelum kode dinyatakan **DONE**:
1. **Zero Overlap Check**: Seluruh panel notifikasi dan modal form tidak bertabrakan dengan elemen lain di viewport desktop maupun mobile.
2. **Interactive Flow Check**: Seluruh aksi tombol (Edit, Tambah, Hapus, Quick Trigger, Push Test, Export) berfungsi 100%.
3. **Data Produksi Realistis**: Teruji menggunakan data 5 provider AI terkemuka.
4. **Independent Review**: Kode disetujui oleh Reviewer (`qa-engineer` atau `tech-critic`).
