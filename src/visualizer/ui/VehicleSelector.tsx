import { useI18n } from '../../i18n'
import { DirArrow } from '../../components/common/Icons'
import { VISUALIZER_VEHICLES, type VisualizerVehicle } from '../vehicle/vehicleRegistry'

/**
 * First screen of /visualizer. Pure HTML/CSS with static preview images: it never mounts three.js or downloads a GLB,
 * so choosing is instant and only the selected vehicle's model is fetched afterwards.
 */
export function VehicleSelector({ onSelect }: { onSelect: (vehicle: VisualizerVehicle) => void }) {
  const { t } = useI18n()
  return (
    <section className="viz-select" aria-labelledby="viz-select-title">
      <div className="viz-select__head">
        <p className="viz-eyebrow">{t('Visualizer')}</p>
        <h2 id="viz-select-title" className="viz-select__title">
          {t('Choose Your Vehicle')}
        </h2>
        <p className="viz-select__sub">{t('Select a vehicle to begin your configuration.')}</p>
      </div>
      <ul className="viz-select__grid">
        {VISUALIZER_VEHICLES.map((v) => (
          <li key={v.id}>
            <button type="button" className="viz-car" onClick={() => onSelect(v)} aria-label={`${t('Select Vehicle')}: ${v.manufacturer} ${v.name}`}>
              <span className="viz-car__preview" aria-hidden="true">
                {v.previewImage && <img src={v.previewImage} alt="" width={960} height={600} loading="lazy" decoding="async" />}
              </span>
              <span className="viz-car__meta">
                <span className="viz-car__make">{v.manufacturer}</span>
                <span className="viz-car__name">{v.name}</span>
                {v.label && <span className="viz-car__label">{v.label}</span>}
              </span>
              <span className="viz-car__cta">
                {t('Select Vehicle')}
                <DirArrow dir="e" />
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
