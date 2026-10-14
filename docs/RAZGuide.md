# RAZ Office — Developer & User Guide

**Versi:** 1.1.0  
**Tanggal:** 14 Oktober 2026  
**Penulis:** RAZ Enterprise Core Team  

---

## 🌟 Sekilas Tentang RAZ Office

Selamat datang di panduan resmi **RAZ Office**!  
Singkatnya, **RAZ Office** adalah aplikasi pengolah dokumen (Word, Excel, PowerPoint, dan PDF) berbasis web yang bekerja dengan konsep **Local-First**. 

Artinya, semua proses buka file, ngetik, hitung rumus, sampai bikin slide berjalan 100% di browser kamu sendiri. Nggak ada file yang dikirim ke server luar, jadi privasi datamu benar-benar aman.

---

## 💻 Cara Install & Jalanin di Komputer Lokal

Buat kamu yang mau nyoba atau ngembangin proyek ini di laptop/PC lokal, ikuti langkah santai berikut:

### 1. Siapkan Kebutuhan Awal
- **Node.js**: Versi 20+ (rekomendasi Node.js v22 atau v25).
- **Package Manager**: Gunakan `pnpm` (rekomendasi versi 9 atau lebih baru).
- **Web Browser**: Chrome, Edge, Firefox, atau Safari versi terkini.

### 2. Install Dependensi
Buka terminal di folder proyek, lalu jalankan:
```bash
pnpm install
```
*Tips buat pnpm v10+: Kalau muncul notifikasi script build, jalankan:*
```bash
pnpm install --dangerously-allow-all-builds
```

### 3. Jalankan Mode Dev (Development)
```bash
pnpm run dev
```
Setelah jalan, buka browser dan kunjungi:  
👉 **`http://localhost:3000`**

### 4. Build untuk Production
Kalau aplikasinya sudah siap di-deploy ke hosting atau server:
```bash
pnpm run build
```
Hasil build berupa file website statis langsung tersimpan rapi di folder `./out`.

---

## 🔍 Gimana Cara Kerjanya di Balik Layar?

Bagi orang awam maupun developer, ini gambaran gampang kenapa RAZ Office bisa ngedit dokumen Word & Excel tanpa server backend:

1. **Konversi Dokumen di Browser (x2t WebAssembly)**  
   Ketika kamu pilih file `.docx`, `.xlsx`, atau `.pptx`:
   - File dibaca oleh browser dalam bentuk memori (*ArrayBuffer*).
   - Mesin WebAssembly bernama `x2t.wasm` langsung mengonversi format dokumen Microsoft Office ke format internal editor ONLYOFFICE.
   - Proses ini berlangsung sekejap di memori laptopmu tanpa pernah terhubung ke internet.

2. **Server Virtual di Memori (Mock Document Server)**  
   Biasanya editor ONLYOFFICE butuh server terpisah yang rumit dan mahal. Di RAZ Office, kami membuat server virtual (`utils/editor/server.ts`) yang langsung hidup di dalam browser. Jadi iframe editor mengira sedang terhubung ke server sungguhan, padahal semuanya berjalan lokal.

3. **Penyimpanan Riwayat File (Recent Files)**  
   Daftar file yang pernah kamu buka disimpan menggunakan database internal browser (**IndexedDB**). Jadi saat kamu buka kembali aplikasi, file-file terakhir langsung muncul di dashboard tanpa ribet dicari ulang.

---

## 🛡️ Standar & Aturan Coding Tim RAZ
Bagi developer yang mau nambahin fitur atau edit kode di proyek ini, yuk ikuti kebiasaan baik berikut:
1. **Selalu Backup File Dulu:** Simpan salinan file ke folder `backup/` sebelum diedit.
2. **Awalan Nama File `RAZ`:** Beri nama dengan prefix `RAZ` untuk setiap file baru yang kamu buat.
3. **Gunakan Custom Modal:** Jangan pakai popup bawaan browser yang kaku (`alert` atau `confirm`). Gunakan modal cantik sesuai tema website.
4. **Komentar yang Membantu:** Tulis komentar penjelasan di kode dengan bahasa yang mudah dimengerti developer lain.
5. **No Data Palsu (Zero Dummy Data):** Pastikan semua data bersifat dinamis dan beneran berfungsi.
