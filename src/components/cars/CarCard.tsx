import { Link } from 'react-router-dom'
import { carAlt, type CarListing } from '../../data/cars'
import { useI18n } from '../../i18n'
import { ROUTES } from '../../data/site'
import { useCarFormat } from './useCarFormat'
import { DirArrow } from '../common/Icons'

/**
 * Image-led inventory card. The model name is the single link; its ::after stretches over the card, so the whole
 * card is clickable without nested interactive elements. The make is visual only (aria-hidden) and is read as part
 * of the link text instead.
 */
export function CarCard({ car, eager = false }: { car: CarListing; eager?: boolean }) {
  const { t } = useI18n()
  const fmt = useCarFormat()
  // Year and mileage belong to the individual car and are shown only when the owner has supplied them;
  // otherwise the card shows the verified engine and power.
  const own = [
    car.year ? { label: t('Year'), value: String(car.year) } : null,
    car.mileage != null ? { label: t('Mileage'), value: `${fmt.number(car.mileage)} ${t('km')}` } : null,
  ].filter((m): m is { label: string; value: string } => m !== null)
  const meta = own.length
    ? own
    : [
        car.engine ? { label: t('Engine'), value: car.engine } : null,
        car.power ? { label: t('Power'), value: car.power } : null,
      ].filter((m): m is { label: string; value: string } => m !== null)

  return (
    <article className={`car-card car-card--${car.status}`}>
      <div className="car-card__media">
        <img
          src={car.heroImage}
          alt={carAlt(car)}
          width={1200}
          height={800}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          style={car.imagePosition ? { objectPosition: car.imagePosition } : undefined}
        />
        <span className={`car-status car-status--${car.status}`}>{fmt.status(car.status)}</span>
      </div>
      <div className="car-card__body">
        <div className="car-card__top">
          <p className="car-card__make" aria-hidden="true">
            <bdi dir="ltr">{car.make}</bdi>
          </p>
          <h3 className="car-card__title">
            <Link to={`${ROUTES.cars}/${car.slug}`}>
              <span className="sr-only">{car.make} </span>
              <bdi dir="ltr">{car.model}</bdi>
            </Link>
          </h3>
          <p className="car-card__variant">{car.variant ? <bdi dir="ltr">{car.variant}</bdi> : '\u00a0'}</p>
        </div>
        <dl className="car-card__meta">
          {meta.map((m) => (
            <div key={m.label}>
              <dt className="sr-only">{m.label}</dt>
              <dd>
                <bdi dir="ltr">{m.value}</bdi>
              </dd>
            </div>
          ))}
        </dl>
        <div className="car-card__foot">
          <span className="car-card__cta" aria-hidden="true">
            {t('View Details')} <DirArrow dir="e" />
          </span>
        </div>
      </div>
    </article>
  )
}
