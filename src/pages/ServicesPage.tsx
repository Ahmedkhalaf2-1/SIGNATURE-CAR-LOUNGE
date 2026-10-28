import { Link } from 'react-router-dom'
import { Seo } from '../components/common/Seo'
import { img } from '../lib/assets'
import { PageArrowIcon } from '../components/common/Icons'
import { PageFinale } from '../components/sections/PageFinale'
import '../styles/pages/services.css'

function PageHero() {
  return (
    <section className="scl-page-hero">
      <div className="scl-page-wrap scl-page-split">
        <div>
          <div className="scl-page-kicker">02 / OUR EXPERTISE</div>
          <h1>
            Exceptional care.
            <br />
            <em>Individually considered.</em>
          </h1>
          <div className="scl-page-copy">Explore six ways to protect, refine and personalise your vehicle.</div>
          <a href="#page-content" className="scl-page-cta">
            Explore our services
            <PageArrowIcon />
          </a>
          <div className="scl-page-kicker">Six disciplines. One distinctive standard.</div>
        </div>
        <figure>
          <img src={img('hero-banner.jpg')} alt="Signature luxury automotive craftsmanship" />
          <figcaption className="scl-page-meta">FORM. FINISH. FEELING. / SIGNATURE CAR LOUNGE</figcaption>
        </figure>
      </div>
    </section>
  )
}

function ServiceCollection() {
  return (
    <section id="page-content" className="service-collection">
      <div className="scl-page-wrap">
        <div className="collection-heading">
          <div>
            <p className="scl-page-kicker">THE SERVICE COLLECTION</p>
            <h2>
              Six disciplines.
              <br />
              <em>One signature standard.</em>
            </h2>
          </div>
          <p>From a considered refresh to a personal transformation, find the right starting point for your vehicle.</p>
        </div>
        <div className="service-grid">
          <article className="service-card">
            <Link to="/signature-detailing/" className="service-image" aria-label="Explore Bespoke Detailing">
              <img src={img('814e2e85-6807-48c1-961e-71ea36e7b1f8-1.webp')} alt="Bespoke Detailing automotive inspiration" loading="lazy" />
              <span>01 / SIGNATURE</span>
            </Link>
            <div className="service-body">
              <h3>Bespoke Detailing</h3>
              <p className="service-tag">A finish worthy of your car.</p>
              <p>
                Thoughtful exterior and interior refinement, with preparation tailored to your vehicle’s condition and the finish you want.
              </p>
              <Link to="/signature-detailing/" className="service-link">
                Explore service <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </article>
          <article className="service-card">
            <Link to="/signature-ppf/" className="service-image" aria-label="Explore Paint Protection Film">
              <img
                src={img('26b659a1-2a3d-40db-a7f7-762ebf160670-1.webp')}
                alt="Paint Protection Film automotive inspiration"
                loading="lazy"
              />
              <span>02 / SIGNATURE</span>
            </Link>
            <div className="service-body">
              <h3>Paint Protection Film</h3>
              <p className="service-tag">Protect the extraordinary.</p>
              <p>
                Explore tailored film coverage for vulnerable painted surfaces, with careful attention to edges, finish and everyday use.
              </p>
              <Link to="/signature-ppf/" className="service-link">
                Explore service <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </article>
          <article className="service-card">
            <Link to="/signature-ceramic-coating/" className="service-image" aria-label="Explore Ceramic Coating">
              <img src={img('de3d88ed-3d3b-4deb-9637-114fd5ccf715-1.webp')} alt="Ceramic Coating automotive inspiration" loading="lazy" />
              <span>03 / SIGNATURE</span>
            </Link>
            <div className="service-body">
              <h3>Ceramic Coating</h3>
              <p className="service-tag">Clarity that makes an impression.</p>
              <p>Discuss surface preparation and ceramic protection to enhance the finish and support an easier maintenance routine.</p>
              <Link to="/signature-ceramic-coating/" className="service-link">
                Explore service <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </article>
          <article className="service-card">
            <Link to="/signature-body-kits/" className="service-image" aria-label="Explore Body Kits">
              <img src={img('fbb4cb03-08c1-45f4-9e93-3bcdcad22fbd-1.webp')} alt="Body Kits automotive inspiration" loading="lazy" />
              <span>04 / SIGNATURE</span>
            </Link>
            <div className="service-body">
              <h3>Body Kits</h3>
              <p className="service-tag">Make your presence personal.</p>
              <p>Refine your vehicle’s silhouette with a considered approach to styling, component compatibility and fitment.</p>
              <Link to="/signature-body-kits/" className="service-link">
                Explore service <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </article>
          <article className="service-card">
            <Link to="/signature-restoration/" className="service-image" aria-label="Explore Restoration">
              <img src={img('941e188e-50da-4f35-b0fe-b7edde1bf792-1.webp')} alt="Restoration automotive inspiration" loading="lazy" />
              <span>05 / SIGNATURE</span>
            </Link>
            <div className="service-body">
              <h3>Restoration</h3>
              <p className="service-tag">Respect the character. Renew the detail.</p>
              <p>Renew the cosmetic character of your vehicle with a considered scope that respects its original personality.</p>
              <Link to="/signature-restoration/" className="service-link">
                Explore service <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </article>
          <article className="service-card">
            <Link to="/signature-automotive-spa/" className="service-image" aria-label="Explore Automotive Spa">
              <img src={img('5054bea5-6fdd-4d5c-9153-b854b99e0543-1.webp')} alt="Automotive Spa automotive inspiration" loading="lazy" />
              <span>06 / SIGNATURE</span>
            </Link>
            <div className="service-body">
              <h3>Automotive Spa</h3>
              <p className="service-tag">A fresh feeling. Every journey.</p>
              <p>Refresh the details you see and touch, with attentive cleaning and presentation for a more enjoyable drive.</p>
              <Link to="/signature-automotive-spa/" className="service-link">
                Explore service <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

function Direction() {
  return (
    <section id="find-your-direction" className="scl-direction">
      <div className="scl-page-wrap">
        <div className="direction-heading">
          <div>
            <p className="scl-page-kicker">FIND YOUR DIRECTION</p>
            <h2>
              What would you like
              <br />
              to <em>achieve?</em>
            </h2>
          </div>
          <p>
            Start with the result you want.
            <br />
            We’ll help you consider the right services for your car, its condition and the way you drive.
          </p>
        </div>
        <div className="direction-grid">
          <article className="direction-card">
            <div className="direction-top">
              <span>01 / REFINE</span>
              <svg width={35} height={35} viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <path d="M16 3l3.5 9.5L29 16l-9.5 3.5L16 29l-3.5-9.5L3 16l9.5-3.5L16 3Z" stroke="currentColor" />
              </svg>
            </div>
            <h3>Refresh & refine</h3>
            <p>A cleaner cabin. A more considered finish. Renew the details that make every drive feel special.</p>
            <div className="direction-note">
              FOR CLEANING & PRESENTATION
              <br />
              <span>Explore Automotive Spa, or discuss more extensive surface and interior refinement with Bespoke Detailing.</span>
            </div>
            <div className="direction-links">
              <Link to="/signature-automotive-spa/">
                Automotive Spa <span>↗</span>
              </Link>
              <Link to="/signature-detailing/">
                Bespoke Detailing <span>↗</span>
              </Link>
            </div>
          </article>
          <article className="direction-card">
            <div className="direction-top">
              <span>02 / PROTECT</span>
              <svg width={35} height={35} viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <path d="M16 3 27 7v9c0 6-7 11-11 13C12 27 5 22 5 16V7L16 3Z" stroke="currentColor" />
                <path d="m11 16 3 3 7-7" stroke="currentColor" />
              </svg>
            </div>
            <h3>Protect the finish</h3>
            <p>Plan protection around your vehicle’s surfaces, everyday use and the finish you want to preserve.</p>
            <div className="direction-note">
              FOR SURFACE PROTECTION
              <br />
              <span>Compare film coverage and ceramic coating, including preparation, compatibility and ongoing maintenance.</span>
            </div>
            <div className="direction-links">
              <Link to="/signature-ppf/">
                Paint Protection Film <span>↗</span>
              </Link>
              <Link to="/signature-ceramic-coating/">
                Ceramic Coating <span>↗</span>
              </Link>
            </div>
          </article>
          <article className="direction-card">
            <div className="direction-top">
              <span>03 / PERSONALISE</span>
              <svg width={35} height={35} viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <path d="m16 3 13 13-13 13L3 16 16 3Z" stroke="currentColor" />
                <path d="m16 10 6 6-6 6-6-6 6-6Z" stroke="currentColor" />
              </svg>
            </div>
            <h3>Make it individual</h3>
            <p>A more personal silhouette. A renewed character. Shape a car that feels unmistakably yours.</p>
            <div className="direction-note">
              FOR STYLING & COSMETIC RENEWAL
              <br />
              <span>Explore Body Kits for a styling conversation, or Restoration for a considered, phased approach to renewal.</span>
            </div>
            <div className="direction-links">
              <Link to="/signature-body-kits/">
                Body Kits <span>↗</span>
              </Link>
              <Link to="/signature-restoration/">
                Restoration <span>↗</span>
              </Link>
            </div>
          </article>
        </div>
        <div className="direction-assist">
          <div>
            <p className="scl-page-kicker">A LITTLE GUIDANCE GOES A LONG WAY</p>
            <h3>Not sure where to begin?</h3>
            <p>
              Tell us your make, model, year and the result you have in mind. If several services interest you, we can discuss a coordinated
              proposal, the preparation and the appropriate sequence.
            </p>
          </div>
          <Link to="/signature-booking/" className="scl-page-cta">
            Discuss your car <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default function ServicesPage() {
  return (
    <div className="pg-services">
      <Seo title="Our Services – Signature Car Lounge" />
      <main id="scl-services-page" className="scl-interior">
        <PageHero />
        <ServiceCollection />
        <Direction />
        <PageFinale />
      </main>
    </div>
  )
}
