# RAZ Office — Project Plan & Roadmap

**Versi Dokumen:** 1.1.0  
**Tanggal:** 14 Oktober 2026  
**Penulis:** RAZ Enterprise Core Team  

---

## 🎯 Tujuan Proyek

Proyek **RAZ Office** bertujuan mentransformasikan aplikasi office berbasis web menjadi produk berkelas, modern, dan mandiri dengan standar **RAZ Enterprise**. 

Fokus utamanya adalah menghadirkan aplikasi office yang ringan, cepat, elegan, dan menjamin privasi data 100% lokal (**Local-First & Serverless**). Pengguna bisa langsung ngerjain dokumen Word, spreadsheet Excel, slide presentasi PowerPoint, serta baca PDF langsung di browser tanpa perlu instal software berat dan tanpa perlu langganan cloud server.

---

## 📌 Rencana & Sasaran Utama

1. **Rebranding Total & Visual Identity:**
   - Mengubah identitas lama menjadi **RAZ Office**.
   - Logo vektor emas isometrik 4 layer dengan aksen sudut terlipat yang elegan dan mewah.
   - Penyesuaian tema warna emas metalik yang nyaman di mata baik di mode terang maupun gelap.
   - Rebranding favicon, banner OpenGraph, metadata SEO, dan tampilan editor.

2. **Pengalaman Pengguna (UI/UX) yang Manusiawi & Modern:**
   - Antarmuka beranda yang bersih, intuitif, dan bebas dari iklan atau card ekstensi browser yang mengganggu.
   - Bahasa dan copywriting yang santai, modern, tidak kaku, dan mudah dimengerti orang awam.
   - Dialog konfirmasi kustom (`RAZModal`) untuk setiap aksi interaktif (tanpa popup bawaan browser yang jadul).
   - Card aksi cepat untuk Word, Excel, PowerPoint, dan PDF yang responsif di layar HP maupun desktop.

3. **Kualitas Kode & Dokumentasi Disiplin:**
   - Menjaga kebersihan kode (modularisasi file, zero dummy data).
   - Sistem backup terpusat di folder `backup/` sebelum setiap proses pengeditan.
   - Dokumentasi yang up-to-date dan mudah dipelajari siapapun.

---

## 🗺️ Tahapan Pengerjaan (Milestones)

### Fase 1: Setup Repository & Analisis Awal (Status: SELESAI ✅)
- Clone repository ke `c:\laragon\www\razoffice`.
- Pengecekan build Next.js 16 (Turbopack) dan instalasi package manager `pnpm`.
- Pemetaan alur WebAssembly x2t, Worker, dan virtual server ONLYOFFICE.

### Fase 2: Dokumentasi & Standar Arsitektur (Status: SELESAI ✅)
- Pembuatan dokumen inti: `RAZProjectPlan.md`, `RAZProjectStructure.md`, `RAZGuide.md`, `RAZImplementation.md`, dan log update harian.
- Setup direktori backup terpusat di `backup/`.

### Fase 3: Rebranding Menyeluruh & Logo Emas Isometrik (Status: SELESAI ✅)
- Implementasi logo SVG emas isometrik resmi (`logo.svg`, `Logo.tsx`, `logo-name_black.svg`, `logo-name_white.svg`).
- Penyelarasan identitas nama `RAZ` dan inisial avatar `R`.
- Penggantian remote git resmi ke `razcreativestudio/razoffice`.

### Fase 4: Redesain Beranda & Penghapusan Ekstensi (Status: SELESAI ✅)
- Penghapusan total kartu promosi ekstensi Chrome di sidebar dan popup notifikasi.
- Redesain tampilan beranda dengan banner sambutan eksekutif, dropzone modern, dan hub pembuatan dokumen baru.
- Penyesuaian copywriting menjadi ramah, santai, dan modern.

### Fase 5: Pengujian Akhir & Pemeliharaan Berkelanjutan (Status: SELESAI ✅)
- Uji kompilasi statis `pnpm run build` (13 halaman statis lulus dengan 0 error).
- Verifikasi rute HTTP (Beranda, Template, About, Settings, Editor).
- Sinkronisasi commit dan push ke repository GitHub.
