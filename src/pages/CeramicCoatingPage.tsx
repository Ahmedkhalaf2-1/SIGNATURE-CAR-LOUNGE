import { Link } from 'react-router-dom'
import { Seo } from '../components/common/Seo'
import { img } from '../lib/assets'
import { PageArrowIcon } from '../components/common/Icons'
import { PageFinale } from '../components/sections/PageFinale'
import '../styles/pages/ceramic-coating.css'

function PageHero() {
  return (
    <section className="scl-page-hero">
      <div className="scl-page-wrap scl-page-split">
        <div>
          <div className="scl-page-kicker">03 / CERAMIC COATING</div>
          <h1>
            Ceramic
            <br />
            <em>Coating.</em>
          </h1>
          <div className="scl-page-copy">
            A considered coating treatment begins with preparation. Explore a finish designed around your paintwork and your maintenance
            routine.
          </div>
          <Link to="/signature-booking/" className="scl-page-cta">
            Plan your consultation
            <PageArrowIcon />
          </Link>
          <div className="scl-page-kicker">Depth. Clarity. A remarkable finish.</div>
        </div>
        <figure>
          <img src={img('de3d88ed-3d3b-4deb-9637-114fd5ccf715-1.webp')} alt="Signature luxury automotive craftsmanship" />
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
            <div className="scl-page-kicker">CERAMIC COATING</div>
            <h2>Clarity that makes an impression.</h2>
            <div className="scl-page-copy">
              A considered coating treatment begins with preparation. Explore a finish designed around your paintwork and your maintenance
              routine.
            </div>
            <Link to="/signature-booking/?service=ceramic-coating" className="scl-page-cta">
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
              A finish, <em>carefully considered.</em>
            </h2>
          </div>
          <p>Four areas to consider. A scope shaped around your vehicle, your priorities and the result you want.</p>
        </div>
        <div className="detail-scope-grid">
          <article>
            <span className="detail-number">01 / CONSIDERED CARE</span>
            <h3>Assess the paint</h3>
            <p>Review the current finish, previous treatments and the visual result you want to achieve.</p>
          </article>
          <article>
            <span className="detail-number">02 / CONSIDERED CARE</span>
            <h3>Prepare the surface</h3>
            <p>Discuss cleaning, decontamination and suitable correction before a coating is applied.</p>
          </article>
          <article>
            <span className="detail-number">03 / CONSIDERED CARE</span>
            <h3>Choose the system</h3>
            <p>Confirm product compatibility, intended surfaces and the application scope.</p>
          </article>
          <article>
            <span className="detail-number">04 / CONSIDERED CARE</span>
            <h3>Plan the aftercare</h3>
            <p>Understand curing, washing and maintenance guidance for the chosen product.</p>
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
        <h2>Preparation gives protection its foundation.</h2>
        <div className="detail-process-grid">
          <article>
            <span className="detail-number">01 / THE APPROACH</span>
            <h3>Assess the finish</h3>
            <p>
              Review the existing paint, previous products and the visual result you want. A coating is not a substitute for repairing
              damage or correcting a finish where correction is appropriate.
            </p>
          </article>
          <article>
            <span className="detail-number">02 / THE APPROACH</span>
            <h3>Plan the preparation</h3>
            <p>
              Discuss cleaning, decontamination and any suitable refinement before coating. The product, surface compatibility and
              preparation scope should be specified for your vehicle.
            </p>
          </article>
          <article>
            <span className="detail-number">03 / THE APPROACH</span>
            <h3>Care after application</h3>
            <p>
              Request the selected product’s curing and maintenance instructions. Washing, exposure and the first maintenance visit should
              follow the guidance confirmed for that application.
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
            <summary>Does a ceramic coating prevent stone chips?</summary>
            <p>
              A coating should not be treated as a physical barrier against stone impacts. Discuss paint protection film if impact
              protection is a priority.
            </p>
          </details>
          <details>
            <summary>Will my car still need washing?</summary>
            <p>
              Yes. A coating does not eliminate routine cleaning. Ask about suitable washing products, drying methods and contamination
              removal for the chosen system.
            </p>
          </details>
          <details>
            <summary>How long does a coating last?</summary>
            <p>
              Performance varies with the product, preparation, usage, environment and maintenance. Confirm the specific product, care
              requirements and any written warranty before booking.
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
            <img src={img('ferrari.jpg')} alt="A considered approach" loading="lazy" />
          </figure>
          <figure>
            <img src={img('interior.jpg')} alt="A distinctive finish" loading="lazy" />
          </figure>
          <figure>
            <img src={img('porsche.jpg')} alt="Your individual expression" loading="lazy" />
          </figure>
        </div>
      </div>
    </section>
  )
}

export default function CeramicCoatingPage() {
  return (
    <div className="pg-ceramic-coating">
      <Seo title="Ceramic Coating – Signature Car Lounge" />
      <main id="scl-ceramic-coating-page" className="scl-interior">
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
