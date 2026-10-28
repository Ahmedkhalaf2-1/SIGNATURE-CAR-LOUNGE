import { Link } from 'react-router-dom'
import { Seo } from '../components/common/Seo'
import { img } from '../lib/assets'
import { PageArrowIcon } from '../components/common/Icons'
import { PageFinale } from '../components/sections/PageFinale'
import { useI18n } from '../i18n'
import '../styles/pages/restoration.css'

function PageHero() {
  const { t } = useI18n()
  return (
    <section className="scl-page-hero">
      <div className="scl-page-wrap scl-page-split">
        <div>
          <div className="scl-page-kicker">{t('05 / RESTORATION')}</div>
          <h1>
            {t('Restoration.')}
            <br />
            <em>{t('With respect.')}</em>
          </h1>
          <div className="scl-page-copy">
            {t('Bring attention back to the details that matter. Discuss cosmetic restoration needs and a sensible plan for your vehicle.')}
          </div>
          <Link to="/signature-booking/" className="scl-page-cta">
            {t('Plan your consultation')}
            <PageArrowIcon />
          </Link>
          <div className="scl-page-kicker">{t('Character worth preserving.')}</div>
        </div>
        <figure>
          <img src={img('941e188e-50da-4f35-b0fe-b7edde1bf792-1.webp')} alt={t('Signature luxury automotive craftsmanship')} />
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
            <div className="scl-page-kicker">{t('RESTORATION')}</div>
            <h2>{t('Respect the character. Renew the detail.')}</h2>
            <div className="scl-page-copy">
              {t(
                'Bring attention back to the details that matter. Discuss cosmetic restoration needs and a sensible plan for your vehicle.',
              )}
            </div>
            <Link to="/signature-booking/?service=restoration" className="scl-page-cta">
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
              {t('Character,')} <em>{t('thoughtfully renewed.')}</em>
            </h2>
          </div>
          <p>{t('Four areas to consider. A scope shaped around your vehicle, your priorities and the result you want.')}</p>
        </div>
        <div className="detail-scope-grid">
          <article>
            <span className="detail-number">{t('01 / CONSIDERED CARE')}</span>
            <h3>{t('The starting point')}</h3>
            <p>{t('Review condition, visible concerns and previous repairs before deciding on priorities.')}</p>
          </article>
          <article>
            <span className="detail-number">{t('02 / CONSIDERED CARE')}</span>
            <h3>{t('Paint & presentation')}</h3>
            <p>{t('Discuss the finish you want and distinguish cosmetic renewal from specialist repairs.')}</p>
          </article>
          <article>
            <span className="detail-number">{t('03 / CONSIDERED CARE')}</span>
            <h3>{t('Interior & trim')}</h3>
            <p>{t('Explore materials, trim and cabin details with respect for the vehicle’s character.')}</p>
          </article>
          <article>
            <span className="detail-number">{t('04 / CONSIDERED CARE')}</span>
            <h3>{t('A phased plan')}</h3>
            <p>{t('Agree stages, dependencies and sourcing needs so the proposed work has a clear direction.')}</p>
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
        <h2>{t('Preserve the character. Plan the renewal.')}</h2>
        <div className="detail-process-grid">
          <article>
            <span className="detail-number">{t('01 / THE APPROACH')}</span>
            <h3>{t('Understand the starting point')}</h3>
            <p>
              {t(
                'Share the vehicle’s history, visible concerns and previous repairs. Clear photographs and an initial assessment help distinguish cosmetic priorities from work that needs specialist investigation.',
              )}
            </p>
          </article>
          <article>
            <span className="detail-number">{t('02 / THE APPROACH')}</span>
            <h3>{t('Build a phased scope')}</h3>
            <p>
              {t(
                'Discuss paint, trim, interior and presentation priorities. Separate essential work from optional refinements so the proposed stages, dependencies and expectations are clear.',
              )}
            </p>
          </article>
          <article>
            <span className="detail-number">{t('03 / THE APPROACH')}</span>
            <h3>{t('Respect the original character')}</h3>
            <p>
              {t(
                'Consider how much originality you want to retain and the finish you want to achieve. Confirm materials, sourcing and the intended standard before the scope is approved.',
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
            <summary>{t('Can restoration be completed in stages?')}</summary>
            <p>
              {t(
                'A phased approach can be discussed around condition, priorities and component availability. Confirm dependencies so one stage does not compromise later work.',
              )}
            </p>
          </details>
          <details>
            <summary>{t('Can you give a firm price from photographs?')}</summary>
            <p>
              {t(
                'Photographs help start a conversation, but hidden damage, material condition and disassembly can change the scope. Agree how additional findings and changes will be handled.',
              )}
            </p>
          </details>
          <details>
            <summary>{t('Is this a mechanical restoration service?')}</summary>
            <p>
              {t(
                'Describe all your requirements at enquiry. Confirm which work the proposed service covers and whether mechanical, structural or other specialist work requires a separate provider.',
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
            <img src={img('classic.jpg')} alt={t('A considered approach')} loading="lazy" />
          </figure>
          <figure>
            <img src={img('interior.jpg')} alt={t('A distinctive finish')} loading="lazy" />
          </figure>
          <figure>
            <img src={img('sports.jpg')} alt={t('Your individual expression')} loading="lazy" />
          </figure>
        </div>
      </div>
    </section>
  )
}

export default function RestorationPage() {
  const { t } = useI18n()
  return (
    <div className="pg-restoration">
      <Seo title={t('Restoration – Signature Car Lounge')} />
      <main id="scl-restoration-page" className="scl-interior">
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
