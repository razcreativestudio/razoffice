# RAZ Office — Struktur Folder & Arsitektur Kode

**Versi:** 1.1.0  
**Tanggal:** 14 Oktober 2026  
**Penulis:** RAZ Enterprise Core Team  

---

## 📂 Peta Struktur Folder Proyek

Biar gampang dipahami, berikut denah folder di dalam proyek **RAZ Office** beserta fungsinya masing-masing:

```text
razoffice/
├── app/                              # Halaman & Rute Utama (Next.js 16 App Router)
│   ├── (main)/                       # Halaman tampilan luar (Dashboard)
│   │   ├── about/                    # Halaman About (info RAZ Office & open-source)
│   │   ├── settings/                 # Halaman Pengaturan (ganti tema & bahasa)
│   │   ├── template/                 # Halaman Galeri Template siap pakai
│   │   ├── layout.tsx                # Shell layout (Header, Sidebar, Dark Mode glow)
│   │   └── page.tsx                  # Halaman Beranda (Dropzone & Recent Files)
│   ├── editor/                       # Ruang Kerja Editor Dokumen (Layar Penuh)
│   │   ├── layout.tsx                # Layout khusus editor
│   │   └── page.tsx                  # Canvas editor ONLYOFFICE
│   ├── globals.css                   # Styling global (Tailwind CSS v4 & tema warna emas)
│   └── layout.tsx                    # Root layout browser
│
├── backup/                           # Folder Cadangan Kode (Sesuai Aturan GEMINI.md)
│   └── (Semua backup file pra-modifikasi tersimpan aman di sini)
│
├── components/                       # Komponen Tampilan (UI Components)
│   ├── main/                         # Komponen layar dashboard
│   │   ├── about-view.tsx            # Halaman About bernuansa modern
│   │   ├── header.tsx                # Header atas dengan logo emas RAZ Office
│   │   ├── open-view.tsx             # Halaman beranda utama dengan kartu dokumen
│   │   ├── settings-view.tsx         # Panel pengaturan tema & bahasa
│   │   ├── sidebar.tsx               # Sidebar navigasi bersih (tanpa iklan ekstensi)
│   │   └── template-view.tsx         # Galeri template beraneka kategori
│   ├── ui/                           # Komponen antarmuka atomik
│   │   ├── RAZModal.tsx              # Modal dialog kustom standar RAZ Enterprise
│   │   └── (button, dialog, popover, select, tooltip)
│   ├── document-icon.tsx             # Ikon warna-warni untuk Word, Excel, PPT, PDF
│   ├── drag-drop-overlay.tsx         # Efek layar saat kamu seret file ke aplikasi
│   └── file-picker-card.tsx          # Kartu dropzone modern untuk buka file dari PC
│
├── docs/                             # Dokumen Panduan & Arsitektur
│   ├── RAZGuide.md                   # Panduan user & developer (bahasa santai)
│   ├── RAZImplementation.md          # Log progres pengerjaan bertahap
│   ├── RAZProjectPlan.md             # Rencana kerja & milestone proyek
│   ├── RAZProjectStructure.md        # Dokumen denah folder ini
│   └── RAZUpdateHistory_*.md         # Catatan perubahan harian
│
├── lib/                              # Konfigurasi & Utility Inti
│   ├── RAZBranding.ts                # Pusat nama, logo, tagline, dan info produk
│   ├── document-types.ts             # Pengaturan format dokumen (warna, ekstensi)
│   └── utils.ts                      # Helper fungsi umum
│
├── messages/                         # Kamus Terjemahan Bahasa (i18n)
│   ├── id.json                       # Bahasa Indonesia (gaya santai & kekinian)
│   └── en.json                       # Bahasa Inggris
│
├── public/                           # Aset Statis Publik
│   ├── logo.svg                      # Logo SVG master tumpukan dokumen emas
│   ├── logo-name_black.svg           # Logo toolbar editor (tema terang)
│   ├── logo-name_white.svg           # Logo toolbar editor (tema gelap)
│   ├── x2t/                          # WebAssembly binary (x2t.wasm) untuk konversi dokumen
│   └── files/                        # File template bawaan siap pakai
│
└── utils/                            # Mesin Pemrosesan Dokumen
    ├── editor/                       # Jantung sistem server virtual in-browser
    │   ├── server.ts                 # Virtual DocumentServer di memori
    │   ├── x2t.worker.ts             # Web Worker untuk komputasi di latar belakang
    │   └── utils.ts                  # URL & file helper
    └── recent-files.ts               # Logika penyimpanan riwayat file di IndexedDB
```

---

## 💡 Alur Data Dokumen (Secara Sederhana)

1. **User Membuka File**: File dipilih lewat klik atau di-drag ke dropzone di beranda.
2. **Konversi di Latar Belakang**: File diproses oleh `x2t.worker.ts` memakai WebAssembly tanpa menyentuh server internet.
3. **Penyuntingan di Layar**: Iframe ONLYOFFICE merender dokumen dan terhubung secara virtual ke `server.ts` di memori browser.
4. **Simpan Otomatis**: Riwayat file disimpan di database internal browser (IndexedDB), sehingga riwayat tetap ada waktu halaman ditutup.
