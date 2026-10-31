import { TINT_OPTIONS, WRAP_COLORS } from '../constants'
import { coveragePanels } from '../state/selectors'
import type { FinishId, PaintPanelId, PbrTarget, TintId, VisualizerState, WrapColorId } from '../types'

const WHITE = '#ffffff'
const NO_EMISSIVE = '#000000'

// ---------------------------------------------------------------------------------------------------------------------
// Body: deterministic composition  BASE -> WRAP -> PPF -> CERAMIC
// ---------------------------------------------------------------------------------------------------------------------

/** One surface description as the shader consumes it. */
export interface SurfaceProps {
  roughness: number
  metalness: number
  clearcoat: number
  clearcoatRoughness: number
  envIntensity: number
  /** Sheen amount (0 = none) and its colour; sheen is how colours like Midnight Purple shift at grazing angles. */
  sheen: number
  sheenColor: string
  sheenRoughness: number
}

export interface WrapLayer extends SurfaceProps {
  color: string
}

/** PPF is a clear film: it replaces how the surface responds (gloss / satin / matte) and leaves the colour below untouched. */
export interface PpfLayer {
  roughness: number
  clearcoat: number
  clearcoatRoughness: number
  envIntensity: number
}

/** Everything the body shader needs; a pure function of the complete treatment stack. */
export interface BodyConfig {
  wrap: WrapLayer | null
  ppf: PpfLayer | null
  /** Panels the PPF layer covers (resolved per mesh into a mask by materials/coverage.ts). */
  coverage: ReadonlySet<PaintPanelId>
  ceramic: boolean
}

export const BODY_ORIGINAL: BodyConfig = { wrap: null, ppf: null, coverage: new Set(), ceramic: false }

/** Factory paint response; the colour comes from the vehicle. */
export const BASE_PAINT: SurfaceProps = {
  roughness: 0.2,
  metalness: 0.3,
  clearcoat: 1,
  clearcoatRoughness: 0.03,
  envIntensity: 1.1,
  sheen: 0,
  sheenColor: WHITE,
  sheenRoughness: 0.5,
}

const PPF_FINISH: Record<FinishId, PpfLayer> = {
  gloss: { roughness: 0.14, clearcoat: 1, clearcoatRoughness: 0.035, envIntensity: 1.2 },
  satin: { roughness: 0.34, clearcoat: 0.22, clearcoatRoughness: 0.34, envIntensity: 0.95 },
  matte: { roughness: 0.78, clearcoat: 0, clearcoatRoughness: 0.7, envIntensity: 0.62 },
}

type WrapSurface = Pick<SurfaceProps, 'metalness' | 'roughness' | 'clearcoat' | 'clearcoatRoughness' | 'envIntensity'>
const WRAP_FINISH: Record<FinishId, WrapSurface> = {
  gloss: { metalness: 0.22, roughness: 0.16, clearcoat: 1, clearcoatRoughness: 0.05, envIntensity: 1.15 },
  satin: { metalness: 0.3, roughness: 0.36, clearcoat: 0.2, clearcoatRoughness: 0.36, envIntensity: 0.95 },
  matte: { metalness: 0.08, roughness: 0.86, clearcoat: 0, clearcoatRoughness: 0.7, envIntensity: 0.6 },
}

/** Per-colour character on top of the finish. */
type Tweak = Partial<WrapSurface> & { sheen?: number; sheenColor?: string; sheenRoughness?: number }
const WRAP_COLOR_TWEAK: Partial<Record<WrapColorId, (finish: FinishId) => Tweak>> = {
  obsidianBlack: (f) => ({ metalness: f === 'matte' ? 0.05 : 0.18 }),
  nardoGrey: () => ({ metalness: 0.02 }),
  // Pearl: slightly soft, wide highlights and a warm sheen so it never reads as flat grey.
  pearlWhite: (f) => ({ metalness: 0.2, roughness: f === 'gloss' ? 0.2 : undefined, sheen: 0.5, sheenColor: '#fff3e2', sheenRoughness: 0.55 }),
  // Candy: deep colour with a metallic flake response under a wet-looking clear.
  candyRed: (f) => ({ metalness: f === 'matte' ? 0.12 : 0.55, sheen: f === 'matte' ? 0.2 : 0.35, sheenColor: '#ff5a66', sheenRoughness: 0.4 }),
  racingGreen: (f) => ({ metalness: f === 'matte' ? 0.1 : 0.42, sheen: 0.25, sheenColor: '#3fae80', sheenRoughness: 0.45 }),
  // Angle-dependent violet shift via sheen: cheap and compile-stable.
  midnightPurple: (f) => ({ metalness: f === 'matte' ? 0.15 : 0.6, sheen: 0.5, sheenColor: '#7b45c9', sheenRoughness: 0.34 }),
  deepNavy: (f) => ({ metalness: f === 'matte' ? 0.1 : 0.5, sheen: 0.4, sheenColor: '#4d7fe0', sheenRoughness: 0.4 }),
}

function wrapLayer(color: WrapColorId, finish: FinishId): WrapLayer {
  const tweak = WRAP_COLOR_TWEAK[color]?.(finish) ?? {}
  const defined = Object.fromEntries(Object.entries(tweak).filter(([, v]) => v !== undefined))
  return {
    color: WRAP_COLORS.find((c) => c.id === color)?.hex ?? '#000000',
    sheen: 0,
    sheenColor: WHITE,
    sheenRoughness: 0.5,
    ...WRAP_FINISH[finish],
    ...defined,
  }
}

/**
 * The one place that turns the whole treatment stack into body material inputs. "Original" (compare switch) is simply the
 * empty stack. Layers never mutate each other: the shader evaluates base -> wrap -> ppf -> ceramic from this description.
 */
export function resolveBodyConfig(state: VisualizerState): BodyConfig {
  if (state.view === 'original') return BODY_ORIGINAL
  const ppfOn = state.ppf.enabled
  return {
    wrap: state.wrap.enabled ? wrapLayer(state.wrap.color, state.wrap.finish) : null,
    ppf: ppfOn ? PPF_FINISH[state.ppf.finish] : null,
    coverage: ppfOn ? new Set(coveragePanels(state.ppf)) : new Set(),
    ceramic: state.ceramic.enabled,
  }
}

// ---------------------------------------------------------------------------------------------------------------------
// Glass: BASE GLASS -> TINT
// ---------------------------------------------------------------------------------------------------------------------

/**
 * Opacity of the film (how much of the cabin is hidden). 8% is clean factory glass, 98% is limo film: the cabin stays faintly
 * visible, never opaque black.
 */
const filmOpacity = (vlt: number) => 0.08 + 0.9 * ((100 - vlt) / 95)

/** The windshield follows the chosen shade down to 20% VLT, so every step still shows, but never goes limo-dark. */
const WINDSHIELD_MIN_VLT = 20

function glassFor(tint: TintId | null, windshield = false): PbrTarget {
  const requested = tint ? (TINT_OPTIONS.find((o) => o.id === tint)?.vlt ?? 100) : 100
  const vlt = windshield ? Math.max(requested, WINDSHIELD_MIN_VLT) : requested
  return {
    // Near-black diffuse: the glass colour is added at full strength, so it must not brighten what is behind it.
    color: '#04070a',
    metalness: 0,
    roughness: 0.02,
    // Alpha blending scales reflections by the opacity, so the reflection strength rises with the film to keep LED lines
    // visible on dark glass instead of fading out with it.
    clearcoat: 0.5,
    clearcoatRoughness: 0.01,
    envMapIntensity: 0.8 + 1.1 * ((100 - vlt) / 95),
    sheen: 0.0001,
    sheenColor: WHITE,
    sheenRoughness: 0.5,
    emissive: NO_EMISSIVE,
    emissiveIntensity: 0,
    opacity: filmOpacity(vlt),
  }
}

export interface GlassAppearance {
  glass: PbrTarget
  /** Windshield gets a lighter film than the side and rear glass. */
  windshield: PbrTarget
}

export function resolveGlass(state: VisualizerState): GlassAppearance {
  const tinted = state.view === 'treated' && state.tint.enabled
  const shade = tinted ? state.tint.shade : null
  return { glass: glassFor(shade), windshield: glassFor(shade, true) }
}
