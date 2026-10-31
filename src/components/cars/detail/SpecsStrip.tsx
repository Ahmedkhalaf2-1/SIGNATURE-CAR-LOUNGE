import { useI18n } from '../../../i18n'
import type { SpecItem } from './useCarSpecs'
import { SpecIcon } from './SpecIcons'
import { DirArrow } from '../../common/Icons'

/** Icon spec row plus the two primary actions. Values are isolated left-to-right so units stay attached in Arabic. */
export function SpecsStrip({ items }: { items: SpecItem[] }) {
  const { t } = useI18n()
  return (
    <section className="cd-strip" aria-label={t('Key specifications')}>
      {items.length > 0 && (
        <dl className="cd-wrap cd-strip__grid" style={{ ['--cols' as string]: Math.min(items.length, 6) }}>
          {items.map((s) => (
            <div key={s.key} className="cd-strip__item">
              <SpecIcon name={s.key} />
              <dt>{s.label}</dt>
              <dd>
                <bdi dir="ltr">
                  <span className="cd-strip__value">{s.value}</span>
                  {s.unit && <span className="cd-strip__unit"> {s.unit}</span>}
                </bdi>
              </dd>
            </div>
          ))}
        </dl>
      )}
      <div className="cd-wrap cd-actions">
        <a className="car-btn" href="#enquire">
          {t('Enquire About This Vehicle')} <DirArrow dir="e" />
        </a>
        <a className="car-btn car-btn--ghost" href="#details">
          {t('View Full Details')} <DirArrow dir="e" />
        </a>
      </div>
    </section>
  )
}
