/**
 * Komponen: RAZModal
 * Lokasi: components/ui/RAZModal.tsx
 * Dibuat: 13 Oktober 2026
 * Penulis: RAZ Enterprise Core Team
 * Deskripsi: Komponen Dialog Modal Kustom berstandar RAZ Enterprise untuk menggantikan
 * dialog browser bawaan (alert/confirm/prompt). Mendukung animasi transisi halus, backdrop blur,
 * tombol aksi ganda (konfirmasi & batal), serta ikon tipe (warning, info, danger, success).
 */

"use client";

import React, { useEffect } from "react";
import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type RAZModalVariant = "danger" | "warning" | "info" | "success";

export interface RAZModalProps {
  /** Menentukan apakah modal sedang terbuka atau tertutup */
  isOpen: boolean;
  /** Callback saat modal diminta ditutup (klik tombol silang / batal / latar belakang) */
  onClose: () => void;
  /** Callback saat tombol aksi konfirmasi ditekan */
  onConfirm?: () => void;
  /** Judul modal */
  title: string;
  /** Deskripsi atau pesan edukatif di dalam modal */
  description?: string;
  /** Konten tambahan opsional */
  children?: React.ReactNode;
  /** Teks pada tombol konfirmasi (default: 'Konfirmasi') */
  confirmText?: string;
  /** Teks pada tombol batal (default: 'Batal') */
  cancelText?: string;
  /** Variasi visual modal: danger, warning, info, atau success */
  variant?: RAZModalVariant;
  /** Status sedang memuat aksi (loading state) */
  isLoading?: boolean;
}

export function RAZModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  children,
  confirmText = "Konfirmasi",
  cancelText = "Batal",
  variant = "info",
  isLoading = false,
}: RAZModalProps) {
  // Tutup modal jika tombol keyboard 'Escape' ditekan
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen && !isLoading) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isLoading, onClose]);

  if (!isOpen) return null;

  // Ikon dan warna berdasarkan varian
  const variantConfig = {
    danger: {
      icon: AlertCircle,
      iconColor: "text-red-500 bg-red-500/10 border-red-500/20",
      confirmBtn: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
    },
    warning: {
      icon: AlertTriangle,
      iconColor: "text-amber-500 bg-amber-500/10 border-amber-500/20",
      confirmBtn: "bg-amber-600 hover:bg-amber-700 text-white focus:ring-amber-500",
    },
    info: {
      icon: Info,
      iconColor: "text-blue-500 bg-blue-500/10 border-blue-500/20",
      confirmBtn: "bg-primary hover:bg-primary/90 text-primary-foreground focus:ring-primary",
    },
    success: {
      icon: CheckCircle2,
      iconColor: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
      confirmBtn: "bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-500",
    },
  }[variant];

  const IconComponent = variantConfig.icon;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        // Klik di backdrop menutup modal jika tidak sedang proses loading
        if (e.target === e.currentTarget && !isLoading) {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-md bg-card text-card-foreground border border-border rounded-2xl shadow-2xl overflow-hidden scale-100 animate-in zoom-in-95 duration-200">
        {/* Tombol Tutup Silang di Kanan Atas */}
        <button
          onClick={onClose}
          disabled={isLoading}
          aria-label="Tutup dialog"
          className="absolute top-4 right-4 p-1.5 rounded-lg text-text-secondary hover:text-foreground hover:bg-muted transition-colors disabled:opacity-50"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Konten Utama Dialog */}
        <div className="p-6 space-y-4">
          <div className="flex items-start gap-4">
            <div
              className={cn(
                "p-2.5 rounded-xl border shrink-0 flex items-center justify-center",
                variantConfig.iconColor
              )}
            >
              <IconComponent className="w-5 h-5" />
            </div>
            <div className="space-y-1 pr-4">
              <h3 className="text-lg font-bold leading-tight tracking-tight text-foreground">
                {title}
              </h3>
              {description && (
                <p className="text-sm text-text-secondary leading-relaxed">
                  {description}
                </p>
              )}
            </div>
          </div>

          {children && <div className="pt-2">{children}</div>}
        </div>

        {/* Bilah Tombol Aksi Bawah */}
        <div className="px-6 py-4 bg-muted/40 border-t border-border flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium rounded-lg text-foreground bg-secondary/80 hover:bg-secondary border border-border/50 transition-colors disabled:opacity-50"
          >
            {cancelText}
          </button>

          {onConfirm && (
            <button
              type="button"
              onClick={onConfirm}
              disabled={isLoading}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-lg shadow-sm transition-all flex items-center gap-2 disabled:opacity-50",
                variantConfig.confirmBtn
              )}
            >
              {isLoading && (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              )}
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
