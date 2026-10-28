import { Link } from 'react-router-dom'
import { ArrowIcon } from '../common/Icons'
import { Reveal } from '../common/Reveal'
import { HOME_SERVICE_CARDS } from '../../data/site'

export function ServicesGrid() {
  return (
    <section className="services chapter" id="services">
      <div className="container">
        <div className="kicker intro-label">02 / Our Expertise</div>
        <Reveal className="section-heading">
          <h2 className="serif">
            Crafted for
            <br />
            <em>the exceptional.</em>
          </h2>
          <p className="desc">
            Six disciplines. One uncompromising perspective. A tailored approach to the way your car looks, feels and expresses its character.
          </p>
        </Reveal>
        <div className="service-layout">
          {HOME_SERVICE_CARDS.map((s, i) => (
            <Link key={s.key} className={`service s${i}`} to={s.path}>
              <img loading="lazy" src={s.image} alt={s.alt} />
              <span className="svc-index">{String(i + 1).padStart(2, '0')} / 06</span>
              <div className="svc-info">
                <span className="kicker">Signature expertise</span>
                <h3>{s.title}</h3>
                <p>{s.tagline}</p>
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
