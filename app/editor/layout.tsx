/**
 * Layout: Ruang Kerja Editor Dokumen
 * Lokasi: app/editor/layout.tsx
 * Diperbarui: 13 Oktober 2026
 * Penulis: RAZ Enterprise Core Team
 * Deskripsi: Layout isolasi layar penuh untuk editor dokumen RAZ Office.
 */

import type { Metadata } from "next";
import { PropsWithChildren } from "react";
import { RAZ_CONFIG } from "@/lib/RAZBranding";

export const metadata: Metadata = {
  title: `Editor Dokumen — ${RAZ_CONFIG.appName}`,
  description:
    "Buka dan edit file Word, Excel, dan PowerPoint langsung di browsermu. 100% privat, cepat, dan mandiri tanpa kirim data ke server.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Layout({ children }: PropsWithChildren<unknown>) {
  return <>{children}</>;
}
