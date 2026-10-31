import type { ReactNode } from 'react'
import { useI18n } from '../../i18n'
import type { CarView } from './carQuery'

const ICONS: Record<CarView, ReactNode> = {
  // two large tiles
  large: (
    <>
      <rect x="3.5" y="5" width="7.5" height="14" />
      <rect x="13" y="5" width="7.5" height="14" />
    </>
  ),
  // three columns, two rows
  standard: (
    <>
      <rect x="3.5" y="5" width="4.5" height="6" />
      <rect x="9.75" y="5" width="4.5" height="6" />
      <rect x="16" y="5" width="4.5" height="6" />
      <rect x="3.5" y="13" width="4.5" height="6" />
      <rect x="9.75" y="13" width="4.5" height="6" />
      <rect x="16" y="13" width="4.5" height="6" />
    </>
  ),
  // stacked rows, each with a thumbnail
  list: (
    <>
      <rect x="3.5" y="5" width="5" height="4.5" />
      <path d="M11 6h9.5M11 8.5h6" />
      <rect x="3.5" y="14.5" width="5" height="4.5" />
      <path d="M11 15.5h9.5M11 18h6" />
    </>
  ),
}

/** Large grid / standard grid / list. Selected state is exposed with aria-pressed. */
export function ViewSwitch({ view, onChange }: { view: CarView; onChange: (v: CarView) => void }) {
  const { t } = useI18n()
  const labels: Record<CarView, string> = {
    large: t('Large grid'),
    standard: t('Standard grid'),
    list: t('List view'),
  }
  return (
    <div className="car-view" role="group" aria-label={t('View')}>
      {(Object.keys(ICONS) as CarView[]).map((v) => (
        <button
          key={v}
          type="button"
          className={`car-view__btn car-view__btn--${v}${v === view ? ' is-active' : ''}`}
          aria-label={labels[v]}
          title={labels[v]}
          aria-pressed={v === view}
          onClick={() => onChange(v)}
        >
          <svg className="brand-icon" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            {ICONS[v]}
          </svg>
        </button>
      ))}
    </div>
  )
}
