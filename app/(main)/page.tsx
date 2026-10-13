/**
 * Halaman: Beranda Utama (HomePage)
 * Lokasi: app/(main)/page.tsx
 * Diperbarui: 13 Oktober 2026
 * Penulis: RAZ Enterprise Core Team
 * Deskripsi: Halaman pembuka berkas utama RAZ Office dengan rekomendasi templat dan area drop dokumen.
 */

import type { Metadata } from "next";
import { OpenView } from "@/components/main/open-view";
import { getRecommendedTemplates } from "@/utils/templates";
import { RAZ_CONFIG } from "@/lib/RAZBranding";

export const metadata: Metadata = {
  title: `${RAZ_CONFIG.appName} — Suite Editor Dokumen Web (Word, Excel & PowerPoint)`,
  description: RAZ_CONFIG.description,
  keywords: [...RAZ_CONFIG.keywords],
  alternates: {
    canonical: RAZ_CONFIG.siteUrl,
  },
  openGraph: {
    title: `${RAZ_CONFIG.appName} — Suite Editor Dokumen Web (Word, Excel & PowerPoint)`,
    description: RAZ_CONFIG.description,
    url: RAZ_CONFIG.siteUrl,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${RAZ_CONFIG.appName} — Suite Editor Dokumen Web`,
    description: RAZ_CONFIG.description,
  },
};

export default function HomePage() {
  const templates = getRecommendedTemplates();
  return <OpenView recommendedTemplates={templates} />;
}
