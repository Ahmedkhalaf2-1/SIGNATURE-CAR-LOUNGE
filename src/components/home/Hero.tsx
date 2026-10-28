import { ArrowIcon, DownArrowIcon } from '../common/Icons'
import { Reveal } from '../common/Reveal'
import { IMAGES } from '../../lib/assets'

export function Hero() {
  return (
    <section className="hero" id="top">
      <img src={IMAGES.hero} alt="Luxury performance car in cinematic studio" />
      <span className="hero-side">Automotive artistry / Since the beginning</span>
      <div className="container hero-content">
        <Reveal className="kicker intro-label">Signature Car Lounge / Automotive Atelier</Reveal>
        <Reveal as="h1" className="serif">
          Not just care.
          <br />
          <em>A statement.</em>
        </Reveal>
        <Reveal as="p" className="hero-p">
          A considered world of automotive detailing, protection and individual expression. Every surface. Every sensation. Unmistakably Signature.
        </Reveal>
        <Reveal className="hero-buttons">
          <a href="#services" className="cta">
            Discover our expertise <ArrowIcon />
          </a>
          <a href="#contact" className="cta outline">
            Private consultation <ArrowIcon />
          </a>
        </Reveal>
      </div>
      <div className="hero-foot">
        <div className="scrollhint">
          <span>
            <DownArrowIcon />
          </span>{' '}
          SCROLL TO DISCOVER
        </div>
        <div className="right">FORM &nbsp; / &nbsp; FINISH &nbsp; / &nbsp; FEELING</div>
      </div>
    </section>
  )
}
