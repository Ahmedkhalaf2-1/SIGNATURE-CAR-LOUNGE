import { ArrowIcon } from '../common/Icons'
import { Reveal } from '../common/Reveal'
import { IMAGES } from '../../lib/assets'

export function Philosophy() {
  return (
    <section className="philosophy chapter" id="philosophy">
      <div className="container philosophy-grid">
        <Reveal>
          <div className="kicker intro-label">01 / Signature Philosophy</div>
          <h2 className="serif">
            An obsession
            <br />
            with <em>detail.</em>
          </h2>
          <p>
            Great automotive care is never ordinary. It is the interplay of form, craftsmanship and an instinct for the finer things. We treat each vehicle as a singular expression of its owner.
          </p>
          <a className="underline-link" href="#difference">
            Explore our philosophy{' '}
            <span>
              <ArrowIcon />
            </span>
          </a>
        </Reveal>
        <Reveal className="editorial-images">
          <img className="one" src={IMAGES.ppf} alt="Detailed luxury vehicle craftsmanship" />
          <img className="two" src={IMAGES.wheel} alt="Performance wheel close-up" />
          <span className="picture-note">The pursuit of perfection / 01</span>
        </Reveal>
      </div>
    </section>
  )
}
