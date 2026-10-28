import { Link } from 'react-router-dom'
import { Seo } from '../components/common/Seo'
import { img } from '../lib/assets'
import { PageArrowIcon } from '../components/common/Icons'
import { PageFinale } from '../components/sections/PageFinale'
import '../styles/pages/experience.css'

function PageHero() {
  return (
    <section className="scl-page-hero">
      <div className="scl-page-wrap scl-page-split">
        <div>
          <div className="scl-page-kicker">THE SIGNATURE JOURNEY</div>
          <h1>
            Considered care.
            <br />
            <em>At every step.</em>
          </h1>
          <p className="scl-page-copy">
            A personal approach to your vehicle, from understanding your priorities to planning the finishing details.
          </p>
          <Link to="/signature-booking/" className="scl-page-cta">
            Plan your consultation
            <PageArrowIcon />
          </Link>
          <div className="experience-hero-note">YOUR VEHICLE. YOUR PRIORITIES. A CONSIDERED PLAN.</div>
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
    <section className="scl-page-light experience-journey">
      <div className="scl-page-wrap scl-page-split">
        <div>
          <div className="scl-page-kicker">03 / THE SIGNATURE EXPERIENCE</div>
          <h2>
            Considered care.
            <br />
            <em>From first contact.</em>
          </h2>
          <div className="scl-craft-timeline">
            <article>
              <span>01</span>
              <div>
                <h3>A conversation about your car</h3>
                <div className="scl-page-copy">Share your vehicle, your priorities and the finish you have in mind.</div>
              </div>
            </article>
            <article>
              <span>02</span>
              <div>
                <h3>A tailored recommendation</h3>
                <div className="scl-page-copy">Explore the right detailing, protection or restoration approach for your vehicle.</div>
              </div>
            </article>
            <article>
              <span>03</span>
              <div>
                <h3>The finishing touch</h3>
                <div className="scl-page-copy">Review the details of your proposed service and plan your visit.</div>
              </div>
            </article>
          </div>
          <Link to="/signature-booking/" className="scl-page-cta">
            Start a consultation
            <PageArrowIcon />
          </Link>
        </div>
        <figure>
          <img src={img('26b659a1-2a3d-40db-a7f7-762ebf160670-1.webp')} alt="Precision automotive craftsmanship" />
        </figure>
      </div>
    </section>
  )
}

function PageDark() {
  return (
    <section className="scl-page-dark experience-visit">
      <div className="scl-page-wrap">
        <div className="scl-page-split">
          <div>
            <figure>
              <img src={img('road.jpg')} alt="Performance car inspiration" loading="lazy" />
            </figure>
          </div>
          <div>
            <div className="scl-page-kicker">THE NEXT STEP</div>
            <h2>Before your visit.</h2>
            <div className="scl-page-copy">
              Share the make, model, year and condition of your vehicle, along with your preferred service. The team can then discuss
              assessment requirements, proposed scope and appointment availability.
            </div>
            <Link to="/signature-faq/" className="scl-page-cta">
              Read frequently asked questions
              <PageArrowIcon />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function PageDark2() {
  return (
    <section className="scl-page-dark">
      <div className="scl-page-wrap">
        <div className="scl-page-copy">
          <div className="signature-guide experience-guide">
            <p className="signature-kicker">YOUR VISIT, CONSIDERED</p>
            <h2>A clear journey from enquiry to aftercare.</h2>
            <div className="experience-cards">
              <div className="scl-page-rule">
                <p className="signature-kicker">01 / SIGNATURE</p>
                <h3>Start with your priorities</h3>
                <p>
                  Share your vehicle, current condition and what you would like to improve. Photographs help start the conversation; an
                  inspection may be needed before the right approach is clear.
                </p>
              </div>
              <div className="scl-page-rule">
                <p className="signature-kicker">02 / SIGNATURE</p>
                <h3>Agree the details</h3>
                <p>
                  Review the proposed services, inclusions, materials, price and timing. Confirm how additional findings or requested
                  changes will be handled before work is approved.
                </p>
              </div>
              <div className="scl-page-rule">
                <p className="signature-kicker">03 / SIGNATURE</p>
                <h3>Understand the next steps</h3>
                <p>
                  Ask about collection arrangements, the finished result and any product-specific care instructions. Keep the agreed scope
                  and aftercare guidance for future reference.
                </p>
              </div>
            </div>
            <div className="experience-notes">
              <article>
                <h4>Before arrival</h4>
                <p>
                  Remove personal belongings and valuables. Mention recent paintwork, coatings, film, accessories or any sensitive areas
                  when arranging the visit.
                </p>
              </article>
              <article>
                <h4>At handover</h4>
                <p>
                  Review the agreed scope, discuss any observations and ask which washing or maintenance methods are suitable for your
                  vehicle’s finish.
                </p>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function ExperiencePage() {
  return (
    <div className="pg-experience">
      <Seo title="The Experience – Signature Car Lounge" />
      <main id="scl-experience-page" className="scl-interior">
        <PageHero />
        <PageLight />
        <PageDark />
        <PageDark2 />
        <PageFinale />
      </main>
    </div>
  )
}
