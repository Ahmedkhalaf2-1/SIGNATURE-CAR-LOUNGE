import type {
  CameraPresetId,
  CompareView,
  CoverageId,
  FinishId,
  PaintPanelId,
  ServiceId,
  TintId,
  VehiclePartId,
  VisualizerState,
  WrapColorId,
} from './types'
import { PAINT_PANEL_IDS } from './types'

export const SERVICES: readonly { id: ServiceId; label: string }[] = [
  { id: 'ppf', label: 'PPF' },
  { id: 'wrap', label: 'Wrap' },
  { id: 'ceramic', label: 'Ceramic' },
  { id: 'tint', label: 'Tint' },
]

/** English label doubles as the i18n key (see src/i18n). */
export const PANEL_LABELS: Record<PaintPanelId, string> = {
  hood: 'Hood',
  frontBumper: 'Front Bumper',
  rearBumper: 'Rear Bumper',
  roof: 'Roof',
  leftFrontFender: 'Left Front Fender',
  rightFrontFender: 'Right Front Fender',
  leftRearFender: 'Left Rear Fender',
  rightRearFender: 'Right Rear Fender',
  leftDoor: 'Left Door',
  rightDoor: 'Right Door',
  trunk: 'Trunk',
  leftMirror: 'Left Mirror',
  rightMirror: 'Right Mirror',
}

export const PART_LABELS: Partial<Record<VehiclePartId, string>> = {
  ...PANEL_LABELS,
  mainBody: 'Vehicle Body',
  glass: 'Glass',
  windshield: 'Windshield',
  leftWindow: 'Left Window',
  rightWindow: 'Right Window',
  rearGlass: 'Rear Glass',
  frontLeftWheel: 'Front Left Wheel',
  frontRightWheel: 'Front Right Wheel',
  rearLeftWheel: 'Rear Left Wheel',
  rearRightWheel: 'Rear Right Wheel',
}

export const COVERAGE_OPTIONS: readonly { id: CoverageId; label: string }[] = [
  { id: 'fullBody', label: 'Full Body' },
  { id: 'fullFront', label: 'Full Front' },
  { id: 'hood', label: 'Hood' },
  { id: 'frontBumper', label: 'Front Bumper' },
  { id: 'frontFenders', label: 'Front Fenders' },
  { id: 'mirrors', label: 'Mirrors' },
  { id: 'roof', label: 'Roof' },
  { id: 'custom', label: 'Custom' },
]

/** Coverage -> panel ids. `custom` is resolved from user state. */
export const COVERAGE_PANELS: Record<Exclude<CoverageId, 'custom'>, readonly PaintPanelId[]> = {
  fullBody: PAINT_PANEL_IDS,
  fullFront: ['hood', 'frontBumper', 'leftFrontFender', 'rightFrontFender', 'leftMirror', 'rightMirror'],
  hood: ['hood'],
  frontBumper: ['frontBumper'],
  frontFenders: ['leftFrontFender', 'rightFrontFender'],
  mirrors: ['leftMirror', 'rightMirror'],
  roof: ['roof'],
}

export const FINISH_OPTIONS: readonly { id: FinishId; label: string }[] = [
  { id: 'gloss', label: 'Gloss' },
  { id: 'satin', label: 'Satin' },
  { id: 'matte', label: 'Matte' },
]

export interface WrapColor {
  id: WrapColorId
  label: string
  hex: string
}
export const WRAP_COLORS: readonly WrapColor[] = [
  { id: 'obsidianBlack', label: 'Obsidian Black', hex: '#101013' },
  { id: 'nardoGrey', label: 'Nardo Grey', hex: '#7b7f85' },
  { id: 'pearlWhite', label: 'Pearl White', hex: '#f1efe8' },
  { id: 'candyRed', label: 'Candy Red', hex: '#b5081f' },
  { id: 'racingGreen', label: 'Racing Green', hex: '#0f4a33' },
  { id: 'midnightPurple', label: 'Midnight Purple', hex: '#2a0f58' },
  { id: 'deepNavy', label: 'Deep Navy', hex: '#10295a' },
]

/** Visible light transmission per shade, in percent. */
export const TINT_OPTIONS: readonly { id: TintId; label: string; vlt: number }[] = [
  { id: '70', label: '70%', vlt: 70 },
  { id: '50', label: '50%', vlt: 50 },
  { id: '35', label: '35%', vlt: 35 },
  { id: '20', label: '20%', vlt: 20 },
  { id: '5', label: '5%', vlt: 5 },
]

export const COMPARE_OPTIONS: readonly { id: CompareView; label: string }[] = [
  { id: 'original', label: 'Original' },
  { id: 'treated', label: 'With Treatment' },
]

export interface CameraPreset {
  id: CameraPresetId
  label: string
  /** Horizontal angle around the vehicle in degrees: 0 = nose-on, 90 = the vehicle's left side. */
  azimuth: number
  /** Angle from straight up in degrees. */
  polar: number
  /** Multiplier on the framing distance. */
  zoom: number
}
export const CAMERA_PRESETS: readonly CameraPreset[] = [
  { id: 'front34', label: 'Front 3/4', azimuth: 38, polar: 85, zoom: 0.94 },
  { id: 'front', label: 'Front', azimuth: 0, polar: 87, zoom: 0.74 },
  { id: 'left', label: 'Left', azimuth: 90, polar: 87, zoom: 1.02 },
  { id: 'rear34', label: 'Rear 3/4', azimuth: 142, polar: 85, zoom: 0.94 },
  { id: 'rear', label: 'Rear', azimuth: 180, polar: 87, zoom: 0.74 },
  { id: 'right', label: 'Right', azimuth: -90, polar: 87, zoom: 1.02 },
    // Top is fitted from the vehicle bounds in CameraRig (heading depends on the viewport), so azimuth/polar here are nominal.
  { id: 'top', label: 'Top', azimuth: 180, polar: 2, zoom: 1 },
]
export const DEFAULT_CAMERA_PRESET: CameraPresetId = 'front34'

/** Exploded-view displacement per part in metres, in vehicle space (x = left, y = up, z = forward). */
export const EXPLODE_OFFSETS: Partial<Record<VehiclePartId, readonly [number, number, number]>> = {
  hood: [0, 0.55, 0.35],
  roof: [0, 0.8, 0],
  trunk: [0, 0.5, -0.4],
  frontBumper: [0, -0.02, 0.8],
  rearBumper: [0, -0.02, -0.8],
  leftDoor: [0.75, 0.05, 0],
  rightDoor: [-0.75, 0.05, 0],
  leftFrontFender: [0.7, 0.1, 0.25],
  rightFrontFender: [-0.7, 0.1, 0.25],
  leftRearFender: [0.7, 0.1, -0.25],
  rightRearFender: [-0.7, 0.1, -0.25],
  leftMirror: [0.45, 0.1, 0.1],
  rightMirror: [-0.45, 0.1, 0.1],
  windshield: [0, 0.7, 0.5],
  rearGlass: [0, 0.65, -0.5],
  leftWindow: [0.95, 0.15, 0],
  rightWindow: [-0.95, 0.15, 0],
  frontLeftWheel: [0.55, 0, 0],
  frontRightWheel: [-0.55, 0, 0],
  rearLeftWheel: [0.55, 0, 0],
  rearRightWheel: [-0.55, 0, 0],
}

export const INITIAL_STATE: VisualizerState = {
  activeService: 'wrap',
  wrap: { enabled: false, color: 'obsidianBlack', finish: 'gloss' },
  ppf: { enabled: false, coverage: 'fullBody', finish: 'gloss', customPanels: [] },
  ceramic: { enabled: false },
  tint: { enabled: false, shade: '35' },
  view: 'treated',
  exploded: false,
  camera: { preset: DEFAULT_CAMERA_PRESET, nonce: 0 },
}

/** Studio layout shared by the visible geometry and the baked reflection environment (metres). */
export const STUDIO = {
  roomHalfWidth: 12,
  roomHalfDepth: 16,
  ceilingY: 5.4,
  /** Six long LED rows running nose-to-tail, hung just below the ceiling beams. */
  ceilingStripX: [-4.3, -2.6, -0.9, 0.9, 2.6, 4.3],
  ceilingStripY: 5.0,
  ceilingStripLength: 22,
  ceilingStripWidth: 0.2,
  /** Two angled side rows tilted toward the vehicle. */
  sideStripX: 8.4,
  sideStripY: 4.5,
  sideStripTilt: 0.72,
  sideStripLength: 20,
  /** Floor-to-ceiling wall slits on the long walls. */
  wallSlitZ: [-11, -5.5, 5.5, 11],
  bay: { halfWidth: 2.35, halfLength: 3.7 },
} as const

export const PURPLE = { deep: '#5c2483', accent: '#8e24aa', lilac: '#bc91e8' } as const
