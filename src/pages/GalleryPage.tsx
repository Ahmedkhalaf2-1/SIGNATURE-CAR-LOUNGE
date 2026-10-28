import { Link } from 'react-router-dom'
import { Seo } from '../components/common/Seo'
import { img } from '../lib/assets'
import { PageArrowIcon } from '../components/common/Icons'
import { GalleryCollection } from '../components/sections/GalleryCollection'
import { NativeFinale } from '../components/sections/NativeFinale'
import { ROUTES } from '../data/site'
import '../styles/pages/gallery.css'

function PageHero() {
  return (
    <section className="scl-page-hero">
      <div className="scl-page-wrap scl-page-split">
        <div>
          <div className="scl-page-kicker">THE VISUAL COLLECTION</div>
          <h1>
            The detail.
            <br />
            The <em>distinction.</em>
          </h1>
          <p className="scl-page-copy">
            Explore automotive form, finish and character. A collection of visual inspiration for your next conversation.
          </p>
          <Link to="/signature-gallery/#collection" className="scl-page-cta">
            Explore the collection
            <PageArrowIcon />
          </Link>
        </div>
        <figure>
          <img src={img('hero-banner.jpg')} alt="Signature luxury automotive craftsmanship" />
          <figcaption className="scl-page-meta">FORM. FINISH. FEELING. / SIGNATURE CAR LOUNGE</figcaption>
        </figure>
      </div>
    </section>
  )
}

export default function GalleryPage() {
  return (
    <div className="pg-gallery">
      <Seo title="Gallery – Signature Car Lounge" />
      <main id="scl-gallery-page" className="scl-interior">
        <PageHero />
      </main>
      <GalleryCollection />
      <NativeFinale variant="panel" to={ROUTES.booking} label="Plan your consultation ↗" />
    </div>
  )
}
