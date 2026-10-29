import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { ArrowIcon } from '../common/Icons'
import { IMAGES } from '../../lib/assets'
import { ROUTES, SERVICES } from '../../data/site'
import { useI18n } from '../../i18n'

const EXPLORE = [
  { to: ROUTES.about, label: 'About Us' },
  { to: ROUTES.services, label: 'Our Services' },
  { to: ROUTES.cars, label: 'Cars for Sale' },
  { to: ROUTES.experience, label: 'The Experience' },
  { to: ROUTES.gallery, label: 'Gallery' },
  { to: ROUTES.faq, label: 'FAQs' },
]

export function Footer() {
  const { t } = useI18n()
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link className="footer-brand" to={ROUTES.home} aria-label={t('Signature Car Lounge home')}>
              <img src={IMAGES.logo} alt={t('Signature Car Lounge logo')} loading="lazy" />
              <span className="kicker">SIGNATURE CAR LOUNGE</span>
            </Link>
            <h3>
              {t('Designed to')}
              <br />
              {t('be remembered.')}
            </h3>
            <p>{t('Automotive care, elevated to an art form.')}</p>
          </div>
          <div>
            <h4>{t('Explore')}</h4>
            {EXPLORE.map((l, i) => (
              <Fragment key={l.to}>
                {i > 0 && <br />}
                <Link to={l.to}>{t(l.label)}</Link>
              </Fragment>
            ))}
          </div>
          <div>
            <h4>{t('Services')}</h4>
            {SERVICES.map((s, i) => (
              <Fragment key={s.key}>
                {i > 0 && <br />}
                <Link to={s.path}>{t(s.label)}</Link>
              </Fragment>
            ))}
          </div>
          <div>
            <h4>{t('Connect')}</h4>
            <p>{t('Your next great drive begins with a conversation.')}</p>
            <Link className="underline-link" to={ROUTES.contact}>
              {t('Get in touch')} <ArrowIcon />
            </Link>
          </div>
        </div>
        <div className="copyright">
          <span>© 2026 {t('Signature Car Lounge')}</span>
          <span>
            <Link to={ROUTES.privacy}>{t('Privacy Information')}</Link> · <Link to={ROUTES.terms}>{t('Booking Information')}</Link>
          </span>
          <span>{t('Automotive artistry. Unmistakably Signature.')}</span>
        </div>
      </div>
    </footer>
  )
}
