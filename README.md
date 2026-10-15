<!--
  Proyek: RAZ Office
  Pembaruan Terakhir: 14 Oktober 2026
  Deskripsi: README Utama — Panduan & Informasi Lengkap RAZ Office
-->

<p align="center">
  <img src="./public/logo.svg" width="120" height="120" alt="RAZ Office Logo">
</p>

<h1 align="center">RAZ Office</h1>

<p align="center">
  <strong>Aplikasi Office Web Modern, Cepat & 100% Privat di Browser (Word, Excel, PowerPoint, PDF).</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-1.1.0-gold.svg" alt="Version">
  <img src="https://img.shields.io/badge/framework-Next.js%2016-black.svg" alt="Framework">
  <img src="https://img.shields.io/badge/standard-RAZ%20Enterprise-success.svg" alt="Standard">
  <img src="https://img.shields.io/badge/license-AGPL%20v3-orange.svg" alt="License">
</p>

---

## 💡 Apa itu RAZ Office?

**RAZ Office** adalah aplikasi perkantoran berbasis web yang bisa kamu pakai langsung di browser tanpa perlu instal aplikasi berat di komputermu. Kamu bisa buka, baca, dan edit file Microsoft Office (`.docx`, `.xlsx`, `.pptx`) dan pratinjau `.pdf` secara instan!

Yang paling penting: **100% Local-First & Aman**. File kamu nggak pernah di-upload ke server cloud pihak ketiga mana pun. Semua pemrosesan dokumen berjalan langsung di browser perangkatmu sendiri menggunakan teknologi WebAssembly (**x2t WASM**) dan engine **ONLYOFFICE**.

---

## ✨ Fitur Unggulan

- 📂 **Dukungan Format Lengkap**: Buka dan edit file Word (`.docx`, `.doc`), Excel (`.xlsx`, `.xls`), PowerPoint (`.pptx`, `.ppt`), serta file PDF.
- ✍️ **Koleksi Font Melimpah (>1000 Font) & Times New Roman Default**: Pilihan lebih dari 1000 font populer (Windows, Mac, Google Fonts) dengan font standar Times New Roman aktif secara default.
- 📐 **Preset Ukuran Kertas Lengkap (Termasuk F4 / Folio)**: Dukungan langsung untuk ukuran kertas umum perkantoran Indonesia (F4 / Folio 21,5 × 33 cm), Executive, A4, A5, A6, B4, B5, US Letter, US Legal, dll.
- 🔒 **Privasi Terjamin (Local-First)**: Dokumen diproses secara lokal di browser kamu, no tracking & no cloud upload.
- ⚡ **Super Cepat & Ringan**: Dibangun pakai Next.js 16 (Turbopack) & Tailwind CSS v4, loading kilat tanpa lag.
- 💾 **Riwayat File Otomatis**: Dilengkapi penyimpanan lokal (IndexedDB) supaya file yang baru kamu buka gampang dibuka kembali.
- 🎨 **Tampilan Modern & Rapi**: Pilihan tema tampilan yang nyaman di mata (Modern Dark, Modern Light, Classic Light, High Contrast).
- 🌐 **Mendukung Banyak Bahasa**: Tersedia dalam berbagai bahasa termasuk Bahasa Indonesia dan Bahasa Inggris yang natural.

---

## 🚀 Cara Menjalankan di Komputer Lokal

### 1. Prasyarat
- **Node.js**: Versi 20 ke atas (disarankan v22 atau v25)
- **Package Manager**: `pnpm` (disarankan) atau `npm`

### 2. Langkah Instalasi
Clone repository dan install dependensinya:
```bash
git clone https://github.com/razcreativestudio/razoffice.git
cd razoffice

# Install dependencies pakai pnpm
pnpm install
```

### 3. Jalankan Mode Development
```bash
pnpm run dev
```
Buka browsermu dan akses `http://localhost:3000`. Aplikasi langsung siap dipakai!

### 4. Build untuk Production
```bash
pnpm run build
```
File hasil build statis yang siap di-deploy bakal otomatis tersimpan di folder `./out`.

---

## 🛠️ Arsitektur Singkat (Buat yang Penasaran Cara Kerjanya)

1. **Client-Side Document Conversion (x2t WASM)**:  
   Waktu kamu buka file `.docx`, `.xlsx`, atau `.pptx`, browser menjalankan WebAssembly `x2t.wasm` lewat Web Worker untuk mengonversi dokumen jadi format biner ONLYOFFICE secara instan di memori komputermu.

2. **In-Browser Virtual Server**:  
   Alih-alih komunikasi ke server luar, RAZ Office punya *mock server* virtual di memori browser yang meng-handle semua request iframe ONLYOFFICE secara lokal.

3. **Safe & Private Saving**:  
   Saat kamu simpan file atau download, mesin x2t mengemas dokumen kembali ke format aslinya dan langsung menyimpannya ke storage komputermu.

---

## 🌐 Deploy Otomatis ke Hosting (IDwebhost / cPanel)

RAZ Office sudah dilengkapi pipeline **CI/CD GitHub Actions** bawaan (`.github/workflows/RAZDeployIDwebhost.yml`). Setiap kali kamu melakukan `git push` ke branch `main`, GitHub akan otomatis mengompilasi aplikasi dan mengirim file statis terbaru langsung ke cPanel hosting IDwebhost kamu via FTP.

Panduan lengkap langkah demi langkah dapat kamu baca di:  
👉 **[Panduan Deploy Otomatis IDwebhost](docs/RAZHostingDeployGuide.md)**

---

## 📜 Lisensi & Atribusi
Proyek ini dibangun dan dikembangkan dengan bangga oleh tim **RAZ Enterprise** di atas fondasi open-source ONLYOFFICE. Berada di bawah lisensi terbuka **GNU Affero General Public License v3.0 (AGPL v3)**.

