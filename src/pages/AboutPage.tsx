import { Link } from 'react-router-dom'
import { Seo } from '../components/common/Seo'
import { img } from '../lib/assets'
import { PageArrowIcon } from '../components/common/Icons'
import { PageFinale } from '../components/sections/PageFinale'
import { useI18n } from '../i18n'
import '../styles/pages/about.css'

function PageHero() {
  const { t } = useI18n()
  return (
    <section className="scl-page-hero">
      <div className="scl-page-wrap scl-page-split">
        <div>
          <div className="scl-page-kicker">{t('01 / THE PHILOSOPHY')}</div>
          <h1>
            {t('A signature')}
            <br />
            {t('is')} <em>{t('personal.')}</em>
          </h1>
          <div className="scl-page-kicker">{t('So is the way we care for your car.')}</div>
          <Link to="/signature-services/" className="scl-page-cta">
            {t('Explore our services')}
            <PageArrowIcon />
          </Link>
          <p className="scl-hero-note">{t('A personal approach to automotive care.')}</p>
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
            <div className="scl-page-kicker">{t('THE IDEA BEHIND SIGNATURE')}</div>
            <h2>
              {t('More than a car.')}
              <br />
              <em>{t('An expression of you.')}</em>
            </h2>
            <div className="scl-page-copy">
              {t(
                'Signature Car Lounge brings together luxury automotive spa, bespoke detailing, paint protection, body kits and restoration under one distinctive identity.',
              )}
            </div>
            <div className="scl-page-copy">
              <p>
                {t(
                  'Every car has its own character. Our approach begins by understanding yours: how you drive it, what you value and the finish you want to achieve. From the first conversation to a tailored scope of care, the details guide the journey.',
                )}
              </p>
            </div>
          </div>
          <div>
            <figure>
              <img
                src={img('814e2e85-6807-48c1-961e-71ea36e7b1f8-1.webp')}
                alt={t('Careful exterior washing of a performance car')}
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
  const { t } = useI18n()
  return (
    <section className="scl-page-dark">
      <div className="scl-page-wrap">
        <div className="scl-page-split">
          <div>
            <figure>
              <img src={img('26b659a1-2a3d-40db-a7f7-762ebf160670-1.webp')} alt={t('Refined sports car exterior')} loading="lazy" />
            </figure>
          </div>
          <div>
            <div className="scl-page-kicker">{t('CRAFT. CHARACTER. CARE.')}</div>
            <h2>
              {t('Excellence is')}
              <br />
              <em>{t('in the details.')}</em>
            </h2>
            <p>
              {t(
                'From the clarity of a painted surface to the texture of an interior, refinement is the sum of carefully considered details.',
              )}
            </p>
            <p>
              {t(
                'Our focus brings presentation, protection and personal expression together, with a scope of care shaped around your vehicle.',
              )}
            </p>
            <Link to="/signature-experience/" className="scl-page-cta">
              {t('Discover the experience ↗')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function PageLight2() {
  const { t } = useI18n()
  return (
    <section className="scl-page-light">
      <div className="scl-page-wrap">
        <h2>
          {t('The Signature')} <em>{t('standard.')}</em>
        </h2>
        <div className="scl-page-values">
          <article>
            <h3>{t('Precision')}</h3>
            <div className="scl-page-kicker">{t('Attention to surfaces, lines and finishing details.')}</div>
          </article>
          <article>
            <h3>{t('Individuality')}</h3>
            <div className="scl-page-kicker">{t('A conversation built around your car and your priorities.')}</div>
          </article>
          <article>
            <h3>{t('Consideration')}</h3>
            <div className="scl-page-kicker">{t('A clear scope before any service is confirmed.')}</div>
          </article>
          <article>
            <h3>{t('Presence')}</h3>
            <div className="scl-page-kicker">{t('A finish that respects the character of your vehicle.')}</div>
          </article>
        </div>
      </div>
    </section>
  )
}

function PageLight3() {
  const { t } = useI18n()
  return (
    <section className="scl-page-light">
      <div className="scl-page-wrap">
        <div className="scl-page-copy">
          <div className="signature-guide">
            <p className="signature-kicker">{t('THE PHILOSOPHY IN PRACTICE')}</p>
            <h2>{t('Care shaped around the individual vehicle.')}</h2>
            <div className="scl-about-process">
              <div className="scl-page-rule">
                <h3>{t('Look closer')}</h3>
                <p>
                  {t(
                    'Paint, glass, wheels, cabin materials and trim each tell part of the story. The right conversation considers the vehicle’s condition as well as the finish you want.',
                  )}
                </p>
              </div>
              <div className="scl-page-rule">
                <h3>{t('Listen first')}</h3>
                <p>
                  {t(
                    'How you use your car matters. Daily driving, occasional journeys and long-term ownership can lead to different priorities for presentation and care.',
                  )}
                </p>
              </div>
              <div className="scl-page-rule">
                <h3>{t('Keep it considered')}</h3>
                <p>
                  {t(
                    'A clear proposal makes the choices easier to understand. Discuss the scope, materials, expected result and maintenance before deciding what suits your car.',
                  )}
                </p>
              </div>
            </div>
            <div className="scl-about-perspective">
              <div>
                <h4>{t('Our perspective')}</h4>
                <p>
                  {t(
                    'The Signature identity brings cleaning, refinement, protection and individual styling into one conversation about the car you value.',
                  )}
                </p>
              </div>
              <div>
                <h4>{t('Your next step')}</h4>
                <p>
                  {t(
                    'Explore the services or begin a consultation with your vehicle details and priorities. The appropriate scope is considered individually.',
                  )}
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
  const { t } = useI18n()
  return (
    <div className="pg-about">
      <Seo title={t('About Us – Signature Car Lounge')} />
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
