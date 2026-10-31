import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Seo } from '../components/common/Seo'
import { useI18n } from '../i18n'
import { VisualizerProvider } from '../visualizer/state/VisualizerContext'
import { VehicleSelector } from '../visualizer/ui/VehicleSelector'
import { VisualizerExperience } from '../visualizer/ui/VisualizerExperience'
import { getVisualizerVehicle, type VisualizerVehicle } from '../visualizer/vehicle/vehicleRegistry'
import '../styles/pages/visualizer.css'

/** `/visualizer` shows the vehicle selector; `/visualizer?vehicle=<id>` opens the configurator for that vehicle. */
export const VISUALIZER_VEHICLE_PARAM = 'vehicle'

export default function VisualizerPage() {
  const { t } = useI18n()
  const [params, setParams] = useSearchParams()
  const vehicle = getVisualizerVehicle(params.get(VISUALIZER_VEHICLE_PARAM))

  const select = useCallback((v: VisualizerVehicle) => setParams({ [VISUALIZER_VEHICLE_PARAM]: v.id }), [setParams])
  const change = useCallback(() => setParams({}), [setParams])

  return (
    <div className="pg-viz">
      <Seo
        title={t('Visualizer – Signature Car Lounge')}
        description={t('Preview paint protection film, wraps, ceramic coating and window tint on a vehicle in our detailing studio.')}
      />
      <main>
        <h1 className="sr-only">{t('Visualizer')}</h1>
        {vehicle ? (
          // Keyed by vehicle: switching cars remounts the provider, so no treatment state carries across models.
          <VisualizerProvider key={vehicle.id} vehicle={{ id: vehicle.config.id, name: vehicle.config.displayName }}>
            <VisualizerExperience vehicle={vehicle} onChangeVehicle={change} />
          </VisualizerProvider>
        ) : (
          <VehicleSelector onSelect={select} />
        )}
      </main>
    </div>
  )
}
