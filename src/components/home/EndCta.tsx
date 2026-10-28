import { Link } from 'react-router-dom'
import { ArrowIcon } from '../common/Icons'
import { Reveal } from '../common/Reveal'
import { IMAGES } from '../../lib/assets'
import { ROUTES } from '../../data/site'
import { useI18n } from '../../i18n'

export function EndCta() {
  const { t } = useI18n()
  return (
    <section className="end" id="contact">
      <img src={IMAGES.end} alt={t('Luxury supercar in dramatic dark studio')} />
      <div className="container">
        <Reveal className="kicker intro-label">{t('Your next chapter begins here')}</Reveal>
        <Reveal as="h2" className="serif">
          {t('Your car.')}
          <br />
          {t('Your vision.')}
          <br />
          <em>{t('Our signature.')}</em>
        </Reveal>
        <Reveal as="p">{t('Exceptional cars deserve extraordinary attention.')}</Reveal>
        <Reveal className="hero-buttons">
          <Link className="cta" to={ROUTES.booking}>
            {t('Plan your consultation')} <ArrowIcon />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
