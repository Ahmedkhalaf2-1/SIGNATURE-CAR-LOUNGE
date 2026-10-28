import { useCallback, useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { useI18n } from '../../i18n'
import { parseISODate, toISODate } from './dateUtils'
import './DatePicker.css'

const startOfToday = () => {
  const n = new Date()
  return new Date(n.getFullYear(), n.getMonth(), n.getDate())
}

const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n)

interface DatePickerProps {
  id: string
  /** Form field name for the submitted ISO value (kept `preferred_date` for the API contract). */
  name: string
  value: string
  onChange: (iso: string) => void
}

/**
 * Calendar popup for picking a date. The visible field is read-only, so dates cannot be typed;
 * the submitted value is always ISO `YYYY-MM-DD` regardless of the display language.
 */
export function DatePicker({ id, name, value, onChange }: DatePickerProps) {
  const { t, info, isRtl } = useI18n()
  const popupId = useId()
  const root = useRef<HTMLDivElement>(null)
  const input = useRef<HTMLInputElement>(null)
  const [open, setOpen] = useState(false)
  const today = startOfToday()
  const selected = parseISODate(value)
  const [view, setView] = useState(() => new Date((selected ?? today).getFullYear(), (selected ?? today).getMonth(), 1))
  const [focusDay, setFocusDay] = useState<Date>(selected ?? today)
  const grid = useRef<HTMLDivElement>(null)

  const fmt = useMemo(
    () => ({
      field: new Intl.DateTimeFormat(info.intl, { day: 'numeric', month: 'long', year: 'numeric' }),
      month: new Intl.DateTimeFormat(info.intl, { month: 'long', year: 'numeric' }),
      weekday: new Intl.DateTimeFormat(info.intl, { weekday: 'short' }),
      full: new Intl.DateTimeFormat(info.intl, { dateStyle: 'full' }),
    }),
    [info],
  )

  const close = useCallback((refocus: boolean) => {
    setOpen(false)
    if (refocus) input.current?.focus()
  }, [])

  const openPicker = () => {
    const base = selected ?? today
    setView(new Date(base.getFullYear(), base.getMonth(), 1))
    setFocusDay(base < today ? today : base)
    setOpen(true)
  }

  // Click outside closes the popup.
  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [open])

  // Move DOM focus to the focused day while the popup is open.
  useEffect(() => {
    if (!open) return
    grid.current?.querySelector<HTMLButtonElement>(`[data-iso="${toISODate(focusDay)}"]`)?.focus()
  }, [open, focusDay, view])

  const moveFocus = (target: Date) => {
    const t0 = target < today ? today : target
    setFocusDay(t0)
    setView(new Date(t0.getFullYear(), t0.getMonth(), 1))
  }

  const onGridKey = (e: KeyboardEvent) => {
    const next = isRtl ? -1 : 1 // in RTL the next day sits to the left
    const k = e.key
    let target: Date | null = null
    if (k === 'ArrowRight') target = addDays(focusDay, next)
    else if (k === 'ArrowLeft') target = addDays(focusDay, -next)
    else if (k === 'ArrowDown') target = addDays(focusDay, 7)
    else if (k === 'ArrowUp') target = addDays(focusDay, -7)
    else if (k === 'PageDown') target = new Date(focusDay.getFullYear(), focusDay.getMonth() + 1, focusDay.getDate())
    else if (k === 'PageUp') target = new Date(focusDay.getFullYear(), focusDay.getMonth() - 1, focusDay.getDate())
    if (target) {
      e.preventDefault()
      moveFocus(target)
    }
  }

  const pick = (d: Date) => {
    onChange(toISODate(d))
    close(true)
  }

  const year = view.getFullYear()
  const month = view.getMonth()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const lead = new Date(year, month, 1).getDay() // Sunday-first week
  const sundays = Array.from({ length: 7 }, (_, i) => new Date(2023, 0, 1 + i))
  const canGoPrev = new Date(year, month, 0) >= today
  const stepMonth = (n: number) => {
    const v = new Date(year, month + n, 1)
    setView(v)
    setFocusDay(new Date(v.getFullYear(), v.getMonth(), Math.min(focusDay.getDate(), new Date(v.getFullYear(), v.getMonth() + 1, 0).getDate())))
  }

  return (
    <div
      className="dp"
      ref={root}
      onKeyDown={(e) => {
        if (e.key === 'Escape' && open) {
          e.stopPropagation()
          close(true)
        }
      }}
    >
      <input type="hidden" name={name} value={value} />
      <input
        ref={input}
        id={id}
        className="dp__field"
        type="text"
        readOnly
        autoComplete="off"
        value={selected ? fmt.field.format(selected) : ''}
        placeholder={t('Select a date')}
        role="combobox"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={popupId}
        onClick={() => (open ? close(false) : openPicker())}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
            e.preventDefault()
            openPicker()
          }
        }}
      />
      <svg className="dp__icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3.5" y="5" width="17" height="15.5" rx="1" />
        <path d="M3.5 10h17M8 3v4M16 3v4" />
      </svg>
      {open && (
        <div className="dp__popup" id={popupId} role="dialog" aria-label={t('Choose a date')}>
          <div className="dp__head">
            <button type="button" className="dp__nav" aria-label={t('Previous month')} onClick={() => stepMonth(-1)} disabled={!canGoPrev}>
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="m15 5-7 7 7 7" />
              </svg>
            </button>
            <div className="dp__title" aria-live="polite">
              {fmt.month.format(view)}
            </div>
            <button type="button" className="dp__nav dp__nav--next" aria-label={t('Next month')} onClick={() => stepMonth(1)}>
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="m15 5-7 7 7 7" />
              </svg>
            </button>
          </div>
          <div className="dp__grid" role="grid" ref={grid} onKeyDown={onGridKey}>
            {sundays.map((d) => (
              <span key={d.getDay()} className="dp__dow" role="columnheader">
                {fmt.weekday.format(d)}
              </span>
            ))}
            {Array.from({ length: lead }, (_, i) => (
              <span key={`b${i}`} role="gridcell" />
            ))}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const d = new Date(year, month, i + 1)
              const iso = toISODate(d)
              const past = d < today
              const isSel = selected !== null && iso === toISODate(selected)
              const isToday = iso === toISODate(today)
              return (
                <button
                  key={iso}
                  type="button"
                  role="gridcell"
                  data-iso={iso}
                  className={`dp__day${isSel ? ' is-selected' : ''}${isToday ? ' is-today' : ''}`}
                  disabled={past}
                  aria-selected={isSel}
                  aria-label={fmt.full.format(d)}
                  aria-current={isToday ? 'date' : undefined}
                  tabIndex={iso === toISODate(focusDay) ? 0 : -1}
                  onClick={() => pick(d)}
                >
                  {i + 1}
                </button>
              )
            })}
          </div>
          <div className="dp__foot">
            <button type="button" className="dp__link" onClick={() => pick(today)}>
              {t('Today')}
            </button>
            <button
              type="button"
              className="dp__link"
              onClick={() => {
                onChange('')
                close(true)
              }}
              disabled={!value}
            >
              {t('Clear')}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
