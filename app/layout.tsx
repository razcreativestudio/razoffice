/**
 * Layout: Root Layout Aplikasi
 * Lokasi: app/layout.tsx
 * Diperbarui: 13 Oktober 2026
 * Penulis: RAZ Enterprise Core Team
 * Deskripsi: Layout utama Next.js untuk RAZ Office. Mengatur metadata SEO global,
 * skema WebApplication Schema.org, script inisialisasi tema instan (tanpa flicker),
 * serta provider konteks multi-bahasa dan progress bar.
 */

import type { Metadata } from "next";
import { getMessages } from "next-intl/server";
import { I18nProvider } from "@/components/i18n-provider";
import { ProgressProvider } from "@/components/progress-provider";
import { RAZ_CONFIG } from "@/lib/RAZBranding";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(RAZ_CONFIG.siteUrl),
  title: {
    default: `${RAZ_CONFIG.appName} — Suite Editor Dokumen Web (Word, Excel & PowerPoint)`,
    template: `%s — ${RAZ_CONFIG.appName}`,
  },
  description: RAZ_CONFIG.description,
  keywords: [...RAZ_CONFIG.keywords],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
    apple: "/logo.svg",
  },
  openGraph: {
    siteName: RAZ_CONFIG.appName,
    title: `${RAZ_CONFIG.appName} — Suite Perkantoran Web Modern & Privat`,
    description: RAZ_CONFIG.description,
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: RAZ_CONFIG.appName,
    description: RAZ_CONFIG.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-title": RAZ_CONFIG.appName,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();

  // Script inisialisasi tema sebelum rendering DOM untuk mencegah efek flash (Default: Modern Dark)
  const preload = () => {
    let theme = document.cookie.match(/theme=([^;]+)/)?.[1];
    if (!theme) {
      try {
        const stored = localStorage.getItem("office-state");
        if (stored) {
          const parsed = JSON.parse(stored);
          const t = parsed?.state?.theme;
          if (t) {
            theme = (t === "theme-dark" || t === "theme-night" || t === "theme-contrast-dark") ? "dark" : "light";
          }
        }
      } catch (e) {}
    }
    // Default aplikasi adalah Modern Dark (dark mode) jika belum ada preferensi spesifik
    const isDark = theme ? theme === "dark" : true;
    document.documentElement.classList.toggle("dark", isDark);
  };

  // Structured Data (JSON-LD) untuk mesin pencari
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: RAZ_CONFIG.appName,
    url: RAZ_CONFIG.siteUrl,
    description: RAZ_CONFIG.description,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Sunting berkas DOCX, XLSX, PPTX secara instan",
      "Pemrosesan lokal di browser tanpa unggah ke server",
      "Privasi penuh dan keamanan data tingkat tinggi",
      "Katalog templat profesional siap pakai",
      "Integrasi penyimpanan lokal IndexedDB",
    ],
  };

  return (
    <html suppressHydrationWarning lang="id">
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(${preload.toString()})()` }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased selection:bg-primary/20 selection:text-primary">
        <ProgressProvider>
          <I18nProvider initialMessages={messages}>{children}</I18nProvider>
        </ProgressProvider>
      </body>
    </html>
  );
}
