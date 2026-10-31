import type { MeshRule, PartContext, VehicleModelConfig } from '../vehicleModelConfig'
import type { PaintPanelId, VehiclePartId } from '../../types'

/**
 * Mercedes-Benz S65 (W222) by Black Snow, Sketchfab, CC-BY-4.0 (see ../../credits.ts).
 * 28.8 MB, 559k triangles, 278 meshes, 67 materials, no textures, Y-up, nose toward +Z, authored in metres (2.04 x 1.44 x 5.07), no yaw.
 *
 * Panels are named nodes; paint is the `sw222_paint` material on them. The roof and rear quarters are one fused mesh (`sw222_body`),
 * and the glazing behind the B-pillar is one mesh (`sw222_doorglass_RR`).
 */
const wheelCorner = ({ center }: PartContext): VehiclePartId =>
  center.z > 0 ? (center.x > 0 ? 'frontLeftWheel' : 'frontRightWheel') : center.x > 0 ? 'rearLeftWheel' : 'rearRightWheel'

const paint = (node: RegExp, part: VehiclePartId, represents?: readonly PaintPanelId[]): MeshRule => ({
  node,
  material: /^sw222_paint$/,
  part,
  role: 'bodyPaint',
  ...(represents ? { represents } : {}),
})

export const MERCEDES_S65_W222: VehicleModelConfig = {
  id: 'mercedes-s65-w222',
  displayName: 'Mercedes-Benz S65 (W222)',
  url: '/models/mersedes-benz_s65_w222.glb',
  targetLength: 5.1,
  yawDegrees: 0,
  verticalOffset: 0,
  mapping: [
    // ---- brakes and wheels (rim, tyre per corner), kept exactly as authored ----
    { material: /^amdb11_/, part: wheelCorner, role: 'brakes', merge: true },
    { node: /^sw222_wheel_amg/, part: wheelCorner, role: 'wheels', merge: true },
    { material: /^Scene_-_Root\.001$/, part: wheelCorner, role: 'wheels', merge: true },

    // ---- lamps (never modified) and their lenses ----
    { node: /headlight/, part: 'headlights', role: 'headlights' },
    { node: /taillight|tail_lights/, part: 'taillights', role: 'taillights' },

    // ---- window glass ----
    { material: /^sw222_glass/, node: /^sw222_mirror_/, part: 'mainBody', role: 'trim' },
    { material: /^sw222_glass/, node: /bumper_R/, part: 'mainBody', role: 'trim' },
    { material: /^sw222_glass/, node: /windshield/, part: 'windshield', role: 'glass' },
    { material: /^sw222_glass/, node: /doorglass_(FL)/, part: 'leftWindow', role: 'glass' },
    { material: /^sw222_glass/, node: /doorglass_(FR)/, part: 'rightWindow', role: 'glass' },
    { material: /^sw222_glass/, node: /doorglass_RR/, part: 'rearGlass', role: 'glass' },

    // ---- body paint ----
    paint(/^sw222_hood_2013$/, 'hood'),
    paint(/^sw222_door_(FL|RL)_chrome/, 'leftDoor'),
    paint(/^sw222_door_(FR|RR)_chrome/, 'rightDoor'),
    paint(/^sw222_fender_L_/, 'leftFrontFender'),
    paint(/^sw222_fender_R_/, 'rightFrontFender'),
    paint(/^sw222_trunk_chrome/, 'trunk'),
    paint(/^sw222_mirror_L$/, 'leftMirror'),
    paint(/^sw222_mirror_R$/, 'rightMirror'),
    paint(/bumper_F_brabus/, 'frontBumper'),
    paint(/bumper_R_amg/, 'rearBumper'),
    paint(/^sw222_sideskirt_amg$/, 'mainBody', ['leftDoor', 'rightDoor']),
    paint(/^sw222_body$/, 'mainBody', ['roof', 'leftRearFender', 'rightRearFender']),

    // ---- labelling only ----
    { node: /exhaust/, part: 'mainBody', role: 'exhaust' },
    { node: /engine/, part: 'mainBody', role: 'engine' },
    { node: /(seat|steer|dash|panel)/, part: 'mainBody', role: 'interior' },
  ],
}
