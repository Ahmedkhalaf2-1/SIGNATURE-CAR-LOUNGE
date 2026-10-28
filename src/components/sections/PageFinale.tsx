import { Link } from 'react-router-dom'
import { PageArrowIcon } from '../common/Icons'
import { ROUTES } from '../../data/site'

/** Closing call-to-action shared by the interior pages. */
export function PageFinale() {
  return (
    <section className="scl-page-finale">
      <div className="scl-page-wrap">
        <div className="scl-page-kicker">YOUR CAR. YOUR SIGNATURE.</div>
        <h2>
          Let’s start with <em>your vision.</em>
        </h2>
        <Link className="scl-page-cta" to={ROUTES.booking}>
          Plan your consultation
          <PageArrowIcon />
        </Link>
      </div>
    </section>
  )
}
