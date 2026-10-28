interface IconProps {
  className?: string
}

/** Diagonal arrow used on CTAs and links (the captured `.scl-icon`). */
export function ArrowIcon({ className = 'scl-icon' }: IconProps) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path d="M6 18 18 6M6 6h12v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Plain arrow used by the interior (`scl-page-*`) call-to-actions. */
export function PageArrowIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m6 18 12-12M6 6h12v12" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

export function DownArrowIcon() {
  return (
    <svg className="scl-icon" width="20" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path d="M12 3v18m-6-6 6 6 6-6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function MenuIcon() {
  return (
    <svg className="scl-menu-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
