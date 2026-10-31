import { Link } from 'react-router-dom'
import { Seo } from '../components/common/Seo'
import { img } from '../lib/assets'
import { PageArrowIcon, DirArrow, DetailingIcon, PpfIcon, BodyKitsIcon } from '../components/common/Icons'
import { PageFinale } from '../components/sections/PageFinale'
import { useI18n } from '../i18n'
import '../styles/pages/services.css'

function PageHero() {
  const { t } = useI18n()
  return (
    <section className="scl-page-hero">
      <div className="scl-page-wrap scl-page-split">
        <div>
          <div className="scl-page-kicker">{t('02 / OUR EXPERTISE')}</div>
          <h1>
            {t('Exceptional care.')}
            <br />
            <em>{t('Individually considered.')}</em>
          </h1>
          <div className="scl-page-copy">{t('Explore six ways to protect, refine and personalise your vehicle.')}</div>
          <a href="#page-content" className="scl-page-cta">
            {t('Explore our services')}
            <PageArrowIcon />
          </a>
          <div className="scl-page-kicker">{t('Six disciplines. One distinctive standard.')}</div>
        </div>
        <figure>
          <img src={img('hero-banner.jpg')} alt={t('Signature luxury automotive craftsmanship')} />
          <figcaption className="scl-page-meta">{t('FORM. FINISH. FEELING. / SIGNATURE CAR LOUNGE')}</figcaption>
        </figure>
      </div>
    </section>
  )
}

function ServiceCollection() {
  const { t } = useI18n()
  return (
    <section id="page-content" className="service-collection">
      <div className="scl-page-wrap">
        <div className="collection-heading">
          <div>
            <p className="scl-page-kicker">{t('THE SERVICE COLLECTION')}</p>
            <h2>
              {t('Six disciplines.')}
              <br />
              <em>{t('One signature standard.')}</em>
            </h2>
          </div>
          <p>{t('From a considered refresh to a personal transformation, find the right starting point for your vehicle.')}</p>
        </div>
        <div className="service-grid">
          <article className="service-card">
            <Link to="/signature-detailing/" className="service-image" aria-label={t('Explore Bespoke Detailing')}>
              <img
                src={img('814e2e85-6807-48c1-961e-71ea36e7b1f8-1.webp')}
                alt={t('Bespoke Detailing automotive inspiration')}
                loading="lazy"
              />
            </Link>
            <div className="service-body">
              <h3>{t('Bespoke Detailing')}</h3>
              <p className="service-tag">{t('A finish worthy of your car.')}</p>
              <p>
                {t(
                  'Thoughtful exterior and interior refinement, with preparation tailored to your vehicle’s condition and the finish you want.',
                )}
              </p>
              <Link to="/signature-detailing/" className="service-link">
                {t('Explore service')} <DirArrow dir="ne" />
              </Link>
            </div>
          </article>
          <article className="service-card">
            <Link to="/signature-ppf/" className="service-image" aria-label={t('Explore Paint Protection Film')}>
              <img
                src={img('26b659a1-2a3d-40db-a7f7-762ebf160670-1.webp')}
                alt={t('Paint Protection Film automotive inspiration')}
                loading="lazy"
              />
            </Link>
            <div className="service-body">
              <h3>{t('Paint Protection Film')}</h3>
              <p className="service-tag">{t('Protect the extraordinary.')}</p>
              <p>
                {t(
                  'Explore tailored film coverage for vulnerable painted surfaces, with careful attention to edges, finish and everyday use.',
                )}
              </p>
              <Link to="/signature-ppf/" className="service-link">
                {t('Explore service')} <DirArrow dir="ne" />
              </Link>
            </div>
          </article>
          <article className="service-card">
            <Link to="/signature-ceramic-coating/" className="service-image" aria-label={t('Explore Ceramic Coating')}>
              <img
                src={img('de3d88ed-3d3b-4deb-9637-114fd5ccf715-1.webp')}
                alt={t('Ceramic Coating automotive inspiration')}
                loading="lazy"
              />
            </Link>
            <div className="service-body">
              <h3>{t('Ceramic Coating')}</h3>
              <p className="service-tag">{t('Clarity that makes an impression.')}</p>
              <p>
                {t('Discuss surface preparation and ceramic protection to enhance the finish and support an easier maintenance routine.')}
              </p>
              <Link to="/signature-ceramic-coating/" className="service-link">
                {t('Explore service')} <DirArrow dir="ne" />
              </Link>
            </div>
          </article>
          <article className="service-card">
            <Link to="/signature-body-kits/" className="service-image" aria-label={t('Explore Body Kits')}>
              <img src={img('fbb4cb03-08c1-45f4-9e93-3bcdcad22fbd-1.webp')} alt={t('Body Kits automotive inspiration')} loading="lazy" />
            </Link>
            <div className="service-body">
              <h3>{t('Body Kits')}</h3>
              <p className="service-tag">{t('Make your presence personal.')}</p>
              <p>{t('Refine your vehicle’s silhouette with a considered approach to styling, component compatibility and fitment.')}</p>
              <Link to="/signature-body-kits/" className="service-link">
                {t('Explore service')} <DirArrow dir="ne" />
              </Link>
            </div>
          </article>
          <article className="service-card">
            <Link to="/signature-restoration/" className="service-image" aria-label={t('Explore Restoration')}>
              <img src={img('941e188e-50da-4f35-b0fe-b7edde1bf792-1.webp')} alt={t('Restoration automotive inspiration')} loading="lazy" />
            </Link>
            <div className="service-body">
              <h3>{t('Restoration')}</h3>
              <p className="service-tag">{t('Respect the character. Renew the detail.')}</p>
              <p>{t('Renew the cosmetic character of your vehicle with a considered scope that respects its original personality.')}</p>
              <Link to="/signature-restoration/" className="service-link">
                {t('Explore service')} <DirArrow dir="ne" />
              </Link>
            </div>
          </article>
          <article className="service-card">
            <Link to="/signature-automotive-spa/" className="service-image" aria-label={t('Explore Automotive Spa')}>
              <img
                src={img('5054bea5-6fdd-4d5c-9153-b854b99e0543-1.webp')}
                alt={t('Automotive Spa automotive inspiration')}
                loading="lazy"
              />
            </Link>
            <div className="service-body">
              <h3>{t('Automotive Spa')}</h3>
              <p className="service-tag">{t('A fresh feeling. Every journey.')}</p>
              <p>{t('Refresh the details you see and touch, with attentive cleaning and presentation for a more enjoyable drive.')}</p>
              <Link to="/signature-automotive-spa/" className="service-link">
                {t('Explore service')} <DirArrow dir="ne" />
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

function Direction() {
  const { t } = useI18n()
  return (
    <section id="find-your-direction" className="scl-direction">
      <div className="scl-page-wrap">
        <div className="direction-heading">
          <div>
            <p className="scl-page-kicker">{t('FIND YOUR DIRECTION')}</p>
            <h2>
              {t('What would you like')}
              <br />
              {t('to')} <em>{t('achieve?')}</em>
            </h2>
          </div>
          <p>
            {t('Start with the result you want.')}
            <br />
            {t('We’ll help you consider the right services for your car, its condition and the way you drive.')}
          </p>
        </div>
        <div className="direction-grid">
          <article className="direction-card">
            <div className="direction-top">
              <DetailingIcon />
            </div>
            <h3>{t('Refresh & refine')}</h3>
            <p>{t('A cleaner cabin. A more considered finish. Renew the details that make every drive feel special.')}</p>
            <div className="direction-note">
              {t('FOR CLEANING & PRESENTATION')}
              <br />
              <span>{t('Explore Automotive Spa, or discuss more extensive surface and interior refinement with Bespoke Detailing.')}</span>
            </div>
            <div className="direction-links">
              <Link to="/signature-automotive-spa/">
                {t('Automotive Spa')} <DirArrow dir="ne" />
              </Link>
              <Link to="/signature-detailing/">
                {t('Bespoke Detailing')} <DirArrow dir="ne" />
              </Link>
            </div>
          </article>
          <article className="direction-card">
            <div className="direction-top">
              <PpfIcon />
            </div>
            <h3>{t('Protect the finish')}</h3>
            <p>{t('Plan protection around your vehicle’s surfaces, everyday use and the finish you want to preserve.')}</p>
            <div className="direction-note">
              {t('FOR SURFACE PROTECTION')}
              <br />
              <span>{t('Compare film coverage and ceramic coating, including preparation, compatibility and ongoing maintenance.')}</span>
            </div>
            <div className="direction-links">
              <Link to="/signature-ppf/">
                {t('Paint Protection Film')} <DirArrow dir="ne" />
              </Link>
              <Link to="/signature-ceramic-coating/">
                {t('Ceramic Coating')} <DirArrow dir="ne" />
              </Link>
            </div>
          </article>
          <article className="direction-card">
            <div className="direction-top">
              <BodyKitsIcon />
            </div>
            <h3>{t('Make it individual')}</h3>
            <p>{t('A more personal silhouette. A renewed character. Shape a car that feels unmistakably yours.')}</p>
            <div className="direction-note">
              {t('FOR STYLING & COSMETIC RENEWAL')}
              <br />
              <span>{t('Explore Body Kits for a styling conversation, or Restoration for a considered, phased approach to renewal.')}</span>
            </div>
            <div className="direction-links">
              <Link to="/signature-body-kits/">
                {t('Body Kits')} <DirArrow dir="ne" />
              </Link>
              <Link to="/signature-restoration/">
                {t('Restoration')} <DirArrow dir="ne" />
              </Link>
            </div>
          </article>
        </div>
        <div className="direction-assist">
          <div>
            <p className="scl-page-kicker">{t('A LITTLE GUIDANCE GOES A LONG WAY')}</p>
            <h3>{t('Not sure where to begin?')}</h3>
            <p>
              {t(
                'Tell us your make, model, year and the result you have in mind. If several services interest you, we can discuss a coordinated proposal, the preparation and the appropriate sequence.',
              )}
            </p>
          </div>
          <Link to="/signature-booking/" className="scl-page-cta">
            {t('Discuss your car')} <DirArrow dir="ne" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default function ServicesPage() {
  const { t } = useI18n()
  return (
    <div className="pg-services">
      <Seo title={t('Our Services – Signature Car Lounge')} />
      <main id="scl-services-page" className="scl-interior">
        <PageHero />
        <ServiceCollection />
        <Direction />
        <PageFinale />
      </main>
    </div>
  )
}
