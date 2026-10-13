/**
 * Halaman: Tentang RAZ Office
 * Lokasi: app/(main)/about/page.tsx
 * Diperbarui: 13 Oktober 2026
 * Penulis: RAZ Enterprise Core Team
 * Deskripsi: Halaman deskripsi arsitektur, dedikasi sumber terbuka, dan komitmen privasi RAZ Office.
 */

import type { Metadata } from "next";
import { AboutView } from "@/components/main/about-view";
import { RAZ_CONFIG } from "@/lib/RAZBranding";

export const metadata: Metadata = {
  title: `Tentang — ${RAZ_CONFIG.appName}`,
  description: `${RAZ_CONFIG.appName} adalah suite perkantoran berbasis web berstandar enterprise yang mengutamakan privasi pengguna dengan pemrosesan dokumen 100% lokal di browser.`,
  robots: {
    index: true,
    follow: true,
  },
};

export default function AboutPage() {
  return <AboutView />;
}
