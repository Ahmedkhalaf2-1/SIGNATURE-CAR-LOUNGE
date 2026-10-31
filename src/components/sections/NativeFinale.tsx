import { Link } from 'react-router-dom'
import './NativeFinale.css'
import { useI18n } from '../../i18n'
import { DirArrow } from '../common/Icons'

interface NativeFinaleProps {
  /** `panel` = bordered gradient card (gallery); `plain` = flat band (booking). */
  variant: 'panel' | 'plain'
  to: string
  label: string
}

/** Closing CTA that the captured gallery and booking pages build from native Elementor widgets. */
export function NativeFinale({ variant, to, label }: NativeFinaleProps) {
  const { t } = useI18n()
  return (
    <section className={`native-finale native-finale--${variant}`}>
      <div className="native-finale__inner">
        <div className="native-finale__kicker">{t('YOUR CAR. YOUR SIGNATURE.')}</div>
        <h2>
          {t('Let’s start with')} <em>{t('your vision.')}</em>
        </h2>
        <Link className="scl-page-cta native-finale__cta" to={to}>
          <span>
            {t(label)} <DirArrow dir="ne" />
          </span>
        </Link>
      </div>
    </section>
  )
}
