/**
 * Komponen: Header Navigasi Utama
 * Lokasi: components/main/header.tsx
 * Diperbarui: 13 Oktober 2026
 * Penulis: RAZ Enterprise Core Team
 * Deskripsi: Komponen header utama dashboard RAZ Office. Menampilkan logo perusahaan,
 * tombol pintas cepat untuk membuat dokumen baru (Word, Excel, PowerPoint, PDF), serta slot aksi dinamis.
 */

"use client";

import {
  FileText,
  Sheet,
  Presentation,
  FileType2,
} from "lucide-react";
import Image from "next/image";
import { PropsWithChildren } from "react";
import { useRouter } from "next/navigation";
import { useExtracted } from "next-intl";
import { cn } from "@/lib/utils";
import { RAZ_CONFIG } from "@/lib/RAZBranding";

export function Header({ children }: PropsWithChildren<{ className?: string }>) {
  const router = useRouter();
  const t = useExtracted();

  // Tombol aksi cepat pembuatan berkas dokumen baru
  const quickActions = [
    {
      type: "docx",
      label: "Word",
      icon: FileText,
      color:
        "text-blue-600 bg-blue-50 dark:bg-blue-900/40 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/60",
    },
    {
      type: "xlsx",
      label: "Excel",
      icon: Sheet,
      color:
        "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/40 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/60",
    },
    {
      type: "pptx",
      label: "PowerPoint",
      icon: Presentation,
      color:
        "text-orange-600 bg-orange-50 dark:bg-orange-900/40 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/60",
    },
    {
      type: "pdf",
      label: "PDF",
      icon: FileType2,
      color:
        "text-red-600 bg-red-50 dark:bg-red-900/40 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/60",
    },
  ];

  return (
    <header className="h-16 flex items-center justify-between px-4 z-20 w-full shrink-0 border-b border-border/40 bg-background/80 backdrop-blur-md">
      {/* Brand & Logo RAZ Office */}
      <div
        className="flex items-center gap-3 cursor-pointer select-none"
        onClick={() => router.push("/")}
        title="Kembali ke Beranda RAZ Office"
      >
        <div className="flex items-center justify-center p-1 rounded-xl bg-primary/10">
          <Image
            width={34}
            height={34}
            src="/logo.svg"
            className="w-8 h-8 rounded-lg"
            alt={`${RAZ_CONFIG.appName} Logo`}
            priority
          />
        </div>
        <div className="flex flex-col">
          <h1 className="text-lg font-black tracking-wider text-foreground uppercase">
            {RAZ_CONFIG.appName}
          </h1>
          <span className="text-[10px] font-semibold text-primary -mt-1 tracking-widest uppercase">
            Enterprise Suite
          </span>
        </div>
      </div>

      {children}

      {/* Tombol Pintas Dokumen Baru */}
      <div className="hidden md:flex items-center gap-2">
        {quickActions.map((action) => (
          <button
            key={action.type}
            onClick={() => router.push(`/editor?new=${action.type}`)}
            className={cn(
              "p-2 rounded-lg transition-all duration-200 flex items-center justify-center cursor-pointer shadow-xs active:scale-95",
              action.color,
            )}
            title={t("New {type}", { type: action.label })}
          >
            <action.icon className="w-5 h-5" />
          </button>
        ))}
      </div>
    </header>
  );
}
