import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { ArrowIcon } from '../common/Icons'
import { IMAGES } from '../../lib/assets'
import { ROUTES, SERVICES } from '../../data/site'

const EXPLORE = [
  { to: ROUTES.about, label: 'About Us' },
  { to: ROUTES.services, label: 'Our Services' },
  { to: ROUTES.experience, label: 'The Experience' },
  { to: ROUTES.gallery, label: 'Gallery' },
  { to: ROUTES.faq, label: 'FAQs' },
]

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link className="footer-brand" to={ROUTES.home} aria-label="Signature Car Lounge home">
              <img src={IMAGES.logo} alt="Signature Car Lounge logo" loading="lazy" />
              <span className="kicker">SIGNATURE CAR LOUNGE</span>
            </Link>
            <h3>
              Designed to
              <br />
              be remembered.
            </h3>
            <p>Automotive care, elevated to an art form.</p>
          </div>
          <div>
            <h4>Explore</h4>
            {EXPLORE.map((l, i) => (
              <Fragment key={l.to}>
                {i > 0 && <br />}
                <Link to={l.to}>{l.label}</Link>
              </Fragment>
            ))}
          </div>
          <div>
            <h4>Services</h4>
            {SERVICES.map((s, i) => (
              <Fragment key={s.key}>
                {i > 0 && <br />}
                <Link to={s.path}>{s.label}</Link>
              </Fragment>
            ))}
          </div>
          <div>
            <h4>Connect</h4>
            <p>Your next great drive begins with a conversation.</p>
            <Link className="underline-link" to={ROUTES.contact}>
              Get in touch <ArrowIcon />
            </Link>
          </div>
        </div>
        <div className="copyright">
          <span>© 2026 Signature Car Lounge</span>
          <span>
            <Link to={ROUTES.privacy}>Privacy Information</Link> · <Link to={ROUTES.terms}>Booking Information</Link>
          </span>
          <span>Automotive artistry. Unmistakably Signature.</span>
        </div>
      </div>
    </footer>
  )
}
