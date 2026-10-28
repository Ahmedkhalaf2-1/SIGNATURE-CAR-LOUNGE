import { Link } from 'react-router-dom'
import { Seo } from '../components/common/Seo'
import { img } from '../lib/assets'
import { PageArrowIcon } from '../components/common/Icons'
import { PageFinale } from '../components/sections/PageFinale'
import '../styles/pages/detailing.css'

function PageHero() {
  return (
    <section className="scl-page-hero">
      <div className="scl-page-wrap scl-page-split">
        <div>
          <div className="scl-page-kicker">01 / BESPOKE DETAILING</div>
          <h1>
            Bespoke
            <br />
            <em>Detailing.</em>
          </h1>
          <div className="scl-page-copy">
            Refine the surfaces you see. Refresh the spaces you feel. A tailored detailing plan starts with the condition of your vehicle
            and the finish you want.
          </div>
          <Link to="/signature-booking/" className="scl-page-cta">
            Plan your consultation
            <PageArrowIcon />
          </Link>
          <div className="scl-page-kicker">Carefully considered. Beautifully finished.</div>
        </div>
        <figure>
          <img src={img('814e2e85-6807-48c1-961e-71ea36e7b1f8-1.webp')} alt="Signature luxury automotive craftsmanship" />
          <figcaption className="scl-page-meta">FORM. FINISH. FEELING. / SIGNATURE CAR LOUNGE</figcaption>
        </figure>
      </div>
    </section>
  )
}

function PageLight() {
  return (
    <section id="page-content" className="scl-page-light">
      <div className="scl-page-wrap">
        <div className="scl-page-split">
          <div>
            <div className="scl-page-kicker">BESPOKE DETAILING</div>
            <h2>A finish worthy of your car.</h2>
            <div className="scl-page-copy">
              <p>From the clarity of the paint to the feel of the cabin, the details shape your connection with your car.</p>
              <p>
                We begin with your priorities, assess the surfaces and discuss a level of care that suits their condition. Every
                recommendation starts with the vehicle in front of us.
              </p>
            </div>
            <Link to="/signature-booking/?service=detailing" className="scl-page-cta">
              Discuss this service
              <PageArrowIcon />
            </Link>
          </div>
          <div>
            <figure>
              <img src={img('ferrari.jpg')} alt="Automotive finish inspiration" loading="lazy" />
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
              Attention to <em>every surface.</em>
            </h2>
          </div>
          <p>A considered scope, shaped around your vehicle. These are the areas we can explore during your consultation.</p>
        </div>
        <div className="detail-scope-grid">
          <article>
            <span className="detail-number">01 / PREPARE</span>
            <h3>Exterior care</h3>
            <p>Discuss exterior washing and surface decontamination, with preparation suited to the finish and its existing treatments.</p>
          </article>
          <article>
            <span className="detail-number">02 / REFINE</span>
            <h3>Paint refinement</h3>
            <p>
              Inspect the paint and explore correction options for visible marks, with realistic expectations for your vehicle’s condition.
            </p>
          </article>
          <article>
            <span className="detail-number">03 / REFRESH</span>
            <h3>Interior detail</h3>
            <p>
              Consider the cabin’s surfaces, upholstery and trim, with attention to the materials and the areas that need the most care.
            </p>
          </article>
          <article>
            <span className="detail-number">04 / MAINTAIN</span>
            <h3>The finishing touch</h3>
            <p>Plan the final presentation and discuss ongoing care to help maintain the finish between visits.</p>
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
        <p className="scl-page-kicker">THE FINISH BEGINS WITH THE RIGHT PLAN</p>
        <h2>
          Considered from <em>every angle.</em>
        </h2>
        <div className="detail-process-grid">
          <article>
            <span className="detail-number">01 / ASSESS</span>
            <h3>Understand the surfaces</h3>
            <p>
              Discuss paint condition, previous treatments, interior materials and the areas that need the most attention. Share swirl
              marks, staining or finish concerns before choosing a scope.
            </p>
          </article>
          <article>
            <span className="detail-number">02 / REFINE</span>
            <h3>Choose the right level</h3>
            <p>
              Explore maintenance detailing, deeper cleaning or paint refinement. The appropriate approach depends on the vehicle’s
              condition and the result you want.
            </p>
          </article>
          <article>
            <span className="detail-number">03 / MAINTAIN</span>
            <h3>Care beyond the visit</h3>
            <p>
              Ask about suitable washing methods, drying, interior care and future maintenance. A thoughtful routine helps preserve the
              presentation between visits.
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
            <summary>Will detailing remove every scratch?</summary>
            <p>
              Some surface marks may improve with suitable correction. Deeper damage, thin paint or sensitive finishes can limit what is
              appropriate. Confirm the expected outcome after inspection.
            </p>
          </details>
          <details>
            <summary>Can detailing and protection be combined?</summary>
            <p>
              Yes, they can be discussed together. Surface preparation, film or coating suitability and the order of work should be agreed
              before the service is confirmed.
            </p>
          </details>
          <details>
            <summary>What should I include in my enquiry?</summary>
            <p>
              Send the make, model, year, your main concerns and the finish you have in mind. Mention any existing film, coatings or
              repaired panels.
            </p>
          </details>
          <p className="detail-faq-note">
            Final scope, products, timing, pricing and any warranty are confirmed individually after assessment.
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
            <img src={img('detail.jpg')} alt="A considered approach" loading="lazy" />
          </figure>
          <figure>
            <img src={img('ferrari.jpg')} alt="A distinctive finish" loading="lazy" />
          </figure>
          <figure>
            <img src={img('mercedes.jpg')} alt="Your individual expression" loading="lazy" />
          </figure>
        </div>
      </div>
    </section>
  )
}

export default function DetailingPage() {
  return (
    <div className="pg-detailing">
      <Seo title="Bespoke Detailing – Signature Car Lounge" />
      <main id="scl-detailing-page" className="scl-interior">
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
