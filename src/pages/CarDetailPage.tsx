import { Link, useParams } from 'react-router-dom'
import { Seo } from '../components/common/Seo'
import { CarShowcase } from '../components/cars/detail/CarShowcase'
import { SpecsStrip } from '../components/cars/detail/SpecsStrip'
import { CarInquiryForm } from '../components/cars/detail/CarInquiryForm'
import { AboutSection, HighlightsSection, SpecTable, StickyBar } from '../components/cars/detail/CarSections'
import { useCarSpecs } from '../components/cars/detail/useCarSpecs'
import { carAlt, carTitle, getCarBySlug, type CarListing } from '../data/cars'
import { ROUTES } from '../data/site'
import { useI18n } from '../i18n'
import '../styles/pages/cars.css'
import '../styles/pages/car-detail.css'

function NotFound() {
  const { t } = useI18n()
  return (
    <div className="pg-cars pg-car-detail">
      <Seo title={`${t('Vehicle not found')} | Signature Car Lounge`} />
      <main className="cd-wrap cd-notfound">
        <h1 className="cd-h2">{t('Vehicle not found')}</h1>
        <p>{t('This vehicle is no longer listed or the link is incorrect.')}</p>
        <Link className="car-btn" to={ROUTES.cars}>
          {t('Back to Cars for Sale')}
        </Link>
      </main>
    </div>
  )
}

function CarDetail({ car }: { car: CarListing }) {
  const { t } = useI18n()
  const { strip, table } = useCarSpecs(car)
  // Only verified facts: identity, and the engine/power when known. Never a price or condition claim.
  const description = [carTitle(car), car.year, car.engine, car.power, t('Enquire with Signature Car Lounge.')]
    .filter(Boolean)
    .join(' · ')

  return (
    <div className="pg-cars pg-car-detail">
      <Seo title={`${carAlt(car)} | Signature Car Lounge`} description={description} image={car.heroImage} />
      <main>
        <CarShowcase car={car} />
        <SpecsStrip items={strip} />
        <div id="details">
          <AboutSection car={car} />
          <SpecTable rows={table} />
          <HighlightsSection items={car.highlights} />
        </div>
        <CarInquiryForm car={car} />
      </main>
      <StickyBar />
    </div>
  )
}

export default function CarDetailPage() {
  const { slug = '' } = useParams()
  const car = getCarBySlug(slug)
  return car ? <CarDetail key={car.slug} car={car} /> : <NotFound />
}
