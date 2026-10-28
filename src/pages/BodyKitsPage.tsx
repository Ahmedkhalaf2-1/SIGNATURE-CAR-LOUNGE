import { Link } from 'react-router-dom'
import { Seo } from '../components/common/Seo'
import { img } from '../lib/assets'
import { PageArrowIcon } from '../components/common/Icons'
import { PageFinale } from '../components/sections/PageFinale'
import '../styles/pages/body-kits.css'

function PageHero() {
  return (
    <section className="scl-page-hero">
      <div className="scl-page-wrap scl-page-split">
        <div>
          <div className="scl-page-kicker">04 / BESPOKE STYLING</div>
          <h1>
            Body
            <br />
            <em>Kits.</em>
          </h1>
          <div className="scl-page-copy">
            Explore styling enhancements that complement the lines of your vehicle. Every proposal begins with compatibility, fitment and
            your individual taste.
          </div>
          <Link to="/signature-booking/" className="scl-page-cta">
            Plan your consultation
            <PageArrowIcon />
          </Link>
          <div className="scl-page-kicker">Express the character of your car.</div>
        </div>
        <figure>
          <img src={img('fbb4cb03-08c1-45f4-9e93-3bcdcad22fbd-1.webp')} alt="Signature luxury automotive craftsmanship" />
          <figcaption className="scl-page-meta">FORM. FINISH. FEELING. / SIGNATURE CAR LOUNGE</figcaption>
        </figure>
      </div>
    </section>
  )
}

function PageLight() {
  return (
    <section className="scl-page-light">
      <div className="scl-page-wrap">
        <div className="scl-page-split">
          <div>
            <div className="scl-page-kicker">BODY KITS</div>
            <h2>Make your presence personal.</h2>
            <div className="scl-page-copy">
              Explore styling enhancements that complement the lines of your vehicle. Every proposal begins with compatibility, fitment and
              your individual taste.
            </div>
            <Link to="/signature-booking/?service=body-kits" className="scl-page-cta">
              Discuss this service
              <PageArrowIcon />
            </Link>
          </div>
          <div>
            <figure>
              <img src={img('road.jpg')} alt="Automotive finish inspiration" loading="lazy" />
            </figure>
          </div>
        </div>
      </div>
    </section>
  )
}

function DetailScope() {
  return (
    <section className="detail-scope">
      <div className="scl-page-wrap">
        <div className="detail-heading">
          <div>
            <p className="scl-page-kicker">A TAILORED APPROACH</p>
            <h2>
              Presence, <em>made personal.</em>
            </h2>
          </div>
          <p>Four areas to consider. A scope shaped around your vehicle, your priorities and the result you want.</p>
        </div>
        <div className="detail-scope-grid">
          <article>
            <span className="detail-number">01 / CONSIDERED CARE</span>
            <h3>Design direction</h3>
            <p>Share the look you have in mind and the styling details that matter most.</p>
          </article>
          <article>
            <span className="detail-number">02 / CONSIDERED CARE</span>
            <h3>Compatibility</h3>
            <p>Review model, year, trim and existing modifications against the proposed components.</p>
          </article>
          <article>
            <span className="detail-number">03 / CONSIDERED CARE</span>
            <h3>Sourcing & fitment</h3>
            <p>Clarify component availability, fitment requirements and what the proposal includes.</p>
          </article>
          <article>
            <span className="detail-number">04 / CONSIDERED CARE</span>
            <h3>Finish & installation</h3>
            <p>Agree preparation, finish and installation details before approving the work.</p>
          </article>
        </div>
      </div>
    </section>
  )
}

function DetailProcess() {
  return (
    <section className="detail-process">
      <div className="scl-page-wrap">
        <p className="scl-page-kicker">THE RIGHT PLAN COMES FIRST</p>
        <h2>A stronger presence. A considered fit.</h2>
        <div className="detail-process-grid">
          <article>
            <span className="detail-number">01 / THE APPROACH</span>
            <h3>Set the direction</h3>
            <p>
              Share the look you want and which elements matter most. Reference photographs can help communicate proportions, stance and the
              relationship between the proposed parts and the original car.
            </p>
          </article>
          <article>
            <span className="detail-number">02 / THE APPROACH</span>
            <h3>Review compatibility</h3>
            <p>
              Discuss model, trim, model year, existing modifications and component compatibility. Fitment, sensors, cooling and ground
              clearance should be assessed before a proposal is finalised.
            </p>
          </article>
          <article>
            <span className="detail-number">03 / THE APPROACH</span>
            <h3>Agree the finish</h3>
            <p>
              Confirm the parts, sourcing, surface preparation, paint or finish, fitting and any related work. Keep the approved scope and
              component specifications clear before proceeding.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}

function DetailFaq() {
  return (
    <section className="detail-faq">
      <div className="scl-page-wrap detail-faq-layout">
        <div>
          <p className="scl-page-kicker">BEFORE YOU BOOK</p>
          <h2>
            A clearer picture.
            <br />
            <em>A better plan.</em>
          </h2>
          <p>Start with your questions. The right approach begins with understanding your car.</p>
          <Link to="/signature-booking/" className="detail-text-link">
            Discuss your vehicle <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div>
          <details open>
            <summary>Can any kit fit my model?</summary>
            <p>
              Compatibility depends on the specific component and vehicle version. Supply the make, model, year and trim, and do not assume
              that similar-looking vehicles use identical parts.
            </p>
          </details>
          <details>
            <summary>Are parts and installation included together?</summary>
            <p>
              Ask for an itemised proposal identifying what is supplied, what is installed and any preparation or finishing work.
              Availability and timing depend on the selected components.
            </p>
          </details>
          <details>
            <summary>What about road-use requirements?</summary>
            <p>
              Before approving modifications, confirm any applicable road-use, inspection, insurance or manufacturer requirements with the
              relevant parties. Do not assume every styling component is suitable for every use.
            </p>
          </details>
          <p className="detail-faq-note">
            Final scope, product suitability, availability, timing, pricing and any warranty are confirmed individually after assessment.
          </p>
        </div>
      </div>
    </section>
  )
}

function PageLight2() {
  return (
    <section className="scl-page-light detail-gallery scl-gallery-refined" aria-label="Automotive inspiration">
      <div className="scl-page-wrap">
        <div className="scl-gallery-heading">
          <div>
            <div className="scl-page-kicker">THE DETAILS DEFINE THE DIFFERENCE</div>
            <h2>
              An eye for <em>the exceptional.</em>
            </h2>
          </div>
          <Link to="/signature-gallery/" className="scl-gallery-link">
            Explore the gallery
            <PageArrowIcon />
          </Link>
        </div>
        <div className="scl-gallery-grid">
          <figure>
            <img src={img('wheel.jpg')} alt="A considered approach" loading="lazy" />
          </figure>
          <figure>
            <img src={img('road.jpg')} alt="A distinctive finish" loading="lazy" />
          </figure>
          <figure>
            <img src={img('porsche.jpg')} alt="Your individual expression" loading="lazy" />
          </figure>
        </div>
      </div>
    </section>
  )
}

export default function BodyKitsPage() {
  return (
    <div className="pg-body-kits">
      <Seo title="Body Kits – Signature Car Lounge" />
      <main id="scl-body-kits-page" className="scl-interior">
        <PageHero />
        <PageLight />
        <DetailScope />
        <DetailProcess />
        <DetailFaq />
        <PageLight2 />
        <PageFinale />
      </main>
    </div>
  )
}
