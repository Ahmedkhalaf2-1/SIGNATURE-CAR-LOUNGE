import { BMW_7_SERIES_F01 } from './vehicles/bmw7SeriesF01'
import { FERRARI_LAFERRARI_ELEMENT_6 } from './vehicles/ferrariLaFerrariElement6'
import { MERCEDES_G900_BRABUS } from './vehicles/mercedesG900Brabus'
import { MERCEDES_S65_W222 } from './vehicles/mercedesS65W222'
import { MERCEDES_W223_BRABUS_850 } from './vehicles/mercedesW223Brabus850'
import { PORSCHE_CARRERA_GT, type VehicleModelConfig } from './vehicleModelConfig'

/**
 * Every vehicle the visualizer offers. Adding a car = drop its GLB in /public/models, write its `VehicleModelConfig`
 * (see vehicles/), add a thumbnail under /public/assets/visualizer/ and add ONE entry below. The selection screen,
 * the `?vehicle=` URL, the loader and the summary all read from this list; nothing else needs touching.
 */
export interface VisualizerVehicle {
  /** URL-safe slug used in `/visualizer?vehicle=<id>`. Not the same as `config.id`. */
  id: string
  manufacturer: string
  /** Model name shown under the manufacturer, e.g. "Carrera GT". */
  name: string
  /** Optional small label, e.g. a generation or year. */
  label?: string
  /** Static preview (a rendered thumbnail), so the selection screen never needs a live 3D canvas. */
  previewImage?: string
  config: VehicleModelConfig
}

export const VISUALIZER_VEHICLES: readonly VisualizerVehicle[] = [
  {
    id: 'porsche-carrera-gt',
    manufacturer: 'Porsche',
    name: 'Carrera GT',
    label: '2004',
    previewImage: '/assets/visualizer/preview-porsche-carrera-gt.jpg',
    config: PORSCHE_CARRERA_GT,
  },
  {
    id: 'bmw-7-series-f01',
    manufacturer: 'BMW',
    name: '7 Series F01',
    previewImage: '/assets/visualizer/preview-bmw-7-series-f01.jpg',
    config: BMW_7_SERIES_F01,
  },
  {
    id: 'mercedes-s-class-w223-brabus-850',
    manufacturer: 'Mercedes-Benz',
    name: 'S-Class W223 Brabus 850',
    previewImage: '/assets/visualizer/preview-mercedes-s-class-w223-brabus-850.jpg',
    config: MERCEDES_W223_BRABUS_850,
  },
  {
    id: 'mercedes-s65-w222',
    manufacturer: 'Mercedes-Benz',
    name: 'S65 W222',
    previewImage: '/assets/visualizer/preview-mercedes-s65-w222.jpg',
    config: MERCEDES_S65_W222,
  },
  {
    id: 'mercedes-g900-brabus',
    manufacturer: 'Mercedes-AMG',
    name: 'G900 by Brabus',
    previewImage: '/assets/visualizer/preview-mercedes-g900-brabus.jpg',
    config: MERCEDES_G900_BRABUS,
  },
  {
    id: 'ferrari-laferrari-element-6',
    manufacturer: 'Ferrari',
    name: 'LaFerrari',
    previewImage: '/assets/visualizer/preview-ferrari-laferrari-element-6.jpg',
    config: FERRARI_LAFERRARI_ELEMENT_6,
  },
]

/** Resolves a `?vehicle=` value; unknown or missing ids return undefined (the selection screen is shown). */
export const getVisualizerVehicle = (id: string | null | undefined) => VISUALIZER_VEHICLES.find((v) => v.id === id)
