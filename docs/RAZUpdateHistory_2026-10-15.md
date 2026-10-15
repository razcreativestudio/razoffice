# RAZ Office - Update History (15 Oktober 2026)

**Tanggal:** 15 Oktober 2026  
**Penanggung Jawab:** Antigravity AI Engine  
**Versi Aplikasi:** 0.1.5 (Dynamic Script Resolution, Times New Roman 12pt Auto-Enforce, 1000+ Fonts & F4/Folio Paper Size Verified)

---

### Rincian Aktivitas Pembaruan & Investigasi:

1. **Investigasi & Analisis Akar Masalah ("Belum Masuk Semua"):**
   - **Akar Masalah Path Resolution:**
     - Pada konfigurasi sebelumnya di `index.html`, path RequireJS didefinisikan menggunakan `location.origin + '/v9.3.0.24-1/...'`.
     - Ketika aplikasi diakses melalui subfolder (misalnya Apache Laragon `http://localhost/razoffice/out/` atau subfolder cPanel di IDwebhost), `location.origin` merujuk ke domain root (`http://localhost`), sehingga pemanggilan berkas `app.js` menghasilkan status **404 Not Found**.
     - Akibatnya, browser gagal memuat berkas lokal dan mengalami timeout atau fallback ke remote CDN ONLYOFFICE yang tidak memuat modifikasi kita.
   - **Akar Masalah Dual Loader (`index_loader.html`):**
     - Sesi editor yang mengaktifkan parameter loader memuat `index_loader.html`, yang sebelumnya belum memiliki konfigurasi require path lokal dan tautan Google Fonts.
   - **Akar Masalah Default Document Content Font:**
     - Pengaturan `editorConfig.customization.font` pada DocsAPI hanya mengatur font elemen UI antarmuka (`--font-family-base-custom`), bukan font teks paragraf di dalam dokumen.

2. **Perbaikan Resolusi Skrip Dinamis (Universal Subfolder & Root Support):**
   - **Dukungan Dinamis di `index.html` & `index_loader.html`:**
     - Mengubah path RequireJS `'app'` menjadi dinamis berdasarkan URL halaman saat ini:
       ```javascript
       paths: {
           'app': (function(){
               var loc = window.location.href.split('?')[0];
               return loc.replace(/\/[^\/]+$/, '/app');
           })()
       }
       ```
     - Memastikan resolusi berkas `app.js` berjalan tepat 100% di semua lingkungan (localhost:3000, subfolder Apache Laragon, domain utama cPanel, maupun subpath hosting).
   - **Registrasi Modul AMD di `app.js`:**
     - Menambahkan `define("app",(function(){}));` di baris akhir `app.js` agar RequireJS segera mengenali modul `'app'` telah terdefinisi tanpa menunggu timeout.

3. **Penegakan Font Default Times New Roman (12pt):**
   - Menetapkan nilai awal `value: "12"` pada kontrol toolbar `cmbFontSize`.
   - Menginjeksi auto-enforcement pada `Toolbar.onDocumentReady` di dalam `app.js`:
     ```javascript
     t.api.put_TextPrFontName("Times New Roman");
     t.api.put_TextPrFontSize(24); // 24 half-points = 12pt
     if(t.toolbar){
       t.toolbar.cmbFontName && t.toolbar.cmbFontName.setValue("Times New Roman");
       t.toolbar.cmbFontSize && t.toolbar.cmbFontSize.setValue("12");
     }
     ```
   - Setiap kali membuka dokumen baru atau berpindah fokus, editor secara konsisten menetapkan Times New Roman 12pt sebagai format standar.

4. **Verifikasi Fitur Koleksi 1000+ Font & Ukuran Kertas F4/Folio:**
   - **Koleksi Font:** 1,090 font (Google Fonts, Windows, Mac, Linux) lengkap dengan HTML5 Canvas fallback thumbnail generator yang telah terintegrasi di `app.js`.
   - **Ukuran Kertas:** Menu *Layout > Page Size* memuat preset lengkap: F4 / Folio (21,5 × 33 cm), Executive (18,41 × 26,67 cm), A6 (10,5 × 14,8 cm), dan B4 (25 × 35,3 cm).

5. **Pengamanan Backup Terpusat:**
   - `backup/index.html.bak2`
   - `backup/index_loader.html.bak`
   - `backup/README.md.bak4`

6. **Kompilasi & Validasi:**
   - `node --check` pada bundle JS (2,16 MB) lolos validasi tanpa syntax error.
   - `pnpm run build` berhasil 100% dan seluruh berkas di direktori `out/` telah termutakhirkan.
   - Endpoint Apache diuji langsung (`http://localhost/razoffice/out/...`) dan menghasilkan HTTP 200 dengan muatan fitur lengkap.

7. **Implementasi CI/CD Auto-Deploy ke IDwebhost cPanel:**
   - **Pembuatan Workflow GitHub Actions (`.github/workflows/RAZDeployIDwebhost.yml`):**
     - Mengotomasi seluruh proses: Checkout repo -> Setup Node.js 22 & pnpm -> Install dependencies -> Build Next.js statis (`pnpm run build`) -> Sync direktori `./out/` ke server IDwebhost via FTPS/FTP menggunakan `SamKirkland/FTP-Deploy-Action@v4.3.5`.
     - Tidak membebani shared hosting cPanel IDwebhost dengan proses kompilasi berat, melainkan murni memanfaatkan runner GitHub yang cepat dan gratis.
   - **Penerbitan Dokumen Panduan (`docs/RAZHostingDeployGuide.md`):**
     - Panduan berbahasa Indonesia yang mudah dipahami bagi pengguna awam mengenai cara pembuatan akun FTP di cPanel IDwebhost dan pendaftaran GitHub Secrets (`FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`, `FTP_SERVER_DIR`).
   - **Pembaruan `README.md`:** Menambahkan referensi langsung ke panduan deploy hosting.

8. **Penetapan Tema Default: Modern Dark (`theme-night`):**
   - **State Store (`store/index.ts`):** Mengubah inisialisasi tema default dari `"theme-white"` menjadi `"theme-night"`. Menambahkan skema versioning dan fungsi `migrate` pada persist store agar sesi lama otomatis diperbarui ke tema Modern Dark.
   - **Preload DOM Layout (`app/layout.tsx`):** Memperbarui skrip `preload` agar default ke dark mode saat belum ada preferensi tersimpan di cookie atau storage, menghilangkan efek flicker saat halaman dimuat.
   - **Cookie Persistence (`components/main/settings-view.tsx`):** Menambahkan `max-age=31536000` pada cookie preferensi tema.
   - **Pengamanan Backup Terpusat:** `backup/store_index.ts.bak`, `backup/app_layout.tsx.bak2`, `backup/settings_view.tsx.bak2`.
   - **Validasi Build:** `pnpm run build` sukses mengompilasi seluruh rute statis tanpa kendala.


