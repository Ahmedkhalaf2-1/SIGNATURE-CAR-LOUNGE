import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { MenuIcon } from '../common/Icons'
import { IMAGES } from '../../lib/assets'
import { ROUTES, SERVICES } from '../../data/site'

const PLAIN_LINKS_BEFORE = [
  { to: ROUTES.home, label: 'Home' },
  { to: ROUTES.about, label: 'About Us' },
] as const

const PLAIN_LINKS_AFTER = [
  { to: ROUTES.experience, label: 'Experience' },
  { to: ROUTES.gallery, label: 'Gallery' },
  { to: ROUTES.faq, label: 'FAQs' },
  { to: ROUTES.contact, label: 'Contact' },
] as const

export function Header() {
  const [open, setOpen] = useState(false)
  const servicesRef = useRef<HTMLDetailsElement>(null)
  const { pathname } = useLocation()
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

  return (
    <header className="site-nav">
      <div className="container navinner">
        <Link className="logo" to={ROUTES.home}>
          <img src={IMAGES.logo} alt="Signature Car Lounge crest" />
          <span className="logotext">
            SIGNATURE CAR LOUNGE<small>AUTOMOTIVE ATELIER</small>
          </span>
        </Link>
        <nav className={`links${open ? ' open' : ''}`} id="links" aria-label="Main navigation">
          {PLAIN_LINKS_BEFORE.map((l) => (
            <Link key={l.to} to={l.to} aria-current={current(l.to)}>
              {l.label}
            </Link>
          ))}
          <details className="scl-services-menu" ref={servicesRef}>
            <summary>
              Services <span aria-hidden="true">⌄</span>
            </summary>
            <div className="scl-submenu">
              <Link to={ROUTES.services}>All Services</Link>
              {SERVICES.map((s) => (
                <Link key={s.key} to={s.path}>
                  {s.label}
                </Link>
              ))}
            </div>
          </details>
          {PLAIN_LINKS_AFTER.map((l) => (
            <Link key={l.to} to={l.to} aria-current={current(l.to)}>
              {l.label}
            </Link>
          ))}
          <Link className="cta" to={ROUTES.booking}>
            Book Consultation ↗
          </Link>
        </nav>
        <button className="hamb" type="button" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          <MenuIcon />
        </button>
      </div>
    </header>
  )
}

