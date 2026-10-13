<!--
  Proyek: RAZ Office
  Pembaruan Terakhir: 13 Oktober 2026
  Deskripsi: README Utama sebagai Single Source of Truth Proyek RAZ Office
-->

<p align="center">
  <img src="./public/logo.svg" width="120" height="120" alt="RAZ Office Logo">
</p>

<h1 align="center">RAZ Office</h1>

<p align="center">
  <strong>Solusi Suite Dokumen Perkantoran Modern, Berbasis Web & Local-First (Word, Excel, PowerPoint, PDF).</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-0.1.0-blue.svg" alt="Version">
  <img src="https://img.shields.io/badge/framework-Next.js%2016-black.svg" alt="Framework">
  <img src="https://img.shields.io/badge/standard-RAZ%20Enterprise-success.svg" alt="Standard">
  <img src="https://img.shields.io/badge/license-AGPL%20v3-orange.svg" alt="License">
</p>

---

## 🚀 Ringkasan Proyek
**RAZ Office** adalah aplikasi perkantoran web mutakhir yang menghadirkan pengalaman membuka, membaca, dan menyunting dokumen Microsoft Office (`.docx`, `.xlsx`, `.pptx`) serta pratinjau `.pdf` secara instan langsung di peramban web tanpa memerlukan instalasi software desktop dan tanpa mengunggah dokumen Anda ke server pihak ketiga (**Local-First & Privacy-Focused**).

Dengan memanfaatkan kekuatan WebAssembly (**x2t WASM**) serta mesin inti **ONLYOFFICE Web-Apps SDK**, seluruh pemrosesan dokumen dieksekusi secara terisolasi di sisi klien (*client-side*).

---

## ✨ Fitur Unggulan
- 📂 **Multi-Format Tanpa Konversi Server**: Mendukung dokumen Word (`.docx`, `.doc`), Excel (`.xlsx`, `.xls`), PowerPoint (`.pptx`, `.ppt`), dan berkas PDF.
- 🔒 **Privasi Mutlak (Local-First)**: Berkas diproses sepenuhnya di browser pengguna; data tidak diunggah ke cloud pihak ketiga.
- ⚡ **Kinerja Tinggi**: Dibangun dengan Next.js 16 (Turbopack) & Tailwind CSS v4 untuk kecepatan loading instan.
- 📦 **Penyimpanan Riwayat Lokal**: Menggunakan IndexedDB untuk mengingat riwayat dokumen yang baru saja dibuka.
- 🎨 **Antarmuka Enterprise Premium**: Mendukung tema Modern Dark, Modern Light, Classic Light, dan High Contrast dengan palet visual presisi.
- 🌐 **Dukungan Multi-Bahasa**: Tersedia 52 bahasa termasuk Bahasa Indonesia dan Bahasa Inggris.

---

## 🛠️ Tumpukan Teknologi (Tech Stack)
- **Framework Utama**: [Next.js 16](https://nextjs.org/) (React 19, Turbopack, Static Export)
- **Mesin Dokumen**: [ONLYOFFICE Web-Apps](https://github.com/ONLYOFFICE/web-apps) & [x2t WASM](https://github.com/cryptpad/onlyoffice-x2t-wasm)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Komponen UI**: [Radix UI](https://www.radix-ui.com/), [Tailwind CSS v4](https://tailwindcss.com/), dan [Lucide Icons](https://lucide.dev/)
- **Database Lokal**: [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) via `idb`
- **Sistem Internasionalisasi**: `next-intl`

---

## 📂 Dokumentasi Resmi RAZ Enterprise
Seluruh dokumentasi teknis dan arsitektur tersimpan di folder `docs/`:
1. [Rencana Proyek & Roadmap (`RAZProjectPlan.md`)](file:///c:/laragon/www/razoffice/docs/RAZProjectPlan.md)
2. [Peta Struktur Direktori (`RAZProjectStructure.md`)](file:///c:/laragon/www/razoffice/docs/RAZProjectStructure.md)
3. [Panduan Pengembang & Pengguna (`RAZGuide.md`)](file:///c:/laragon/www/razoffice/docs/RAZGuide.md)
4. [Log Implementasi Bertahap (`RAZImplementation.md`)](file:///c:/laragon/www/razoffice/docs/RAZImplementation.md)
5. [Riwayat Pembaruan Harian (`RAZUpdateHistory_2026-10-13.md`)](file:///c:/laragon/www/razoffice/docs/RAZUpdateHistory_2026-10-13.md)

---

## 💻 Memulai Pengembangan Lokal

### 1. Prasyarat
- Node.js versi 20 atau lebih baru (direkomendasikan Node.js v25)
- pnpm (v9+ atau v12+)

### 2. Kloning Repositori
```bash
git clone https://github.com/razcreativestudio/razoffice.git
cd razoffice
```

### 3. Instalasi Dependensi
```bash
pnpm install
```

### 4. Menjalankan Server Pengembangan
```bash
pnpm run dev
```
Buka browser pada alamat [http://localhost:3000](http://localhost:3000).

### 4. Kompilasi Produksi (Static Export)
```bash
pnpm run build
```

---

## 📜 Lisensi & Atribusi
Proyek ini dilisensikan di bawah **GNU Affero General Public License Version 3 (AGPL v3)**.

Apresiasi khusus kepada:
- [ONLYOFFICE Web Apps](https://github.com/ONLYOFFICE/web-apps)
- [OnlyOffice x2t WASM (CryptPad)](https://github.com/cryptpad/onlyoffice-x2t-wasm)
- [ONLYOFFICE SDKJS](https://github.com/ONLYOFFICE/sdkjs)
- [Office Website (Bao Tlake)](https://github.com/baotlake/office-website)
