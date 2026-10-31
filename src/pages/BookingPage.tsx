import { Link } from 'react-router-dom'
import { Seo } from '../components/common/Seo'
import { img } from '../lib/assets'
import { PageArrowIcon } from '../components/common/Icons'
import { BookingForm } from '../components/forms/BookingForm'
import { NativeFinale } from '../components/sections/NativeFinale'
import { ROUTES } from '../data/site'
import { useI18n } from '../i18n'
import '../styles/pages/booking.css'

function PageHero() {
  const { t } = useI18n()
  return (
    <section className="scl-page-hero">
      <div className="scl-page-wrap scl-page-split">
        <div>
          <div className="scl-page-kicker">{t('YOUR CONSULTATION')}</div>
          <h1>
            {t('Every signature')}
            <br />
            {t('starts with')} <em>{t('you.')}</em>
          </h1>
          <div className="scl-page-copy">
            <p>{t('Plan the care you have in mind with a guided consultation request.')}</p>
          </div>
          <Link to="/signature-booking/#booking-form" className="scl-page-cta">
            {t('Start your request')}
            <PageArrowIcon />
          </Link>
          <div className="scl-page-kicker">{t('A conversation built around your car.')}</div>
        </div>
        <figure>
          <img src={img('hero-banner.jpg')} alt={t('Signature luxury automotive craftsmanship')} />
          <figcaption className="scl-page-meta">{t('FORM. FINISH. FEELING. / SIGNATURE CAR LOUNGE')}</figcaption>
        </figure>
      </div>
    </section>
  )
}

export default function BookingPage() {
  const { t } = useI18n()
  return (
    <div className="pg-booking">
      <Seo title={t('Book a Consultation – Signature Car Lounge')} />
      <main className="scl-interior">
        <PageHero />
      </main>
      <BookingForm />
      <NativeFinale variant="plain" to={ROUTES.faq} label="Explore our FAQs" />
    </div>
  )
}
