import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useI18n } from '../../i18n'
import { GlobeIcon, MenuIcon } from '../common/Icons'
import { IMAGES } from '../../lib/assets'
import { ROUTES, SERVICES } from '../../data/site'

const PLAIN_LINKS_BEFORE = [
  { to: ROUTES.home, label: 'Home' },
  { to: ROUTES.about, label: 'About Us' },
] as const

const PLAIN_LINKS_AFTER = [
  { to: ROUTES.cars, label: 'Cars for Sale' },
  { to: ROUTES.experience, label: 'Experience' },
  { to: ROUTES.gallery, label: 'Gallery' },
  { to: ROUTES.faq, label: 'FAQs' },
  { to: ROUTES.contact, label: 'Contact' },
] as const

export function Header() {
  const [open, setOpen] = useState(false)
  const servicesRef = useRef<HTMLDetailsElement>(null)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { t, locale, setLocale } = useI18n()
  const current = (to: string) => (to === '/' ? pathname === '/' : pathname.startsWith(to.replace(/\/$/, ''))) ? 'page' : undefined

  // Close the menu whenever the route changes.
  useEffect(() => {
    setOpen(false)
    servicesRef.current?.removeAttribute('open')
  }, [pathname])

  // Escape closes the services dropdown and the mobile menu (as in the captured script).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        servicesRef.current?.removeAttribute('open')
        setOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  // Logo: smooth-scroll to the top when already on Home, otherwise go Home (ScrollToTop resets the position).
  const onLogoClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
    e.preventDefault()
    setOpen(false)
    if (pathname === ROUTES.home) window.scrollTo({ top: 0, behavior: 'smooth' })
    else navigate(ROUTES.home)
  }

  return (
    <header className="site-nav">
      <div className="container navinner">
        <Link className="logo" to={ROUTES.home} aria-label={t('Go to homepage')} onClick={onLogoClick}>
          <img src={IMAGES.logo} alt="" />
          <span className="logotext">
            SIGNATURE CAR LOUNGE<small>{t('AUTOMOTIVE ATELIER')}</small>
          </span>
        </Link>
        <nav className={`links${open ? ' open' : ''}`} id="links" aria-label={t('Main navigation')}>
          {PLAIN_LINKS_BEFORE.map((l) => (
            <Link key={l.to} to={l.to} aria-current={current(l.to)}>
              {t(l.label)}
            </Link>
          ))}
          <details className="scl-services-menu" ref={servicesRef}>
            <summary>
              {t('Services')} <span aria-hidden="true">⌄</span>
            </summary>
            <div className="scl-submenu">
              <Link to={ROUTES.services}>{t('All Services')}</Link>
              {SERVICES.map((s) => (
                <Link key={s.key} to={s.path}>
                  {t(s.label)}
                </Link>
              ))}
            </div>
          </details>
          {PLAIN_LINKS_AFTER.map((l) => (
            <Link key={l.to} to={l.to} aria-current={current(l.to)}>
              {t(l.label)}
            </Link>
          ))}
          <Link className="cta" to={ROUTES.booking}>
            {t('Book Consultation')} <span className="dir-arrow" aria-hidden="true">↗</span>
          </Link>
          <button
            className="lang-switch"
            type="button"
            lang={locale === 'en' ? 'ar-SA' : 'en'}
            aria-label={locale === 'en' ? t('Switch language to Arabic') : t('Switch language to English')}
            onClick={() => setLocale(locale === 'en' ? 'ar-SA' : 'en')}
          >
            <GlobeIcon />
            <span>{locale === 'en' ? 'AR' : 'EN'}</span>
          </button>
        </nav>
        <button className="hamb" type="button" aria-label={t('Toggle navigation')} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          <MenuIcon />
        </button>
      </div>
    </header>
  )
}

