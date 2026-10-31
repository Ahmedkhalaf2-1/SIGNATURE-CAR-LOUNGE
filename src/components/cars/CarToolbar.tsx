import { useId, useState, type ReactNode } from 'react'
import { useI18n } from '../../i18n'
import type { CarListing } from '../../data/cars'
import { STATUSES, activeFilterCount, filterOptions, type CarFilters, type CarView, type SortKey } from './carQuery'
import { ViewSwitch } from './ViewSwitch'
import { SearchIcon } from '../common/Icons'
import { useCarFormat } from './useCarFormat'

interface Props {
  cars: CarListing[]
  filters: CarFilters
  onChange: (patch: Partial<CarFilters>) => void
  onClear: () => void
  resultCount: number
  view: CarView
  onViewChange: (v: CarView) => void
}

function Field({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  return (
    <div className="car-field">
      <label htmlFor={id}>{label}</label>
      <div className="car-select">
        {children}
        <svg className="brand-icon" width="12" height="12" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </div>
  )
}

/** Search + filter controls. On narrow screens the selects collapse behind a Filters toggle. */
export function CarToolbar({ cars, filters, onChange, onClear, resultCount, view, onViewChange }: Props) {
  const { t } = useI18n()
  const fmt = useCarFormat()
  const uid = useId()
  const [open, setOpen] = useState(false)
  const { makes, models, years } = filterOptions(cars, filters.make)
  const active = activeFilterCount(filters)
  const id = (n: string) => `${uid}-${n}`

  return (
    <>
    <form className="car-toolbar" role="search" onSubmit={(e) => e.preventDefault()}>
      <div className="car-toolbar__row">
        <div className="car-field car-field--search">
          <label htmlFor={id('q')}>{t('Search vehicles')}</label>
          <div className="car-search">
            <SearchIcon />
            <input
              id={id('q')}
              type="search"
              value={filters.search}
              placeholder={t('Search vehicles')}
              autoComplete="off"
              onChange={(e) => onChange({ search: e.target.value })}
            />
          </div>
        </div>
        <button
          type="button"
          className="car-toolbar__toggle"
          aria-expanded={open}
          aria-controls={id('filters')}
          onClick={() => setOpen((v) => !v)}
        >
          {t('Filters')}
          {active > 0 && <span className="car-toolbar__badge">{fmt.number(active)}</span>}
        </button>
      </div>

      <div className={`car-toolbar__filters${open ? ' is-open' : ''}`} id={id('filters')}>
        <Field id={id('make')} label={t('Make')}>
          <select
            id={id('make')}
            value={filters.make}
            onChange={(e) => onChange({ make: e.target.value, model: '' })}
          >
            <option value="">{t('All makes')}</option>
            {makes.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </Field>
        <Field id={id('model')} label={t('Model')}>
          <select id={id('model')} value={filters.model} onChange={(e) => onChange({ model: e.target.value })}>
            <option value="">{t('All models')}</option>
            {models.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </Field>
        {years.length > 0 && (
        <Field id={id('year')} label={t('Year')}>
          <select id={id('year')} value={filters.year} onChange={(e) => onChange({ year: e.target.value })}>
            <option value="">{t('All years')}</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </Field>
        )}
        <Field id={id('status')} label={t('Status')}>
          <select id={id('status')} value={filters.status} onChange={(e) => onChange({ status: e.target.value })}>
            <option value="">{t('All statuses')}</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {fmt.status(s)}
              </option>
            ))}
          </select>
        </Field>
      </div>
    </form>

      <div className="car-results">
        <div className="car-results__info">
          <p className="car-count" role="status" aria-live="polite">
            {fmt.count(resultCount)}
          </p>
          {active > 0 && (
            <button type="button" className="car-link-btn" onClick={onClear}>
              {t('Clear filters')}
            </button>
          )}
        </div>
        <div className="car-results__controls">
          <ViewSwitch view={view} onChange={onViewChange} />
          <div className="car-field car-field--sort">
            <label htmlFor={id('sort')}>{t('Sort by')}</label>
            <div className="car-select">
              <select id={id('sort')} value={filters.sort} onChange={(e) => onChange({ sort: e.target.value as SortKey })}>
                <option value="featured">{t('Featured')}</option>
                <option value="make">{t('Make: A to Z')}</option>
                {years.length > 0 && <option value="newest">{t('Newest')}</option>}
              </select>
              <svg className="brand-icon" width="12" height="12" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
