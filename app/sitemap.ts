/**
 * Handler: Generator sitemap.xml
 * Lokasi: app/sitemap.ts
 * Diperbarui: 13 Oktober 2026
 * Penulis: RAZ Enterprise Core Team
 * Deskripsi: Peta situs XML dinamis untuk optimasi mesin pencari pada RAZ Office.
 */

import { MetadataRoute } from "next";
import { RAZ_CONFIG } from "@/lib/RAZBranding";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = RAZ_CONFIG.siteUrl;

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${base}/template`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${base}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];
}
