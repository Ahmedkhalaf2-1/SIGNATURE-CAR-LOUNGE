import { useMemo, useState } from 'react'
import { Seo } from '../components/common/Seo'
import { CarCard } from '../components/cars/CarCard'
import { CarToolbar } from '../components/cars/CarToolbar'
import { DEFAULT_FILTERS, queryCars, type CarFilters, type CarView } from '../components/cars/carQuery'
import { getCars } from '../data/cars'
import { useI18n } from '../i18n'
import '../styles/pages/cars.css'

const VIEW_KEY = 'scl-cars-view'
const readView = (): CarView => {
  try {
    const v = sessionStorage.getItem(VIEW_KEY)
    if (v === 'large' || v === 'standard' || v === 'list') return v
  } catch {
    /* storage unavailable */
  }
  // Phones start on one large card per row; larger screens start on the 3-column grid.
  return window.matchMedia('(max-width: 640px)').matches ? 'large' : 'standard'
}

export default function CarsForSalePage() {
  const { t } = useI18n()
  const cars = getCars()
  const [filters, setFilters] = useState<CarFilters>(DEFAULT_FILTERS)
  const [view, setView] = useState<CarView>(readView)
  const changeView = (v: CarView) => {
    setView(v)
    try {
      sessionStorage.setItem(VIEW_KEY, v)
    } catch {
      /* ignore */
    }
  }
  const results = useMemo(() => queryCars(cars, filters), [cars, filters])

  return (
    <div className="pg-cars">
      <Seo
        title={t('Cars for Sale – Signature Car Lounge')}
        description={t('A curated selection of distinctive performance and luxury vehicles.')}
      />
      <main>
        <section className="cars-hero">
          <div className="cars-hero__media" aria-hidden="true">
            <img src="/assets/images/hero-banner.jpg" alt="" width={1536} height={1024} loading="eager" fetchPriority="high" decoding="async" />
          </div>
          <div className="cars-wrap cars-hero__copy">
            <div className="cars-kicker">{t('PREMIUM VEHICLES')}</div>
            <h1>{t('Cars for Sale')}</h1>
            <span className="cars-hero__rule" aria-hidden="true" />
            <p className="cars-lede">{t('A curated selection of distinctive performance and luxury vehicles.')}</p>
          </div>
        </section>

        <section className="cars-browse" aria-labelledby="cars-browse-title">
          <div className="cars-wrap">
            <h2 id="cars-browse-title" className="sr-only">
              {t('Browse vehicles')}
            </h2>
            <CarToolbar
              cars={cars}
              filters={filters}
              resultCount={results.length}
              view={view}
              onViewChange={changeView}
              onChange={(patch) => setFilters((f) => ({ ...f, ...patch }))}
              onClear={() => setFilters((f) => ({ ...DEFAULT_FILTERS, sort: f.sort }))}
            />

            {results.length ? (
              <ul className={`car-grid car-grid--${view}`}>
                {results.map((car, i) => (
                  <li key={car.slug}>
                    <CarCard car={car} eager={i < 3} />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="car-empty">
                <p>{t('No vehicles match your current filters.')}</p>
                <button type="button" className="car-btn" onClick={() => setFilters((f) => ({ ...DEFAULT_FILTERS, sort: f.sort }))}>
                  {t('Clear filters')}
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
