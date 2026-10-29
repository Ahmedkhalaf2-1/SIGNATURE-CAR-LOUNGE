import type { ReactNode } from 'react'

const base = { width: 28, height: 28, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true, focusable: false } as const

const PATHS: Record<string, ReactNode> = {
  year: (
    <>
      <rect x="4" y="5.5" width="16" height="14" rx="1" />
      <path d="M4 10h16M8.5 3.5v4M15.5 3.5v4" />
    </>
  ),
  mileage: (
    <>
      <path d="M4.5 17a8.5 8.5 0 1 1 15 0" />
      <path d="m12 14 3.5-4.5" />
      <path d="M12 6.5v1.2M6.3 9.3l.9.8M17.7 9.3l-.9.8" />
    </>
  ),
  engine: (
    <>
      <path d="M7 8.5h8.5l2 2H20v5h-2.5l-2 2H8.5l-1.5-1.8H4v-4h3zM10 8.5V6.5h4M9 6.5h6" />
    </>
  ),
  power: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="m14.8 9.2-1.6 4-4 1.6 1.6-4z" />
    </>
  ),
  drive: (
    <>
      <path d="M7 4v16M17 4v16M7 12h10M7 4a1.6 1.6 0 1 0 0 .01M17 4a1.6 1.6 0 1 0 0 .01M12 4v16" />
    </>
  ),
  accel: (
    <>
      <circle cx="12" cy="13.5" r="7" />
      <path d="M12 13.5V9.5M9.5 3.5h5M12 3.5v3" />
    </>
  ),
  top: (
    <>
      <path d="M4.5 17a8.5 8.5 0 1 1 15 0" />
      <path d="m12 14 3.5-4.5" />
    </>
  ),
  torque: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
    </>
  ),
  weight: (
    <>
      <path d="M6 9h12l1.5 10h-15z" />
      <circle cx="12" cy="6.2" r="2" />
    </>
  ),
}

export function SpecIcon({ name }: { name: string }) {
  return <svg {...base}>{PATHS[name] ?? PATHS.engine}</svg>
}
