import { ArrowIcon } from '../common/Icons'
import { Reveal } from '../common/Reveal'
import { IMAGES } from '../../lib/assets'
import { useI18n } from '../../i18n'

export function Philosophy() {
  const { t } = useI18n()
  return (
    <section className="philosophy chapter" id="philosophy">
      <div className="container philosophy-grid">
        <Reveal>
          <div className="kicker intro-label">{t('Philosophy')}</div>
          <h2 className="serif">
            {t('An obsession')}
            <br />
            {t('with')} <em>{t('detail.')}</em>
          </h2>
          <p>
            {t('Great automotive care is never ordinary. It is the interplay of form, craftsmanship and an instinct for the finer things. We treat each vehicle as a singular expression of its owner.')}
          </p>
          <a className="underline-link" href="#difference">
            {t('Explore our philosophy')}{' '}
            <span>
              <ArrowIcon />
            </span>
          </a>
        </Reveal>
        <Reveal className="editorial-images">
          <img className="one" src={IMAGES.ppf} alt={t('Detailed luxury vehicle craftsmanship')} />
          <img className="two" src={IMAGES.wheel} alt={t('Performance wheel close-up')} />
          <span className="picture-note">{t('The pursuit of perfection / 01')}</span>
        </Reveal>
      </div>
    </section>
  )
}
