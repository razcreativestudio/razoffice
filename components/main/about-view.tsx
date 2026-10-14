/**
 * Komponen: Halaman Tentang (AboutView)
 * Lokasi: components/main/about-view.tsx
 * Diperbarui: 14 Oktober 2026
 * Penulis: RAZ Enterprise Core Team
 * Deskripsi: Halaman info resmi mengenai RAZ Office, arsitektur local-first murni di browser,
 * komitmen privasi pengguna, dan dukungan terhadap lisensi open-source OnlyOffice (AGPL v3).
 */

"use client";

import { Github, ShieldCheck, Heart, Sparkles, Lock, Cpu } from "lucide-react";
import { useExtracted } from "next-intl";
import { usePageTitle } from "@/hooks/use-page-title";
import { Logo } from "../svg";
import { RAZ_CONFIG } from "@/lib/RAZBranding";

export function AboutView() {
  const t = useExtracted();
  usePageTitle(`About — ${RAZ_CONFIG.appName}`);

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 py-4">
      {/* Hero Bagian Atas */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-28 h-28 bg-amber-500/10 border border-amber-500/20 rounded-3xl mb-2 shadow-xl shadow-amber-500/5 transition-transform hover:scale-105">
          <Logo className="w-20 h-20" />
        </div>
        <div className="flex items-baseline justify-center gap-2">
          <span className="text-4xl sm:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600">
            RAZ
          </span>
          <span className="text-4xl sm:text-5xl font-light tracking-wide text-foreground">
            Office
          </span>
        </div>
        <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
          {RAZ_CONFIG.description}
        </p>

        {/* Badge Keunggulan Sistem */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <Lock className="w-3.5 h-3.5" /> 100% Local & Private
          </span>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
            <Cpu className="w-3.5 h-3.5" /> WebAssembly x2t Engine
          </span>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Enterprise Edition
          </span>
        </div>
      </div>

      {/* Grid Informasi Fitur & Lisensi */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
        {/* Kolom Open Source */}
        <div className="p-8 bg-card border border-border rounded-3xl hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all group">
          <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-2xl flex items-center justify-center mb-6">
            <Github className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-3">{t("Open Source")}</h3>
          <p className="text-text-secondary text-sm leading-relaxed mb-6">
            Kami percaya pada kekuatan kolaborasi open source. Seluruh source code proyek ini terbuka di GitHub untuk dilihat, dipelajari, dan dikembangkan bareng komunitas developer di seluruh dunia.
          </p>
          <a
            href={RAZ_CONFIG.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm font-semibold text-primary hover:underline"
          >
            Lihat Repository di GitHub &rarr;
          </a>
        </div>

        {/* Kolom Didukung OnlyOffice */}
        <div className="p-8 bg-card border border-border rounded-3xl hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all group">
          <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-2xl flex items-center justify-center mb-6">
            <ShieldCheck className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-3">
            Powered by OnlyOffice
          </h3>
          <p className="text-text-secondary text-sm leading-relaxed">
            Aplikasi ini dibangun di atas fondasi core engine OnlyOffice yang tangguh. Kami sepenuhnya mematuhi lisensi AGPL v3 untuk menjamin ekosistem software pengolah dokumen yang berkelanjutan, aman, dan transparan.
          </p>
        </div>
      </div>

      {/* Kartu Komitmen */}
      <div className="p-10 bg-linear-to-br from-primary/10 via-background to-orange-500/10 border border-primary/20 rounded-3xl text-center space-y-4 shadow-lg shadow-primary/5">
        <Heart className="w-8 h-8 text-red-500 mx-auto fill-red-500 animate-pulse" />
        <div className="space-y-2">
          <h3 className="text-2xl font-bold">Misi & Komitmen Kami</h3>
          <p className="text-text-secondary text-sm max-w-xl mx-auto leading-relaxed">
            Fokus kami simpel: memberikan pengalaman mengolah dokumen yang cepat, bebas ribet, dan 100% aman di perambanmu tanpa perlu upload berkas ke cloud pihak ketiga.
          </p>
        </div>
      </div>
    </div>
  );
}
