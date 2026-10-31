import { Link } from 'react-router-dom'
import { Seo } from '../components/common/Seo'
import { img } from '../lib/assets'
import { PageArrowIcon, DirArrow } from '../components/common/Icons'
import { PageFinale } from '../components/sections/PageFinale'
import { useI18n } from '../i18n'
import '../styles/pages/ceramic-coating.css'

function PageHero() {
  const { t } = useI18n()
  return (
    <section className="scl-page-hero">
      <div className="scl-page-wrap scl-page-split">
        <div>
          <div className="scl-page-kicker">{t('03 / CERAMIC COATING')}</div>
          <h1>
            {t('Ceramic')}
            <br />
            <em>{t('Coating.')}</em>
          </h1>
          <div className="scl-page-copy">
            {t(
              'A considered coating treatment begins with preparation. Explore a finish designed around your paintwork and your maintenance routine.',
            )}
          </div>
          <Link to="/signature-booking/" className="scl-page-cta">
            {t('Plan your consultation')}
            <PageArrowIcon />
          </Link>
          <div className="scl-page-kicker">{t('Depth. Clarity. A remarkable finish.')}</div>
        </div>
        <figure>
          <img src={img('de3d88ed-3d3b-4deb-9637-114fd5ccf715-1.webp')} alt={t('Signature luxury automotive craftsmanship')} />
          <figcaption className="scl-page-meta">{t('FORM. FINISH. FEELING. / SIGNATURE CAR LOUNGE')}</figcaption>
        </figure>
      </div>
    </section>
  )
}

function PageLight() {
  const { t } = useI18n()
  return (
    <section className="scl-page-light">
      <div className="scl-page-wrap">
        <div className="scl-page-split">
          <div>
            <div className="scl-page-kicker">{t('CERAMIC COATING')}</div>
            <h2>{t('Clarity that makes an impression.')}</h2>
            <div className="scl-page-copy">
              {t(
                'A considered coating treatment begins with preparation. Explore a finish designed around your paintwork and your maintenance routine.',
              )}
            </div>
            <Link to="/signature-booking/?service=ceramic-coating" className="scl-page-cta">
              {t('Discuss this service')}
              <PageArrowIcon />
            </Link>
          </div>
          <div>
            <figure>
              <img src={img('interior.jpg')} alt={t('Automotive finish inspiration')} loading="lazy" />
            </figure>
          </div>
        </div>
      </div>
    </section>
  )
}

function DetailScope() {
  const { t } = useI18n()
  return (
    <section className="detail-scope">
      <div className="scl-page-wrap">
        <div className="detail-heading">
          <div>
            <p className="scl-page-kicker">{t('A TAILORED APPROACH')}</p>
            <h2>
              {t('A finish,')} <em>{t('carefully considered.')}</em>
            </h2>
          </div>
          <p>{t('Four areas to consider. A scope shaped around your vehicle, your priorities and the result you want.')}</p>
        </div>
        <div className="detail-scope-grid">
          <article>
            <span className="detail-number">{t('01')}</span>
            <h3>{t('Assess the paint')}</h3>
            <p>{t('Review the current finish, previous treatments and the visual result you want to achieve.')}</p>
          </article>
          <article>
            <span className="detail-number">{t('02')}</span>
            <h3>{t('Prepare the surface')}</h3>
            <p>{t('Discuss cleaning, decontamination and suitable correction before a coating is applied.')}</p>
          </article>
          <article>
            <span className="detail-number">{t('03')}</span>
            <h3>{t('Choose the system')}</h3>
            <p>{t('Confirm product compatibility, intended surfaces and the application scope.')}</p>
          </article>
          <article>
            <span className="detail-number">{t('04')}</span>
            <h3>{t('Plan the aftercare')}</h3>
            <p>{t('Understand curing, washing and maintenance guidance for the chosen product.')}</p>
          </article>
        </div>
      </div>
    </section>
  )
}

function DetailProcess() {
  const { t } = useI18n()
  return (
    <section className="detail-process">
      <div className="scl-page-wrap">
        <p className="scl-page-kicker">{t('THE RIGHT PLAN COMES FIRST')}</p>
        <h2>{t('Preparation gives protection its foundation.')}</h2>
        <div className="detail-process-grid">
          <article>
            <span className="detail-number">{t('01')}</span>
            <h3>{t('Assess the finish')}</h3>
            <p>
              {t(
                'Review the existing paint, previous products and the visual result you want. A coating is not a substitute for repairing damage or correcting a finish where correction is appropriate.',
              )}
            </p>
          </article>
          <article>
            <span className="detail-number">{t('02')}</span>
            <h3>{t('Plan the preparation')}</h3>
            <p>
              {t(
                'Discuss cleaning, decontamination and any suitable refinement before coating. The product, surface compatibility and preparation scope should be specified for your vehicle.',
              )}
            </p>
          </article>
          <article>
            <span className="detail-number">{t('03')}</span>
            <h3>{t('Care after application')}</h3>
            <p>
              {t(
                'Request the selected product’s curing and maintenance instructions. Washing, exposure and the first maintenance visit should follow the guidance confirmed for that application.',
              )}
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}

function DetailFaq() {
  const { t } = useI18n()
  return (
    <section className="detail-faq">
      <div className="scl-page-wrap detail-faq-layout">
        <div>
          <p className="scl-page-kicker">{t('BEFORE YOU BOOK')}</p>
          <h2>
            {t('A clearer picture.')}
            <br />
            <em>{t('A better plan.')}</em>
          </h2>
          <p>{t('Start with your questions. The right approach begins with understanding your car.')}</p>
          <Link to="/signature-booking/" className="detail-text-link">
            {t('Discuss your vehicle')} <DirArrow dir="ne" />
          </Link>
        </div>
        <div>
          <details open>
            <summary>{t('Does a ceramic coating prevent stone chips?')}</summary>
            <p>
              {t(
                'A coating should not be treated as a physical barrier against stone impacts. Discuss paint protection film if impact protection is a priority.',
              )}
            </p>
          </details>
          <details>
            <summary>{t('Will my car still need washing?')}</summary>
            <p>
              {t(
                'Yes. A coating does not eliminate routine cleaning. Ask about suitable washing products, drying methods and contamination removal for the chosen system.',
              )}
            </p>
          </details>
          <details>
            <summary>{t('How long does a coating last?')}</summary>
            <p>
              {t(
                'Performance varies with the product, preparation, usage, environment and maintenance. Confirm the specific product, care requirements and any written warranty before booking.',
              )}
            </p>
          </details>
          <p className="detail-faq-note">
            {t(
              'Final scope, product suitability, availability, timing, pricing and any warranty are confirmed individually after assessment.',
            )}
          </p>
        </div>
      </div>
    </section>
  )
}

function PageLight2() {
  const { t } = useI18n()
  return (
    <section className="scl-page-light detail-gallery scl-gallery-refined" aria-label={t('Automotive inspiration')}>
      <div className="scl-page-wrap">
        <div className="scl-gallery-heading">
          <div>
            <div className="scl-page-kicker">{t('THE DETAILS DEFINE THE DIFFERENCE')}</div>
            <h2>
              {t('An eye for')} <em>{t('the exceptional.')}</em>
            </h2>
          </div>
          <Link to="/signature-gallery/" className="scl-gallery-link">
            {t('Explore the gallery')}
            <PageArrowIcon />
          </Link>
        </div>
        <div className="scl-gallery-grid">
          <figure>
            <img src={img('ferrari.jpg')} alt={t('A considered approach')} loading="lazy" />
          </figure>
          <figure>
            <img src={img('interior.jpg')} alt={t('A distinctive finish')} loading="lazy" />
          </figure>
          <figure>
            <img src={img('porsche.jpg')} alt={t('Your individual expression')} loading="lazy" />
          </figure>
        </div>
      </div>
    </section>
  )
}

export default function CeramicCoatingPage() {
  const { t } = useI18n()
  return (
    <div className="pg-ceramic-coating">
      <Seo title={t('Ceramic Coating – Signature Car Lounge')} />
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
