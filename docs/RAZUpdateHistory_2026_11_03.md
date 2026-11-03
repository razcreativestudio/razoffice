# RAZ Office - Riwayat Pembaruan (Update History)
**Tanggal:** 03 November 2026  
**Versi:** v1.1.2 Enterprise Edition  
**Pengembang:** RAZ Enterprise Core Team  

---

### 1. Ringkasan Pembaruan
Pembaruan hari ini berfokus pada penyelesaian error pembukaan file dokumen fisik (`.xlsx`, `.docx`, dll.) pada server production `https://office.it-raz.com`, stabilitas Web Worker WebAssembly (`x2t`), serta pemulihan dependensi vendor editor ONLYOFFICE (RequireJS & CSS).

---

### 2. Rincian Perbaikan & Peningkatan

#### A. Perbaikan Engine Konversi Dokumen Web Worker (x2t)
* **Masalah:** Saat membuka file spreadsheet atau dokumen (contoh: `INVOICE PT. BAP 2023.xlsx`), muncul dialog *"An error has occurred while opening the file."* Di console browser muncul pesan:  
  `Auto-init failed: SyntaxError: Failed to execute 'importScripts' on 'WorkerGlobalScope': Invalid or unexpected token`.
* **Akar Masalah:** Next.js (Turbopack) mengemas Web Worker ke dalam bentuk Blob URL (`blob:https://office.it-raz.com/...`). Di browser modern, `self.location.origin` di dalam Blob Worker bernilai `"blob:https://office.it-raz.com"` atau `"null"`. Akibatnya, `self.location.origin + "/x2t-1/x2t.js"` menghasilkan URL tidak valid sehingga request gagal atau mengembalikan HTML 404 (yang memicu syntax error karakter `<` di `importScripts`).
* **Solusi Terpasang:**
  1. Menambahkan fungsi helper `resolveBaseUrl()` di [x2t.worker.ts](file:///c:/laragon/www/razoffice/utils/editor/x2t.worker.ts) yang mengekstrak origin HTTP/HTTPS secara presisi menggunakan regex dari `location.href`, serta memeriksa `TURBOPACK_WORKER_LOCATION`.
  2. Menambahkan pesan inisialisasi eksplisit `{ type: "init", payload: { baseUrl } }` dan argumen `baseUrl` pada setiap payload konversi di [x2t.ts](file:///c:/laragon/www/razoffice/utils/editor/x2t.ts).
  3. Mengonfigurasi `Module.locateFile` secara eksplisit agar selalu mengarah ke URL absolut `x2t.wasm`.

#### B. Restorasi Base URL Aset Vendor ONLYOFFICE
* **Masalah:** Pada rilis sebelumnya, `<base href>` pada editor sempat diubah menjadi relatif lokal. Hal ini menyebabkan aset vendor bawaan ONLYOFFICE (seperti `require.js`, `main.css`, dan `app.css`) mengalami 404 karena berkas inti distribusi ONLYOFFICE (500+ MB) dilayani oleh CDN resmi.
* **Solusi Terpasang:** Mengembalikan `<base href>` pada 5 template editor HTML ke endpoint CDN berizin CORS lengkap:
  - `documenteditor/main/index.html`
  - `pdfeditor/main/index.html`
  - `presentationeditor/main/index.html`
  - `spreadsheeteditor/main/index.html`
  - `visioeditor/main/index.html`
  Sembari tetap mempertahankan seluruh perbaikan lokal kita:
  - Proteksi *null safety* pada `child && child.setAttribute` untuk SVG icon.
  - Skema default Modern Dark (`theme-night`) dan Times New Roman 12pt.

#### C. Integrasi CI/CD Deploy IDwebhost
* Menggunakan skrip deployment FTP berkecepatan tinggi [scripts/RAZDeployFTP.mjs](file:///c:/laragon/www/razoffice/scripts/RAZDeployFTP.mjs) via GitHub Actions sehingga setiap kali ada *commit* baru ke branch `main`, website live di `office.it-raz.com` langsung ter-update secara otomatis dalam hitungan menit.

---

### 3. Berkas yang Diperbarui
1. `utils/editor/x2t.worker.ts` — Engine resolusi path skrip dan WASM worker.
2. `utils/editor/x2t.ts` — Jembatan pesan main thread & worker x2t.
3. `public/v9.3.0.24-1/web-apps/apps/spreadsheeteditor/main/index.html` — Restorasi base href & proteksi SVG.
4. `public/v9.3.0.24-1/web-apps/apps/documenteditor/main/index.html` — Restorasi base href & proteksi SVG.
5. `public/v9.3.0.24-1/web-apps/apps/presentationeditor/main/index.html` — Restorasi base href & proteksi SVG.
6. `public/v9.3.0.24-1/web-apps/apps/pdfeditor/main/index.html` — Restorasi base href & proteksi SVG.
7. `public/v9.3.0.24-1/web-apps/apps/visioeditor/main/index.html` — Restorasi base href & proteksi SVG.
8. `docs/RAZUpdateHistory_2026_11_03.md` — Dokumentasi riwayat update harian.

---

### 4. Status Verifikasi
- [x] TypeScript & Next.js Build lulus 100% tanpa error (`pnpm run build`).
- [x] Salinan cadangan (*backup*) aman tersimpan di folder `backup/`.
- [x] Siap rilis dan disinkronkan ke live server production.
