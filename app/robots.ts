/**
 * Handler: Generator robots.txt
 * Lokasi: app/robots.ts
 * Diperbarui: 13 Oktober 2026
 * Penulis: RAZ Enterprise Core Team
 * Deskripsi: Konfigurasi pengindeksan perayap mesin pencari (SEO Robots) untuk RAZ Office.
 */

import { MetadataRoute } from "next";
import { RAZ_CONFIG } from "@/lib/RAZBranding";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/settings", "/api/"],
      },
    ],
    sitemap: `${RAZ_CONFIG.siteUrl}/sitemap.xml`,
  };
}
