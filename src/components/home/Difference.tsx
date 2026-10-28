import { ArrowIcon } from '../common/Icons'
import { Reveal } from '../common/Reveal'
import { IMAGES } from '../../lib/assets'
import { useI18n } from '../../i18n'

const BENEFITS = ['Protect its presence.', 'Refine its character.', 'Make it individual.']

export function Difference() {
  const { t } = useI18n()
  return (
    <section className="difference chapter" id="difference">
      <div className="container diff-grid">
        <Reveal>
          <div className="kicker intro-label">{t('05 / The Signature Difference')}</div>
          <h2 className="serif">
            {t('The smallest')}
            <br />
            {t('details.')} <em>{t('The')}
            <br />
            {t('greatest impact.')}</em>
          </h2>
          <p className="diff-lead">
            {t('Some details are seen. Others are felt. We believe true refinement is the thoughtful balance of preservation, precision and personal expression.')}
          </p>
          {BENEFITS.map((b, i) => (
            <div className="benefit" key={b}>
              <strong>{t(b)}</strong>
              <span>
                {String(i + 1).padStart(2, '0')} <ArrowIcon />
              </span>
            </div>
          ))}
        </Reveal>
        <Reveal className="diff-visual">
          <img className="main" src={IMAGES.bodyKits} alt={t('Luxury sports car precision detailing')} />
          <img className="detail" src={IMAGES.spa} alt={t('Luxury car interior care')} />
          <span className="vert">{t('Precisely considered. Beautifully executed.')}</span>
        </Reveal>
      </div>
    </section>
  )
}
