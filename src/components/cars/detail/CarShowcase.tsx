import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { Link } from 'react-router-dom'
import { carAlt, type CarListing } from '../../../data/cars'
import { ROUTES } from '../../../data/site'
import { useI18n } from '../../../i18n'
import { useCarFormat } from '../useCarFormat'

/**
 * Full-bleed hero whose photo is the gallery stage, with the thumbnail rail directly beneath it.
 * No gallery dependency: the rail is a roving-tabindex group (arrow keys, Home/End).
 */
export function CarShowcase({ car }: { car: CarListing }) {
  const { t } = useI18n()
  const fmt = useCarFormat()
  const images = car.images.length ? car.images : [car.heroImage]
  const n = images.length
  const [active, setActive] = useState(0)
  const rail = useRef<HTMLDivElement>(null)

  // Keep the active thumbnail in view when the rail scrolls (narrow screens).
  useEffect(() => {
    rail.current?.querySelectorAll<HTMLElement>('.cd-thumb')[active]?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
  }, [active])

  const go = (i: number, focus = false) => {
    const next = (i + n) % n
    setActive(next)
    if (focus) rail.current?.querySelectorAll<HTMLButtonElement>('.cd-thumb')[next]?.focus()
  }
  const onKey = (e: KeyboardEvent) => {
    const rtl = document.documentElement.dir === 'rtl'
    if (e.key === (rtl ? 'ArrowLeft' : 'ArrowRight')) go(active + 1, true)
    else if (e.key === (rtl ? 'ArrowRight' : 'ArrowLeft')) go(active - 1, true)
    else if (e.key === 'Home') go(0, true)
    else if (e.key === 'End') go(n - 1, true)
    else return
    e.preventDefault()
  }
  const alt = (i: number) => (n > 1 ? `${carAlt(car)} (${fmt.number(i + 1)}/${fmt.number(n)})` : carAlt(car))
  const boxLabel = car.status === 'available' ? t('For Sale') : fmt.status(car.status)

  return (
    <>
      <header className="cd-hero">
        <div className="cd-hero__media">
          <img key={active} src={images[active]} alt={alt(active)} width={1600} height={1067} loading={active === 0 ? 'eager' : 'lazy'} fetchPriority={active === 0 ? 'high' : undefined} decoding="async" />
        </div>
        <div className="cd-wrap cd-hero__inner">
          <div className="cd-hero__copy">
            <p className="cd-make">
              <bdi dir="ltr">{car.make}</bdi>
            </p>
            <h1 className="cd-model">
              <bdi dir="ltr">{car.model}</bdi>
            </h1>
            {car.variant && (
              <p className="cd-variant">
                <bdi dir="ltr">{car.variant}</bdi>
              </p>
            )}
            <span className="cd-rule" aria-hidden="true" />
          </div>
          <div className="cd-statusbox">
            <span className="cd-statusbox__label">{boxLabel}</span>
            <a className="cd-statusbox__cta" href="#enquire">
              {t('Enquire About This Vehicle')} <span className="dir-arrow" aria-hidden="true">→</span>
            </a>
          </div>
          <Link className="cd-back" to={ROUTES.cars}>
            <span className="dir-arrow" aria-hidden="true">←</span> {t('Back to Cars for Sale')}
          </Link>
        </div>
      </header>

      {n > 1 && (
        <section className="cd-rail-wrap" aria-label={t('Gallery')}>
          <div className="cd-wrap cd-rail">
            <button type="button" className="cd-rail__nav" aria-label={t('Previous image')} onClick={() => go(active - 1)}>
              <span className="dir-arrow" aria-hidden="true">‹</span>
            </button>
            <div className="cd-rail__track" role="group" aria-label={t('Choose image')} ref={rail} onKeyDown={onKey}>
              {images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  className={`cd-thumb${i === active ? ' is-active' : ''}`}
                  aria-label={`${t('Show image')} ${fmt.number(i + 1)}`}
                  aria-pressed={i === active}
                  tabIndex={i === active ? 0 : -1}
                  onClick={() => setActive(i)}
                >
                  <img src={src} alt="" width={240} height={160} loading="lazy" decoding="async" />
                </button>
              ))}
            </div>
            <button type="button" className="cd-rail__nav" aria-label={t('Next image')} onClick={() => go(active + 1)}>
              <span className="dir-arrow" aria-hidden="true">›</span>
            </button>
          </div>
        </section>
      )}
    </>
  )
}
