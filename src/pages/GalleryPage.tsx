import { Link } from 'react-router-dom'
import { Seo } from '../components/common/Seo'
import { img } from '../lib/assets'
import { PageArrowIcon } from '../components/common/Icons'
import { GalleryCollection } from '../components/sections/GalleryCollection'
import { NativeFinale } from '../components/sections/NativeFinale'
import { ROUTES } from '../data/site'
import { useI18n } from '../i18n'
import '../styles/pages/gallery.css'

function PageHero() {
  const { t } = useI18n()
  return (
    <section className="scl-page-hero">
      <div className="scl-page-wrap scl-page-split">
        <div>
          <div className="scl-page-kicker">{t('THE VISUAL COLLECTION')}</div>
          <h1>
            {t('The detail.')}
            <br />
            {t('The')} <em>{t('distinction.')}</em>
          </h1>
          <p className="scl-page-copy">
            {t('Explore automotive form, finish and character. A collection of visual inspiration for your next conversation.')}
          </p>
          <Link to="/signature-gallery/#collection" className="scl-page-cta">
            {t('Explore the collection')}
            <PageArrowIcon />
          </Link>
        </div>
        <figure>
          <img src={img('hero-banner.jpg')} alt={t('Signature luxury automotive craftsmanship')} />
          <figcaption className="scl-page-meta">{t('FORM. FINISH. FEELING. / SIGNATURE CAR LOUNGE')}</figcaption>
        </figure>
      </div>
    </section>
  )
}

export default function GalleryPage() {
  const { t } = useI18n()
  return (
    <div className="pg-gallery">
      <Seo title={t('Gallery – Signature Car Lounge')} />
      <main id="scl-gallery-page" className="scl-interior">
        <PageHero />
      </main>
      <GalleryCollection />
      <NativeFinale variant="panel" to={ROUTES.booking} label="Plan your consultation" />
    </div>
  )
}
