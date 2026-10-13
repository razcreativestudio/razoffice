# RAZ Office - Panduan Pengembang & Pengguna (Developer & User Guide)
**Versi:** 1.0.0  
**Tanggal:** 13 Oktober 2026  
**Standar Kualitas:** RAZ Enterprise Standards

---

## 1. Pendahuluan
**RAZ Office** adalah aplikasi pengolah kata, lembar kerja (*spreadsheet*), dan presentasi berbasis web yang beroperasi secara *Local-First*. Pengguna dapat membuka, menyunting, dan menyimpan dokumen secara instan di peramban web tanpa memerlukan instalasi server ONLYOFFICE terpisah (*document server*) ataupun proses *upload* ke server pihak ketiga.

---

## 2. Prasyarat Lingkungan Pengembangan
Untuk menjalankan atau mengembangkan proyek ini di komputer lokal:
1. **Node.js**: Versi 20+ (direkomendasikan Node.js v22 atau v25).
2. **Package Manager**: `pnpm` (direkomendasikan versi 9+ / 12+) atau `npm`.
3. **Browser Modern**: Google Chrome, Mozilla Firefox, Microsoft Edge, atau Safari dengan dukungan WebAssembly (WASM) dan SharedArrayBuffer / Web Workers.

---

## 3. Menjalankan Proyek Secara Lokal

### A. Instalasi Dependensi
Jalankan perintah berikut di direktori proyek:
```bash
pnpm install
```
*Catatan untuk lingkungan pnpm v10+: jika muncul peringatan persetujuan build script, gunakan:*
```bash
pnpm install --dangerously-allow-all-builds
```

### B. Menjalankan Server Pengembangan (Dev Mode)
```bash
pnpm run dev
```
Aplikasi akan dapat diakses pada browser di alamat:
`http://localhost:3000`

### C. Melakukan Kompilasi Produksi (Production Build)
```bash
pnpm run build
```
Hasil kompilasi berupa situs statis teroptimasi (*Static Export*) akan berada di folder `./out`.

---

## 4. Arsitektur Teknis RAZ Office

### A. Konversi Dokumen Menggunakan x2t WebAssembly
Ketika berkas `.docx`, `.xlsx`, atau `.pptx` dipilih oleh pengguna:
1. Berkas dibaca sebagai `ArrayBuffer` di browser.
2. Web Worker `utils/editor/x2t.worker.ts` mengirimkan byte data ke binary `public/x2t/x2t.wasm`.
3. Engine x2t melakukan konversi format biner Microsoft Office menjadi struktur biner internal ONLYOFFICE (`.bin`).
4. Hasil konversi dikembalikan ke thread utama tanpa menyentuh server web sama sekali.

### B. Mock Document Server (`EditorServer`)
Editor ONLYOFFICE biasanya memerlukan komunikasi dua arah dengan Document Server via HTTP dan WebSocket. Di RAZ Office:
1. `utils/editor/fetch.ts` dan `utils/editor/xhr.ts` mengintersepsi semua panggilan jaringan dari iframe editor.
2. `utils/editor/server.ts` merespons seluruh permintaan dokumen secara virtual di memori lokal.
3. `utils/editor/socket.ts` mengemulasi pertukaran event kolaborasi/penyimpanan secara asinkron.
4. Saat pengguna menekan tombol Simpan (Save) atau mengunduh dokumen, berkas di-pack kembali ke format aslinya oleh x2t WASM dan diunduh langsung ke sistem berkas lokal pengguna.

### C. Penyimpanan Berkas Riwayat (IndexedDB)
Daftar berkas yang baru saja dibuka disimpan secara privat dan terenkripsi secara lokal di browser melalui IndexedDB (`idb`). Tidak ada riwayat berkas pengguna yang dikirim ke server luar.

---

## 5. Tata Tertib Modifikasi Kode (Protokol RAZ)
1. **Wajib Backup Terpusat:** Sebelum mengubah file eksisting apa pun, simpan salinannya ke folder `backup/`.
2. **Penamaan File Awalan `RAZ`:** Seluruh berkas baru wajib memakai nama dengan prefiks `RAZ`.
3. **Komentar Edukatif:** Berikan penjelasan berbahasa Indonesia di setiap blok kode logika.
4. **Hanya Custom Modals:** Dilarang menggunakan dialog `window.alert()` atau `window.confirm()`. Gunakan modal kustom sesuai tema.
5. **Zero Dummy Data:** Hindari teks palsu yang tidak dinamis.
