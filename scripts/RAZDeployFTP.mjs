/**
 * Script: Otomatisasi Deploy FTP RAZ Office
 * Lokasi: scripts/RAZDeployFTP.mjs
 * Diperbarui: 3 November 2026
 * Penulis: RAZ Enterprise Core Team
 * Deskripsi: Skrip deployment presisi tinggi via FTPS/FTP. Mendeteksi secara cerdas
 * struktur direktori di server IDwebhost (cPanel) agar file hasil build Next.js (out/)
 * terunggah tepat 100% ke document root yang aktif, mencegah salah folder / subfolder.
 */

import ftp from "basic-ftp";
import path from "path";
import fs from "fs";

async function deploy() {
  const host = process.env.FTP_SERVER;
  const user = process.env.FTP_USERNAME;
  const password = process.env.FTP_PASSWORD;
  const specifiedDir = process.env.FTP_SERVER_DIR;

  if (!host || !user || !password) {
    console.error("❌ Error: FTP_SERVER, FTP_USERNAME, dan FTP_PASSWORD wajib diisi via environment variables!");
    process.exit(1);
  }

  const client = new ftp.Client();
  client.ftp.verbose = true;
  client.ftp.timeout = 300000; // 5 menit per socket/file transfer agar file besar seperti WASM tidak timeout

  try {
    console.log(`🔌 Menghubungkan ke FTP Server: ${host}...`);
    await client.access({
      host,
      user,
      password,
      secure: false, // IDwebhost mendukung FTP standar / FTPS
    });

    const rootPwd = await client.pwd();
    console.log(`📍 Lokasi Awal Akun FTP (Root PWD): ${rootPwd}`);

    const rootList = await client.list();
    console.log("📂 Isi direktori root FTP:");
    for (const item of rootList) {
      console.log(`  - [${item.isDirectory ? "DIR " : "FILE"}] ${item.name}`);
    }

    // Strategi deteksi target directory:
    let targetDir = "";

    // 1. Cek apakah folder saat ini sudah merupakan root RAZ Office (memiliki v9.3.0.24-1 atau editor)
    const hasOfficeInRoot = rootList.some(
      (item) => item.name === "v9.3.0.24-1" || item.name === "editor" || item.name === "x2t-1"
    );

    if (hasOfficeInRoot) {
      console.log("🎯 Terdeteksi: Akun FTP ini sudah langsung ter-chroot ke document root RAZ Office!");
      targetDir = ".";
    } else if (specifiedDir && specifiedDir.trim() !== "" && specifiedDir !== "public_html/") {
      // Jika user mengisi custom directory spesifik
      console.log(`🎯 Menggunakan FTP_SERVER_DIR yang ditentukan: ${specifiedDir}`);
      targetDir = specifiedDir;
    } else {
      // 2. Cek apakah ada folder subdomain seperti office.it-raz.com atau public_html/office
      const candidateDirs = [
        "office.it-raz.com",
        "public_html/office",
        "public_html/office.it-raz.com",
        "public_html/razoffice",
        "public_html",
      ];

      for (const cand of candidateDirs) {
        try {
          await client.cd(cand);
          const candList = await client.list();
          const found = candList.some(
            (item) => item.name === "v9.3.0.24-1" || item.name === "editor" || item.name === "x2t-1"
          );
          if (found) {
            console.log(`🎯 Terdeteksi folder RAZ Office aktif di: ${cand}`);
            targetDir = cand;
            await client.cd(rootPwd); // kembali ke root
            break;
          }
          await client.cd(rootPwd);
        } catch (e) {
          await client.cd(rootPwd);
        }
      }

      if (!targetDir) {
        // Fallback jika belum pernah ada file: pilih candidate pertama yang ada
        for (const cand of candidateDirs) {
          const firstPart = cand.split("/")[0];
          if (rootList.some((item) => item.isDirectory && item.name === firstPart)) {
            targetDir = cand;
            console.log(`⚠️ Folder lama belum memiliki signature, menggunakan fallback: ${targetDir}`);
            break;
          }
        }
        if (!targetDir) {
          targetDir = ".";
          console.log("⚠️ Menggunakan direktori saat ini (.) sebagai target.");
        }
      }
    }

    console.log(`🚀 Memulai upload dari folder local ./out ke server target: [${targetDir}]...`);
    const localOut = path.resolve("./out");
    if (!fs.existsSync(localOut)) {
      throw new Error("Direktori build ./out tidak ditemukan! Jalankan pnpm run build terlebih dahulu.");
    }

    if (targetDir !== "." && targetDir !== "") {
      await client.ensureDir(targetDir);
    }
    await client.uploadFromDir(localOut, targetDir);

    console.log("✅ DEPLOY SELESAI 100%! Semua berkas di out/ berhasil disinkronkan ke IDwebhost.");
  } catch (err) {
    console.error("❌ Gagal deploy via FTP:", err);
    process.exit(1);
  } finally {
    client.close();
  }
}

deploy();
