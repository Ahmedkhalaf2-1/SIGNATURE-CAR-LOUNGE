import { Link } from 'react-router-dom'
import { PageArrowIcon } from '../common/Icons'
import { ROUTES } from '../../data/site'
import { useI18n } from '../../i18n'

/** Closing call-to-action shared by the interior pages. */
export function PageFinale() {
  const { t } = useI18n()
  return (
    <section className="scl-page-finale">
      <div className="scl-page-wrap">
        <div className="scl-page-kicker">{t('YOUR CAR. YOUR SIGNATURE.')}</div>
        <h2>
          {t('Let’s start with')} <em>{t('your vision.')}</em>
        </h2>
        <Link className="scl-page-cta" to={ROUTES.booking}>
          {t('Plan your consultation')}
          <PageArrowIcon />
        </Link>
      </div>
    </section>
  )
}
