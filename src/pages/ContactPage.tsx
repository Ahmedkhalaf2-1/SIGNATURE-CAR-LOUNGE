import { Link } from 'react-router-dom'
import { Seo } from '../components/common/Seo'
import { img } from '../lib/assets'
import { useI18n } from '../i18n'
import '../styles/pages/contact.css'

function Hero() {
  const { t } = useI18n()
  return (
    <section className="ct-hero">
      <div className="ct-wrap ct-hero-grid">
        <div>
          <span className="ct-label">{t('CONNECT WITH SIGNATURE')}</span>
          <h1>
            {t('A conversation.')}
            <br />
            <em>{t('A new beginning.')}</em>
          </h1>
          <p>
            {t('Tell us about your vehicle and the care you have in mind. Your next chapter starts with the details that matter to you.')}
          </p>
          <Link to="/signature-booking/" className="ct-button">
            {t('Plan your consultation')} <span className="dir-arrow" aria-hidden="true">↗</span>
          </Link>
        </div>
        <figure>
          <img src={img('hero-banner.jpg')} alt={t('Black Porsche in an illuminated automotive studio')} />
          <figcaption>{t('YOUR CAR. YOUR VISION. YOUR SIGNATURE.')}</figcaption>
        </figure>
      </div>
    </section>
  )
}

function Connect() {
  const { t } = useI18n()
  return (
    <section className="ct-connect">
      <div className="ct-wrap ct-connect-grid">
        <div>
          <span className="ct-label">{t('LET’S CONNECT')}</span>
          <h2>
            {t('Personal attention.')}
            <br />
            <em>{t('From the first hello.')}</em>
          </h2>
          <p>
            {t('Begin with a guided consultation request. Share your vehicle, your priorities and your preferred timing in one place.')}
          </p>
          <Link to="/signature-booking/" className="ct-link">
            {t('Start your request')} <span className="dir-arrow" aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="ct-info">
          <article>
            <span className="ct-icon" aria-hidden="true">
              ⌖
            </span>
            <div>
              <h3>{t('Plan your visit')}</h3>
              <p>
                {t(
                  'Include your preferred date in your consultation request. Confirm the location and arrival arrangements with the team before travelling.',
                )}
              </p>
            </div>
          </article>
          <article>
            <span className="ct-icon dir-arrow" aria-hidden="true">
              ↗
            </span>
            <div>
              <h3>{t('Contact the team')}</h3>
              <p>
                {t(
                  'Use our consultation form to share your enquiry and preferred way to be contacted. Include a valid email address and telephone number.',
                )}
              </p>
            </div>
          </article>
          <article>
            <span className="ct-icon" aria-hidden="true">
              ◷
            </span>
            <div>
              <h3>{t('Appointment arrangements')}</h3>
              <p>
                {t(
                  'A preferred date is a request, not a confirmed appointment. Wait for confirmation of your visit and expected service duration.',
                )}
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

function Section() {
  const { t } = useI18n()
  return (
    <section>
      <div className="ct-wrap">
        <div className="ct-heading">
          <div>
            <span className="ct-label">{t('FIND YOUR STARTING POINT')}</span>
            <h2>
              {t('What do you have')}
              <br />
              <em>{t('in mind?')}</em>
            </h2>
          </div>
          <p>{t('You do not need to know the technical service name. Start with the result you would like to achieve.')}</p>
        </div>
        <div className="ct-cards">
          <article className="ct-card">
            <span className="ct-label">{t('CARE & PROTECTION')}</span>
            <h3>{t('Ask about a service.')}</h3>
            <p>{t('Tell us which surfaces or areas concern you, and what you would like to protect or refresh.')}</p>
            <Link to="/signature-services/" className="ct-link">
              {t('Explore services')} <span className="dir-arrow" aria-hidden="true">↗</span>
            </Link>
          </article>
          <article className="ct-card">
            <span className="ct-label">{t('A COMPLETE VISION')}</span>
            <h3>{t('Bring it together.')}</h3>
            <p>
              {t('Considering detailing, protection and styling together? Share your priorities so the right sequence can be discussed.')}
            </p>
            <Link to="/signature-booking/" className="ct-link">
              {t('Discuss your vehicle')} <span className="dir-arrow" aria-hidden="true">↗</span>
            </Link>
          </article>
          <article className="ct-card">
            <span className="ct-label">{t('YOUR NEXT VISIT')}</span>
            <h3>{t('Plan the details.')}</h3>
            <p>{t('Share a preferred visit window and any relevant deadline. Confirm appointment arrangements before travelling.')}</p>
            <Link to="/signature-faq/" className="ct-link">
              {t('Read the FAQs')} <span className="dir-arrow" aria-hidden="true">↗</span>
            </Link>
          </article>
        </div>
        <div className="ct-note">
          <div>
            <h3>{t('A few useful details')}</h3>
            <p>
              {t(
                'Have your vehicle’s make, model and year ready, along with previous treatments, relevant repairs and your main priorities.',
              )}
            </p>
          </div>
          <div>
            <h3>{t('A clearer picture')}</h3>
            <p>
              {t(
                'Photographs of your vehicle and specific concerns can help explain your enquiry. Bring any visual references you would like to discuss.',
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Final() {
  const { t } = useI18n()
  return (
    <section className="ct-final">
      <div className="ct-wrap">
        <div>
          <span className="ct-label">{t('THE NEXT STEP IS PERSONAL')}</span>
          <h2>
            {t('Let’s talk about')} <em>{t('your car.')}</em>
          </h2>
        </div>
        <Link to="/signature-booking/" className="ct-button">
          {t('Start your consultation')} <span className="dir-arrow" aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  )
}

export default function ContactPage() {
  const { t } = useI18n()
  return (
    <div className="pg-contact">
      <Seo title={t('Contact – Signature Car Lounge')} />
      <main id="signature-contact">
        <Hero />
        <Connect />
        <Section />
        <Final />
      </main>
    </div>
  )
}
