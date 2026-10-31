import type { ReactNode } from 'react'

/**
 * Icon system. Every icon is a stroked line drawing that shares one recipe (see `.brand-icon` in styles/globals.css): 1.2px line
 * weight at any rendered size, square caps and mitered joins (the brand's sharp geometry), `currentColor` so hover/active states
 * come from the parent. Keep new icons stroke-only and let the class do the styling.
 */

interface IconProps {
  className?: string
}

interface SvgProps {
  children: ReactNode
  className?: string
  width?: number
  height?: number
  viewBox?: string
}

function Svg({ children, className, width = 20, height = 20, viewBox = '0 0 24 24' }: SvgProps) {
  return (
    <svg className={className ? `brand-icon ${className}` : 'brand-icon'} width={width} height={height} viewBox={viewBox} aria-hidden="true" focusable="false">
      {children}
    </svg>
  )
}

/** Diagonal arrow used on CTAs and links (the captured `.scl-icon`). */
export function ArrowIcon({ className = 'scl-icon' }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M6 18 18 6M6 6h12v12" />
    </Svg>
  )
}

/** Plain arrow used by the interior (`scl-page-*`) call-to-actions. */
export function PageArrowIcon() {
  return (
    <Svg>
      <path d="m6 18 12-12M6 6h12v12" />
    </Svg>
  )
}

export function DownArrowIcon() {
  return (
    <Svg className="scl-icon" height={24}>
      <path d="M12 3v18m-6-6 6 6 6-6" />
    </Svg>
  )
}

export function MenuIcon() {
  return (
    <Svg className="scl-menu-icon" width={24} height={24}>
      <path d="M4.6 8h14.8M4.6 16h14.8" />
    </Svg>
  )
}

/** Outline globe for the language switch. */
export function GlobeIcon({ size = 18 }: { size?: number }) {
  return (
    <Svg width={size} height={size}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.6 2.7 3.9 5.7 3.9 9s-1.3 6.3-3.9 9c-2.6-2.7-3.9-5.7-3.9-9S9.4 5.7 12 3Z" />
    </Svg>
  )
}

/** Magnifier for the vehicle search field. */
export function SearchIcon() {
  return (
    <Svg width={16} height={16}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </Svg>
  )
}

/** Handset for phone numbers. */
export function PhoneIcon({ size = 18 }: { size?: number }) {
  return (
    <Svg width={size} height={size}>
      <path d="M6.5 3.5h3l1.4 4-2 1.3a11 11 0 0 0 5.3 5.3l1.3-2 4 1.4v3a2 2 0 0 1-2.2 2A15.5 15.5 0 0 1 4.5 5.7 2 2 0 0 1 6.5 3.5Z" />
    </Svg>
  )
}

/** Envelope for email addresses. */
export function MailIcon({ size = 18 }: { size?: number }) {
  return (
    <Svg width={size} height={size}>
      <rect x="3.5" y="5.5" width="17" height="13" />
      <path d="m3.5 7 8.5 6.5L20.5 7" />
    </Svg>
  )
}

/** Tray arrow for downloads. */
export function DownloadIcon({ size = 18 }: { size?: number }) {
  return (
    <Svg width={size} height={size}>
      <path d="M12 4v11m-5-5 5 5 5-5M5 19.5h14" />
    </Svg>
  )
}

type ArrowDir = 'ne' | 'e' | 'w' | 's' | 'chevron'

const ARROW_PATH: Record<ArrowDir, string> = {
  ne: 'M6 18 18 6M7.5 6H18v10.5',
  e: 'M4 12h16m-6-6 6 6-6 6',
  w: 'M20 12H4m6-6-6 6 6 6',
  s: 'M12 4v16m-6-6 6 6 6-6',
  chevron: 'm6 9 6 6 6-6',
}

/**
 * Inline arrow that replaces the typographic arrows (↗ → ← ↓ ⌄), which were drawn by whichever fallback font the OS picked.
 * Sized in `em` so it tracks the surrounding text exactly like the glyph did. Directional arrows keep the existing `.dir-arrow`
 * wrapper, so the RTL mirroring and hover nudges already attached to that class continue to apply.
 */
export function DirArrow({ dir }: { dir: ArrowDir }) {
  const directional = dir === 'ne' || dir === 'e' || dir === 'w'
  return (
    <span className={`${directional ? 'dir-arrow ' : ''}dir-glyph${dir === 'chevron' ? ' dir-glyph--chevron' : ''}`} aria-hidden="true">
      <svg className="brand-icon" viewBox="0 0 24 24" focusable="false">
        <path d={ARROW_PATH[dir]} />
      </svg>
    </span>
  )
}

/* ------------------------------------------------------------------------------------------------------------------------------
   Service icons. The brand guide describes six service icons in words only (no artwork is supplied), so these are original line
   drawings that follow those descriptions and the icon recipe above. They are IMPLEMENTATION INTERPRETATIONS, not official source
   artwork, and should be replaced if the brand team supplies final icons. Drawn on a 32 grid; rendered 35px in the Services page.
   ------------------------------------------------------------------------------------------------------------------------------ */

const SERVICE_VB = '0 0 32 32'

/** Detailing: a multi-faceted gloss sparkle with a microfibre cloth beneath it. */
export function DetailingIcon({ className, size = 35 }: { className?: string; size?: number }) {
  return (
    <Svg className={className} width={size} height={size} viewBox={SERVICE_VB}>
      <path d="M16 3l3.5 9.5L29 16l-9.5 3.5L16 29l-3.5-9.5L3 16l9.5-3.5L16 3Z" />
      <path d="M16 3v26M3 16h26" />
    </Svg>
  )
}

/** PPF: a transparent protective film layer lifted over a shield. */
export function PpfIcon({ className, size = 35 }: { className?: string; size?: number }) {
  return (
    <Svg className={className} width={size} height={size} viewBox={SERVICE_VB}>
      <path d="M16 3 27 7v9c0 6-7 11-11 13C12 27 5 22 5 16V7L16 3Z" />
      <path d="M9 12.5 15 6.6M9 17.5 21.4 5.2" />
      <path d="m11 16 3 3 7-7" />
    </Svg>
  )
}

/** Body kits: a low sports-car body showing the bumper and kit edges. */
export function BodyKitsIcon({ className, size = 35 }: { className?: string; size?: number }) {
  return (
    <Svg className={className} width={size} height={size} viewBox={SERVICE_VB}>
      <path d="M3 21h2l1.2-4.2L11 14l4-3.5h5.5L25 14l4 1.8V21h-2.2" />
      <path d="M7 21h2M13 21h6M23 21h1.8" />
      <circle cx="9" cy="21.5" r="2.5" />
      <circle cx="23" cy="21.5" r="2.5" />
      <path d="M3 24.5h26" />
    </Svg>
  )
}

/** Restoration: an antique key whose bit carries a fine gear. */
export function RestorationIcon({ className, size = 35 }: { className?: string; size?: number }) {
  return (
    <Svg className={className} width={size} height={size} viewBox={SERVICE_VB}>
      <circle cx="10" cy="10" r="5.5" />
      <circle cx="10" cy="10" r="2" />
      <path d="M14 14 27 27M22 22l3-3M25.5 25.5l3-3" />
      <path d="M21 5.5l1.5 1.5M24.5 3l-.5 2M27 7.5l-2 .5" />
    </Svg>
  )
}

/** Ceramic coating: a nano-ceramic droplet with a reflection shield. */
export function CeramicIcon({ className, size = 35 }: { className?: string; size?: number }) {
  return (
    <Svg className={className} width={size} height={size} viewBox={SERVICE_VB}>
      <path d="M16 3.5c4.6 6 8 10.3 8 15a8 8 0 0 1-16 0c0-4.7 3.4-9 8-15Z" />
      <path d="M12 19.5a4 4 0 0 0 4 4" />
      <path d="M20.5 8.5 24 6M22.5 12.5 27 11" />
    </Svg>
  )
}

/** Car spa: care bubbles and foam with a polishing sparkle. */
export function CarSpaIcon({ className, size = 35 }: { className?: string; size?: number }) {
  return (
    <Svg className={className} width={size} height={size} viewBox={SERVICE_VB}>
      <circle cx="11" cy="19" r="6" />
      <circle cx="21.5" cy="21.5" r="4" />
      <circle cx="19" cy="11" r="2.5" />
      <path d="M8.5 16.5a3 3 0 0 1 2.5-1.5" />
      <path d="M24 5l1 2.6 2.6 1-2.6 1L24 12.2l-1-2.6-2.6-1 2.6-1L24 5Z" />
    </Svg>
  )
}
