/**
 * Model-agnostic vocabulary of the visualizer. Nothing in here knows about a specific GLB file or its
 * raw node names: vehicles are mapped onto these semantic ids by vehicle/vehicleModelConfig.ts.
 */

export const PAINT_PANEL_IDS = [
  'hood',
  'frontBumper',
  'rearBumper',
  'roof',
  'leftFrontFender',
  'rightFrontFender',
  'leftRearFender',
  'rightRearFender',
  'leftDoor',
  'rightDoor',
  'trunk',
  'leftMirror',
  'rightMirror',
] as const
export type PaintPanelId = (typeof PAINT_PANEL_IDS)[number]

export type VehiclePartId =
  | PaintPanelId
  | 'mainBody'
  | 'windshield'
  | 'leftWindow'
  | 'rightWindow'
  | 'rearGlass'
  /** All glazing when the model has a single undifferentiated glass mesh. */
  | 'glass'
  | 'headlights'
  | 'taillights'
  | 'frontLeftWheel'
  | 'frontRightWheel'
  | 'rearLeftWheel'
  | 'rearRightWheel'

/**
 * What a surface IS, independent of any file's naming. Only `bodyPaint` responds to wrap / PPF / ceramic / highlight
 * logic and only `glass` responds to tint. Every other role keeps the material exactly as authored in the GLB.
 */
export type MaterialRole =
  | 'bodyPaint'
  | 'glass'
  | 'wheels'
  | 'brakes'
  | 'headlights'
  | 'taillights'
  | 'interior'
  | 'engine'
  | 'carbon'
  | 'trim'
  | 'exhaust'

/** Roles the appearance system is allowed to change. */
export const MANAGED_ROLES: readonly MaterialRole[] = ['bodyPaint', 'glass']

export type ServiceId = 'ppf' | 'wrap' | 'ceramic' | 'tint'
export type FinishId = 'gloss' | 'satin' | 'matte'
export type CoverageId = 'fullBody' | 'fullFront' | 'hood' | 'frontBumper' | 'frontFenders' | 'mirrors' | 'roof' | 'custom'
export type WrapColorId = 'obsidianBlack' | 'nardoGrey' | 'pearlWhite' | 'candyRed' | 'racingGreen' | 'midnightPurple' | 'deepNavy'
export type TintId = '70' | '50' | '35' | '20' | '5'
/** Shared before/after switch: `original` shows the untreated vehicle, `treated` the complete configured stack. */
export type CompareView = 'original' | 'treated'
export type CameraPresetId = 'front' | 'rear' | 'left' | 'right' | 'front34' | 'rear34' | 'top'

/**
 * Persistent, independent treatment layers. `activeService` is UI only (which editor tab is open) and never decides what is
 * applied to the vehicle: each layer is applied exactly when its own `enabled` is true.
 * Option values keep sensible defaults while a layer is disabled so enabling it needs no extra choice.
 */
export interface VisualizerState {
  activeService: ServiceId
  wrap: { enabled: boolean; color: WrapColorId; finish: FinishId }
  ppf: { enabled: boolean; coverage: CoverageId; finish: FinishId; customPanels: PaintPanelId[] }
  ceramic: { enabled: boolean }
  tint: { enabled: boolean; shade: TintId }
  view: CompareView
  exploded: boolean
  /** Bumped by every camera command so re-selecting the same preset (or Reset) re-fires. Camera never touches treatments. */
  camera: { preset: CameraPresetId; nonce: number }
}

/** Serializable shape of the COMPLETE composed configuration, ready to post to the enquiry endpoint later. */
export interface VisualizerConfiguration {
  version: 2
  vehicle: { id: string; name: string }
  wrap: { color: WrapColorId; finish: FinishId } | null
  ppf: { coverage: CoverageId; finish: FinishId; selectedPanels: PaintPanelId[] } | null
  ceramic: boolean
  tint: { percentage: TintId } | null
}

/** A plain PBR description that the glass animator eases toward; no three.js types so the UI can import it. */
export interface PbrTarget {
  color: string
  metalness: number
  roughness: number
  clearcoat: number
  clearcoatRoughness: number
  envMapIntensity: number
  sheen: number
  sheenColor: string
  sheenRoughness: number
  emissive: string
  emissiveIntensity: number
  opacity: number
}
