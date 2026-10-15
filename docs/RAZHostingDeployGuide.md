# Panduan Otomatisasi Deploy RAZ Office ke IDwebhost via GitHub Actions

> **Pembaruan Terakhir:** 15 Oktober 2026  
> **Standar:** RAZ Enterprise Documentation  

Dokumen ini menjelaskan cara menyambungkan repository GitHub kamu dengan hosting **IDwebhost (Paket Tera / cPanel)** agar website **selalu otomatis ter-update** setiap kali kamu melakukan `git push` ke branch `main`.

---

## 💡 Konsep Singkat: Bagaimana Cara Kerjanya?

1. **Shared Hosting (cPanel)** seperti Paket Tera di IDwebhost punya RAM dan resource terbatas, sehingga tidak cocok untuk menjalankan perintah kompilasi berat (`pnpm run build` Next.js) langsung di dalam server hosting.
2. **Solusi Terbaik & Paling Cepat:**
   - **GitHub Actions (Server GitHub)** yang melakukan pekerjaan berat: mengunduh kode, memasang dependensi, dan mengompilasi aplikasi menjadi file statis siap saji di dalam folder `out/`.
   - Setelah selesai, GitHub otomatis mengirim file dari folder `out/` ke hosting IDwebhost kamu melalui **FTP / FTPS**.
   - **Hasilnya:** Hosting IDwebhost kamu tetap ringan, tidak boros RAM, dan website selalu 100% sinkron dengan commit terbaru di GitHub!

---

## 🛠️ Langkah-Langkah Pengaturan (Cukup Sekali Setup)

### Langkah 1: Siapkan Akun FTP di cPanel IDwebhost

1. Login ke **cPanel** IDwebhost kamu.
2. Cari menu **FTP Accounts** (Akun FTP).
3. Buat akun FTP baru (atau kamu juga bisa menggunakan akun cPanel utama kamu):
   - **Log in / User**: misalnya `razdeploy`
   - **Domain**: pilih domain kamu (misalnya `namadomainkamu.com`)
   - **Password**: buat password yang kuat dan catat baik-baik.
   - **Directory (Penting!)**: Arahkan ke `public_html` (jika web berada di domain utama) atau `public_html/subfolder` (jika menggunakan subdomain / subfolder).
   - **Quota**: Pilih **Unlimited**.
4. Catat 3 informasi penting:
   - **Host / Server FTP**: Biasanya `ftp.namadomainkamu.com` atau IP server hosting kamu (cek di email selamat datang / informasi akun IDwebhost).
   - **Username FTP**: `razdeploy@namadomainkamu.com` (atau username cPanel utama).
   - **Password FTP**: Password yang tadi kamu buat.

---

### Langkah 2: Masukkan Kredensial ke GitHub Secrets

Agar password hosting kamu aman dan tidak terlihat publik di kode, kita simpan di fitur rahasia (**GitHub Secrets**):

1. Buka repo kamu di browser: `https://github.com/razcreativestudio/razoffice`
2. Klik tab **Settings** di bagian atas menu repository.
3. Di panel sebelah kiri, klik **Secrets and variables** > pilih **Actions**.
4. Klik tombol hijau **New repository secret**.
5. Tambahkan secret berikut satu per satu:

| Nama Secret | Nilai / Value | Contoh |
| :--- | :--- | :--- |
| `FTP_SERVER` | Alamat host FTP server IDwebhost kamu | `ftp.namadomainkamu.com` atau `103.xxx.xxx.xxx` |
| `FTP_USERNAME` | Username akun FTP kamu | `razdeploy@namadomainkamu.com` |
| `FTP_PASSWORD` | Password akun FTP kamu | `PasswordRahasiaKamu123!` |
| `FTP_SERVER_DIR` *(Opsional)* | Target folder di hosting kamu | `public_html/` *(atau kosongkan jika akun FTP sudah langsung mengarah ke public_html)* |

---

### Langkah 3: Uji Coba Otomatisasi (Auto-Deploy)

Setelah Secret tersimpan, sistem otomasi sudah aktif! 

Kamu punya dua cara untuk menjalankannya:

1. **Cara Otomatis (Setiap Push):**
   - Lakukan perubahan kode di komputer kamu.
   - Jalankan `git commit` dan `git push origin main`.
   - Buka tab **Actions** di GitHub repo kamu, kamu akan melihat proses **RAZ Deploy to IDwebhost** sedang berjalan secara otomatis.
2. **Cara Manual (Kapan Saja Dibutuhkan):**
   - Buka tab **Actions** di GitHub repo kamu.
   - Pilih workflow **RAZ Deploy to IDwebhost** di sebelah kiri.
   - Klik tombol **Run workflow** > pilih branch `main` > klik **Run workflow**.

---

## 🔍 Troubleshooting (Jika Terjadi Kendala)

- **Error: Connection Timeout / ECONNREFUSED**:
  - Pastikan `FTP_SERVER` menggunakan alamat IP server hosting atau hostname yang aktif (bukan domain yang belum terpointing DNS-nya).
- **File terupload tapi web masih menampilkan versi lama**:
  - Bersihkan cache browser (Ctrl + Shift + R atau buka di Mode Incognito / Private Window).
  - Jika cPanel IDwebhost kamu mengaktifkan LiteSpeed Cache, masuk ke cPanel lalu klik **LiteSpeed Web Server** > **Flush All Caches**.
- **Ingin deploy ke Subfolder (misal `domain.com/office/`)**:
  - Ubah `FTP_SERVER_DIR` menjadi `public_html/office/`.
  - Pastikan folder `office` sudah ada di cPanel File Manager.
