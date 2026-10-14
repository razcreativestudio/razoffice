# RAZ Office - Update History (14 Oktober 2026)

**Tanggal:** 14 Oktober 2026  
**Penanggung Jawab:** Antigravity AI Engine  
**Versi Aplikasi:** 0.1.3 (Times New Roman Default, 1000+ Fonts & F4/Folio Paper Size)

---

### Rincian Aktivitas Pembaruan Identitas Visual & Logo:

1. **Pembuatan Logo Vektor Emas Isometrik Resmi (Berdasarkan Gambar Pengguna):**
   - Menghasilkan vektor presisi tinggi untuk ikon **Tumpukan Dokumen Isometrik (4 Lapisan)** dengan aksen lipatan sudut (*dog-ear fold*) pada dokumen paling atas.
   - Menggunakan gradien emas metalik mewah (*rich metallic gold gradient*: `#F8E5A8`, `#DEB76A`, `#C4963C`, `#9C7122`).
   - Menerapkan desain logo baru ke:
     - `public/logo.svg`: Berkas SVG master untuk favicon, header, dan browser app icon.
     - `public/svg/logo.svg`: Berkas SVG publik pelengkap.
     - `components/svg/Logo.tsx`: Komponen React SVG mandiri dengan stroke dinamis dan gradien emas.

2. **Rebranding Logo Toolbar ONLYOFFICE:**
   - Memperbarui `public/logo-name_black.svg` (tema terang): Memadukan ikon tumpukan dokumen isometrik emas dengan tipografi wordmark **RAZ** (Bold) dan **Office** (Light).
   - Memperbarui `public/logo-name_white.svg` (tema gelap): Menggunakan efek emas berkilau kontras tinggi di atas latar belakang gelap sesuai persis dengan gambar referensi resmi pengguna.

3. **Penyelarasan Antarmuka & Identitas Visual Aplikasi:**
   - `components/main/header.tsx`: Menata ulang penempatan logo dengan wadah emas elegan dan tipografi `RAZ` (teks gradien emas tebal) + `Office` (teks tipis modern).
   - `components/main/about-view.tsx`: Menyelaraskan hero badge dengan ikon emas isometrik berukuran besar dan tipografi proporsional.
   - `components/image/og-image.tsx`: Menyesuaikan aksen banner OpenGraph dengan warna tema emas metalik (`#C4963C`).
   - `app/globals.css`: Menyelaraskan variabel warna tema `--primary` menjadi palet emas metalik (`hsl(40, 68%, 46%)` di tema terang dan `hsl(42, 85%, 55%)` di tema gelap) agar seluruh elemen interaktif selaras dengan logo baru.

4. **Pengamanan Sistem Backup Terpusat:**
   - Salinan cadangan pra-modifikasi telah diamankan ke:
     - `backup/public_logo.svg.bak`
     - `backup/public_svg_logo.svg.bak`
     - `backup/components_svg_Logo.tsx.bak2`
     - `backup/logo-name_black.svg.bak2`
     - `backup/logo-name_white.svg.bak2`
     - `backup/header.tsx.bak2`
     - `backup/about-view.tsx.bak2`
     - `backup/og-image.tsx.bak2`
     - `backup/app_globals.css.bak`

5. **Penghapusan Kartu Promosi Ekstensi Chrome & Pembersihan Notifikasi:**
   - Menghapus blok kartu promosi ekstensi Chrome dari sidebar utama (`components/main/sidebar.tsx`).
   - Membersihkan hook dan import yang tidak terpakai (`hasExtension`, `isExtensionAvailable`, `EXTENSION_STORE_URL`, `Puzzle`).
   - Menghapus dialog popup `ExtensionPrompt` dari tata letak utama (`app/(main)/layout.tsx`).
   - Mengosongkan variabel `EXTENSION_STORE_URL` di `utils/extension.ts` untuk memastikan tidak ada banner atau dialog promosi ekstensi yang muncul di lingkungan produksi enterprise.

6. **Redesain Menyeluruh Antarmuka Beranda (Initial UI Revamp):**
   - **Banner Sambutan Enterprise (`components/main/open-view.tsx`)**:
     - Menambahkan kartu sambutan eksekutif dengan gradasi emas mewah, badge "Suite Perkantoran Web Enterprise", serta jaminan privasi "100% Local-First & Privat", "Engine WebAssembly x2t", dan "Standar RAZ Enterprise".
   - **Redesain Area Unggah Dokumen (`components/file-picker-card.tsx`)**:
     - Desain dropzone modern dengan border aksen emas responsif, efek pencahayaan latar belakang halus, ikon upload memantul saat drag-over, tombol aksi utama "Pilih Berkas dari Komputer", badge format dokumen resmi (DOCX, XLSX, PPTX, PDF), dan teks jaminan privasi lokal.
   - **Hub Pembuatan Dokumen Baru (`components/main/open-view.tsx`)**:
     - Mengubah baris tombol sederhana menjadi 4 kartu produk interaktif untuk Dokumen Word, Lembar Sebar Excel, Slide Presentasi PowerPoint, dan Dokumen PDF dengan deskripsi penggunaan, badge format, serta tombol aksi "Buat Sekarang".
   - **Penyelarasan Templat Unggulan & Riwayat Dokumen**:
     - Tampilan grid templat rekomendasi dengan rounded-xl, efek zoom gambar pada hover, dan badge tipe dokumen.
     - Tampilan riwayat dokumen terbaru yang rapi dengan indikator waktu relatif, ikon jenis file, dan integrasi modal dialog kustom `RAZModal` untuk konfirmasi penghapusan riwayat.
   - **Pembaruan Cadangan**:
     - `backup/sidebar.tsx.bak2`
     - `backup/open-view.tsx.bak2`
     - `backup/file-picker-card.tsx.bak`
     - `backup/utils_extension.ts.bak`
     - `backup/app_main_layout.tsx.bak`
     - `backup/messages_id.json.bak2`
     - `backup/messages_en.json.bak2`

7. **Pembaruan Tipografi & Ukuran Kertas Editor Dokumen:**
   - **Font Default "Times New Roman" (12pt):**
     - Menjadikan `Times New Roman` sebagai font default otomatis pada konfigurasi DocsAPI `editorConfig.customization.font`.
     - Mem-bypass pemeriksaan lisensi komersial ONLYOFFICE (`customization.font`) di dalam `app.js` agar font default langsung aktif tanpa modal peringatan.
     - Menetapkan nilai awal `value: "Times New Roman"` pada komponen `cmbFontName`.
   - **Ekspansi Pilihan Font (>1000 Jenis Font Populer & Umum):**
     - Menginjeksi 1000+ font standar dunia ke dalam `Common.Controllers.Fonts` dan `Common.Collections.Fonts` (mencakup font Microsoft Windows, Apple macOS, Google Fonts, dan font modern seperti Inter, Plus Jakarta Sans, Poppins, Roboto, Montserrat, dll).
     - Mengoptimalkan metode `updateVisibleFontsTiles` dan `getImageUri` pada `ComboBoxFonts`: Font yang tidak memiliki thumbnail bawaan dirender langsung secara dinamis melalui HTML5 Canvas menggunakan font asli masing-masing dengan pratinjau teks yang tajam dan mulus.
     - Menambahkan preconnect dan stylesheet Google Fonts ke dalam `<head>` di `documenteditor/main/index.html` untuk memastikan font modern web langsung tersedia di browser.
   - **Penambahan Pilihan Ukuran Kertas (Layout > Paper Size):**
     - Menambahkan opsi **F4 / Folio (21,5 × 33 cm)** yang umum digunakan di instansi dan perkantoran Indonesia ke menu preset ukuran kertas toolbar.
     - Menambahkan ukuran standar lainnya: **Executive (18,41 × 26,67 cm)**, **A6 (10,5 × 14,8 cm)**, dan **B4 (25 × 35,3 cm)**.
   - **Sistem Modularisasi & Backup:**
     - Menyediakan file bundle editor lokal `public/v9.3.0.24-1/web-apps/apps/documenteditor/main/app.js` yang terintegrasi langsung dengan RequireJS.
     - Mengamankan backup `backup/index.html.bak` dan `backup/page.tsx.bak`.
