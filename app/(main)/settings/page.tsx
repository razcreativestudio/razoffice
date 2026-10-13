/**
 * Halaman: Pengaturan RAZ Office
 * Lokasi: app/(main)/settings/page.tsx
 * Diperbarui: 13 Oktober 2026
 * Penulis: RAZ Enterprise Core Team
 * Deskripsi: Halaman preferensi pengguna untuk bahasa, tema antarmuka, dan konfigurasi plugin.
 */

import type { Metadata } from "next";
import { SettingsView } from "@/components/main/settings-view";
import { RAZ_CONFIG } from "@/lib/RAZBranding";

export const metadata: Metadata = {
  title: `Pengaturan — ${RAZ_CONFIG.appName}`,
  description: `Sesuaikan preferensi tema editor, bahasa antarmuka, dan plugin untuk ${RAZ_CONFIG.appName}.`,
  robots: {
    index: false,
    follow: false,
  },
};

export default function SettingsPage() {
  return <SettingsView />;
}
