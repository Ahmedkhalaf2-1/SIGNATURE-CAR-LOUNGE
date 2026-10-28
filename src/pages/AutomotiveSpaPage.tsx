import { Link } from 'react-router-dom'
import { Seo } from '../components/common/Seo'
import { img } from '../lib/assets'
import { PageArrowIcon } from '../components/common/Icons'
import { PageFinale } from '../components/sections/PageFinale'
import { useI18n } from '../i18n'
import '../styles/pages/automotive-spa.css'

function PageHero() {
  const { t } = useI18n()
  return (
    <section className="scl-page-hero">
      <div className="scl-page-wrap scl-page-split">
        <div>
          <div className="scl-page-kicker">{t('06 / AUTOMOTIVE SPA')}</div>
          <h1>
            {t('Automotive')}
            <br />
            <em>{t('Spa.')}</em>
          </h1>
          <div className="scl-page-copy">
            {t(
              'A considered refresh for your vehicle, combining exterior presentation and interior comfort in a personalised care session.',
            )}
          </div>
          <Link to="/signature-booking/" className="scl-page-cta">
            {t('Plan your consultation')}
            <PageArrowIcon />
          </Link>
          <div className="scl-page-kicker">{t('A fresh perspective on everyday care.')}</div>
        </div>
        <figure>
          <img src={img('5054bea5-6fdd-4d5c-9153-b854b99e0543-1.webp')} alt={t('Signature luxury automotive craftsmanship')} />
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
            <h2>{t('A fresh feeling. Every journey.')}</h2>
            <div className="scl-page-copy">
              {t(
                'A considered refresh for your vehicle, combining exterior presentation and interior comfort in a personalised care session.',
              )}
            </div>
            <Link to="/signature-booking/?service=automotive-spa" className="scl-page-cta">
              {t('Discuss this service')}
              <PageArrowIcon />
            </Link>
          </div>
          <div>
            <figure>
              <img src={img('mercedes.jpg')} alt={t('Automotive finish inspiration')} loading="lazy" />
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
              {t('Fresh detail.')} <em>{t('Every journey.')}</em>
            </h2>
          </div>
          <p>{t('Four areas to consider. A scope shaped around your vehicle, your priorities and the result you want.')}</p>
        </div>
        <div className="detail-scope-grid">
          <article>
            <span className="detail-number">{t('01')}</span>
            <h3>{t('Exterior care')}</h3>
            <p>{t('Discuss washing and presentation priorities, including existing coatings or sensitive finishes.')}</p>
          </article>
          <article>
            <span className="detail-number">{t('02')}</span>
            <h3>{t('Interior comfort')}</h3>
            <p>{t('Identify the upholstery, carpets, trim and touchpoints you would like refreshed.')}</p>
          </article>
          <article>
            <span className="detail-number">{t('03')}</span>
            <h3>{t('Finishing details')}</h3>
            <p>{t('Consider wheels, glass and the smaller details that complete the presentation.')}</p>
          </article>
          <article>
            <span className="detail-number">{t('04')}</span>
            <h3>{t('Your care routine')}</h3>
            <p>{t('Choose a practical level of care around your driving habits and maintenance needs.')}</p>
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
        <h2>{t('A fresh start, inside and out.')}</h2>
        <div className="detail-process-grid">
          <article>
            <span className="detail-number">{t('01')}</span>
            <h3>{t('Exterior presentation')}</h3>
            <p>
              {t(
                'Explore washing, wheel and glass care, and the finishing details that suit your vehicle and its current condition. Point out areas that need extra attention before a scope is agreed.',
              )}
            </p>
          </article>
          <article>
            <span className="detail-number">{t('02')}</span>
            <h3>{t('Interior comfort')}</h3>
            <p>
              {t(
                'Discuss the upholstery, carpets, trim and touchpoints you would like refreshed. Different materials require suitable products and methods; mention delicate finishes or existing damage.',
              )}
            </p>
          </article>
          <article>
            <span className="detail-number">{t('03')}</span>
            <h3>{t('A practical care routine')}</h3>
            <p>
              {t(
                'Choose a level of care that fits how you use your car. A daily driver, occasional weekend car and stored vehicle can have different maintenance priorities.',
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
            {t('Discuss your vehicle')} <span className="dir-arrow" aria-hidden="true">↗</span>
          </Link>
        </div>
        <div>
          <details open>
            <summary>{t('Is an automotive spa the same as paint correction?')}</summary>
            <p>
              {t(
                'A cleaning and presentation service has a different purpose from correcting paint defects. If swirl marks or scratches are your concern, discuss whether a detailing assessment is appropriate.',
              )}
            </p>
          </details>
          <details>
            <summary>{t('What should I do before a visit?')}</summary>
            <p>
              {t(
                'Remove valuables and personal items, identify any sensitive areas and tell the team about aftermarket accessories or recent repairs. Confirm arrival arrangements when your appointment is agreed.',
              )}
            </p>
          </details>
          <details>
            <summary>{t('Can I combine interior and exterior care?')}</summary>
            <p>
              {t(
                'Ask for a coordinated scope. Confirm which areas are included and whether specialist stain treatment or material care requires a separate assessment.',
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
            <img src={img('detail.jpg')} alt={t('A considered approach')} loading="lazy" />
          </figure>
          <figure>
            <img src={img('mercedes.jpg')} alt={t('A distinctive finish')} loading="lazy" />
          </figure>
          <figure>
            <img src={img('interior.jpg')} alt={t('Your individual expression')} loading="lazy" />
          </figure>
        </div>
      </div>
    </section>
  )
}

export default function AutomotiveSpaPage() {
  const { t } = useI18n()
  return (
    <div className="pg-automotive-spa">
      <Seo title={t('Automotive Spa – Signature Car Lounge')} />
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
