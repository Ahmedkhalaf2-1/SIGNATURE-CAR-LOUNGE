import { Link } from 'react-router-dom'
import { Seo } from '../components/common/Seo'
import { img } from '../lib/assets'
import { PageArrowIcon } from '../components/common/Icons'
import { PageFinale } from '../components/sections/PageFinale'
import '../styles/pages/about.css'

function PageHero() {
  return (
    <section className="scl-page-hero">
      <div className="scl-page-wrap scl-page-split">
        <div>
          <div className="scl-page-kicker">01 / THE PHILOSOPHY</div>
          <h1>
            A signature
            <br />
            is <em>personal.</em>
          </h1>
          <div className="scl-page-kicker">So is the way we care for your car.</div>
          <Link to="/signature-services/" className="scl-page-cta">
            Explore our services
            <PageArrowIcon />
          </Link>
          <p className="scl-hero-note">A personal approach to automotive care.</p>
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
            <div className="scl-page-kicker">THE IDEA BEHIND SIGNATURE</div>
            <h2>
              More than a car.
              <br />
              <em>An expression of you.</em>
            </h2>
            <div className="scl-page-copy">
              Signature Car Lounge brings together luxury automotive spa, bespoke detailing, paint protection, body kits and restoration
              under one distinctive identity.
            </div>
            <div className="scl-page-copy">
              <p>
                Every car has its own character. Our approach begins by understanding yours: how you drive it, what you value and the finish
                you want to achieve. From the first conversation to a tailored scope of care, the details guide the journey.
              </p>
            </div>
          </div>
          <div>
            <figure>
              <img
                src={img('814e2e85-6807-48c1-961e-71ea36e7b1f8-1.webp')}
                alt="Careful exterior washing of a performance car"
                loading="lazy"
              />
            </figure>
          </div>
        </div>
      </div>
    </section>
  )
}

function PageDark() {
  return (
    <section className="scl-page-dark">
      <div className="scl-page-wrap">
        <div className="scl-page-split">
          <div>
            <figure>
              <img src={img('26b659a1-2a3d-40db-a7f7-762ebf160670-1.webp')} alt="Refined sports car exterior" loading="lazy" />
            </figure>
          </div>
          <div>
            <div className="scl-page-kicker">CRAFT. CHARACTER. CARE.</div>
            <h2>
              Excellence is
              <br />
              <em>in the details.</em>
            </h2>
            <p>
              From the clarity of a painted surface to the texture of an interior, refinement is the sum of carefully considered details.
            </p>
            <p>
              Our focus brings presentation, protection and personal expression together, with a scope of care shaped around your vehicle.
            </p>
            <Link to="/signature-experience/" className="scl-page-cta">
              Discover the experience ↗
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function PageLight2() {
  return (
    <section className="scl-page-light">
      <div className="scl-page-wrap">
        <h2>
          The Signature <em>standard.</em>
        </h2>
        <div className="scl-page-values">
          <article>
            <h3>Precision</h3>
            <div className="scl-page-kicker">Attention to surfaces, lines and finishing details.</div>
          </article>
          <article>
            <h3>Individuality</h3>
            <div className="scl-page-kicker">A conversation built around your car and your priorities.</div>
          </article>
          <article>
            <h3>Consideration</h3>
            <div className="scl-page-kicker">A clear scope before any service is confirmed.</div>
          </article>
          <article>
            <h3>Presence</h3>
            <div className="scl-page-kicker">A finish that respects the character of your vehicle.</div>
          </article>
        </div>
      </div>
    </section>
  )
}

function PageLight3() {
  return (
    <section className="scl-page-light">
      <div className="scl-page-wrap">
        <div className="scl-page-copy">
          <div className="signature-guide">
            <p className="signature-kicker">THE PHILOSOPHY IN PRACTICE</p>
            <h2>Care shaped around the individual vehicle.</h2>
            <div className="scl-about-process">
              <div className="scl-page-rule">
                <p className="signature-kicker">01 / SIGNATURE</p>
                <h3>Look closer</h3>
                <p>
                  Paint, glass, wheels, cabin materials and trim each tell part of the story. The right conversation considers the vehicle’s
                  condition as well as the finish you want.
                </p>
              </div>
              <div className="scl-page-rule">
                <p className="signature-kicker">02 / SIGNATURE</p>
                <h3>Listen first</h3>
                <p>
                  How you use your car matters. Daily driving, occasional journeys and long-term ownership can lead to different priorities
                  for presentation and care.
                </p>
              </div>
              <div className="scl-page-rule">
                <p className="signature-kicker">03 / SIGNATURE</p>
                <h3>Keep it considered</h3>
                <p>
                  A clear proposal makes the choices easier to understand. Discuss the scope, materials, expected result and maintenance
                  before deciding what suits your car.
                </p>
              </div>
            </div>
            <div className="scl-about-perspective">
              <div>
                <h4>Our perspective</h4>
                <p>
                  The Signature identity brings cleaning, refinement, protection and individual styling into one conversation about the car
                  you value.
                </p>
              </div>
              <div>
                <h4>Your next step</h4>
                <p>
                  Explore the services or begin a consultation with your vehicle details and priorities. The appropriate scope is considered
                  individually.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function AboutPage() {
  return (
    <div className="pg-about">
      <Seo title="About Us – Signature Car Lounge" />
      <main id="scl-about-page" className="scl-interior scl-about">
        <PageHero />
        <PageLight />
        <PageDark />
        <PageLight2 />
        <PageLight3 />
        <PageFinale />
      </main>
    </div>
  )
}
