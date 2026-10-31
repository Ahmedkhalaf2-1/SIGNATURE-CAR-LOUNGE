import { BMW_M4_COMPETITION } from './vehicles/bmwM4Competition'
import { BUGATTI_TOURBILLON, GMC_HUMMER_EV, MCLAREN_W1, MERCEDES_A45_S_AMG, PAGANI_HUAYRA_R_EVO, PORSCHE_918_SPYDER } from './vehicles/ddiazSupercars'
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
  /** Optional body/segment label shown small on the selector card. */
  category?: string
  /** Static preview (a rendered thumbnail), so the selection screen never needs a live 3D canvas. */
  previewImage?: string
  config: VehicleModelConfig
}

export const VISUALIZER_VEHICLES: readonly VisualizerVehicle[] = [
  {
    id: 'porsche-carrera-gt',
    category: 'Supercar',
    manufacturer: 'Porsche',
    name: 'Carrera GT',
    label: '2004',
    previewImage: '/assets/visualizer/preview-porsche-carrera-gt.jpg',
    config: PORSCHE_CARRERA_GT,
  },
  {
    id: 'bmw-7-series-f01',
    category: 'Executive Saloon',
    manufacturer: 'BMW',
    name: '7 Series F01',
    previewImage: '/assets/visualizer/preview-bmw-7-series-f01.jpg',
    config: BMW_7_SERIES_F01,
  },
  {
    id: 'mercedes-s-class-w223-brabus-850',
    category: 'Luxury Saloon',
    manufacturer: 'Mercedes-Benz',
    name: 'S-Class W223 Brabus 850',
    previewImage: '/assets/visualizer/preview-mercedes-s-class-w223-brabus-850.jpg',
    config: MERCEDES_W223_BRABUS_850,
  },
  {
    id: 'mercedes-s65-w222',
    category: 'Luxury Saloon',
    manufacturer: 'Mercedes-Benz',
    name: 'S65 W222',
    previewImage: '/assets/visualizer/preview-mercedes-s65-w222.jpg',
    config: MERCEDES_S65_W222,
  },
  {
    id: 'mercedes-g900-brabus',
    category: 'Luxury SUV',
    manufacturer: 'Mercedes-AMG',
    name: 'G900 by Brabus',
    previewImage: '/assets/visualizer/preview-mercedes-g900-brabus.jpg',
    config: MERCEDES_G900_BRABUS,
  },
  {
    id: 'ferrari-laferrari-element-6',
    category: 'Hypercar',
    manufacturer: 'Ferrari',
    name: 'LaFerrari',
    previewImage: '/assets/visualizer/preview-ferrari-laferrari-element-6.jpg',
    config: FERRARI_LAFERRARI_ELEMENT_6,
  },
  {
    id: 'bmw-m4-competition',
    category: 'Performance Coupé',
    manufacturer: 'BMW',
    name: 'M4 Competition',
    label: '2025',
    previewImage: '/assets/visualizer/preview-bmw-m4-competition.jpg',
    config: BMW_M4_COMPETITION,
  },
  {
    id: 'bugatti-tourbillon',
    category: 'Hypercar',
    manufacturer: 'Bugatti',
    name: 'Tourbillon',
    label: '2026',
    previewImage: '/assets/visualizer/preview-bugatti-tourbillon.jpg',
    config: BUGATTI_TOURBILLON,
  },
  {
    id: 'pagani-huayra-r-evo-roadster',
    category: 'Hypercar',
    manufacturer: 'Pagani',
    name: 'Huayra R Evo Roadster',
    label: '2025',
    previewImage: '/assets/visualizer/preview-pagani-huayra-r-evo-roadster.jpg',
    config: PAGANI_HUAYRA_R_EVO,
  },
  {
    id: 'mercedes-a45-s-amg',
    category: 'Hot Hatchback',
    manufacturer: 'Mercedes-AMG',
    name: 'A45 S 4MATIC',
    label: '2023',
    previewImage: '/assets/visualizer/preview-mercedes-a45-s-amg.jpg',
    config: MERCEDES_A45_S_AMG,
  },
  {
    id: 'mclaren-w1',
    category: 'Hypercar',
    manufacturer: 'McLaren',
    name: 'W1',
    label: '2025',
    previewImage: '/assets/visualizer/preview-mclaren-w1.jpg',
    config: MCLAREN_W1,
  },
  {
    id: 'porsche-918-spyder',
    category: 'Hypercar',
    manufacturer: 'Porsche',
    name: '918 Spyder Asphalt Edition',
    label: '2026',
    previewImage: '/assets/visualizer/preview-porsche-918-spyder.jpg',
    config: PORSCHE_918_SPYDER,
  },
  {
    id: 'gmc-hummer-ev-suv',
    category: 'Electric SUV',
    manufacturer: 'GMC',
    name: 'Hummer EV SUV',
    label: '2024',
    previewImage: '/assets/visualizer/preview-gmc-hummer-ev-suv.jpg',
    config: GMC_HUMMER_EV,
  },
]

/** Resolves a `?vehicle=` value; unknown or missing ids return undefined (the selection screen is shown). */
export const getVisualizerVehicle = (id: string | null | undefined) => VISUALIZER_VEHICLES.find((v) => v.id === id)
