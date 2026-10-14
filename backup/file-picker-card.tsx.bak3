/**
 * Komponen: Kartu Pengunggah Berkas Dokumen (FilePickerCard)
 * Lokasi: components/file-picker-card.tsx
 * Diperbarui: 14 Oktober 2026
 * Penulis: RAZ Enterprise Core Team
 * Deskripsi: Area dropzone interaktif berdesain modern dengan paduan bahasa yang luwes & ramah.
 * Mendukung pembukaan dokumen Word, Excel, PowerPoint, dan PDF secara lokal (Local-First).
 */

"use client";

import { useRef, useState, useEffect } from "react";
import { Upload, FileUp, ShieldCheck, FolderOpen } from "lucide-react";
import { useExtracted } from "next-intl";

interface FilePickerCardProps {
  onFileSelect?: (file: File) => void;
  onFileSelectWithHandle?: (file: File, handle?: FileSystemFileHandle) => void;
  accept?: string;
}

export function FilePickerCard({
  onFileSelect,
  onFileSelectWithHandle,
  accept = ".docx,.doc,.xlsx,.xls,.pptx,.ppt,.pdf",
}: FilePickerCardProps) {
  const t = useExtracted();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [supportsFileSystemAPI, setSupportsFileSystemAPI] = useState(false);

  // Cek dukungan File System Access API di browser
  useEffect(() => {
    if (typeof window !== "undefined" && "showOpenFilePicker" in window) {
      setSupportsFileSystemAPI(true);
    }
  }, []);

  // Buka file dialog sistem
  const handleClick = async () => {
    if (supportsFileSystemAPI) {
      try {
        // @ts-ignore - File System Access API
        const [fileHandle] = await window.showOpenFilePicker({
          types: [
            {
              description: "Office Documents",
              accept: {
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                  [".docx"],
                "application/msword": [".doc"],
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                  [".xlsx"],
                "application/vnd.ms-excel": [".xls"],
                "application/vnd.openxmlformats-officedocument.presentationml.presentation":
                  [".pptx"],
                "application/vnd.ms-powerpoint": [".ppt"],
                "application/pdf": [".pdf"],
              },
            },
          ],
          multiple: false,
        });

        const file = await fileHandle.getFile();
        if (file) {
          if (onFileSelectWithHandle) {
            onFileSelectWithHandle(file, fileHandle);
          } else if (onFileSelect) {
            onFileSelect(file);
          }
        }
        return;
      } catch (err: any) {
        if (err.name === "AbortError") return;
        console.warn("File System Access API error, fallback to standard input:", err);
      }
    }

    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (onFileSelectWithHandle) {
        onFileSelectWithHandle(file, undefined);
      } else if (onFileSelect) {
        onFileSelect(file);
      }
    }
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    if (!e.dataTransfer) return;

    const files = Array.from(e.dataTransfer.files);
    const items = Array.from(e.dataTransfer.items);

    if (items.length > 0 && items[0].kind === "file") {
      const item = items[0];
      try {
        // @ts-ignore
        const handle = await (item as any).getAsFileSystemHandle?.();
        if (handle && handle.kind === "file") {
          const file = files[0];
          if (file) {
            if (onFileSelectWithHandle) {
              onFileSelectWithHandle(file, handle);
            } else if (onFileSelect) {
              onFileSelect(file);
            }
            return;
          }
        }
      } catch (err) {
        console.log("Could not get FileSystemHandle from drag:", err);
      }
    }

    const fallbackFile = files[0];
    if (fallbackFile) {
      if (onFileSelectWithHandle) {
        onFileSelectWithHandle(fallbackFile, undefined);
      } else if (onFileSelect) {
        onFileSelect(fallbackFile);
      }
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept={accept}
        onChange={handleFileChange}
      />

      <div
        onClick={handleClick}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick();
          }
        }}
        className={`
          relative w-full overflow-hidden rounded-2xl cursor-pointer
          border-2 transition-all duration-300 group
          p-6 sm:p-8 md:p-10
          ${
            isDragOver
              ? "border-primary bg-primary/10 shadow-2xl shadow-primary/20 scale-[1.01]"
              : "border-primary/25 hover:border-primary/60 bg-gradient-to-b from-card/80 via-card/50 to-primary/[0.03] hover:shadow-xl hover:shadow-primary/5"
          }
        `}
      >
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-primary/10 rounded-full blur-3xl pointer-events-none group-hover:bg-primary/15 transition-colors duration-500" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-primary/5 rounded-full blur-3xl pointer-events-none group-hover:bg-primary/10 transition-colors duration-500" />

        <div className="relative z-10 flex flex-col items-center justify-center text-center">
          <div
            className={`
              w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mb-4
              transition-all duration-300 shadow-md
              ${
                isDragOver
                  ? "bg-primary text-black scale-110 rotate-6 shadow-primary/30"
                  : "bg-primary/10 text-primary border border-primary/25 group-hover:bg-primary group-hover:text-black group-hover:scale-105 group-hover:border-primary"
              }
            `}
          >
            {isDragOver ? (
              <FileUp className="w-8 h-8 sm:w-10 sm:h-10 animate-bounce" />
            ) : (
              <Upload className="w-7 h-7 sm:w-9 sm:h-9 transition-transform duration-300 group-hover:-translate-y-0.5" />
            )}
          </div>

          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mb-2">
            {isDragOver ? "Drop file kamu di sini" : "Drag & Drop File ke Sini"}
          </h3>

          <p className="text-sm text-text-secondary max-w-lg mx-auto mb-5 leading-relaxed">
            Buka dan edit dokumen Office langsung dari komputermu tanpa perlu upload ke server mana pun. Cepat, privat, dan aman.
          </p>

          <div className="mb-5">
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-primary text-black shadow-md shadow-primary/20 group-hover:bg-primary/95 group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-200">
              <FolderOpen className="w-4 h-4" />
              Browse Files from Device
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
              Word (.docx)
            </span>
            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              Excel (.xlsx)
            </span>
            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              PowerPoint (.pptx)
            </span>
            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-semibold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
              PDF
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-text-secondary/80">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span>100% Local & Private: File diproses langsung di peramban tanpa kirim data ke cloud</span>
          </div>
        </div>
      </div>
    </>
  );
}
