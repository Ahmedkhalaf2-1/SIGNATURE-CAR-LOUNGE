import { useEffect, useState, type FormEvent, type SyntheticEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ROUTES, SERVICES } from '../../data/site'
import { useI18n } from '../../i18n'
import { DatePicker } from './DatePicker'
import { parseISODate, toISODate } from './dateUtils'
import './BookingForm.css'

const DEFAULT_SERVICE = SERVICES[0].option

/** Maps ?service=ppf (etc.) to the matching <option> label; unknown values fall back to the first option. */
function serviceFromQuery(key: string | null): string {
  return SERVICES.find((s) => s.key === key)?.option ?? DEFAULT_SERVICE
}

/** Arabic-Indic and Persian digits -> Latin, so a phone typed on an Arabic keyboard passes the phone pattern. */
const toLatinDigits = (v: string) => v.replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660)).replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06f0))

/** Server error text worth showing: a human sentence, not a machine code like VALIDATION_ERROR. */
const readableServerError = (json: { message?: string; error?: string } | null) =>
  json?.message || (json?.error && /\s/.test(json.error) ? json.error : '')

export function BookingForm() {
  const { t, locale } = useI18n()
  const [params] = useSearchParams()
  const queryService = params.get('service')
  const [service, setService] = useState(() => serviceFromQuery(queryService))
  const [date, setDate] = useState('')
  const [state, setState] = useState<{ phase: 'idle' | 'submitting' | 'success' | 'error'; message?: string }>({ phase: 'idle' })

  // Re-apply the preselection when the query string changes while the page stays mounted.
  useEffect(() => {
    setService(serviceFromQuery(queryService))
  }, [queryService])

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (state.phase === 'submitting') return
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>
    for (const key of ['name', 'email', 'phone', 'vehicle'] as const) {
      if (!data[key]?.trim()) {
        setState({ phase: 'error', message: t('Please complete all required fields.') })
        return
      }
    }
    // The date is optional, but when present it must be a real calendar date that is not in the past.
    if (data.preferred_date) {
      const d = parseISODate(data.preferred_date)
      const now = new Date()
      if (!d || toISODate(d) < toISODate(now)) {
        setState({ phase: 'error', message: t('Please choose a valid preferred date.') })
        return
      }
    }
    setState({ phase: 'submitting' })
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = (await res.json().catch(() => null)) as { ok?: boolean; error?: string; message?: string } | null
      if (!res.ok || !json?.ok) throw new Error(readableServerError(json))
      form.reset()
      setDate('')
      setService(serviceFromQuery(queryService))
      setState({ phase: 'success' })
    } catch (err) {
      // Arabic shows one localized message; English keeps the server's sentence when it sent one.
      const detail = locale === 'en' && err instanceof Error ? err.message : ''
      setState({ phase: 'error', message: detail || t('Something went wrong. Please try again.') })
    }
  }

  // Browser validation bubbles follow the browser language; localise them when the site is not English.
  const localizeInvalid = (e: SyntheticEvent<HTMLInputElement>) => {
    if (locale === 'en') return
    const v = e.currentTarget.validity
    e.currentTarget.setCustomValidity(
      v.valueMissing
        ? t('Please fill out this field.')
        : v.typeMismatch
          ? t('Please enter a valid email address.')
          : v.patternMismatch
            ? t('Only numbers and phone characters (#, -, *, etc) are accepted.')
            : '',
    )
  }
  const clearInvalid = (e: SyntheticEvent<HTMLInputElement>) => e.currentTarget.setCustomValidity('')
  const validity = { onInvalid: localizeInvalid, onInput: clearInvalid }

  return (
    <section className="booking-form-section" id="booking-form">
      <div className="booking-form-layout">
        <h2>{t('Plan your consultation')}</h2>
        <div className="booking-form-intro">
          <p>{t('Tell us about your car and the care you have in mind. A preferred date is a request, not a confirmed appointment.')}</p>
          <p>
            {t('Before sending your enquiry, read our')} <Link to={ROUTES.privacy}>{t('Privacy Information')}</Link> {t('and')}
            {locale === 'en' && ' '}
            <Link to={ROUTES.terms}>{t('Booking Information')}</Link>.
          </p>
        </div>
        <form className="booking-form" name="Signature consultation" aria-label={t('Signature consultation')} onSubmit={onSubmit}>
          <div className="booking-form__field">
            <label htmlFor="form-field-name">{t('Full name')}</label>
            <input type="text" name="name" id="form-field-name" required {...validity} />
          </div>
          <div className="booking-form__field">
            <label htmlFor="form-field-email">{t('Email')}</label>
            <input type="email" name="email" id="form-field-email" required {...validity} />
          </div>
          <div className="booking-form__field">
            <label htmlFor="form-field-phone">{t('Phone')}</label>
            <input
              type="tel"
              name="phone"
              id="form-field-phone"
              required
              pattern="[0-9\(\)#&+*,.\/:;<=\-]+"
              title={t('Only numbers and phone characters (#, -, *, etc) are accepted.')}
              {...validity}
              onInput={(e) => {
                e.currentTarget.value = toLatinDigits(e.currentTarget.value)
                clearInvalid(e)
              }}
            />
          </div>
          <div className="booking-form__field">
            <label htmlFor="form-field-vehicle">{t('Vehicle make, model and year')}</label>
            <input type="text" name="vehicle" id="form-field-vehicle" required {...validity} />
          </div>
          <div className="booking-form__field booking-form__field--wide">
            <label htmlFor="form-field-service">{t('Service')}</label>
            <div className="booking-form__select">
              <select name="service" id="form-field-service" value={service} onChange={(e) => setService(e.target.value)}>
                {SERVICES.map((s) => (
                  <option key={s.key} value={s.option}>
                    {t(s.option)}
                  </option>
                ))}
              </select>
              <svg aria-hidden="true" viewBox="0 0 571.4 571.4" xmlns="http://www.w3.org/2000/svg">
                <path d="M571 393Q571 407 561 418L311 668Q300 679 286 679T261 668L11 418Q0 407 0 393T11 368 36 357H536Q550 357 561 368T571 393Z" />
              </svg>
            </div>
          </div>
          <div className="booking-form__field booking-form__field--wide">
            <label htmlFor="form-field-preferred_date">{t('Preferred date')}</label>
            <DatePicker id="form-field-preferred_date" name="preferred_date" value={date} onChange={setDate} />
          </div>
          <div className="booking-form__field booking-form__field--wide">
            <label htmlFor="form-field-message">{t('Your priorities')}</label>
            <textarea name="message" id="form-field-message" rows={4} />
          </div>
          {/* Honeypot: hidden from people and assistive tech; bots that fill it are dropped server-side. */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clipPath: 'inset(50%)', opacity: 0, pointerEvents: 'none' }}
          />
          <div className="booking-form__field booking-form__field--wide">
            <button type="submit" disabled={state.phase === 'submitting'} aria-busy={state.phase === 'submitting'}>
              {state.phase === 'submitting' ? t('Sending…') : t('Send consultation request')}
            </button>
          </div>
          {state.phase === 'success' && (
            <p className="booking-form__status booking-form__field--wide" role="status">
              {t('Your submission was successful.')}
            </p>
          )}
          {state.phase === 'error' && (
            <p className="booking-form__status booking-form__field--wide" role="alert">
              {state.message}
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
