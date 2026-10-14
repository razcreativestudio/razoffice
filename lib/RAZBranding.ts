/**
 * Konfigurasi: RAZBranding
 * Lokasi: lib/RAZBranding.ts
 * Diperbarui: 14 Oktober 2026
 * Penulis: RAZ Enterprise Core Team
 * Deskripsi: Pusat konfigurasi branding, metadata, dan info produk RAZ Office.
 * Dibuat terpusat biar gampang di-maintain dan konsisten di seluruh aplikasi.
 */

export const RAZ_CONFIG = {
  /** Nama resmi aplikasi */
  appName: "RAZ Office",
  /** Versi aplikasi */
  version: "1.1.0",
  /** Tagline resmi produk */
  tagline: "Modern, Private & Serverless Web Office Suite (Word, Excel, PowerPoint, PDF)",
  /** Deskripsi produk yang ramah & mudah dimengerti */
  description:
    "Aplikasi office berbasis web yang modern, cepat, dan 100% privat. Buka, baca, dan edit file Word, Excel, PowerPoint, serta PDF langsung di browsermu tanpa perlu upload ke server mana pun.",
  /** Domain dan URL utama */
  siteUrl: "http://localhost:3000",
  /** Keyword SEO */
  keywords: [
    "RAZ Office",
    "RAZ Enterprise",
    "web office",
    "aplikasi office gratis",
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
  /** Author & Tim Pengembang */
  author: "RAZ Enterprise",
  /** Repository GitHub resmi */
  githubUrl: "https://github.com/razcreativestudio/razoffice",
  /** Lisensi resmi */
  license: "AGPL v3",
} as const;
