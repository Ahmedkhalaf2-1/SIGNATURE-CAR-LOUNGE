import { ArrowIcon, DownArrowIcon } from '../common/Icons'
import { Reveal } from '../common/Reveal'
import { IMAGES } from '../../lib/assets'
import { useI18n } from '../../i18n'

export function Hero() {
  const { t } = useI18n()
  return (
    <section className="hero" id="top">
      <img src={IMAGES.hero} alt={t('Luxury performance car in cinematic studio')} />
      <span className="hero-side">{t('Automotive artistry / Since the beginning')}</span>
      <div className="container hero-content">
        <Reveal className="kicker intro-label">{t('Signature Car Lounge / Automotive Atelier')}</Reveal>
        <Reveal as="h1" className="serif">
          {t('Not just care.')}
          <br />
          <em>{t('A statement.')}</em>
        </Reveal>
        <Reveal as="p" className="hero-p">
          {t('A considered world of automotive detailing, protection and individual expression. Every surface. Every sensation. Unmistakably Signature.')}
        </Reveal>
        <Reveal className="hero-buttons">
          <a href="#services" className="cta">
            {t('Discover our expertise')} <ArrowIcon />
          </a>
          <a href="#contact" className="cta outline">
            {t('Private consultation')} <ArrowIcon />
          </a>
        </Reveal>
      </div>
      <div className="hero-foot">
        <div className="scrollhint">
          <span>
            <DownArrowIcon />
          </span>{' '}
          {t('SCROLL TO DISCOVER')}
        </div>
        <div className="right">{['FORM', 'FINISH', 'FEELING'].map((w) => t(w)).join(' \u00a0 / \u00a0 ')}</div>
      </div>
    </section>
  )
}
