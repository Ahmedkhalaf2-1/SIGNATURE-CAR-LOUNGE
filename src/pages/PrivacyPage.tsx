import { Link } from 'react-router-dom'
import { Seo } from '../components/common/Seo'
import { useI18n } from '../i18n'
import '../styles/pages/privacy.css'

function Hero() {
  const { t } = useI18n()
  return (
    <section className="info-hero">
      <div className="info-wrap">
        <p className="eyebrow">{t('Privacy information')}</p>
        <h1>
          {t('Your information.')}
          <br />
          <em>{t('A considered approach.')}</em>
        </h1>
        <p className="intro">{t('A practical guide to the information requested when you contact Signature Car Lounge.')}</p>
      </div>
    </section>
  )
}

function Section() {
  const { t } = useI18n()
  return (
    <section>
      <div className="info-wrap info-layout">
        <aside>
          <p className="eyebrow">{t('A little clarity')}</p>
          <h2>{t('Good to know.')}</h2>
          <nav className="info-nav" aria-label={t('On this page')}>
            <a href="#signature-privacy-0">{t('01 Your enquiry')}</a>
            <a href="#signature-privacy-1">{t('02 Contact preferences')}</a>
            <a href="#signature-privacy-2">{t('03 Website resources')}</a>
            <a href="#signature-privacy-3">{t('04 Questions or corrections')}</a>
          </nav>
        </aside>
        <div>
          <article id="signature-privacy-0">
            <span className="number">{t('01 / Privacy information')}</span>
            <h3>{t('Your enquiry')}</h3>
            <p>
              {t(
                'The consultation form asks for your name, email, phone number, vehicle details, preferred service, preferred date and a message. Review the information you provide before submitting a form, and avoid including identity documents or unrelated sensitive information.',
              )}
            </p>
          </article>
          <article id="signature-privacy-1">
            <span className="number">{t('02 / Privacy information')}</span>
            <h3>{t('Contact preferences')}</h3>
            <p>
              {t(
                'Include a suitable way to respond and tell the team your preferred contact method. Keep the message focused on your vehicle, its condition and the services you would like to discuss.',
              )}
            </p>
          </article>
          <article id="signature-privacy-2">
            <span className="number">{t('03 / Privacy information')}</span>
            <h3>{t('Website resources')}</h3>
            <p>
              {t(
                'The website uses hosting and font-delivery services. Your browser shares technical connection information when requesting these resources.',
              )}
            </p>
          </article>
          <article id="signature-privacy-3">
            <span className="number">{t('04 / Privacy information')}</span>
            <h3>{t('Questions or corrections')}</h3>
            <p>
              {t(
                'For a question about information you have submitted, use the consultation form and clearly identify your request. Do not include passwords, payment card details or identity documents.',
              )}
            </p>
          </article>
          <div className="info-note">
            <p>
              {t(
                'Share only the information relevant to your enquiry. Check that your contact details are correct so your request can be followed up.',
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function End() {
  const { t } = useI18n()
  return (
    <section className="info-end">
      <div className="info-wrap end-row">
        <div>
          <p className="eyebrow">{t('Here to help')}</p>
          <h2>
            {t('Questions?')} <em>{t('Let’s talk.')}</em>
          </h2>
          <p>{t('Start with a conversation about your vehicle and your priorities.')}</p>
        </div>
        <Link to="/signature-contact/" className="info-button">
          {t('Get in touch ↗')}
        </Link>
      </div>
    </section>
  )
}

export default function PrivacyPage() {
  const { t } = useI18n()
  return (
    <div className="pg-privacy">
      <Seo title={t('Privacy Information – Signature Car Lounge')} />
      <main id="signature-privacy">
        <Hero />
        <Section />
        <End />
      </main>
    </div>
  )
}
