# RAZ Office - Project Plan & Roadmap
**Versi Dokumen:** 1.0.0  
**Tanggal:** 13 Oktober 2026  
**Penulis / Arsitek:** Antigravity AI Engine (RAZ Enterprise Standards)

---

## 1. Ringkasan Eksekutif
Proyek **RAZ Office** merupakan transformasi dan evolusi tingkat perusahaan (*enterprise-grade*) dari fondasi repositori open-source *Office Website*. Aplikasi ini adalah suite perkantoran berbasis web modern yang mengusung arsitektur **Local-First & Serverless In-Browser Office Document Suite**. Seluruh proses pembacaan, konversi, rendering, dan penyuntingan dokumen (DOCX, XLSX, PPTX, PDF) dieksekusi secara instan dan privat di dalam browser pengguna menggunakan teknologi WebAssembly (x2t WASM) dan ONLYOFFICE SDK / Web-Apps core tanpa memerlukan server backend pengolah dokumen yang mahal dan rentan privasi.

---

## 2. Sasaran Transformasi ke "RAZ Office"
1. **Rebranding Penuh & Identitas Perusahaan:**
   - Mengganti seluruh identitas lama (ZIZIYI / baotlake) menjadi **RAZ Office**.
   - Menghadirkan logo, favicon, tipografi, dan palet visual berstandar RAZ Enterprise (Modern, Presisi, Premium).
   - Penyesuaian metadata OpenGraph, SEO, Schema.org, manifest, dan deskripsi aplikasi.
2. **Kepatuhan Protokol Mutlak (GEMINI.md):**
   - Penerapan penamaan file berawalan `RAZ` untuk semua modul baru.
   - Sistem backup terpusat di folder `backup/`.
   - Dokumentasi terstruktur dan tersinkronisasi (`RAZProjectPlan`, `RAZProjectStructure`, `RAZGuide`, `RAZImplementation`, `RAZUpdateHistory_YYYY-MM-DD`).
   - Komentar edukatif berbahasa Indonesia di setiap modul logika bisnis.
   - UI/UX presisi tinggi dengan Custom Modals (menghilangkan alert/prompt native).
   - Zero Dummy Data: Seluruh data (riwayat, preferensi, pengaturan, template) dikelola dinamis melalui IndexedDB dan konfigurasi terstruktur.
3. **Peningkatan Fitur & UI/UX Enterprise:**
   - Header & Sidebar bermerek RAZ Office dengan interaksi yang mulus dan transisi elegan.
   - Dukungan tema (Modern Dark, Modern Light, Classic, High Contrast) yang konsisten di shell aplikasi maupun editor canvas.
   - Modalisasi kustom untuk dialog konfirmasi simpan, hapus file riwayat, unduhan, dan status konversi.
   - Dukungan multi-bahasa (next-intl) dengan prioritas Bahasa Indonesia dan Bahasa Inggris yang disempurnakan.

---

## 3. Tahapan Pengerjaan (Milestones)

### Fase 1: Kloning, Verifikasi Awal & Analisis Arsitektur (Status: SELESAI ✅)
- Kloning repositori sumber ke `c:\laragon\www\razoffice`.
- Instalasi dependensi dengan `pnpm` dan verifikasi integritas build awal (`next build`).
- Pemetaan alur data, komponen frontend, interseptor Web Worker/WASM, dan i18n.

### Fase 2: Perancangan Arsitektur Dokumen & Standar RAZ (Status: SEDANG BERJALAN 🔄)
- Penyusunan dokumen inti: `RAZProjectPlan.md`, `RAZProjectStructure.md`, `RAZGuide.md`, `RAZImplementation.md`, dan `RAZUpdateHistory_2026-10-13.md`.
- Inisialisasi direktori `backup/` dan penetapan standar penamaan `RAZ*`.

### Fase 3: Rebranding & Desain UI/UX RAZ Office (Fase Berikutnya)
- Penggantian aset visual: logo RAZ Office, favicon, OpenGraph banner.
- Pembaruan teks identitas pada `app/layout.tsx`, `components/main/header.tsx`, `sidebar.tsx`, `about-view.tsx`, `settings-view.tsx`.
- Sinkronisasi file terjemahan `messages/id.json` dan `messages/en.json` untuk terminologi RAZ Office.
- Peningkatan styling antarmuka dengan nuansa premium RAZ Enterprise (Tailwind CSS v4).

### Fase 4: Penguatan Custom Modal & Pencegahan Native Alerts
- Audit dan eliminasi seluruh pemanggilan `alert()`, `confirm()`, atau dialog native browser.
- Integrasi komponen modal seragam dengan Radix UI / Sonner Toast bergaya RAZ Enterprise.

### Fase 5: Pengujian Kinerja, Validasi Responsif & Produksi
- Validasi build lokal (`pnpm run build`).
- Pengujian pembukaan dan penyuntingan file Word (.docx), Excel (.xlsx), dan Presentasi (.pptx).
- Verifikasi penyimpanan lokal di IndexedDB dan penanganan offline/local-first.
- Pemutakhiran dokumen final dan `README.md`.
