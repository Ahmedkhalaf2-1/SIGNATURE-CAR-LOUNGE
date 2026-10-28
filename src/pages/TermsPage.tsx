import { Link } from 'react-router-dom'
import { Seo } from '../components/common/Seo'
import '../styles/pages/terms.css'

function Hero() {
  return (
    <section className="info-hero">
      <div className="info-wrap">
        <p className="eyebrow">Booking information</p>
        <h1>
          Clear expectations.
          <br />
          <em>From the beginning.</em>
        </h1>
        <p className="intro">A few useful details before arranging your visit, from the initial enquiry to the agreed scope of work.</p>
      </div>
    </section>
  )
}

function Section() {
  return (
    <section>
      <div className="info-wrap info-layout">
        <aside>
          <p className="eyebrow">A little clarity</p>
          <h2>Good to know.</h2>
          <nav className="info-nav" aria-label="On this page">
            <a href="#signature-booking-info-0">01 Enquiries & confirmation</a>
            <a href="#signature-booking-info-1">02 Scope, pricing & timing</a>
            <a href="#signature-booking-info-2">03 Your visit & collection</a>
            <a href="#signature-booking-info-3">04 Changes to your plans</a>
          </nav>
        </aside>
        <div>
          <article id="signature-booking-info-0">
            <span className="number">01 / Booking information</span>
            <h3>Enquiries & confirmation</h3>
            <p>
              An enquiry or preferred date does not create a confirmed appointment or service agreement. Wait for direct confirmation of
              your service scope and visit arrangements before making plans.
            </p>
          </article>
          <article id="signature-booking-info-1">
            <span className="number">02 / Booking information</span>
            <h3>Scope, pricing & timing</h3>
            <p>
              Confirm the services, panels, surfaces and components included, along with preparation and exclusions. Availability,
              suitability, products, pricing, completion times and warranty terms require confirmation before work is agreed.
            </p>
          </article>
          <article id="signature-booking-info-2">
            <span className="number">03 / Booking information</span>
            <h3>Your visit & collection</h3>
            <p>
              Review the appointment, expected duration, payment requirements and collection plan with the team. Keep the agreed proposal
              and any product-specific care or warranty documents, and confirm how changes to the work will be approved.
            </p>
          </article>
          <article id="signature-booking-info-3">
            <span className="number">04 / Booking information</span>
            <h3>Changes to your plans</h3>
            <p>
              Contact the team to discuss availability and applicable rescheduling or cancellation arrangements. Check the terms in your
              quotation before confirming your appointment.
            </p>
          </article>
          <div className="info-note">
            <p>
              Before approving work, review your quotation, the included services and the appointment arrangements. Keep a copy of the
              agreed scope for your records.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function End() {
  return (
    <section className="info-end">
      <div className="info-wrap end-row">
        <div>
          <p className="eyebrow">Here to help</p>
          <h2>
            Questions? <em>Let’s talk.</em>
          </h2>
          <p>Start with a conversation about your vehicle and your priorities.</p>
        </div>
        <Link to="/signature-contact/" className="info-button">
          Get in touch ↗
        </Link>
      </div>
    </section>
  )
}

export default function TermsPage() {
  return (
    <div className="pg-terms">
      <Seo title="Booking Information – Signature Car Lounge" />
      <main id="signature-booking-info">
        <Hero />
        <Section />
        <End />
      </main>
    </div>
  )
}
