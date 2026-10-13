/**
 * Halaman: Katalog Templat Dokumen
 * Lokasi: app/(main)/template/page.tsx
 * Diperbarui: 13 Oktober 2026
 * Penulis: RAZ Enterprise Core Team
 * Deskripsi: Halaman galeri templat dokumen resmi RAZ Office untuk format Word, Excel, dan PowerPoint.
 */

import type { Metadata } from "next";
import { TemplateView } from "@/components/main/template-view";
import { getTemplates } from "@/utils/templates";
import { RAZ_CONFIG } from "@/lib/RAZBranding";

export const metadata: Metadata = {
  title: `Templat Dokumen Gratis — ${RAZ_CONFIG.appName}`,
  description:
    "Katalog templat profesional gratis untuk dokumen Word, lembar kerja Excel, dan presentasi PowerPoint. Buka dan sunting langsung di browser tanpa perlu login.",
  keywords: [
    "templat office gratis",
    "templat Word",
    "templat Excel",
    "templat PowerPoint",
    "templat resume",
    "templat presentasi",
    "RAZ Office",
  ],
  alternates: {
    canonical: `${RAZ_CONFIG.siteUrl}/template`,
  },
  openGraph: {
    title: `Templat Dokumen Gratis — ${RAZ_CONFIG.appName}`,
    description:
      "Katalog templat profesional siap pakai untuk Word, Excel, dan PowerPoint di RAZ Office.",
    url: `${RAZ_CONFIG.siteUrl}/template`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Templat Dokumen Gratis — ${RAZ_CONFIG.appName}`,
    description:
      "Katalog templat profesional siap pakai untuk Word, Excel, dan PowerPoint di RAZ Office.",
  },
};

export default function TemplatePage() {
  const templates = getTemplates();
  return <TemplateView initialTemplates={templates} />;
}
