import { Link } from 'react-router-dom'
import { Seo } from '../components/common/Seo'
import '../styles/pages/privacy.css'

function Hero() {
  return (
    <section className="info-hero">
      <div className="info-wrap">
        <p className="eyebrow">Privacy information</p>
        <h1>
          Your information.
          <br />
          <em>A considered approach.</em>
        </h1>
        <p className="intro">A practical guide to the information requested when you contact Signature Car Lounge.</p>
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
            <a href="#signature-privacy-0">01 Your enquiry</a>
            <a href="#signature-privacy-1">02 Contact preferences</a>
            <a href="#signature-privacy-2">03 Website resources</a>
            <a href="#signature-privacy-3">04 Questions or corrections</a>
          </nav>
        </aside>
        <div>
          <article id="signature-privacy-0">
            <span className="number">01 / Privacy information</span>
            <h3>Your enquiry</h3>
            <p>
              The consultation form asks for your name, email, phone number, vehicle details, preferred service, preferred date and a
              message. Review the information you provide before submitting a form, and avoid including identity documents or unrelated
              sensitive information.
            </p>
          </article>
          <article id="signature-privacy-1">
            <span className="number">02 / Privacy information</span>
            <h3>Contact preferences</h3>
            <p>
              Include a suitable way to respond and tell the team your preferred contact method. Keep the message focused on your vehicle,
              its condition and the services you would like to discuss.
            </p>
          </article>
          <article id="signature-privacy-2">
            <span className="number">03 / Privacy information</span>
            <h3>Website resources</h3>
            <p>
              The website uses hosting and font-delivery services. Your browser shares technical connection information when requesting
              these resources.
            </p>
          </article>
          <article id="signature-privacy-3">
            <span className="number">04 / Privacy information</span>
            <h3>Questions or corrections</h3>
            <p>
              For a question about information you have submitted, use the consultation form and clearly identify your request. Do not
              include passwords, payment card details or identity documents.
            </p>
          </article>
          <div className="info-note">
            <p>
              Share only the information relevant to your enquiry. Check that your contact details are correct so your request can be
              followed up.
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

export default function PrivacyPage() {
  return (
    <div className="pg-privacy">
      <Seo title="Privacy Information – Signature Car Lounge" />
      <main id="signature-privacy">
        <Hero />
        <Section />
        <End />
      </main>
    </div>
  )
}
