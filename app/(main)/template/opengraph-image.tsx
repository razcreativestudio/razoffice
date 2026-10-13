/**
 * Route: Image OpenGraph Templat
 * Lokasi: app/(main)/template/opengraph-image.tsx
 * Diperbarui: 13 Oktober 2026
 * Penulis: RAZ Enterprise Core Team
 * Deskripsi: Dynamic OG banner image generator untuk katalog templat RAZ Office.
 */

import { ImageResponse } from "next/og";
import { OgImage } from "@/components/image/og-image";
import { getOgFonts } from "@/utils/og";
import { RAZ_CONFIG } from "@/lib/RAZBranding";

export const dynamic = "force-static";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };
export const alt = `Templat Dokumen Gratis – Word, Excel & PowerPoint | ${RAZ_CONFIG.appName}`;

export default async function Image() {
  const image = await OgImage({
    title: "Templat Dokumen Gratis",
    subtitle: "Word | Excel | PowerPoint — Siap Pakai",
  });
  const fonts = await getOgFonts();

  return new ImageResponse(image, {
    ...size,
    fonts,
  });
}
