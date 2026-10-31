import type { PartContext, Region, VehicleModelConfig } from '../vehicleModelConfig'
import type { VehiclePartId } from '../../types'
import { PAINT_PANEL_IDS } from '../../types'

/**
 * BMW 7-series (F01) by Black Snow, Sketchfab, CC-BY-4.0 (see ../../credits.ts). 10.2 MB, 85k triangles, 34 meshes / 34 materials,
 * one 1-image texture set, KHR_materials_specular only. FBX export, Y-up, authored at ~0.6 scale, NOSE TOWARD -X, long axis X;
 * `buildVehicle` turns the long axis a quarter turn (+Z forward, left = +X) and scales to `targetLength` (x1.664).
 *
 * Structure (see the inspection notes in README.md): the whole shell is ONE mesh/material (`Body_Color`, black, 18k triangles of
 * disconnected soup), glass is one translucent material shared by the lamp lenses and the windows, and the wheels are not their own
 * meshes: rim, tyre, brake and hub triangles live inside the generic `M_01xx_*` materials together with unrelated trim. Everything
 * is therefore classified by position (`perTriangle`) in normalised vehicle space (metres, +Z nose, +X left, floor = 0).
 */

/** Wheel centres in vehicle space: x = +/-0.85, y = 0.33 (radius ~0.33), front axle z = +1.70, rear axle z = -1.40. */
const FRONT_AXLE_Z = 1.7
const REAR_AXLE_Z = -1.4
const WHEEL_RADIUS = 0.42

const wheelCorner = (c: PartContext['center']): VehiclePartId | null => {
  if (Math.abs(c.x) < 0.6 || c.y > 0.72) return null
  const front = Math.abs(c.z - FRONT_AXLE_Z) < WHEEL_RADIUS
  const rear = Math.abs(c.z - REAR_AXLE_Z) < WHEEL_RADIUS
  if (!front && !rear) return null
  const left = c.x > 0
  return front ? (left ? 'frontLeftWheel' : 'frontRightWheel') : left ? 'rearLeftWheel' : 'rearRightWheel'
}
const wheelRegion = (corner: VehiclePartId): Region => ({ when: ({ center }) => wheelCorner(center) === corner, role: 'wheels', part: corner })
const WHEEL_REGIONS: readonly Region[] = (['frontLeftWheel', 'frontRightWheel', 'rearLeftWheel', 'rearRightWheel'] as const).map(wheelRegion)

const FRONT_LAMP_ZONE = ({ center: c }: PartContext) => c.z > 1.9 && c.y < 1
const REAR_LAMP_ZONE = ({ center: c }: PartContext) => c.z < -1.9 && c.y < 1.1

export const BMW_7_SERIES_F01: VehicleModelConfig = {
  id: 'bmw-7-series-f01',
  displayName: 'BMW 7 Series (F01)',
  url: '/models/bmw_7-series_f01.glb',
  // Real F01 is ~5.07 m long; the Porsche is normalised to 4.5 (its real 4.64 m), so both keep a true relative scale.
  targetLength: 5.0,
  yawDegrees: 0,
  verticalOffset: 0,
  mapping: [
    // ---- wheels, tyres, brakes: carved out of the generic materials by position, kept exactly as authored ----
    { material: /^(M_0131_Silver|Mold-Tech-11160|M_0133_Gray|M_0132_LightGray|Gar_alu1|M_0136_Charcoal|M_0137_Black)$/, part: 'mainBody', role: 'trim', perTriangle: true, regions: WHEEL_REGIONS },

    // ---- body paint: the only surface Wrap / PPF / Ceramic may change (panels are fused into one mesh) ----
    { material: /^Body_Color$/, part: 'mainBody', role: 'bodyPaint', represents: PAINT_PANEL_IDS },

    // ---- glass: one translucent material shared by lamp lenses and windows, split by position ----
    {
      material: /^Translucent_Glass_Gray$/,
      part: 'glass',
      role: 'glass',
      perTriangle: true,
      regions: [
        { when: FRONT_LAMP_ZONE, role: 'headlights', part: 'headlights' },
        { when: REAR_LAMP_ZONE, role: 'taillights', part: 'taillights' },
        { when: ({ center: c }) => c.z > 0.3 && Math.abs(c.x) < 0.7 && c.y > 0.85, role: 'glass', part: 'windshield' },
        { when: ({ center: c }) => c.z < -0.9 && Math.abs(c.x) < 0.7 && c.y > 0.85, role: 'glass', part: 'rearGlass' },
        { when: ({ center: c }) => c.x > 0, role: 'glass', part: 'leftWindow' },
        { when: () => true, role: 'glass', part: 'rightWindow' },
      ],
    },

    // ---- lamps, never modified ----
    { material: /^(Taillight_Glass|Rear_Fog_Reflector)$/, part: 'taillights', role: 'taillights' },
    { material: /^(Headlights_1|Translucent_Angel_Eyes)$/, part: 'headlights', role: 'headlights' },

    // ---- everything else keeps its authored material; roles are for labelling and future control ----
    { material: /^(Leather_\d|Interior_\d|Carpet|LCD_Screen|Wood_Trim|M_0021_DarkRed|BM7L_tex1|M_0130_Gainsboro|M_0134_DimGray|material_33)$/, part: 'mainBody', role: 'interior' },
    { material: /^(Chrome_02|Metal_Steel_Textured_White|Grill|material|BMW\.001|M_0093_AliceBlue|M_0135_DarkGray|M_0132_LightGray)$/, part: 'mainBody', role: 'trim' },
  ],
}
