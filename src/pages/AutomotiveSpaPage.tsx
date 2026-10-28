import { Link } from 'react-router-dom'
import { Seo } from '../components/common/Seo'
import { img } from '../lib/assets'
import { PageArrowIcon } from '../components/common/Icons'
import { PageFinale } from '../components/sections/PageFinale'
import '../styles/pages/automotive-spa.css'

function PageHero() {
  return (
    <section className="scl-page-hero">
      <div className="scl-page-wrap scl-page-split">
        <div>
          <div className="scl-page-kicker">06 / AUTOMOTIVE SPA</div>
          <h1>
            Automotive
            <br />
            <em>Spa.</em>
          </h1>
          <div className="scl-page-copy">
            A considered refresh for your vehicle, combining exterior presentation and interior comfort in a personalised care session.
          </div>
          <Link to="/signature-booking/" className="scl-page-cta">
            Plan your consultation
            <PageArrowIcon />
          </Link>
          <div className="scl-page-kicker">A fresh perspective on everyday care.</div>
        </div>
        <figure>
          <img src={img('5054bea5-6fdd-4d5c-9153-b854b99e0543-1.webp')} alt="Signature luxury automotive craftsmanship" />
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
            <div className="scl-page-kicker">AUTOMOTIVE SPA</div>
            <h2>A fresh feeling. Every journey.</h2>
            <div className="scl-page-copy">
              A considered refresh for your vehicle, combining exterior presentation and interior comfort in a personalised care session.
            </div>
            <Link to="/signature-booking/?service=automotive-spa" className="scl-page-cta">
              Discuss this service
              <PageArrowIcon />
            </Link>
          </div>
          <div>
            <figure>
              <img src={img('mercedes.jpg')} alt="Automotive finish inspiration" loading="lazy" />
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
              Fresh detail. <em>Every journey.</em>
            </h2>
          </div>
          <p>Four areas to consider. A scope shaped around your vehicle, your priorities and the result you want.</p>
        </div>
        <div className="detail-scope-grid">
          <article>
            <span className="detail-number">01 / CONSIDERED CARE</span>
            <h3>Exterior care</h3>
            <p>Discuss washing and presentation priorities, including existing coatings or sensitive finishes.</p>
          </article>
          <article>
            <span className="detail-number">02 / CONSIDERED CARE</span>
            <h3>Interior comfort</h3>
            <p>Identify the upholstery, carpets, trim and touchpoints you would like refreshed.</p>
          </article>
          <article>
            <span className="detail-number">03 / CONSIDERED CARE</span>
            <h3>Finishing details</h3>
            <p>Consider wheels, glass and the smaller details that complete the presentation.</p>
          </article>
          <article>
            <span className="detail-number">04 / CONSIDERED CARE</span>
            <h3>Your care routine</h3>
            <p>Choose a practical level of care around your driving habits and maintenance needs.</p>
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
        <h2>A fresh start, inside and out.</h2>
        <div className="detail-process-grid">
          <article>
            <span className="detail-number">01 / THE APPROACH</span>
            <h3>Exterior presentation</h3>
            <p>
              Explore washing, wheel and glass care, and the finishing details that suit your vehicle and its current condition. Point out
              areas that need extra attention before a scope is agreed.
            </p>
          </article>
          <article>
            <span className="detail-number">02 / THE APPROACH</span>
            <h3>Interior comfort</h3>
            <p>
              Discuss the upholstery, carpets, trim and touchpoints you would like refreshed. Different materials require suitable products
              and methods; mention delicate finishes or existing damage.
            </p>
          </article>
          <article>
            <span className="detail-number">03 / THE APPROACH</span>
            <h3>A practical care routine</h3>
            <p>
              Choose a level of care that fits how you use your car. A daily driver, occasional weekend car and stored vehicle can have
              different maintenance priorities.
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
            <summary>Is an automotive spa the same as paint correction?</summary>
            <p>
              A cleaning and presentation service has a different purpose from correcting paint defects. If swirl marks or scratches are
              your concern, discuss whether a detailing assessment is appropriate.
            </p>
          </details>
          <details>
            <summary>What should I do before a visit?</summary>
            <p>
              Remove valuables and personal items, identify any sensitive areas and tell the team about aftermarket accessories or recent
              repairs. Confirm arrival arrangements when your appointment is agreed.
            </p>
          </details>
          <details>
            <summary>Can I combine interior and exterior care?</summary>
            <p>
              Ask for a coordinated scope. Confirm which areas are included and whether specialist stain treatment or material care requires
              a separate assessment.
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
            <img src={img('detail.jpg')} alt="A considered approach" loading="lazy" />
          </figure>
          <figure>
            <img src={img('mercedes.jpg')} alt="A distinctive finish" loading="lazy" />
          </figure>
          <figure>
            <img src={img('interior.jpg')} alt="Your individual expression" loading="lazy" />
          </figure>
        </div>
      </div>
    </section>
  )
}

export default function AutomotiveSpaPage() {
  return (
    <div className="pg-automotive-spa">
      <Seo title="Automotive Spa – Signature Car Lounge" />
      <main id="scl-automotive-spa-page" className="scl-interior">
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
