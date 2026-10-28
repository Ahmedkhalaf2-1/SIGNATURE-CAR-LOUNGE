import { Link } from 'react-router-dom'
import { Seo } from '../components/common/Seo'
import { img } from '../lib/assets'
import '../styles/pages/contact.css'

function Hero() {
  return (
    <section className="ct-hero">
      <div className="ct-wrap ct-hero-grid">
        <div>
          <span className="ct-label">CONNECT WITH SIGNATURE</span>
          <h1>
            A conversation.
            <br />
            <em>A new beginning.</em>
          </h1>
          <p>Tell us about your vehicle and the care you have in mind. Your next chapter starts with the details that matter to you.</p>
          <Link to="/signature-booking/" className="ct-button">
            Plan your consultation <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <figure>
          <img src={img('hero-banner.jpg')} alt="Black Porsche in an illuminated automotive studio" />
          <figcaption>YOUR CAR. YOUR VISION. YOUR SIGNATURE.</figcaption>
        </figure>
      </div>
    </section>
  )
}

function Connect() {
  return (
    <section className="ct-connect">
      <div className="ct-wrap ct-connect-grid">
        <div>
          <span className="ct-label">LET’S CONNECT</span>
          <h2>
            Personal attention.
            <br />
            <em>From the first hello.</em>
          </h2>
          <p>Begin with a guided consultation request. Share your vehicle, your priorities and your preferred timing in one place.</p>
          <Link to="/signature-booking/" className="ct-link">
            Start your request <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="ct-info">
          <article>
            <span className="ct-icon" aria-hidden="true">
              ⌖
            </span>
            <div>
              <h3>Plan your visit</h3>
              <p>
                Include your preferred date in your consultation request. Confirm the location and arrival arrangements with the team before
                travelling.
              </p>
            </div>
          </article>
          <article>
            <span className="ct-icon" aria-hidden="true">
              ↗
            </span>
            <div>
              <h3>Contact the team</h3>
              <p>
                Use our consultation form to share your enquiry and preferred way to be contacted. Include a valid email address and
                telephone number.
              </p>
            </div>
          </article>
          <article>
            <span className="ct-icon" aria-hidden="true">
              ◷
            </span>
            <div>
              <h3>Appointment arrangements</h3>
              <p>
                A preferred date is a request, not a confirmed appointment. Wait for confirmation of your visit and expected service
                duration.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

function Section() {
  return (
    <section>
      <div className="ct-wrap">
        <div className="ct-heading">
          <div>
            <span className="ct-label">FIND YOUR STARTING POINT</span>
            <h2>
              What do you have
              <br />
              <em>in mind?</em>
            </h2>
          </div>
          <p>You do not need to know the technical service name. Start with the result you would like to achieve.</p>
        </div>
        <div className="ct-cards">
          <article className="ct-card">
            <span className="ct-label">01 / CARE & PROTECTION</span>
            <h3>Ask about a service.</h3>
            <p>Tell us which surfaces or areas concern you, and what you would like to protect or refresh.</p>
            <Link to="/signature-services/" className="ct-link">
              Explore services <span aria-hidden="true">↗</span>
            </Link>
          </article>
          <article className="ct-card">
            <span className="ct-label">02 / A COMPLETE VISION</span>
            <h3>Bring it together.</h3>
            <p>Considering detailing, protection and styling together? Share your priorities so the right sequence can be discussed.</p>
            <Link to="/signature-booking/" className="ct-link">
              Discuss your vehicle <span aria-hidden="true">↗</span>
            </Link>
          </article>
          <article className="ct-card">
            <span className="ct-label">03 / YOUR NEXT VISIT</span>
            <h3>Plan the details.</h3>
            <p>Share a preferred visit window and any relevant deadline. Confirm appointment arrangements before travelling.</p>
            <Link to="/signature-faq/" className="ct-link">
              Read the FAQs <span aria-hidden="true">↗</span>
            </Link>
          </article>
        </div>
        <div className="ct-note">
          <div>
            <h3>A few useful details</h3>
            <p>
              Have your vehicle’s make, model and year ready, along with previous treatments, relevant repairs and your main priorities.
            </p>
          </div>
          <div>
            <h3>A clearer picture</h3>
            <p>
              Photographs of your vehicle and specific concerns can help explain your enquiry. Bring any visual references you would like to
              discuss.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Final() {
  return (
    <section className="ct-final">
      <div className="ct-wrap">
        <div>
          <span className="ct-label">THE NEXT STEP IS PERSONAL</span>
          <h2>
            Let’s talk about <em>your car.</em>
          </h2>
        </div>
        <Link to="/signature-booking/" className="ct-button">
          Start your consultation <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  )
}

export default function ContactPage() {
  return (
    <div className="pg-contact">
      <Seo title="Contact – Signature Car Lounge" />
      <main id="signature-contact">
        <Hero />
        <Connect />
        <Section />
        <Final />
      </main>
    </div>
  )
}
