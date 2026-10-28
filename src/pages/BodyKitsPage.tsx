import { Link } from 'react-router-dom'
import { Seo } from '../components/common/Seo'
import { img } from '../lib/assets'
import { PageArrowIcon } from '../components/common/Icons'
import { PageFinale } from '../components/sections/PageFinale'
import { useI18n } from '../i18n'
import '../styles/pages/body-kits.css'

function PageHero() {
  const { t } = useI18n()
  return (
    <section className="scl-page-hero">
      <div className="scl-page-wrap scl-page-split">
        <div>
          <div className="scl-page-kicker">{t('04 / BESPOKE STYLING')}</div>
          <h1>
            {t('Body')}
            <br />
            <em>{t('Kits.')}</em>
          </h1>
          <div className="scl-page-copy">
            {t(
              'Explore styling enhancements that complement the lines of your vehicle. Every proposal begins with compatibility, fitment and your individual taste.',
            )}
          </div>
          <Link to="/signature-booking/" className="scl-page-cta">
            {t('Plan your consultation')}
            <PageArrowIcon />
          </Link>
          <div className="scl-page-kicker">{t('Express the character of your car.')}</div>
        </div>
        <figure>
          <img src={img('fbb4cb03-08c1-45f4-9e93-3bcdcad22fbd-1.webp')} alt={t('Signature luxury automotive craftsmanship')} />
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
            <div className="scl-page-kicker">{t('BODY KITS')}</div>
            <h2>{t('Make your presence personal.')}</h2>
            <div className="scl-page-copy">
              {t(
                'Explore styling enhancements that complement the lines of your vehicle. Every proposal begins with compatibility, fitment and your individual taste.',
              )}
            </div>
            <Link to="/signature-booking/?service=body-kits" className="scl-page-cta">
              {t('Discuss this service')}
              <PageArrowIcon />
            </Link>
          </div>
          <div>
            <figure>
              <img src={img('road.jpg')} alt={t('Automotive finish inspiration')} loading="lazy" />
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
              {t('Presence,')} <em>{t('made personal.')}</em>
            </h2>
          </div>
          <p>{t('Four areas to consider. A scope shaped around your vehicle, your priorities and the result you want.')}</p>
        </div>
        <div className="detail-scope-grid">
          <article>
            <span className="detail-number">{t('01')}</span>
            <h3>{t('Design direction')}</h3>
            <p>{t('Share the look you have in mind and the styling details that matter most.')}</p>
          </article>
          <article>
            <span className="detail-number">{t('02')}</span>
            <h3>{t('Compatibility')}</h3>
            <p>{t('Review model, year, trim and existing modifications against the proposed components.')}</p>
          </article>
          <article>
            <span className="detail-number">{t('03')}</span>
            <h3>{t('Sourcing & fitment')}</h3>
            <p>{t('Clarify component availability, fitment requirements and what the proposal includes.')}</p>
          </article>
          <article>
            <span className="detail-number">{t('04')}</span>
            <h3>{t('Finish & installation')}</h3>
            <p>{t('Agree preparation, finish and installation details before approving the work.')}</p>
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
        <h2>{t('A stronger presence. A considered fit.')}</h2>
        <div className="detail-process-grid">
          <article>
            <span className="detail-number">{t('01')}</span>
            <h3>{t('Set the direction')}</h3>
            <p>
              {t(
                'Share the look you want and which elements matter most. Reference photographs can help communicate proportions, stance and the relationship between the proposed parts and the original car.',
              )}
            </p>
          </article>
          <article>
            <span className="detail-number">{t('02')}</span>
            <h3>{t('Review compatibility')}</h3>
            <p>
              {t(
                'Discuss model, trim, model year, existing modifications and component compatibility. Fitment, sensors, cooling and ground clearance should be assessed before a proposal is finalised.',
              )}
            </p>
          </article>
          <article>
            <span className="detail-number">{t('03')}</span>
            <h3>{t('Agree the finish')}</h3>
            <p>
              {t(
                'Confirm the parts, sourcing, surface preparation, paint or finish, fitting and any related work. Keep the approved scope and component specifications clear before proceeding.',
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
            <summary>{t('Can any kit fit my model?')}</summary>
            <p>
              {t(
                'Compatibility depends on the specific component and vehicle version. Supply the make, model, year and trim, and do not assume that similar-looking vehicles use identical parts.',
              )}
            </p>
          </details>
          <details>
            <summary>{t('Are parts and installation included together?')}</summary>
            <p>
              {t(
                'Ask for an itemised proposal identifying what is supplied, what is installed and any preparation or finishing work. Availability and timing depend on the selected components.',
              )}
            </p>
          </details>
          <details>
            <summary>{t('What about road-use requirements?')}</summary>
            <p>
              {t(
                'Before approving modifications, confirm any applicable road-use, inspection, insurance or manufacturer requirements with the relevant parties. Do not assume every styling component is suitable for every use.',
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
            <img src={img('wheel.jpg')} alt={t('A considered approach')} loading="lazy" />
          </figure>
          <figure>
            <img src={img('road.jpg')} alt={t('A distinctive finish')} loading="lazy" />
          </figure>
          <figure>
            <img src={img('porsche.jpg')} alt={t('Your individual expression')} loading="lazy" />
          </figure>
        </div>
      </div>
    </section>
  )
}

export default function BodyKitsPage() {
  const { t } = useI18n()
  return (
    <div className="pg-body-kits">
      <Seo title={t('Body Kits – Signature Car Lounge')} />
      <main id="scl-body-kits-page" className="scl-interior">
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
