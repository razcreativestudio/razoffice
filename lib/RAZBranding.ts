/**
 * Konfigurasi: RAZBranding
 * Lokasi: lib/RAZBranding.ts
 * Dibuat: 13 Oktober 2026
 * Penulis: RAZ Enterprise Core Team
 * Deskripsi: Pusat konfigurasi identitas, metadata, dan informasi produk RAZ Office.
 * Seluruh komponen dan metadata mengacu pada konstanta di file ini untuk menjaga konsistensi.
 */

export const RAZ_CONFIG = {
  /** Nama resmi aplikasi */
  appName: "RAZ Office",
  /** Versi aplikasi */
  version: "0.1.1",
  /** Tagline resmi produk */
  tagline: "Suite Perkantoran Web Modern, Mandiri & Privat (Local-First)",
  /** Deskripsi panjang produk */
  description:
    "Suite perkantoran berbasis web modern berstandar enterprise. Buka, baca, dan sunting dokumen Word, Excel, dan PowerPoint secara lokal di browser Anda dengan jaminan privasi data tanpa perlu diunggah ke server pihak ketiga.",
  /** Domain dan URL utama */
  siteUrl: "http://localhost:3000",
  /** Kata kunci pencarian (SEO keywords) */
  keywords: [
    "RAZ Office",
    "RAZ Enterprise",
    "web office",
    "suite perkantoran online",
    "Word online",
    "Excel online",
    "PowerPoint online",
    "DOCX editor",
    "XLSX editor",
    "PPTX editor",
    "PDF viewer",
    "local-first office",
    "privasi dokumen",
  ],
  /** Penulis & Organisasi */
  author: "RAZ Enterprise",
  /** Repositori GitHub resmi */
  githubUrl: "https://github.com/baotlake/office-website",
  /** Lisensi resmi */
  license: "AGPL v3",
} as const;
