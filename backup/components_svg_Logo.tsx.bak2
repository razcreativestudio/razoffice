/**
 * Komponen: Logo (SVG)
 * Lokasi: components/svg/Logo.tsx
 * Diperbarui: 13 Oktober 2026
 * Penulis: RAZ Enterprise Core Team
 * Deskripsi: Komponen SVG Logo resmi RAZ Office dengan ikon huruf R geometris dan aksen dokumen dinamis.
 */

import * as React from "react";
import type { SVGProps } from "react";

const SvgLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    fill="none"
    {...props}
  >
    <defs>
      <linearGradient id="razGradientBg" x1="20" y1="20" x2="236" y2="236" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#2563EB" />
        <stop offset="100%" stopColor="#1D4ED8" />
      </linearGradient>
      <linearGradient id="razAccent" x1="80" y1="60" x2="200" y2="200" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#F97316" />
        <stop offset="100%" stopColor="#EA580C" />
      </linearGradient>
    </defs>

    {/* Latar Belakang Kotak Membulat Modern */}
    <rect x="24" y="24" width="208" height="208" rx="52" fill="url(#razGradientBg)" />

    {/* Lipatan Dokumen Elegan */}
    <path d="M168 24L232 88H184C175.163 88 168 80.8366 168 72V24Z" fill="white" fillOpacity={0.25} />

    {/* Batang Tegak Huruf R */}
    <rect x="68" y="72" width="26" height="112" rx="10" fill="white" />

    {/* Busur Atas Huruf R */}
    <path
      d="M68 72H134C156.091 72 172 86.3269 172 106C172 125.673 156.091 140 134 140H94V72"
      stroke="white"
      strokeWidth={26}
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Kaki Aksen Oranye Huruf R */}
    <path d="M124 134L174 184" stroke="url(#razAccent)" strokeWidth={26} strokeLinecap="round" />

    {/* Aksen Dot */}
    <circle cx="186" cy="184" r="8" fill="#FDBA74" />
  </svg>
);

export default SvgLogo;
