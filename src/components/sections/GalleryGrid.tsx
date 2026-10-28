import { useCallback, useEffect, useState } from 'react'
import { ArrowIcon } from '../common/Icons'
import { Reveal } from '../common/Reveal'
import { img } from '../../lib/assets'

export interface GalleryShot {
  src: string
  alt: string
  label: string
}

const SHOTS: GalleryShot[] = [
  { src: img('porsche-1.jpg'), alt: 'Yellow sports car automotive photograph', label: 'View yellow sports car image' },
  { src: img('ferrari-1.jpg'), alt: 'Red supercar automotive photograph', label: 'View red supercar image' },
  { src: img('mercedes-1.jpg'), alt: 'Grey grand tourer automotive photograph', label: 'View grey grand tourer image' },
  { src: img('wheel-1.jpg'), alt: 'White supercar automotive photograph', label: 'View white supercar image' },
  { src: img('road-1.jpg'), alt: 'Performance coupe automotive photograph', label: 'View performance coupe image' },
  { src: img('interior-1.jpg'), alt: 'Red sports coupe automotive photograph', label: 'View red sports coupe image' },
]

/** Click-to-enlarge gallery; replaces the Elementor lightbox with a native one. */
export function GalleryGrid() {
  const [active, setActive] = useState<number | null>(null)
  const close = useCallback(() => setActive(null), [])
  const step = useCallback((d: number) => setActive((i) => (i === null ? i : (i + d + SHOTS.length) % SHOTS.length)), [])

  useEffect(() => {
    if (active === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [active, close, step])

  return (
    <section className="gallery chapter" id="gallery">
      <div className="container">
        <div className="kicker intro-label">04 / Visual Collection</div>
        <Reveal className="section-heading">
          <h2 className="serif">
            The beauty
            <br />
            <em>of obsession.</em>
          </h2>
          <p className="desc">Every line tells a story. Explore a world of remarkable cars, captured in light, texture and movement.</p>
        </Reveal>
        <div className="gallery-grid">
          {SHOTS.map((s, i) => (
            <a
              key={s.src}
              href={s.src}
              className={`shot shot-${i}`}
              aria-label={s.label}
              onClick={(e) => {
                e.preventDefault()
                setActive(i)
              }}
            >
              <img loading="lazy" src={s.src} alt={s.alt} />
              <span>
                VIEW / {String(i + 1).padStart(2, '0')} <ArrowIcon />
              </span>
            </a>
          ))}
        </div>
        <p className="image-disclaimer">A collection of automotive form, finish and craftsmanship.</p>
      </div>
      {active !== null && (
        <div className="lightbox open" role="dialog" aria-modal="true" aria-label="Image viewer" onClick={close}>
          <button className="closebox" type="button" onClick={close}>
            Close
          </button>
          <img src={SHOTS[active].src} alt={SHOTS[active].alt} onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </section>
  )
}
