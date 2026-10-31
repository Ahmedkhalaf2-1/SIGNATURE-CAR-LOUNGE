import { useEffect, useRef, useState } from 'react'
import { useI18n } from '../../i18n'
import { DirArrow } from '../../components/common/Icons'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { VISUALIZER_VEHICLES, type VisualizerVehicle } from '../vehicle/vehicleRegistry'
import { LoadingScreen } from './StatusScreens'
import '../../styles/pages/visualizer-select.css'

/** How long the selected card's hand-off plays before the configurator mounts (it has its own loader, so this stays short). */
const HANDOFF_MS = 520

/**
 * First screen of /visualizer. Pure HTML/CSS with static preview images: it never mounts three.js or downloads a GLB,
 * so choosing is instant and only the selected vehicle's model is fetched afterwards.
 */
export function VehicleSelector({ onSelect }: { onSelect: (vehicle: VisualizerVehicle) => void }) {
  const { t } = useI18n()
  const reduced = useReducedMotion()
  const [picked, setPicked] = useState<VisualizerVehicle | null>(null)
  const timer = useRef<number>(0)
  useEffect(() => () => window.clearTimeout(timer.current), [])

  const choose = (v: VisualizerVehicle) => {
    if (picked) return
    setPicked(v)
    // Reduced motion skips the hand-off entirely.
    timer.current = window.setTimeout(() => onSelect(v), reduced ? 0 : HANDOFF_MS)
  }

  return (
    <section className={`viz-select${picked ? ' is-leaving' : ''}`} aria-labelledby="viz-select-title">
      <div className="viz-select__head">
        <p className="viz-eyebrow">{t('Visualizer')}</p>
        <h2 id="viz-select-title" className="viz-select__title">
          {t('Choose Your Vehicle')}
        </h2>
        <p className="viz-select__sub">{t('Select a vehicle to begin your configuration.')}</p>
      </div>
      <ul className="viz-select__grid">
        {VISUALIZER_VEHICLES.map((v, i) => (
          <li key={v.id} style={{ '--i': i } as React.CSSProperties}>
            <button
              type="button"
              className={`viz-car${picked?.id === v.id ? ' is-picked' : ''}`}
              onClick={() => choose(v)}
              aria-label={`${t('Select Vehicle')}: ${v.manufacturer} ${v.name}`}
              aria-busy={picked?.id === v.id}
            >
              <span className="viz-car__preview" aria-hidden="true">
                {v.previewImage && <img src={v.previewImage} alt="" width={960} height={600} loading={i < 3 ? 'eager' : 'lazy'} decoding="async" />}
              </span>
              <span className="viz-car__meta">
                <span className="viz-car__make">{v.manufacturer}</span>
                <span className="viz-car__name">{v.name}</span>
                {(v.label || v.category) && (
                  <span className="viz-car__label">
                    {[v.label, v.category && t(v.category)].filter(Boolean).join('  ·  ')}
                  </span>
                )}
              </span>
              <span className="viz-car__cta">
                <span>{t('Select Vehicle')}</span>
                <DirArrow dir="e" />
              </span>
            </button>
          </li>
        ))}
      </ul>
      {picked && <LoadingScreen overlay done={false} vehicleName={`${picked.manufacturer} ${picked.name}`} />}
    </section>
  )
}
