import { useState, type FormEvent, type SyntheticEvent } from 'react'
import { carTitle, type CarListing } from '../../../data/cars'
import { useI18n } from '../../../i18n'

/** Arabic-Indic and Persian digits -> Latin, so a phone typed on an Arabic keyboard passes the phone pattern. */
const toLatinDigits = (v: string) =>
  v.replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660)).replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06f0))

type Phase = { phase: 'idle' | 'submitting' | 'success' } | { phase: 'error'; message: string }

/**
 * Vehicle enquiry. The visitor never types the vehicle: only the slug from the route is sent, and the server resolves
 * the vehicle name from its own allowlist (it also builds the email subject).
 */
export function CarInquiryForm({ car }: { car: CarListing }) {
  const { t, locale } = useI18n()
  const [state, setState] = useState<Phase>({ phase: 'idle' })

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (state.phase === 'submitting') return
    const form = e.currentTarget
    const fd = new FormData(form)
    const data = {
      carSlug: car.slug,
      name: String(fd.get('name') ?? '').trim(),
      email: String(fd.get('email') ?? '').trim(),
      phone: String(fd.get('phone') ?? '').trim(),
      message: String(fd.get('message') ?? '').trim(),
      website: String(fd.get('website') ?? ''),
    }
    if (!data.name || !data.email || !data.phone || !data.message) {
      setState({ phase: 'error', message: t('Please complete all required fields.') })
      return
    }
    setState({ phase: 'submitting' })
    try {
      const res = await fetch('/api/car-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null
      if (!res.ok || !json?.ok) throw new Error(json?.error && /\s/.test(json.error) ? json.error : '')
      form.reset()
      setState({ phase: 'success' })
    } catch (err) {
      // Arabic shows one localized message; English keeps the server's sentence when it sent one.
      const detail = locale === 'en' && err instanceof Error ? err.message : ''
      setState({ phase: 'error', message: detail || t('Something went wrong. Please try again.') })
    }
  }

  // Browser validation bubbles follow the browser language; localise them when the site is not English.
  const localizeInvalid = (e: SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (locale === 'en') return
    const v = e.currentTarget.validity
    e.currentTarget.setCustomValidity(
      v.valueMissing || v.tooShort
        ? t('Please fill out this field.')
        : v.typeMismatch
          ? t('Please enter a valid email address.')
          : v.patternMismatch
            ? t('Only numbers and phone characters (#, -, *, etc) are accepted.')
            : '',
    )
  }
  const clearInvalid = (e: SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) => e.currentTarget.setCustomValidity('')
  const validity = { onInvalid: localizeInvalid, onInput: clearInvalid }

  const busy = state.phase === 'submitting'

  return (
    <section className="cd-section cd-enquire" id="enquire" aria-labelledby="cd-enquire-title">
      <div className="cd-wrap cd-split">
        <div>
          <h2 id="cd-enquire-title" className="cd-h2">
            {t('Request Details')}
          </h2>
          <p className="cd-enquire__lede">
            {t('Enquire about')} <bdi dir="ltr">{carTitle(car)}</bdi>
          </p>
        </div>
        <form className="cd-form" onSubmit={onSubmit} aria-label={t('Vehicle enquiry')}>
          <div className="cd-form__field">
            <label htmlFor="ci-name">{t('Full Name')}</label>
            <input id="ci-name" name="name" type="text" autoComplete="name" required minLength={2} maxLength={120} {...validity} />
          </div>
          <div className="cd-form__field">
            <label htmlFor="ci-email">{t('Email')}</label>
            <input id="ci-email" name="email" type="email" autoComplete="email" required maxLength={254} dir="ltr" {...validity} />
          </div>
          <div className="cd-form__field">
            <label htmlFor="ci-phone">{t('Phone')}</label>
            <input
              id="ci-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              required
              minLength={7}
              maxLength={40}
              pattern="[0-9\(\)#&+*,.\/:;<=\- ]+"
              title={t('Only numbers and phone characters (#, -, *, etc) are accepted.')}
              dir="ltr"
              {...validity}
              onInput={(e) => {
                e.currentTarget.value = toLatinDigits(e.currentTarget.value)
                clearInvalid(e)
              }}
            />
          </div>
          <div className="cd-form__field cd-form__field--wide">
            <label htmlFor="ci-message">{t('Message')}</label>
            <textarea id="ci-message" name="message" rows={5} required minLength={5} maxLength={2000} {...validity} />
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
          <div className="cd-form__field cd-form__field--wide">
            <button type="submit" className="car-btn" disabled={busy} aria-busy={busy}>
              {busy ? t('Sending…') : t('Send Enquiry')}
            </button>
          </div>
          {state.phase === 'success' && (
            <p className="cd-form__status cd-form__field--wide" role="status">
              {t('Your enquiry has been received. Our team will contact you shortly.')}
            </p>
          )}
          {state.phase === 'error' && (
            <p className="cd-form__status cd-form__status--error cd-form__field--wide" role="alert">
              {state.message}
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
