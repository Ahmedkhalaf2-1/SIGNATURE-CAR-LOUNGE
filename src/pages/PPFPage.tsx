import { Link } from 'react-router-dom'
import { Seo } from '../components/common/Seo'
import { img } from '../lib/assets'
import { PageArrowIcon } from '../components/common/Icons'
import { PageFinale } from '../components/sections/PageFinale'
import '../styles/pages/ppf.css'

function PageHero() {
  return (
    <section className="scl-page-hero">
      <div className="scl-page-wrap scl-page-split">
        <div>
          <div className="scl-page-kicker">02 / PAINT PROTECTION</div>
          <h1>
            Paint Protection
            <br />
            <em>Film.</em>
          </h1>
          <div className="scl-page-copy">
            Explore a transparent protective layer for your paintwork, with coverage planned around your vehicle and how you drive.
          </div>
          <Link to="/signature-booking/" className="scl-page-cta">
            Plan your consultation
            <PageArrowIcon />
          </Link>
          <div className="scl-page-kicker">Preserve the finish. Enjoy the journey.</div>
        </div>
        <figure>
          <img src={img('26b659a1-2a3d-40db-a7f7-762ebf160670-1.webp')} alt="Signature luxury automotive craftsmanship" />
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
            <div className="scl-page-kicker">PAINT PROTECTION FILM</div>
            <h2>Protect the extraordinary.</h2>
            <div className="scl-page-copy">
              A considered layer of protection starts with the right coverage. Discuss the surfaces most exposed on your journeys, the
              appearance you prefer and the preparation your paint needs.
            </div>
            <Link to="/signature-booking/?service=ppf" className="scl-page-cta">
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
              Protection, <em>with purpose.</em>
            </h2>
          </div>
          <p>Four areas to consider. A scope shaped around your vehicle, your priorities and the result you want.</p>
        </div>
        <div className="detail-scope-grid">
          <article>
            <span className="detail-number">01 / CONSIDERED CARE</span>
            <h3>Priority areas</h3>
            <p>Discuss the panels most exposed in everyday driving and identify where coverage matters most.</p>
          </article>
          <article>
            <span className="detail-number">02 / CONSIDERED CARE</span>
            <h3>Your coverage</h3>
            <p>Compare selected panels, front-end protection and wider coverage around your priorities.</p>
          </article>
          <article>
            <span className="detail-number">03 / CONSIDERED CARE</span>
            <h3>A considered fit</h3>
            <p>Review panel edges, component exclusions and installation details before agreeing the scope.</p>
          </article>
          <article>
            <span className="detail-number">04 / CONSIDERED CARE</span>
            <h3>Care after fitting</h3>
            <p>Understand the chosen film’s cleaning, inspection and maintenance guidance.</p>
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
        <h2>Choose protection around the way you drive.</h2>
        <div className="detail-process-grid">
          <article>
            <span className="detail-number">01 / THE APPROACH</span>
            <h3>Prioritise the exposure</h3>
            <p>
              Discuss the panels and surfaces most exposed during your driving. Coverage can be considered around your vehicle, use and
              budget rather than assumed from a generic package.
            </p>
          </article>
          <article>
            <span className="detail-number">02 / THE APPROACH</span>
            <h3>Define the coverage</h3>
            <p>
              Compare selected-area, front-end and wider coverage options. Confirm the exact panels, finish, edge treatment and any
              component exclusions in the agreed scope.
            </p>
          </article>
          <article>
            <span className="detail-number">03 / THE APPROACH</span>
            <h3>Plan long-term care</h3>
            <p>
              Ask about the chosen film’s cleaning, inspection and removal guidance. Discuss existing paint repairs, coatings or film before
              an installation approach is agreed.
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
            <summary>Is PPF the same as ceramic coating?</summary>
            <p>
              No. PPF is a film applied over suitable surfaces. Ceramic coating is a different treatment with a different purpose. The two
              may be discussed together where the chosen systems are compatible.
            </p>
          </details>
          <details>
            <summary>Can film be applied to repainted panels?</summary>
            <p>
              Repaired or repainted panels need individual assessment. Tell the team what work was done and when so suitability, adhesion
              and removal risks can be discussed.
            </p>
          </details>
          <details>
            <summary>Can I choose a different finish?</summary>
            <p>
              Finish options depend on the selected product and vehicle surfaces. Request examples and confirm appearance, coverage and care
              instructions before making a choice.
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
            <img src={img('sports.jpg')} alt="A considered approach" loading="lazy" />
          </figure>
          <figure>
            <img src={img('mercedes.jpg')} alt="A distinctive finish" loading="lazy" />
          </figure>
          <figure>
            <img src={img('wheel.jpg')} alt="Your individual expression" loading="lazy" />
          </figure>
        </div>
      </div>
    </section>
  )
}

export default function PPFPage() {
  return (
    <div className="pg-ppf">
      <Seo title="Paint Protection Film – Signature Car Lounge" />
      <main id="scl-ppf-page" className="scl-interior">
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
