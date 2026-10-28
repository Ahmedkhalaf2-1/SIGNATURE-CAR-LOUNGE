import { Link } from 'react-router-dom'
import { Seo } from '../components/common/Seo'
import { img } from '../lib/assets'
import { PageArrowIcon } from '../components/common/Icons'
import { PageFinale } from '../components/sections/PageFinale'
import '../styles/pages/restoration.css'

function PageHero() {
  return (
    <section className="scl-page-hero">
      <div className="scl-page-wrap scl-page-split">
        <div>
          <div className="scl-page-kicker">05 / RESTORATION</div>
          <h1>
            Restoration.
            <br />
            <em>With respect.</em>
          </h1>
          <div className="scl-page-copy">
            Bring attention back to the details that matter. Discuss cosmetic restoration needs and a sensible plan for your vehicle.
          </div>
          <Link to="/signature-booking/" className="scl-page-cta">
            Plan your consultation
            <PageArrowIcon />
          </Link>
          <div className="scl-page-kicker">Character worth preserving.</div>
        </div>
        <figure>
          <img src={img('941e188e-50da-4f35-b0fe-b7edde1bf792-1.webp')} alt="Signature luxury automotive craftsmanship" />
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
            <div className="scl-page-kicker">RESTORATION</div>
            <h2>Respect the character. Renew the detail.</h2>
            <div className="scl-page-copy">
              Bring attention back to the details that matter. Discuss cosmetic restoration needs and a sensible plan for your vehicle.
            </div>
            <Link to="/signature-booking/?service=restoration" className="scl-page-cta">
              Discuss this service
              <PageArrowIcon />
            </Link>
          </div>
          <div>
            <figure>
              <img src={img('interior.jpg')} alt="Automotive finish inspiration" loading="lazy" />
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
              Character, <em>thoughtfully renewed.</em>
            </h2>
          </div>
          <p>Four areas to consider. A scope shaped around your vehicle, your priorities and the result you want.</p>
        </div>
        <div className="detail-scope-grid">
          <article>
            <span className="detail-number">01 / CONSIDERED CARE</span>
            <h3>The starting point</h3>
            <p>Review condition, visible concerns and previous repairs before deciding on priorities.</p>
          </article>
          <article>
            <span className="detail-number">02 / CONSIDERED CARE</span>
            <h3>Paint & presentation</h3>
            <p>Discuss the finish you want and distinguish cosmetic renewal from specialist repairs.</p>
          </article>
          <article>
            <span className="detail-number">03 / CONSIDERED CARE</span>
            <h3>Interior & trim</h3>
            <p>Explore materials, trim and cabin details with respect for the vehicle’s character.</p>
          </article>
          <article>
            <span className="detail-number">04 / CONSIDERED CARE</span>
            <h3>A phased plan</h3>
            <p>Agree stages, dependencies and sourcing needs so the proposed work has a clear direction.</p>
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
        <h2>Preserve the character. Plan the renewal.</h2>
        <div className="detail-process-grid">
          <article>
            <span className="detail-number">01 / THE APPROACH</span>
            <h3>Understand the starting point</h3>
            <p>
              Share the vehicle’s history, visible concerns and previous repairs. Clear photographs and an initial assessment help
              distinguish cosmetic priorities from work that needs specialist investigation.
            </p>
          </article>
          <article>
            <span className="detail-number">02 / THE APPROACH</span>
            <h3>Build a phased scope</h3>
            <p>
              Discuss paint, trim, interior and presentation priorities. Separate essential work from optional refinements so the proposed
              stages, dependencies and expectations are clear.
            </p>
          </article>
          <article>
            <span className="detail-number">03 / THE APPROACH</span>
            <h3>Respect the original character</h3>
            <p>
              Consider how much originality you want to retain and the finish you want to achieve. Confirm materials, sourcing and the
              intended standard before the scope is approved.
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
            <summary>Can restoration be completed in stages?</summary>
            <p>
              A phased approach can be discussed around condition, priorities and component availability. Confirm dependencies so one stage
              does not compromise later work.
            </p>
          </details>
          <details>
            <summary>Can you give a firm price from photographs?</summary>
            <p>
              Photographs help start a conversation, but hidden damage, material condition and disassembly can change the scope. Agree how
              additional findings and changes will be handled.
            </p>
          </details>
          <details>
            <summary>Is this a mechanical restoration service?</summary>
            <p>
              Describe all your requirements at enquiry. Confirm which work the proposed service covers and whether mechanical, structural
              or other specialist work requires a separate provider.
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
            <img src={img('classic.jpg')} alt="A considered approach" loading="lazy" />
          </figure>
          <figure>
            <img src={img('interior.jpg')} alt="A distinctive finish" loading="lazy" />
          </figure>
          <figure>
            <img src={img('sports.jpg')} alt="Your individual expression" loading="lazy" />
          </figure>
        </div>
      </div>
    </section>
  )
}

export default function RestorationPage() {
  return (
    <div className="pg-restoration">
      <Seo title="Restoration – Signature Car Lounge" />
      <main id="scl-restoration-page" className="scl-interior">
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
