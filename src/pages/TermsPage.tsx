import { Link } from 'react-router-dom'
import { Seo } from '../components/common/Seo'
import { useI18n } from '../i18n'
import '../styles/pages/terms.css'

function Hero() {
  const { t } = useI18n()
  return (
    <section className="info-hero">
      <div className="info-wrap">
        <p className="eyebrow">{t('Booking information')}</p>
        <h1>
          {t('Clear expectations.')}
          <br />
          <em>{t('From the beginning.')}</em>
        </h1>
        <p className="intro">
          {t('A few useful details before arranging your visit, from the initial enquiry to the agreed scope of work.')}
        </p>
      </div>
    </section>
  )
}

function Section() {
  const { t } = useI18n()
  return (
    <section>
      <div className="info-wrap info-layout">
        <aside>
          <p className="eyebrow">{t('A little clarity')}</p>
          <h2>{t('Good to know.')}</h2>
          <nav className="info-nav" aria-label={t('On this page')}>
            <a href="#signature-booking-info-0">{t('01 Enquiries & confirmation')}</a>
            <a href="#signature-booking-info-1">{t('02 Scope, pricing & timing')}</a>
            <a href="#signature-booking-info-2">{t('03 Your visit & collection')}</a>
            <a href="#signature-booking-info-3">{t('04 Changes to your plans')}</a>
          </nav>
        </aside>
        <div>
          <article id="signature-booking-info-0">
            <span className="number">{t('01 / Booking information')}</span>
            <h3>{t('Enquiries & confirmation')}</h3>
            <p>
              {t(
                'An enquiry or preferred date does not create a confirmed appointment or service agreement. Wait for direct confirmation of your service scope and visit arrangements before making plans.',
              )}
            </p>
          </article>
          <article id="signature-booking-info-1">
            <span className="number">{t('02 / Booking information')}</span>
            <h3>{t('Scope, pricing & timing')}</h3>
            <p>
              {t(
                'Confirm the services, panels, surfaces and components included, along with preparation and exclusions. Availability, suitability, products, pricing, completion times and warranty terms require confirmation before work is agreed.',
              )}
            </p>
          </article>
          <article id="signature-booking-info-2">
            <span className="number">{t('03 / Booking information')}</span>
            <h3>{t('Your visit & collection')}</h3>
            <p>
              {t(
                'Review the appointment, expected duration, payment requirements and collection plan with the team. Keep the agreed proposal and any product-specific care or warranty documents, and confirm how changes to the work will be approved.',
              )}
            </p>
          </article>
          <article id="signature-booking-info-3">
            <span className="number">{t('04 / Booking information')}</span>
            <h3>{t('Changes to your plans')}</h3>
            <p>
              {t(
                'Contact the team to discuss availability and applicable rescheduling or cancellation arrangements. Check the terms in your quotation before confirming your appointment.',
              )}
            </p>
          </article>
          <div className="info-note">
            <p>
              {t(
                'Before approving work, review your quotation, the included services and the appointment arrangements. Keep a copy of the agreed scope for your records.',
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function End() {
  const { t } = useI18n()
  return (
    <section className="info-end">
      <div className="info-wrap end-row">
        <div>
          <p className="eyebrow">{t('Here to help')}</p>
          <h2>
            {t('Questions?')} <em>{t('Let’s talk.')}</em>
          </h2>
          <p>{t('Start with a conversation about your vehicle and your priorities.')}</p>
        </div>
        <Link to="/signature-contact/" className="info-button">
          {t('Get in touch ↗')}
        </Link>
      </div>
    </section>
  )
}

export default function TermsPage() {
  const { t } = useI18n()
  return (
    <div className="pg-terms">
      <Seo title={t('Booking Information – Signature Car Lounge')} />
      <main id="signature-booking-info">
        <Hero />
        <Section />
        <End />
      </main>
    </div>
  )
}
