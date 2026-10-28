import { useEffect, useState, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ROUTES, SERVICES } from '../../data/site'
import './BookingForm.css'

const DEFAULT_SERVICE = SERVICES[0].option

/** Maps ?service=ppf (etc.) to the matching <option> label; unknown values fall back to the first option. */
function serviceFromQuery(key: string | null): string {
  return SERVICES.find((s) => s.key === key)?.option ?? DEFAULT_SERVICE
}

export function BookingForm() {
  const [params] = useSearchParams()
  const queryService = params.get('service')
  const [service, setService] = useState(() => serviceFromQuery(queryService))
  const [submitted, setSubmitted] = useState(false)

  // Re-apply the preselection when the query string changes while the page stays mounted.
  useEffect(() => {
    setService(serviceFromQuery(queryService))
  }, [queryService])

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // TODO: no backend was provided. Send `new FormData(e.currentTarget)` to the consultation endpoint here.
    setSubmitted(true)
  }

  return (
    <section className="booking-form-section" id="booking-form">
      <div className="booking-form-layout">
        <h2>Plan your consultation</h2>
        <div className="booking-form-intro">
          <p>Tell us about your car and the care you have in mind. A preferred date is a request, not a confirmed appointment.</p>
          <p>
            Before sending your enquiry, read our <Link to={ROUTES.privacy}>Privacy Information</Link> and{' '}
            <Link to={ROUTES.terms}>Booking Information</Link>.
          </p>
        </div>
        <form className="booking-form" name="Signature consultation" aria-label="Signature consultation" onSubmit={onSubmit}>
          <div className="booking-form__field">
            <label htmlFor="form-field-name">Full name</label>
            <input type="text" name="name" id="form-field-name" required />
          </div>
          <div className="booking-form__field">
            <label htmlFor="form-field-email">Email</label>
            <input type="email" name="email" id="form-field-email" required />
          </div>
          <div className="booking-form__field">
            <label htmlFor="form-field-phone">Phone</label>
            <input
              type="tel"
              name="phone"
              id="form-field-phone"
              required
              pattern="[0-9\(\)#&+*,.\/:;<=\-]+"
              title="Only numbers and phone characters (#, -, *, etc) are accepted."
            />
          </div>
          <div className="booking-form__field">
            <label htmlFor="form-field-vehicle">Vehicle make, model and year</label>
            <input type="text" name="vehicle" id="form-field-vehicle" required />
          </div>
          <div className="booking-form__field booking-form__field--wide">
            <label htmlFor="form-field-service">Service</label>
            <div className="booking-form__select">
              <select name="service" id="form-field-service" value={service} onChange={(e) => setService(e.target.value)}>
                {SERVICES.map((s) => (
                  <option key={s.key} value={s.option}>
                    {s.option}
                  </option>
                ))}
              </select>
              <svg aria-hidden="true" viewBox="0 0 571.4 571.4" xmlns="http://www.w3.org/2000/svg">
                <path d="M571 393Q571 407 561 418L311 668Q300 679 286 679T261 668L11 418Q0 407 0 393T11 368 36 357H536Q550 357 561 368T571 393Z" />
              </svg>
            </div>
          </div>
          <div className="booking-form__field booking-form__field--wide">
            <label htmlFor="form-field-preferred_date">Preferred date</label>
            <input type="date" name="preferred_date" id="form-field-preferred_date" />
          </div>
          <div className="booking-form__field booking-form__field--wide">
            <label htmlFor="form-field-message">Your priorities</label>
            <textarea name="message" id="form-field-message" rows={4} />
          </div>
          <div className="booking-form__field booking-form__field--wide">
            <button type="submit">Send consultation request</button>
          </div>
          {submitted && (
            <p className="booking-form__status booking-form__field--wide" role="status">
              Your submission was successful.
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
