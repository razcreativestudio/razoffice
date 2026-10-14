/**
 * Komponen: Logo (SVG)
 * Lokasi: components/svg/Logo.tsx
 * Diperbarui: 14 Oktober 2026
 * Penulis: RAZ Enterprise Core Team
 * Deskripsi: Komponen SVG Logo resmi RAZ Office berbasis tumpukan dokumen isometrik emas metalik (4 lapis)
 * dengan lipatan sudut elegan pada lembar utama teratas.
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
      <linearGradient id="razGoldComponent" x1="15%" y1="10%" x2="85%" y2="90%">
        <stop offset="0%" stopColor="#F8E5A8" />
        <stop offset="25%" stopColor="#DEB76A" />
        <stop offset="50%" stopColor="#C4963C" />
        <stop offset="75%" stopColor="#EED792" />
        <stop offset="100%" stopColor="#9C7122" />
      </linearGradient>
    </defs>

    <g strokeLinecap="round" strokeLinejoin="round">
      {/* Lembar 4 (Paling Bawah) */}
      <path
        d="M 72 141 L 46 156 L 122 198 L 206 151 L 182 138"
        stroke="url(#razGoldComponent)"
        strokeWidth={7}
      />

      {/* Lembar 3 (Lapisan Ketiga) */}
      <path
        d="M 72 123 L 46 138 L 122 180 L 206 133 L 182 120"
        stroke="url(#razGoldComponent)"
        strokeWidth={7}
      />

      {/* Lembar 2 (Lapisan Kedua) */}
      <path
        d="M 72 105 L 46 120 L 122 162 L 206 115 L 182 102"
        stroke="url(#razGoldComponent)"
        strokeWidth={7}
      />

      {/* Lembar 1 (Lembar Utama Atas) */}
      <path
        d="M 46 102 L 134 52 L 180 79 L 180 112 L 122 144 Z"
        stroke="url(#razGoldComponent)"
        strokeWidth={7}
      />

      {/* Lipatan Sudut Kanan Atas */}
      <path
        d="M 180 79 L 206 94 L 206 112 L 180 112"
        stroke="url(#razGoldComponent)"
        strokeWidth={7}
      />
    </g>
  </svg>
);

export default SvgLogo;
