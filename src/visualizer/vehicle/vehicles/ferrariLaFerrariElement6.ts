import type { PartContext, VehicleModelConfig } from '../vehicleModelConfig'
import type { VehiclePartId } from '../../types'
import { PAINT_PANEL_IDS } from '../../types'

/**
 * Ferrari LaFerrari (Element 6) by Echoo, Sketchfab, CC-BY-NC-ND-4.0 (see ../../credits.ts: NON-COMMERCIAL, NO DERIVATIVES).
 * 78 MB, ~0.9M triangles, 82 meshes, 78 materials. Y-up, nose toward +Z, authored in metres (2.01 x 1.0 x 4.48), centred 7.5 m off the
 * origin (re-centred at load).
 * One fused textured paint shell (`Body`, 75k triangles) plus separate carbon parts. Wheels are separate meshes per corner (tyre, rim, hub
 * nut, disc), so they are merged per corner and kept exactly as authored.
 */
const wheelCorner = ({ center }: PartContext): VehiclePartId =>
  center.z > 0 ? (center.x > 0 ? 'frontLeftWheel' : 'frontRightWheel') : center.x > 0 ? 'rearLeftWheel' : 'rearRightWheel'

export const FERRARI_LAFERRARI_ELEMENT_6: VehicleModelConfig = {
  id: 'ferrari-laferrari-element-6',
  displayName: 'Ferrari LaFerrari (Element 6)',
  url: '/models/ferrari_laferrari__element_6.glb',
  targetLength: 4.7,
  yawDegrees: 0,
  verticalOffset: 0,
  mapping: [
    { material: /^disc\./, part: wheelCorner, role: 'brakes', merge: true },
    { material: /^(Tire_Shader|esr_cs1_gloss_black|visse|JANTE|Material\.(146|016|018|020|116|005))/, part: wheelCorner, role: 'wheels', merge: true },

    { material: /^head_lights_glasses/, part: 'headlights', role: 'headlights' },
    { material: /^Front_headlights/, part: 'headlights', role: 'headlights' },
    { material: /^(break_lights|breake_lights|Rear_headlights|red_light|tail_lights)/, part: 'taillights', role: 'taillights' },
    { material: /^Glasses$/, part: 'glass', role: 'glass' },

    { material: /^Body$/, part: 'mainBody', role: 'bodyPaint', represents: PAINT_PANEL_IDS },

    { material: /^Carbon_fiber$/, part: 'mainBody', role: 'carbon' },
    { material: /^(Interior|Inside|Seets|seats|sreerean)/, part: 'mainBody', role: 'interior' },
  ],
}
