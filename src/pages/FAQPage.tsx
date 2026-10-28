import { Link } from 'react-router-dom'
import { Seo } from '../components/common/Seo'
import { img } from '../lib/assets'
import '../styles/pages/faq.css'

function Hero() {
  return (
    <section className="fq-hero">
      <div className="fq-wrap fq-hero-grid">
        <div>
          <span className="fq-kicker">YOUR QUESTIONS, CONSIDERED</span>
          <h1>
            A little clarity.
            <br />
            <em>Before the journey.</em>
          </h1>
          <p>Answers to common questions about choosing and planning your vehicle care.</p>
          <a href="#faq-answers" className="fq-link">
            Explore the answers <span aria-hidden="true">↓</span>
          </a>
        </div>
        <figure>
          <img src={img('hero-banner.jpg')} alt="Black Porsche in a dramatically lit automotive studio" />
          <figcaption>EVERYTHING STARTS WITH CLARITY.</figcaption>
        </figure>
      </div>
    </section>
  )
}

function Answers() {
  return (
    <section id="faq-answers" className="fq-answers">
      <div className="fq-wrap fq-answer-grid">
        <div className="fq-side">
          <span className="fq-kicker">THE ESSENTIALS</span>
          <h2>
            Good questions.
            <br />
            <em>Clear answers.</em>
          </h2>
          <p>From choosing a service to planning your visit, start with the details that matter.</p>
          <Link to="/signature-services/" className="fq-link">
            Explore our services <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div>
          <div className="fq-group">
            <div className="fq-group-label">01 / Planning your visit</div>
            <details>
              <summary>
                How do I choose a service?<span aria-hidden="true">+</span>
              </summary>
              <div className="scl-page-copy">
                Start with your priorities: a refreshed interior, paint refinement, protection or styling. A vehicle assessment helps define
                the right scope.
              </div>
            </details>
            <details>
              <summary>
                Can I book online?<span aria-hidden="true">+</span>
              </summary>
              <div className="scl-page-copy">
                Use the online consultation form to tell us about your vehicle, preferred service and timing. Your preferred date is a
                request; your appointment is confirmed separately.
              </div>
            </details>
            <details>
              <summary>
                What does a service cost?<span aria-hidden="true">+</span>
              </summary>
              <div className="scl-page-copy">
                Pricing depends on vehicle size, condition, coverage and agreed work. Request a tailored quotation for the services and
                areas you would like included.
              </div>
            </details>
            <details>
              <summary>
                How long will my vehicle be needed?<span aria-hidden="true">+</span>
              </summary>
              <div className="scl-page-copy">
                Timing varies by service and preparation requirements. Ask for an estimate when the proposed work is assessed.
              </div>
            </details>
          </div>
          <div className="fq-group">
            <div className="fq-group-label">02 / Services & details</div>
            <details>
              <summary>
                What is the difference between PPF and ceramic coating?<span aria-hidden="true">+</span>
              </summary>
              <div className="scl-page-copy">
                PPF is a physical film applied over paintwork. Ceramic coating is a surface treatment. Their suitability and care
                requirements should be discussed for your vehicle.
              </div>
            </details>
            <details>
              <summary>
                Are warranties included?<span aria-hidden="true">+</span>
              </summary>
              <div className="scl-page-copy">
                Any product or workmanship warranty must be confirmed in the written service proposal. Ask which products and services are
                covered and keep the applicable care instructions.
              </div>
            </details>
            <details>
              <summary>
                What should I confirm before travelling?<span aria-hidden="true">+</span>
              </summary>
              <div className="scl-page-copy">
                Confirm your appointment, the location, arrival time and expected service duration with the team before travelling. Include
                your preferred visit window in your consultation request.
              </div>
            </details>
            <details>
              <summary>
                Can I request several services together?<span aria-hidden="true">+</span>
              </summary>
              <div className="scl-page-copy">
                Yes, select your main service and describe any additional requirements in the consultation form so a combined scope can be
                discussed.
              </div>
            </details>
          </div>
          <div className="fq-group">
            <div className="fq-group-label">03 / Your assessment & quotation</div>
            <details>
              <summary>
                Can photographs replace an inspection?<span aria-hidden="true">+</span>
              </summary>
              <div className="scl-page-copy">
                Photographs help describe concerns but may not reveal paint depth, surface contamination, material condition or hidden
                damage. An assessment may still be needed.
              </div>
            </details>
            <details>
              <summary>
                Can the scope change after assessment?<span aria-hidden="true">+</span>
              </summary>
              <div className="scl-page-copy">
                Additional findings may affect the proposal. Agree how changes, costs and timing will be discussed and authorised before
                additional work proceeds.
              </div>
            </details>
            <details>
              <summary>
                What should I check in a quotation?<span aria-hidden="true">+</span>
              </summary>
              <div className="scl-page-copy">
                Look for the exact services, included areas, product or component choices, exclusions, timing, payment arrangements and any
                written warranty conditions.
              </div>
            </details>
          </div>
        </div>
      </div>
    </section>
  )
}

function Prep() {
  return (
    <section className="fq-prep">
      <div className="fq-wrap">
        <span className="fq-kicker">BEFORE YOUR VISIT</span>
        <h2>
          A few details.
          <br />
          <em>A smoother experience.</em>
        </h2>
        <div className="fq-cards">
          <article>
            <span className="fq-kicker">01 / SIGNATURE</span>
            <h3>Existing treatments</h3>
            <p>
              Tell the team about coatings, film, paint repairs and modifications. Previous work can affect preparation, compatibility and
              the scope that is appropriate.
            </p>
          </article>
          <article>
            <span className="fq-kicker">02 / SIGNATURE</span>
            <h3>Personal belongings</h3>
            <p>
              Remove valuables and personal items before a booked visit. Highlight delicate accessories, unusual controls or sensitive areas
              during the handover discussion.
            </p>
          </article>
          <article>
            <span className="fq-kicker">03 / SIGNATURE</span>
            <h3>Aftercare</h3>
            <p>
              Ask for care instructions relevant to the chosen products and materials. Do not assume that the same wash or maintenance
              routine suits every finish.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}

function Final() {
  return (
    <section className="fq-final">
      <div className="fq-wrap">
        <div>
          <span className="fq-kicker">YOUR CAR. YOUR SIGNATURE.</span>
          <h2>
            Let’s talk about <em>your vehicle.</em>
          </h2>
        </div>
        <Link to="/signature-booking/" className="fq-button">
          Plan your consultation <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  )
}

export default function FAQPage() {
  return (
    <div className="pg-faq">
      <Seo title="FAQs – Signature Car Lounge" />
      <main id="signature-faq">
        <Hero />
        <Answers />
        <Prep />
        <Final />
      </main>
    </div>
  )
}
