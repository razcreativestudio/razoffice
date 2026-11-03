# RAZ Office - Riwayat Pembaruan (Update History)
**Tanggal:** 03 November 2026  
**Versi:** v1.1.3 Enterprise Edition  
**Pengembang:** RAZ Enterprise Core Team  

---

### 1. Ringkasan Pembaruan
Pembaruan lanjutan berfokus pada penyelesaian definitif error `SyntaxError: Failed to execute 'importScripts' on 'WorkerGlobalScope': Invalid or unexpected token (at x2t.js:1:3)` dan error 404 pada dependensi vendor editor (`require.js`, `main.css`, `app.css`).

---

### 2. Rincian Perbaikan & Peningkatan

#### A. Kebal Kompresi Brotli di Web Worker (x2t)
* **Masalah:** LiteSpeed server di IDwebhost otomatis mengompresi berkas JavaScript (`x2t.js`) menggunakan algoritma Brotli (`Content-Encoding: br`) ketika browser mengirim header `Accept-Encoding`. Saat `importScripts(url)` langsung dieksekusi di dalam WorkerGlobalScope, browser menerima byte biner terkompresi tanpa dekompresi otomatis, menghasilkan error:
  `Invalid or unexpected token (at x2t.js:1:3)`.
* **Solusi Terpasang:**
  1. Di [x2t.worker.ts](file:///c:/laragon/www/razoffice/utils/editor/x2t.worker.ts), pengambilan `x2t.js` dialihkan menggunakan `fetch()`. Stack networking browser secara bawaan selalu mendekompresi payload Brotli/Gzip menjadi teks JavaScript UTF-8 murni.
  2. Teks script tersebut kemudian dikonversi menjadi in-memory Blob URL (`URL.createObjectURL(new Blob([scriptText]))`) sebelum dieksekusi dengan `importScripts()`.
  3. Dilengkapi fallback sekunder ke `(0, eval)(scriptText)` jika environment membatasi eksekusi Blob URL.

#### B. Direct Absolute CDN Dependencies untuk ONLYOFFICE Editor
* **Masalah:** Beberapa browser atau ekstensi mengabaikan `<base href>` dinamis atau meng-cache versi template lama, memicu request lokal yang 404 ke `/web-apps/vendor/requirejs/require.js` dan `/sdkjs/cell/css/main.css`.
* **Solusi Terpasang:**
  1. Mengarahkan URL berkas `require.js`, `main.css`, dan `app.css` pada kelima editor (`spreadsheeteditor`, `documenteditor`, `presentationeditor`, `pdfeditor`, `visioeditor`) langsung ke URL absolut CDN resmi yang berizin CORS lengkap.
  2. Menambahkan aturan `no-cache` pada berkas `index.html` dan `api.js` di [.htaccess](file:///c:/laragon/www/razoffice/public/.htaccess) agar browser selalu menyajikan template terbaru tanpa kendala stale cache.
  3. Menambahkan version query parameter cache-busting pada pemuatan `api.js` di [app/editor/page.tsx](file:///c:/laragon/www/razoffice/app/editor/page.tsx).

---

### 3. Berkas yang Diperbarui
1. `utils/editor/x2t.worker.ts` — Eksekusi skrip engine x2t via fetch + in-memory Blob URL (anti-Brotli corruption).
2. `public/v9.3.0.24-1/web-apps/apps/spreadsheeteditor/main/index.html` — Absolute CDN paths untuk main.css, require.js, app.css.
3. `public/v9.3.0.24-1/web-apps/apps/documenteditor/main/index.html` — Absolute CDN paths untuk require.js, app.css.
4. `public/v9.3.0.24-1/web-apps/apps/presentationeditor/main/index.html` — Absolute CDN paths untuk require.js, app.css.
5. `public/v9.3.0.24-1/web-apps/apps/pdfeditor/main/index.html` — Absolute CDN paths untuk require.js.
6. `public/v9.3.0.24-1/web-apps/apps/visioeditor/main/index.html` — Absolute CDN paths untuk require.js, app.css.
7. `public/.htaccess` — Anti stale-cache headers untuk index.html dan api.js.
8. `app/editor/page.tsx` — Cache busting versioning pada DocsAPI script tag.
9. `docs/RAZUpdateHistory_2026_11_03.md` — Dokumentasi riwayat pembaruan harian.

---

### 4. Status Verifikasi
- [x] TypeScript & Next.js Build lulus 100% tanpa error (`pnpm run build`).
- [x] Salinan cadangan (*backup*) aman tersimpan di folder `backup/`.
- [x] Siap sinkronisasi otomatis via GitHub Actions ke hosting IDwebhost.
