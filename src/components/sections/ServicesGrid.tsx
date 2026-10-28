import { Link } from 'react-router-dom'
import { ArrowIcon } from '../common/Icons'
import { Reveal } from '../common/Reveal'
import { HOME_SERVICE_CARDS } from '../../data/site'
import { useI18n } from '../../i18n'

export function ServicesGrid() {
  const { t } = useI18n()
  return (
    <section className="services chapter" id="services">
      <div className="container">
        <div className="kicker intro-label">{t('02 / Our Expertise')}</div>
        <Reveal className="section-heading">
          <h2 className="serif">
            {t('Crafted for')}
            <br />
            <em>{t('the exceptional.')}</em>
          </h2>
          <p className="desc">
            {t('Six disciplines. One uncompromising perspective. A tailored approach to the way your car looks, feels and expresses its character.')}
          </p>
        </Reveal>
        <div className="service-layout">
          {HOME_SERVICE_CARDS.map((s, i) => (
            <Link key={s.key} className={`service s${i}`} to={s.path}>
              <img loading="lazy" src={s.image} alt={t(s.alt)} />
              <span className="svc-index">{String(i + 1).padStart(2, '0')} / 06</span>
              <div className="svc-info">
                <span className="kicker">{t('Signature expertise')}</span>
                <h3>{t(s.title)}</h3>
                <p>{t(s.tagline)}</p>
              </div>
              <span className="round-arr">
                <ArrowIcon />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
