import type { PartContext, Region, VehicleModelConfig } from '../vehicleModelConfig'
import type { VehiclePartId } from '../../types'

/**
 * BMW M4 Competition (2025) by Ddiaz Design, Sketchfab, CC-BY-NC-SA-4.0 (see ../../credits.ts: NON-COMMERCIAL, SHARE-ALIKE).
 * 11.4 MB, 126k triangles, 215 meshes, 17 materials, 30 textures. Authored at 1/100 scale, Y-up, nose toward +Z.
 * Shell is one `body` node (paint = `m4car_body1`, hood = `m4car_hood1`) with separate door nodes and a bodykit; wheels are separate per
 * corner (rim, tyre, disc) but the red calipers are fused into one mesh, so they are carved out by position.
 */
const corner = (c: PartContext['center']): VehiclePartId =>
  c.z > 0 ? (c.x > 0 ? 'frontLeftWheel' : 'frontRightWheel') : c.x > 0 ? 'rearLeftWheel' : 'rearRightWheel'
const caliperRegion = (part: VehiclePartId): Region => ({ when: ({ center }) => corner(center) === part, role: 'brakes', part })

export const BMW_M4_COMPETITION: VehicleModelConfig = {
  id: 'bmw-m4-competition-2025',
  displayName: 'BMW M4 Competition (2025)',
  url: '/models/2025_bmw_m4_competition.glb',
  targetLength: 4.8,
  yawDegrees: 0,
  verticalOffset: 0,
  mapping: [
    // ---- brakes and wheels, kept exactly as authored ----
    {
      material: /^(red_caliper|metal_Capiler)$/,
      part: 'mainBody',
      role: 'brakes',
      perTriangle: true,
      regions: (['frontLeftWheel', 'frontRightWheel', 'rearLeftWheel', 'rearRightWheel'] as const).map(caliperRegion),
    },
    { material: /^(rimRim_072_Garage1|b_TNRRims|b_TNRRims_125A20NaTireBlur_Materia|b_TNRRims_125A20NaBrakeDisc_Forged)/, part: ({ center }) => corner(center), role: 'wheels', merge: true },

    // ---- lamps ----
    {
      material: /^m4car_emissive1$/,
      part: 'taillights',
      role: 'taillights',
      perTriangle: true,
      regions: [{ when: ({ center }) => center.z > 0, role: 'headlights', part: 'headlights' }],
    },

    // ---- glass ----
    { material: /^m4car_glass1$/, part: 'glass', role: 'glass' },

    // ---- body paint ----
    { material: /^m4car_hood1$/, part: 'hood', role: 'bodyPaint' },
    { node: /left_door/, material: /^m4car_body1$/, part: 'leftDoor', role: 'bodyPaint' },
    { node: /right_door/, material: /^m4car_body1$/, part: 'rightDoor', role: 'bodyPaint' },
    { material: /^m4car_bodykit1$/, part: 'mainBody', role: 'bodyPaint', represents: ['frontBumper', 'rearBumper'] },
    { material: /^m4car_body1$/, part: 'mainBody', role: 'bodyPaint', represents: ['roof', 'leftFrontFender', 'rightFrontFender', 'leftRearFender', 'rightRearFender', 'trunk'] },

    // ---- labelling only ----
    { material: /^m4car_interior1$/, part: 'mainBody', role: 'interior' },
    { material: /^m4car_spoiler1$/, part: 'mainBody', role: 'carbon' },
  ],
}
