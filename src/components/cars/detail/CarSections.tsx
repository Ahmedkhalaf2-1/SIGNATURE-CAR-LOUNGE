import type { CarListing } from '../../../data/cars'
import { useI18n } from '../../../i18n'
import type { SpecItem } from './useCarSpecs'

export function AboutSection({ car }: { car: CarListing }) {
  const { t } = useI18n()
  const paragraphs = car.description.split(/\n{2,}/).filter(Boolean)
  if (!paragraphs.length) return null
  return (
    <section className="cd-section cd-about" aria-labelledby="cd-about-title">
      <div className="cd-wrap cd-split">
        <h2 id="cd-about-title" className="cd-h2">
          {t('About this vehicle')}
        </h2>
        <div className="cd-prose">
          {paragraphs.map((p) => (
            <p key={p}>{t(p)}</p>
          ))}
        </div>
      </div>
    </section>
  )
}

export function SpecTable({ rows }: { rows: SpecItem[] }) {
  const { t } = useI18n()
  return (
    <section className="cd-section" aria-labelledby="cd-specs-title">
      <div className="cd-wrap cd-split">
        <h2 id="cd-specs-title" className="cd-h2">
          {t('Vehicle specifications')}
        </h2>
        <dl className="cd-table">
          {rows.map((r) => (
            <div key={r.key}>
              <dt>{r.label}</dt>
              <dd>
                <bdi dir="ltr">
                  {r.value}
                  {r.unit && ` ${r.unit}`}
                </bdi>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

export function HighlightsSection({ items }: { items?: string[] }) {
  const { t } = useI18n()
  if (!items?.length) return null
  return (
    <section className="cd-section" aria-labelledby="cd-high-title">
      <div className="cd-wrap cd-split">
        <h2 id="cd-high-title" className="cd-h2">
          {t('Highlights')}
        </h2>
        <ul className="cd-highlights">
          {items.map((h) => (
            <li key={h}>{t(h)}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/** Mobile-only bar that keeps the enquiry action in reach (CSS hides it on larger screens). */
export function StickyBar() {
  const { t } = useI18n()
  return (
    <div className="cd-sticky">
      <a className="car-btn" href="#enquire">
        {t('Enquire About This Vehicle')}
      </a>
    </div>
  )
}
