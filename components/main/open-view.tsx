/**
 * Komponen: Halaman Beranda / Pembuka Berkas Dokumen (OpenView)
 * Lokasi: components/main/open-view.tsx
 * Diperbarui: 14 Oktober 2026
 * Penulis: RAZ Enterprise Core Team
 * Deskripsi: Halaman beranda utama RAZ Office dengan antarmuka enterprise modern.
 * Memuat banner sambutan, area drag-and-drop dokumen lokal, kartu pembuatan dokumen baru
 * (Word, Excel, PowerPoint, PDF), rekomendasi templat profesional, serta daftar dokumen riwayat
 * berbasis IndexedDB lokal yang dilengkapi dialog konfirmasi kustom RAZModal.
 */

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  FolderOpen,
  Clock,
  X,
  Loader2,
  Sparkles,
  ArrowRight,
  Plus,
  ShieldCheck,
  Cpu,
  Layers,
  FileText,
} from "lucide-react";
import { useExtracted } from "next-intl";
import { cn } from "@/lib/utils";
import { getNewUrl } from "@/utils/editor/utils";
import { FilePickerCard } from "@/components/file-picker-card";
import { DocumentIcon } from "@/components/document-icon";
import { getDocConfig } from "@/lib/document-types";
import type { Template } from "@/utils/templates";
import { usePageTitle } from "@/hooks/use-page-title";
import { useAppStore } from "@/store";
import { RAZModal } from "@/components/ui/RAZModal";
import { RAZ_CONFIG } from "@/lib/RAZBranding";
import {
  getRecentFiles,
  openRecentFile,
  removeRecentFile,
  addRecentFile,
  formatRelativeTime,
  type RecentFileRecord,
} from "@/utils/recent-files";

export function OpenView({
  recommendedTemplates,
}: {
  recommendedTemplates: Template[];
}) {
  const t = useExtracted();
  usePageTitle(`${RAZ_CONFIG.appName} — Suite Editor Dokumen Web (Word, Excel, PowerPoint)`);
  const [recentFiles, setRecentFiles] = useState<RecentFileRecord[]>([]);
  const [fileToDelete, setFileToDelete] = useState<RecentFileRecord | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingTemplate, setLoadingTemplate] = useState<string | null>(null);

  const router = useRouter();
  const server = useAppStore((state) => state.server);

  // Memuat daftar berkas riwayat dari IndexedDB saat komponen pertama kali dimuat
  useEffect(() => {
    loadRecentFiles();
  }, []);

  const loadRecentFiles = async () => {
    try {
      setIsLoading(true);
      const files = await getRecentFiles();
      setRecentFiles(files);
    } catch (error) {
      console.error("Gagal memuat berkas terbaru:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Membuka berkas yang ada di riwayat menggunakan handle yang tersimpan
  const handleRecentFileClick = async (record: RecentFileRecord) => {
    try {
      const file = await openRecentFile(record);
      if (file) {
        await handleFileSelectWithHandle(file, record.handle);
      } else {
        await loadRecentFiles();
      }
    } catch (error) {
      console.error("Gagal membuka kembali file riwayat:", error);
      await loadRecentFiles();
    }
  };

  // Membuka templat dokumen bawaan
  const handleTemplateClick = async (tpl: Template) => {
    if (loadingTemplate) return;
    setLoadingTemplate(tpl.name);
    try {
      const url = `/files/${encodeURIComponent(tpl.filename)}`;
      await server.openUrl(url, { fileType: tpl.type, fileName: tpl.filename });
      router.push("/editor");
    } catch (err) {
      console.error("Gagal membuka templat:", err);
    } finally {
      setLoadingTemplate(null);
    }
  };

  // Membuka modal konfirmasi kustom RAZModal saat pengguna menekan tombol hapus riwayat
  const handlePromptRemoveRecentFile = (e: React.MouseEvent, file: RecentFileRecord) => {
    e.stopPropagation();
    setFileToDelete(file);
  };

  // Mengeksekusi penghapusan dari IndexedDB setelah dikonfirmasi pengguna
  const handleConfirmRemoveRecentFile = async () => {
    if (!fileToDelete) return;
    setIsDeleting(true);
    try {
      await removeRecentFile(fileToDelete.path);
      await loadRecentFiles();
      setFileToDelete(null);
    } catch (error) {
      console.error("Gagal menghapus file dari riwayat:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  // Membuka berkas dan beralih ke editor dokumen
  const handleFileSelectWithHandle = async (
    file: File,
    handle?: FileSystemFileHandle,
  ) => {
    if (handle) {
      try {
        await addRecentFile(handle);
        await loadRecentFiles();
      } catch (error) {
        console.error("Gagal menyimpan ke riwayat berkas:", error);
      }
    }

    await server.open(file);
    router.push("/editor");
  };

  // Konfigurasi jenis dokumen baru dengan deskripsi mendalam
  const newDocItems = [
    {
      type: "docx",
      title: "Dokumen Teks",
      badge: "Word (.docx)",
      description: "Surat resmi, laporan bisnis, artikel, dan proposal proyek",
      colorClass: "hover:border-blue-500/50 hover:shadow-blue-500/5",
      accentBg: "group-hover:bg-blue-500/10",
      accentText: "text-blue-500",
    },
    {
      type: "xlsx",
      title: "Lembar Sebar",
      badge: "Excel (.xlsx)",
      description: "Tabel data, kalkulasi otomatis, dan pembukuan keuangan",
      colorClass: "hover:border-emerald-500/50 hover:shadow-emerald-500/5",
      accentBg: "group-hover:bg-emerald-500/10",
      accentText: "text-emerald-500",
    },
    {
      type: "pptx",
      title: "Slide Presentasi",
      badge: "PowerPoint (.pptx)",
      description: "Dek slide visual, presentasi ide, dan materi pelatihan",
      colorClass: "hover:border-amber-500/50 hover:shadow-amber-500/5",
      accentBg: "group-hover:bg-amber-500/10",
      accentText: "text-amber-500",
    },
    {
      type: "pdf",
      title: "Dokumen PDF",
      badge: "Acrobat (.pdf)",
      description: "Formulir interaktif, anotasi, dan berkas siap cetak",
      colorClass: "hover:border-rose-500/50 hover:shadow-rose-500/5",
      accentBg: "group-hover:bg-rose-500/10",
      accentText: "text-rose-500",
    },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* 1. Header Sambutan Enterprise */}
      <section className="relative overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 via-card/60 to-background p-6 sm:p-8">
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-primary/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/15 text-primary border border-primary/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Suite Perkantoran Web Enterprise</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Selamat Datang di <span className="text-primary">{RAZ_CONFIG.appName}</span>
            </h1>
            <p className="text-sm text-text-secondary leading-relaxed">
              Buka, sunting, dan kelola dokumen Word, Excel, PowerPoint, serta PDF langsung di peramban Anda.
              Bekerja lebih cepat dan aman dengan jaminan privasi lokal 100% tanpa risiko kebocoran data cloud.
            </p>
          </div>

          <div className="flex flex-wrap md:flex-col gap-2 shrink-0">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card/80 border border-border text-xs text-text-secondary">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span className="font-medium">100% Local-First & Privat</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card/80 border border-border text-xs text-text-secondary">
              <Cpu className="w-4 h-4 text-primary" />
              <span className="font-medium">Engine WebAssembly x2t</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card/80 border border-border text-xs text-text-secondary">
              <Layers className="w-4 h-4 text-blue-500" />
              <span className="font-medium">Standar RAZ Enterprise</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Kartu Pengunggah Berkas (FilePickerCard Dropzone) */}
      <section>
        <FilePickerCard onFileSelectWithHandle={handleFileSelectWithHandle} />
      </section>

      {/* 3. Hub Pembuatan Dokumen Baru */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Plus className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold tracking-tight text-foreground">
              {t("Baru") || "Buat Dokumen Baru"}
            </h2>
          </div>
          <span className="text-xs text-text-secondary">
            Pilih jenis dokumen untuk mulai menyunting langsung
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {newDocItems.map(({ type, title, badge, description, colorClass, accentBg, accentText }) => {
            const doc = getDocConfig(type);
            return (
              <Link
                key={type}
                href={getNewUrl(type)}
                className={cn(
                  "group relative flex flex-col justify-between p-5 bg-card/60 dark:bg-zinc-900/40 border border-border/80 rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden",
                  colorClass,
                )}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={cn("p-2 rounded-xl transition-colors duration-300", accentBg)}>
                      <DocumentIcon type={type} size="md" />
                    </div>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-muted text-text-secondary border border-border">
                      {badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                    {title}
                  </h3>
                  <p className="mt-1 text-xs text-text-secondary leading-relaxed">
                    {description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-border/50 flex items-center justify-between text-xs font-semibold text-text-secondary group-hover:text-primary transition-colors">
                  <span>Buat Sekarang</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 4. Rekomendasi Templat Pilihan */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold tracking-tight text-foreground">
              {t("Recommended") || "Templat Unggulan"}
            </h2>
          </div>
          <button
            onClick={() => router.push("/template")}
            className="inline-flex items-center gap-1.5 text-xs text-primary font-semibold hover:underline cursor-pointer"
          >
            <span>{t("More templates") || "Jelajahi Semua Templat"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {recommendedTemplates.map((tpl, i) => (
            <button
              key={i}
              className="flex flex-col gap-2.5 group text-left focus:outline-none cursor-pointer"
              onClick={() => handleTemplateClick(tpl)}
              disabled={!!loadingTemplate}
            >
              <div
                className={cn(
                  "aspect-16/10 rounded-xl border border-border dark:border-white/10 shadow-sm group-hover:shadow-xl group-hover:border-primary/50 transition-all duration-300 relative overflow-hidden bg-card",
                )}
              >
                <Image
                  width={480}
                  height={270}
                  src={`/files/${encodeURIComponent(tpl.preview)}`}
                  alt={tpl.name}
                  className="w-full min-h-full h-auto object-cover object-top group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />

                {loadingTemplate === tpl.name && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-20">
                    <Loader2 className="w-7 h-7 text-primary animate-spin" />
                  </div>
                )}

                <div
                  className={cn(
                    "absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase z-10 shadow-sm",
                    getDocConfig(tpl.type).color,
                    "dark:text-white dark:bg-primary/80",
                    getDocConfig(tpl.type).lightBgColor,
                  )}
                >
                  {tpl.type}
                </div>
              </div>
              <span className="text-xs font-semibold truncate group-hover:text-primary transition-colors text-foreground">
                {tpl.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* 5. Riwayat Dokumen Terbaru */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold tracking-tight text-foreground">
              {t("Recent") || "Dokumen Terbaru"}
            </h2>
          </div>
          {recentFiles.length > 0 && (
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-semibold border border-primary/20">
              {recentFiles.length} Berkas Tersimpan
            </span>
          )}
        </div>

        {isLoading ? (
          <div className="bg-card/50 border border-border rounded-2xl p-12 flex items-center justify-center shadow-xs">
            <div className="text-center text-text-secondary">
              <Clock className="w-8 h-8 mx-auto mb-2 animate-pulse text-primary" />
              <p className="text-sm font-medium">{t("Loading recent files...") || "Memuat dokumen terbaru..."}</p>
            </div>
          </div>
        ) : recentFiles.length === 0 ? (
          <div className="bg-card/40 border border-border/80 rounded-2xl p-10 flex flex-col items-center justify-center text-center shadow-xs">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-3 text-primary">
              <FolderOpen className="w-7 h-7" />
            </div>
            <h3 className="text-sm font-bold text-foreground mb-1">
              {t("No recent files") || "Belum Ada Riwayat Dokumen"}
            </h3>
            <p className="text-xs text-text-secondary max-w-sm mb-4 leading-relaxed">
              {t("Files you open will appear here for quick access") ||
                "Dokumen yang Anda buka atau sunting akan otomatis tercatat di sini untuk akses kilat kapan pun."}
            </p>
          </div>
        ) : (
          <div className="bg-card/60 border border-border/80 rounded-2xl overflow-hidden shadow-xs divide-y divide-border/60">
            {recentFiles.map((file) => (
              <div
                key={file.path}
                onClick={() => handleRecentFileClick(file)}
                className="w-full flex items-center justify-between px-5 py-4 hover:bg-primary/[0.04] transition-colors group cursor-pointer"
                title={t("Click to reopen this file") || "Klik untuk membuka kembali file ini"}
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="shrink-0 p-1.5 rounded-lg bg-card border border-border/60 group-hover:border-primary/40 transition-colors">
                    <DocumentIcon type={file.type} size="sm" />
                  </div>
                  <div className="text-left min-w-0">
                    <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors truncate">
                      {file.name}
                    </p>
                    <p className="text-[11px] text-text-secondary mt-0.5 flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-primary/70" />
                      <span>{formatRelativeTime(file.updatedAt)}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => handlePromptRemoveRecentFile(e, file)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-destructive/10 hover:text-destructive text-text-secondary rounded-lg cursor-pointer"
                    title={t("Remove from recent") || "Hapus dari riwayat"}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Modal Dialog Kustom Konfirmasi Penghapusan Riwayat Dokumen */}
      <RAZModal
        isOpen={Boolean(fileToDelete)}
        onClose={() => setFileToDelete(null)}
        onConfirm={handleConfirmRemoveRecentFile}
        variant="danger"
        title="Hapus dari Riwayat Dokumen"
        description={`Apakah Anda yakin ingin menghapus "${fileToDelete?.name}" dari daftar dokumen terbaru? Berkas asli di penyimpanan lokal Anda tidak akan terhapus.`}
        confirmText="Hapus dari Riwayat"
        cancelText="Batal"
        isLoading={isDeleting}
      />
    </div>
  );
}
