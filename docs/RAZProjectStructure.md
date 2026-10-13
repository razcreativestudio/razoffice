# RAZ Office - Struktur Proyek (Project Structure)
**Versi:** 1.0.0  
**Tanggal:** 13 Oktober 2026  
**Standar:** Standar Direktori & Naming Convention RAZ Enterprise

---

## 1. Ikhtisar Hierarki Direktori
Berikut adalah peta struktur direktori dan fungsi masing-masing komponen di dalam proyek **RAZ Office**:

```text
razoffice/
├── app/                              # Next.js 16 App Router Directory
│   ├── (img)/                        # Route handler dinamis untuk generator image/OG
│   │   └── og.png/route.tsx          # Dynamic OpenGraph image generator
│   ├── (main)/                       # Route group untuk layout utama dashboard
│   │   ├── about/page.tsx            # Halaman Informasi & Tentang RAZ Office
│   │   ├── settings/page.tsx         # Halaman Pengaturan (Bahasa, Tema Editor, dsb)
│   │   ├── template/                 # Halaman Katalog Templat Dokumen (Docx, Xlsx, Pptx)
│   │   ├── layout.tsx                # Shell layout utama (Header, Sidebar, Area Konten)
│   │   ├── opengraph-image.tsx       # Metadata gambar OG
│   │   └── page.tsx                  # Beranda utama (File Picker & Recent Files)
│   ├── editor/                       # Ruang Kerja Penyunting Dokumen (Full-Screen Editor)
│   │   ├── layout.tsx                # Layout isolasi khusus editor iframe
│   │   └── page.tsx                  # Engine penyunting (menghubungkan iframe ONLYOFFICE ke mock backend)
│   ├── favicon.ico                   # Favicon browser
│   ├── globals.css                   # Konfigurasi Tailwind CSS v4 & variabel warna root
│   ├── layout.tsx                    # Root Layout HTML/Body dan provider konteks
│   ├── robots.ts                     # Konfigurasi SEO crawler
│   └── sitemap.ts                    # Generator XML sitemap
│
├── backup/                           # Direktori Terpusat Cadangan Kode (Sesuai Aturan GEMINI.md)
│   └── (File backup pra-modifikasi disimpan di sini)
│
├── components/                       # Komponen Antarmuka Pengguna (UI Components)
│   ├── image/                        # Komponen penampil gambar dokumen
│   ├── main/                         # Komponen halaman utama dashboard
│   │   ├── about-view.tsx            # Tampilan halaman tentang aplikasi
│   │   ├── header.tsx                # Header navigasi & tombol aksi cepat pembuatan dokumen
│   │   ├── mobile-nav.tsx            # Navigasi responsif untuk perangkat mobile / tablet
│   │   ├── open-view.tsx             # Area drop file, picker lokal & cloud, daftar dokumen terakhir
│   │   ├── settings-view.tsx         # Antarmuka panel preferensi dan konfigurasi tema
│   │   ├── sidebar.tsx               # Sidebar navigasi dashboard & ekstensi browser
│   │   └── template-view.tsx         # Galeri templat siap pakai beraneka format
│   ├── svg/                          # Ikon dan ilustrasi vektor (Format SVG/React)
│   │   └── index.ts                  # Export koleksi SVG (Logo, tema preview, dll)
│   ├── ui/                           # Komponen UI atomik berbasis Radix UI
│   │   ├── button.tsx
│   │   ├── dialog.tsx
│   │   ├── popover.tsx
│   │   ├── select.tsx
│   │   └── tooltip.tsx
│   ├── document-icon.tsx             # Ikon spesifik format dokumen (DOCX, XLSX, PPTX, PDF)
│   ├── drag-drop-overlay.tsx         # Overlay visual saat pengguna menyeret file ke layar
│   ├── extension-prompt.tsx          # Banner petunjuk instalasi ekstensi desktop/browser
│   ├── file-picker-card.tsx          # Kartu pengunggah file dengan dukungan Uppy & Cloud Drives
│   ├── i18n-provider.tsx             # Provider internasionalisasi next-intl
│   └── install-extension-dialog.tsx  # Dialog kustom untuk ekstensi pendukung
│
├── docs/                             # Dokumentasi Arsitektur & Operasional RAZ Enterprise
│   ├── RAZProjectPlan.md             # Rencana proyek dan tahapan pengembangan
│   ├── RAZProjectStructure.md        # Peta arsitektur dan struktur file (dokumen ini)
│   ├── RAZGuide.md                   # Panduan operasional, pengembangan, dan deployment
│   ├── RAZImplementation.md          # Log implementasi tahapan teknis
│   └── RAZUpdateHistory_2026-10-13.md# Catatan harian aktivitas dan perubahan kode
│
├── hooks/                            # Custom React Hooks
│   ├── use-debounce.ts               # Hook debounce interaksi input pencarian
│   ├── use-page-title.ts             # Hook sinkronisasi judul halaman dinamis
│   └── use-window-size.ts            # Hook responsivitas viewport
│
├── i18n/                             # Konfigurasi Multi-Bahasa
│   ├── request.ts                    # Inisialisasi request handler next-intl
│   └── routing.ts                    # Logika routing berdasarkan locale
│
├── lib/                              # Utilitas umum & pustaka inti
│   ├── document-types.ts             # Metadata tipe dokumen dan warna representatif
│   └── utils.ts                      # Penggabung class CSS (clsx + tailwind-merge)
│
├── messages/                         # Kamus Terjemahan Internasional (52 Bahasa)
│   ├── id.json                       # Terjemahan Bahasa Indonesia
│   ├── en.json                       # Terjemahan Bahasa Inggris
│   └── ...                           # Terjemahan bahasa dunia lainnya
│
├── public/                           # Aset Statis Publik
│   ├── logo.svg                      # Logo vektor aplikasi
│   ├── templates/                    # Sampel file template docx, xlsx, pptx dan pratinjaunya
│   ├── v9.3.0.24-1/                  # Bundle inti ONLYOFFICE Web-Apps (SDKJS & Dokumen Editor)
│   └── x2t/                          # Binary WebAssembly pengonversi format (x2t.wasm + worker)
│
├── store/                            # State Management Terpusat (Zustand)
│   └── index.ts                      # Store aplikasi: tema, bahasa, preferensi, riwayat file
│
├── types/                            # Deklarasi Type Definition TypeScript
│   └── global.d.ts                   # Ekstensi tipe window dan global interfaces
│
└── utils/                            # Mesin Logika Khusus Editor & File Converter
    ├── editor/                       # Core in-browser mock server ONLYOFFICE
    │   ├── empty.ts                  # Raw binary templates kosong (DOCX, XLSX, PPTX)
    │   ├── fetch.ts                  # Interseptor Fetch API untuk iframe editor
    │   ├── plugins.ts                # Pengelola plugin ONLYOFFICE
    │   ├── server.ts                 # Virtual Document Server (pengganti DocumentServer backend)
    │   ├── socket.ts                 # Virtual WebSocket emulator (sinkronisasi perubahan lokal)
    │   ├── types.ts                  # Definisi data komunikasi editor dan peserta sesi
    │   ├── utils.ts                  # Utilitas bantu penentuan MIME type dan URL
    │   ├── x2t.ts                    # Antarmuka komunikasi dengan Web Worker WASM x2t
    │   ├── x2t.worker.ts             # Background worker pemroses konversi berkas binary
    │   └── xhr.ts                    # Interseptor XMLHttpRequest
    ├── desktop.ts                    # Integrasi kemampuan desktop & electron wrapper
    ├── extension.ts                  # Integrasi ekstensi browser Chromium
    └── recent-files.ts               # Abstraksi database lokal IndexedDB (idb)
```

---

## 2. Aturan Penamaan File Baru (RAZ Convention)
Sesuai aturan mutlak di file `GEMINI.md`:
* Setiap file baru yang ditambahkan ke dalam proyek ini WAJIB menggunakan awalan `RAZ` (contoh: `RAZModalDialog.tsx`, `RAZBrandingConfig.ts`, `RAZThemeSelector.tsx`).
* Modul utilitas atau helper baru wajib diletakkan di direktori yang sesuai dengan tanggung jawab arsitekturalnya.
