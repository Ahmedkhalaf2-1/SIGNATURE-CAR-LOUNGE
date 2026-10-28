import { ArrowIcon } from '../common/Icons'
import { Reveal } from '../common/Reveal'
import { IMAGES } from '../../lib/assets'

const BENEFITS = ['Protect its presence.', 'Refine its character.', 'Make it individual.']

export function Difference() {
  return (
    <section className="difference chapter" id="difference">
      <div className="container diff-grid">
        <Reveal>
          <div className="kicker intro-label">05 / The Signature Difference</div>
          <h2 className="serif">
            The smallest
            <br />
            details. <em>The
            <br />
            greatest impact.</em>
          </h2>
          <p className="diff-lead">
            Some details are seen. Others are felt. We believe true refinement is the thoughtful balance of preservation, precision and personal expression.
          </p>
          {BENEFITS.map((b, i) => (
            <div className="benefit" key={b}>
              <strong>{b}</strong>
              <span>
                {String(i + 1).padStart(2, '0')} <ArrowIcon />
              </span>
            </div>
          ))}
        </Reveal>
        <Reveal className="diff-visual">
          <img className="main" src={IMAGES.bodyKits} alt="Luxury sports car precision detailing" />
          <img className="detail" src={IMAGES.spa} alt="Luxury car interior care" />
          <span className="vert">Precisely considered. Beautifully executed.</span>
        </Reveal>
      </div>
    </section>
  )
}
