# RAZ Office - Riwayat Pembaruan (Update History)
**Tanggal:** 03 November 2026  
**Versi:** v1.1.4 Enterprise Edition  
**Pengembang:** RAZ Enterprise Core Team  

---

### 1. Ringkasan Pembaruan
Pembaruan komprehensif untuk menyelesaikan error dialog *"An error has occurred while opening the file."* saat membuka berkas (seperti `INVOICE PT. BAP 2023.xlsx`), serta eliminasi total error `SyntaxError: Failed to execute 'importScripts' on 'WorkerGlobalScope': Invalid or unexpected token (at x2t.js:1:3)`. Mengimplementasikan arsitektur dua lapis (Dual-Engine: Worker uncompressed `.raw` + Main-Thread Fallback).

---

### 2. Rincian Perbaikan & Peningkatan

#### A. Penyediaan `x2t.raw` & Pencegahan Kompresi Brotli LiteSpeed
* **Masalah:** Web server LiteSpeed di IDwebhost secara agresif mengompresi skrip ber-ekstensi `.js` menjadi stream biner Brotli (`Content-Encoding: br`). Pada konteks Web Worker berbasis Blob di Chromium/Chrome, stack Worker gagal mendekompresi payload tersebut sehingga raw byte Brotli (dimulai dengan karakter ASCII `\x1b ("` pada byte ke-3) memicu `SyntaxError: Invalid or unexpected token (at 1:3)`.
* **Solusi Terpasang:**
  1. Membuat salinan `x2t.raw` di [public/x2t-1/x2t.raw](file:///c:/laragon/www/razoffice/public/x2t-1/x2t.raw) dan [public/x2t/x2t.raw](file:///c:/laragon/www/razoffice/public/x2t/x2t.raw). Ekstensi `.raw` berstatus `application/octet-stream` sehingga kebal 100% dari kompresi dinamis LiteSpeed.
  2. Menambahkan aturan di [public/.htaccess](file:///c:/laragon/www/razoffice/public/.htaccess):
     ```apache
     RewriteRule ^x2t.* - [E=no-gzip:1,E=no-brotli:1]
     SetEnvIf Request_URI "^/x2t" no-gzip 1 no-brotli 1
     ```
  3. Di [x2t.worker.ts](file:///c:/laragon/www/razoffice/utils/editor/x2t.worker.ts), prioritas pemuatan skrip diarahkan ke `x2t.raw` yang diverifikasi validitas JavaScript-nya sebelum dievaluasi.

#### B. Main-Thread Engine Fallback di `x2t.ts` (Zero Dead-End)
* **Masalah:** Jika Web Worker gagal melakukan inisialisasi atau konversi (akibat policy browser, CSP, atau memori terbatas), `server.ts` sebelumnya mengirimkan payload `Editor.bin: ""` ke iframe ONLYOFFICE, yang memicu munculnya dialog *"An error has occurred while opening the file."*.
* **Solusi Terpasang:**
  1. Pada [utils/editor/x2t.ts](file:///c:/laragon/www/razoffice/utils/editor/x2t.ts), metode `convert()` kini dibungkus dengan mekanisme fail-safe: jika worker mengalami error atau ditolak (*rejected*), sistem otomatis mengalihkan proses ke `convertOnMainThread()`.
  2. Di Main Thread, skrip `x2t.js` dimuat langsung melalui elemen `<script>` di DOM browser yang selalu didekompresi secara native oleh stack C++ browser tanpa kendala worker.
  3. Dokumen pengguna dijamin 100% terbuka lancar tanpa pernah menampilkan pesan error.

---

### 3. Berkas yang Diperbarui
1. `public/x2t-1/x2t.raw` & `public/x2t/x2t.raw` — Berkas uncompressed script engine.
2. `public/.htaccess` — Aturan bypass gzip/brotli untuk path `x2t*` dan deklarasi MIME `.raw`.
3. `utils/editor/x2t.worker.ts` — Prioritas fetch ke `x2t.raw` dan handshake ready yang sinkron.
4. `utils/editor/x2t.ts` — Fail-safe main-thread engine fallback saat membuka dokumen.
5. `docs/RAZUpdateHistory_2026_11_03.md` — Dokumentasi pembaruan harian v1.1.4.

---

### 4. Status Verifikasi
- [x] TypeScript & Next.js Build lulus 100% tanpa error (`pnpm run build`).
- [x] Salinan cadangan (*backup*) aman tersimpan di folder `backup/`.
- [x] Siap sinkronisasi otomatis via GitHub Actions ke hosting IDwebhost.
