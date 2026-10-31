import type { PaintPanelId } from '../types'

/**
 * PPF coverage adapter. The UI and state only ever speak in semantic panel ids; how a model realises "this panel is covered"
 * is decided here:
 *  - Strategy A (segmented model): the mesh IS one panel, so it is wholly covered or not at all.
 *  - Strategy B (fused body shell, e.g. the Porsche): covered panels are approximated by soft spatial masks in normalised
 *    vehicle space. The GLB geometry is never edited.
 * Swapping in a segmented GLB only changes which strategy a mesh falls into (its `represents` list); nothing above this
 * file changes.
 */

/** Axis-aligned box in normalised vehicle space: x 0..1 right->left (+X is the left side), y 0..1 floor->roof, z 0..1 rear->front. */
export interface MaskRegion {
  min: readonly [number, number, number]
  max: readonly [number, number, number]
}

export type PpfMask = { kind: 'none' } | { kind: 'all' } | { kind: 'regions'; regions: readonly MaskRegion[] }

/** Shader uniform array size; the 13 panels need at most 13 regions. */
export const MAX_MASK_REGIONS = 14
/** Edge softness in normalised units (about 0.1 m along the length): masks fade out instead of clipping. */
export const MASK_FEATHER = 0.028

// Reference proportions used to author the boxes below, in metres. They are only used to express fractions; the live
// vehicle bounds do the real normalisation, so any car with a similar layout lines up.
const L = 4.5
const W = 1.92
const H = 1.13
const OPEN = 3 // "beyond the vehicle": keeps the feather from fading the mask at the vehicle's own edges

const nx = (x: number) => (x + W / 2) / W
const ny = (y: number) => y / H
const nz = (z: number) => (z + L / 2) / L
const box = (x0: number, x1: number, y0: number, y1: number, z0: number, z1: number): MaskRegion => ({
  min: [x0 <= -W / 2 ? -OPEN : nx(x0), y0 <= 0 ? -OPEN : ny(y0), z0 <= -L / 2 ? -OPEN : nz(z0)],
  max: [x1 >= W / 2 ? OPEN : nx(x1), y1 >= H ? OPEN : ny(y1), z1 >= L / 2 ? OPEN : nz(z1)],
})

const SIDE = 0.52 // |x| beyond this is "side" (fenders, doors); inside it is the centre line (hood, roof, deck)

/** Approximate footprint of each panel on a Porsche-Carrera-GT-like coupe (nose toward +Z). */
export const PANEL_REGIONS: Record<PaintPanelId, readonly MaskRegion[]> = {
  hood: [box(-0.64, 0.64, 0.5, H, 0.9, 1.85)],
  frontBumper: [box(-W / 2, W / 2, 0, 0.56, 1.72, L / 2)],
  leftFrontFender: [box(SIDE, W / 2, 0.22, H, 0.95, 1.95)],
  rightFrontFender: [box(-W / 2, -SIDE, 0.22, H, 0.95, 1.95)],
  leftMirror: [box(0.8, W / 2, 0.8, H, 0.5, 1.05)],
  rightMirror: [box(-W / 2, -0.8, 0.8, H, 0.5, 1.05)],
  roof: [box(-0.66, 0.66, 0.86, H, -0.6, 0.78)],
  leftDoor: [box(SIDE, W / 2, 0.22, 0.86, -0.5, 0.78)],
  rightDoor: [box(-W / 2, -SIDE, 0.22, 0.86, -0.5, 0.78)],
  leftRearFender: [box(SIDE, W / 2, 0.22, H, -2.1, -0.45)],
  rightRearFender: [box(-W / 2, -SIDE, 0.22, H, -2.1, -0.45)],
  trunk: [box(-0.56, 0.56, 0.5, H, -2.05, -0.5)],
  rearBumper: [box(-W / 2, W / 2, 0, 0.56, -L / 2, -1.72)],
}

/** Mask for one paint mesh given the covered panels. */
export function resolveCoverageMask(represents: readonly PaintPanelId[], covered: ReadonlySet<PaintPanelId>): PpfMask {
  const hit = represents.filter((p) => covered.has(p))
  if (hit.length === 0) return { kind: 'none' }
  // Strategy A: a real panel mesh, or a fused mesh whose every panel is covered.
  if (represents.length === 1 || hit.length === represents.length) return { kind: 'all' }
  // Strategy B: a fused mesh with a partial selection.
  const regions = hit.flatMap((p) => PANEL_REGIONS[p])
  return { kind: 'regions', regions: regions.slice(0, MAX_MASK_REGIONS) }
}
