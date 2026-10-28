import { Link } from 'react-router-dom'
import { ArrowIcon } from '../common/Icons'
import { Reveal } from '../common/Reveal'
import { IMAGES } from '../../lib/assets'
import { ROUTES } from '../../data/site'

export function EndCta() {
  return (
    <section className="end" id="contact">
      <img src={IMAGES.end} alt="Luxury supercar in dramatic dark studio" />
      <div className="container">
        <Reveal className="kicker intro-label">Your next chapter begins here</Reveal>
        <Reveal as="h2" className="serif">
          Your car.
          <br />
          Your vision.
          <br />
          <em>Our signature.</em>
        </Reveal>
        <Reveal as="p">Exceptional cars deserve extraordinary attention.</Reveal>
        <Reveal className="hero-buttons">
          <Link className="cta" to={ROUTES.booking}>
            Plan your consultation <ArrowIcon />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
