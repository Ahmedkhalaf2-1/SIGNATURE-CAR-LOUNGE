import { Link } from 'react-router-dom'
import { Seo } from '../components/common/Seo'
import { img } from '../lib/assets'
import { PageArrowIcon, DirArrow } from '../components/common/Icons'
import { PageFinale } from '../components/sections/PageFinale'
import { useI18n } from '../i18n'
import '../styles/pages/ppf.css'

function PageHero() {
  const { t } = useI18n()
  return (
    <section className="scl-page-hero">
      <div className="scl-page-wrap scl-page-split">
        <div>
          <div className="scl-page-kicker">{t('02 / PAINT PROTECTION')}</div>
          <h1>
            {t('Paint Protection')}
            <br />
            <em>{t('Film.')}</em>
          </h1>
          <div className="scl-page-copy">
            {t('Explore a transparent protective layer for your paintwork, with coverage planned around your vehicle and how you drive.')}
          </div>
          <Link to="/signature-booking/" className="scl-page-cta">
            {t('Plan your consultation')}
            <PageArrowIcon />
          </Link>
          <div className="scl-page-kicker">{t('Preserve the finish. Enjoy the journey.')}</div>
        </div>
        <figure>
          <img src={img('26b659a1-2a3d-40db-a7f7-762ebf160670-1.webp')} alt={t('Signature luxury automotive craftsmanship')} />
          <figcaption className="scl-page-meta">{t('FORM. FINISH. FEELING. / SIGNATURE CAR LOUNGE')}</figcaption>
        </figure>
      </div>
    </section>
  )
}

function PageLight() {
  const { t } = useI18n()
  return (
    <section id="page-content" className="scl-page-light">
      <div className="scl-page-wrap">
        <div className="scl-page-split">
          <div>
            <div className="scl-page-kicker">{t('PAINT PROTECTION FILM')}</div>
            <h2>{t('Protect the extraordinary.')}</h2>
            <div className="scl-page-copy">
              {t(
                'A considered layer of protection starts with the right coverage. Discuss the surfaces most exposed on your journeys, the appearance you prefer and the preparation your paint needs.',
              )}
            </div>
            <Link to="/signature-booking/?service=ppf" className="scl-page-cta">
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
              {t('Protection,')} <em>{t('with purpose.')}</em>
            </h2>
          </div>
          <p>{t('Four areas to consider. A scope shaped around your vehicle, your priorities and the result you want.')}</p>
        </div>
        <div className="detail-scope-grid">
          <article>
            <span className="detail-number">{t('01')}</span>
            <h3>{t('Priority areas')}</h3>
            <p>{t('Discuss the panels most exposed in everyday driving and identify where coverage matters most.')}</p>
          </article>
          <article>
            <span className="detail-number">{t('02')}</span>
            <h3>{t('Your coverage')}</h3>
            <p>{t('Compare selected panels, front-end protection and wider coverage around your priorities.')}</p>
          </article>
          <article>
            <span className="detail-number">{t('03')}</span>
            <h3>{t('A considered fit')}</h3>
            <p>{t('Review panel edges, component exclusions and installation details before agreeing the scope.')}</p>
          </article>
          <article>
            <span className="detail-number">{t('04')}</span>
            <h3>{t('Care after fitting')}</h3>
            <p>{t('Understand the chosen film’s cleaning, inspection and maintenance guidance.')}</p>
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
        <h2>{t('Choose protection around the way you drive.')}</h2>
        <div className="detail-process-grid">
          <article>
            <span className="detail-number">{t('01')}</span>
            <h3>{t('Prioritise the exposure')}</h3>
            <p>
              {t(
                'Discuss the panels and surfaces most exposed during your driving. Coverage can be considered around your vehicle, use and budget rather than assumed from a generic package.',
              )}
            </p>
          </article>
          <article>
            <span className="detail-number">{t('02')}</span>
            <h3>{t('Define the coverage')}</h3>
            <p>
              {t(
                'Compare selected-area, front-end and wider coverage options. Confirm the exact panels, finish, edge treatment and any component exclusions in the agreed scope.',
              )}
            </p>
          </article>
          <article>
            <span className="detail-number">{t('03')}</span>
            <h3>{t('Plan long-term care')}</h3>
            <p>
              {t(
                'Ask about the chosen film’s cleaning, inspection and removal guidance. Discuss existing paint repairs, coatings or film before an installation approach is agreed.',
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
            <summary>{t('Is PPF the same as ceramic coating?')}</summary>
            <p>
              {t(
                'No. PPF is a film applied over suitable surfaces. Ceramic coating is a different treatment with a different purpose. The two may be discussed together where the chosen systems are compatible.',
              )}
            </p>
          </details>
          <details>
            <summary>{t('Can film be applied to repainted panels?')}</summary>
            <p>
              {t(
                'Repaired or repainted panels need individual assessment. Tell the team what work was done and when so suitability, adhesion and removal risks can be discussed.',
              )}
            </p>
          </details>
          <details>
            <summary>{t('Can I choose a different finish?')}</summary>
            <p>
              {t(
                'Finish options depend on the selected product and vehicle surfaces. Request examples and confirm appearance, coverage and care instructions before making a choice.',
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
            <img src={img('sports.jpg')} alt={t('A considered approach')} loading="lazy" />
          </figure>
          <figure>
            <img src={img('mercedes.jpg')} alt={t('A distinctive finish')} loading="lazy" />
          </figure>
          <figure>
            <img src={img('wheel.jpg')} alt={t('Your individual expression')} loading="lazy" />
          </figure>
        </div>
      </div>
    </section>
  )
}

export default function PPFPage() {
  const { t } = useI18n()
  return (
    <div className="pg-ppf">
      <Seo title={t('Paint Protection Film – Signature Car Lounge')} />
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
