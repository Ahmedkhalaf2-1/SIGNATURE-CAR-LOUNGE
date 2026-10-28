import { Link } from 'react-router-dom'
import { Seo } from '../components/common/Seo'
import { img } from '../lib/assets'
import { PageArrowIcon } from '../components/common/Icons'
import { BookingForm } from '../components/forms/BookingForm'
import { NativeFinale } from '../components/sections/NativeFinale'
import { ROUTES } from '../data/site'
import '../styles/pages/booking.css'

function PageHero() {
  return (
    <section className="scl-page-hero">
      <div className="scl-page-wrap scl-page-split">
        <div>
          <div className="scl-page-kicker">YOUR CONSULTATION</div>
          <h1>
            Every signature
            <br />
            starts with <em>you.</em>
          </h1>
          <div className="scl-page-copy">
            <p>Plan the care you have in mind with a guided consultation request.</p>
          </div>
          <Link to="/signature-booking/#booking-form" className="scl-page-cta">
            Start your request
            <PageArrowIcon />
          </Link>
          <div className="scl-page-kicker">A conversation built around your car.</div>
        </div>
        <figure>
          <img src={img('hero-banner.jpg')} alt="Signature luxury automotive craftsmanship" />
          <figcaption className="scl-page-meta">FORM. FINISH. FEELING. / SIGNATURE CAR LOUNGE</figcaption>
        </figure>
      </div>
    </section>
  )
}

export default function BookingPage() {
  return (
    <div className="pg-booking">
      <Seo title="Book a Consultation – Signature Car Lounge" />
      <main className="scl-interior">
        <PageHero />
      </main>
      <BookingForm />
      <NativeFinale variant="plain" to={ROUTES.faq} label="Explore our FAQs ↗" />
    </div>
  )
}
