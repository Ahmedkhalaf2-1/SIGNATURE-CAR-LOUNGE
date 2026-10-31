import { useId, type ReactNode } from 'react'

export interface Option<T extends string> {
  id: T
  label: string
  /** CSS colour for a swatch dot. */
  swatch?: string
  disabled?: boolean
  /** Shows a small marker: this service has a treatment applied. */
  applied?: boolean
}

interface SingleProps<T extends string> {
  legend: string
  options: readonly Option<T>[]
  /** `null` leaves every option unselected (the layer is not applied yet). */
  value: T | null
  onChange: (id: T) => void
  variant?: 'chips' | 'segmented' | 'swatches'
  /** Horizontal carousel on narrow screens. */
  scroll?: boolean
  hint?: ReactNode
  hideLegend?: boolean
}

/** Native radios under a fieldset: arrow-key navigation, grouping and focus come from the browser. */
export function RadioGroup<T extends string>({ legend, options, value, onChange, variant = 'chips', scroll, hint, hideLegend }: SingleProps<T>) {
  const name = useId()
  return (
    <fieldset className="viz-group">
      <legend className={hideLegend ? 'sr-only' : undefined}>{legend}</legend>
      <div className={`viz-options viz-options--${variant}${scroll ? ' viz-options--scroll' : ''}`}>
        {options.map((o) => (
          <label key={o.id} className="viz-option">
            <input type="radio" name={name} value={o.id} checked={value === o.id} disabled={o.disabled} onChange={() => onChange(o.id)} />
            <span className="viz-option__face">
              {o.swatch && <i className="viz-swatch" style={{ background: o.swatch }} aria-hidden="true" />}
              <span>{o.label}</span>
              {o.applied && <i className="viz-applied" aria-hidden="true" />}
            </span>
          </label>
        ))}
      </div>
      {hint && <p className="viz-hint">{hint}</p>}
    </fieldset>
  )
}

interface MultiProps<T extends string> {
  legend: string
  options: readonly Option<T>[]
  values: readonly T[]
  onToggle: (id: T) => void
  scroll?: boolean
  hideLegend?: boolean
}

export function CheckGroup<T extends string>({ legend, options, values, onToggle, scroll, hideLegend }: MultiProps<T>) {
  return (
    <fieldset className="viz-group">
      <legend className={hideLegend ? 'sr-only' : undefined}>{legend}</legend>
      <div className={`viz-options viz-options--chips${scroll ? ' viz-options--scroll' : ''}`}>
        {options.map((o) => (
          <label key={o.id} className="viz-option">
            <input type="checkbox" checked={values.includes(o.id)} onChange={() => onToggle(o.id)} />
            <span className="viz-option__face">
              <span>{o.label}</span>
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}
