# Engineering Rules & Anti-AI-Slop Guidelines (RULES.md)
## Project: ChronosAI (AI Agent Reset & Subscription Pulse)
### Multi-Agent Governance, Living Prototype Contract, Theme Mechanics & Production Standards

---

| Rule Document Metadata | Detail |
| :--- | :--- |
| **Applicable Project** | **ChronosAI** (PWA Multi-Agent Reset & Subscription Watcher) |
| **Target Audience** | All AI Agents (Router, Backend, Frontend, UI/UX, 3D, QA, Security, Critic) & Human Engineers |
| **Enforcement Level** | **STRICT / ZERO TOLERANCE** (Violations block PR & Deployment) |
| **Living Blueprint Contract** | [design/prototype.html](file:///c:/Users/ASUS/Documents/Web%20Dev/improving/notifikasi-weekly-reset-gemini/design/prototype.html) |
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

### ⌨️ Aturan 1.3: Typewriter & Auto-Typing Animation Protocol (Anti-Layout Shift)
* **Zero Cumulative Layout Shift (CLS = 0)**: Elemen yang menjalankan animasi mengetik (*typewriter*) pada banner rekomendasi atau headline **WAJIB** memiliki `min-height` terkunci (misal `min-h-[28px]` atau `min-h-[32px]`) agar saat karakter diketik satu per satu, tinggi baris tidak berguncang (*no layout jump*).
* **Blinking Cursor GPU-Accelerated**: Indikator kursor mengetik (`█` untuk Hacker, `|` untuk Cute & Obsidian) wajib menggunakan animasi CSS berkedip (`animate-pulse` atau `@keyframes blink`) berbasis opacity tanpa layout thrashing.
* **Safe Cadence & Timeout Cleansing**: Animasi mengetik karakter per karakter menggunakan kecepatan organik (45ms - 75ms per karakter) dan wajib membersihkan `clearTimeout` sebelum memulai pengetikan baru untuk mencegah proses balapan (*race condition*).

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
3. **Typewriter Mechanics Check**: Banner rekomendasi armada mengetik sendiri dengan kursor aktif tanpa memicu *layout shift*.
4. **Data Produksi Realistis**: Teruji menggunakan data 5 provider AI terkemuka.
5. **Independent Review & Token-Efficient Verification**: Kode diverifikasi melalui inspeksi statis atau review logika tanpa memanggil Playwright otomatis (kecuali diminta eksplisit oleh pengguna).

---

## 7. Kebijakan Konservasi Token & Pembatasan Tool (Playwright Policy)

### 🚫 Aturan 7.1: Larangan Penggunaan Otomatis Skill Playwright (Hemat Token)
* **DILARANG MENGGUNAKAN SKILL PLAYWRIGHT SECARA OTOMATIS**: Seluruh agen AI **DILARANG** memanggil skill Playwright (`playwright`, `playwright-skill`, Playwright MCP, browser subagent, atau perintah automasi browser lainnya) atas inisiatif sendiri demi menghemat konsumsi token (*token conservation / anti-waste*).
* **PENGECUALIAN TUNGGAL**: Skill Playwright **HANYA BOLEH DIGUNAKAN JIKA DAN HANYA JIKA USER SECARA EKSPLISIT MEMINTA PENGUJIAN MENGGUNAKAN PLAYWRIGHT/BROWSER**.
* **Metode Verifikasi Default**:
  * Lakukan verifikasi berbasis pembacaan kode statis (*static inspection / code review*).
  * Uji logika menggunakan script / command shell lokal yang ringan.
  * Berikan instruksi kepada pengguna untuk merefresh dan mencoba antarmuka langsung di browser pengguna.

---

## 8. Kebijakan Platform: Android PWA & Desktop Only (Zero iOS Policy)

### 🚫 Aturan 8.1: Larangan Kompromi Arsitektur iOS (Zero iOS Rule)
* **DILARANG MENGALOKASIKAN RESOURCES UNTUK EKOSISTEM IOS**: Seluruh agen AI **DILARANG** menambahkan polyfill Safari WebKit, workaround Apple APNs, atau konfigurasi khusus iOS yang memperumit basis kode.
* **FOKUS 100% ANDROID PWA & DESKTOP WEB**:
  * **Android WebAPK Engine**: PWA dioptimalkan untuk instalasi native di sistem operasi Android (Chromium engine) dengan manifest adaptive icon dan theme color dinamis.
  * **Android Vibration / Haptic API**: Ketika limit kuota terpicu atau alert H-7 diterima, wajib memanggil `navigator.vibrate([100, 50, 100])` untuk memberikan konfirmasi sensorik nyata pada smartphone Android.
  * **Android Back Button Lifecycle**: Event `popstate` atau gestur back swipe Android **WAJIB** menutup dialog, drawer, atau bottom sheet yang sedang terbuka terlebih dahulu sebelum menutup atau berpindah halaman.
  * **Thumb-Zone Navigation**: Tampilan mobile Android wajib menempatkan navigasi utama di bagian bawah layar (*Floating Bottom Bar*) agar mudah dijangkau ibu jari pengguna.
  * **App Badging API**: Sinkronkan jumlah notifikasi unread dengan icon badge Android via `navigator.setAppBadge(count)`.

---

## 9. Standar Analisa Perilaku Pengguna & Telemetri UX (Behavioral UX Ethics)

### 📊 Aturan 9.1: Pengukuran 6 Dimensi UX Tanpa Pelanggaran Privasi
* Sistem analitik perilaku pengguna wajib melacak 6 indikator utama:
  1. *Panic Depletion Frequency*: Jam-jam kritis developer kehabisan kuota (14:00 - 17:00 WIB).
  2. *Hot-Swap Latency*: Waktu reaksi beralih dari akun limit ke akun rekomendasi (< 3 detik target).
  3. *Theme Dwell Time*: Durasi penggunaan per tema untuk mendeteksi kelelahan visual (*eye strain*).
  4. *Subscription Cliff Reaction*: Tingkat kesadaran pengguna terhadap peringatan jatuh tempo H-7/H-3.
  5. *Android PWA Retention & Dismissal*: Rasio interaksi vs *swipe-away* pada push notification HP.
  6. *Perceived Latency (CLS = 0)*: Kepastian nol pergeseran antarmuka saat typewriter atau data dimuat.
* **Privacy-First Telemetry**: Seluruh pencatatan event perilaku bersifat teragregasi secara anonim tanpa menyimpan data kredensial, token API, atau identitas pribadi pengguna (*Zero PII*).

---

## 10. Kebijakan Struktur Monorepo & Gate "HTML Blueprint Kasar Dahulu"

### 📦 Aturan 10.1: Struktur Monorepo Terstruktur (UI Only, Backend Nanti)
* **Pemisahan Folder Monorepo**:
  * `design/`: Folder blueprint dan purwarupa HTML kasar interaktif mandiri ([`design/prototype.html`](file:///c:/Users/ASUS/Documents/Web%20Dev/improving/notifikasi-weekly-reset-gemini/design/prototype.html)).
  * `apps/web`: Aplikasi frontend Next.js 15 PWA berbasis TypeScript dan Tailwind CSS (khusus antarmuka tampilan).
  * `packages/`: Komponen/tipe shared jika dibutuhkan di masa mendatang.
  * `backend`: **DITUNDA SEPENUHNYA (PENDING)**. DILARANG membuat atau mengembangkan backend sebelum ada instruksi eksplisit dari pengguna.
* **Root Workspace Control**: Seluruh perintah eksekusi dari root dikelola melalui npm workspaces (`npm run dev --workspace=apps/web`).

### 🛑 Aturan 10.2: Policy Gate "Tampilan Kasar HTML Dahulu" (Human-in-the-Loop Confirmation)
* **DILARANG LANGSUNG CODING KE MONOREPO**: Seluruh agen AI **DILARANG KERAS** langsung melakukan implementasi kode atau perubahan ke dalam project monorepo (`apps/web`) sebelum mendapatkan konfirmasi eksplisit dari pengguna.
* **WORKFLOW MUTLAK SETIAP FITUR / PERANCANGAN BARU**:
  1. **Langkah 1 (Tampilan Kasar HTML)**: Setiap ada ide, perancangan, atau penambahan fitur baru, AI **WAJIB** membangun dan memvisualisasikannya ke dalam berkas tampilan kasar HTML ([`design/prototype.html`](file:///c:/Users/ASUS/Documents/Web%20Dev/improving/notifikasi-weekly-reset-gemini/design/prototype.html)) terlebih dahulu.
  2. **Langkah 2 (Testing & Review Pengguna)**: Pengguna akan membuka berkas HTML kasar tersebut di browser untuk memeriksa alur (*flow*), interaktivitas tombol, tata letak, dan kecocokan desain.
  3. **Langkah 3 (Menunggu Konfirmasi Resmi)**: AI **WAJIB BERHENTI** dan menanyakan persetujuan kepada pengguna.
  4. **Langkah 4 (Baru Boleh ke Monorepo)**: HANYA SETELAH pengguna memberikan konfirmasi resmi (misalnya: *"saya konfirmasi mulai project monorepo"*), agen Builder baru diizinkan mentransfer atau mengimplementasikan kode tersebut ke dalam `apps/web`.

