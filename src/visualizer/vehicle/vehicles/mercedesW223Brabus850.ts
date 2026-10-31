import type { MeshRule, PartContext, VehicleModelConfig } from '../vehicleModelConfig'
import type { PaintPanelId, VehiclePartId } from '../../types'

/**
 * Mercedes-Benz S-Class W223 [BRABUS 850] by Black Snow, Sketchfab, CC-BY-4.0 (see ../../credits.ts).
 * 58.6 MB, 1.09M triangles, 292 meshes, 61 materials, 18 textures, Y-up, nose toward +Z, authored in metres (2.13 x 1.53 x 5.40), no yaw needed.
 *
 * The file is cleanly split into named panel nodes (hood_21, door_FL_antichrome_40, fender_FR_27, ...), so paint is selected by node
 * AND the shared `TwiXeR_W223` material (the same material also covers tyres, underbody and interior plastics, which stay untouched).
 * Rear quarter panels and the roof are fused into `body_50`, so that mesh stands for several panels (approximate preview).
 */
const wheelCorner = ({ center }: PartContext): VehiclePartId =>
  center.z > 0 ? (center.x > 0 ? 'frontLeftWheel' : 'frontRightWheel') : center.x > 0 ? 'rearLeftWheel' : 'rearRightWheel'

const PAINT = /^TwiXeR_W223$/
const paint = (node: RegExp, part: VehiclePartId, represents?: readonly PaintPanelId[]): MeshRule => ({
  node,
  material: PAINT,
  part,
  role: 'bodyPaint',
  ...(represents ? { represents } : {}),
})

export const MERCEDES_W223_BRABUS_850: VehicleModelConfig = {
  id: 'mercedes-s-class-w223-brabus-850',
  displayName: 'Mercedes-Benz S-Class W223 (BRABUS 850)',
  url: '/models/mersedes-benz_s-class_w223_brabus_850.glb',
  targetLength: 5.4,
  yawDegrees: 0,
  verticalOffset: 0,
  mapping: [
    // ---- brakes and wheels (tyre, rim, hub per corner), kept exactly as authored ----
    { material: /^amdb11_(brake|caliper|misc)/, part: wheelCorner, role: 'brakes', merge: true },
    { node: /(brabus_wheels|3_Wheel)/, part: wheelCorner, role: 'wheels', merge: true },

    // ---- lamp glass first (it shares `TwiXeR_W223_glass` with nothing tintable) ----
    { node: /headlight_glass|headlight_[LR]_2[23]$/, part: 'headlights', role: 'headlights' },
    { node: /taillight|center_taillight/, part: 'taillights', role: 'taillights' },

    // ---- window glass: tinted layers per window ----
    { material: /^TwiXeR_W223_glass/, node: /windshield/, part: 'windshield', role: 'glass' },
    { material: /^TwiXeR_W223_glass/, node: /backlight/, part: 'rearGlass', role: 'glass' },
    { material: /^TwiXeR_W223_glass/, node: /doorglass_(FL|RL)/, part: 'leftWindow', role: 'glass' },
    { material: /^TwiXeR_W223_glass/, node: /doorglass_(FR|RR)/, part: 'rightWindow', role: 'glass' },
    { material: /^TwiXeR_W223_glass_(panorama|int)/, node: /roof_panoramic/, part: 'glass', role: 'glass' },

    // ---- body paint: the only surface Wrap / PPF / Ceramic may change ----
    paint(/^TwiXeR_W223_hood_21$/, 'hood'),
    paint(/^TwiXeR_W223_door_(FL|RL)_antichrome/, 'leftDoor'),
    paint(/^TwiXeR_W223_door_(FR|RR)_antichrome/, 'rightDoor'),
    paint(/^TwiXeR_W223_sideskirt_L_antichrome/, 'leftDoor'),
    paint(/^TwiXeR_W223_sideskirt_R_antichrome/, 'rightDoor'),
    paint(/^TwiXeR_W223_fender_FL/, 'leftFrontFender'),
    paint(/^TwiXeR_W223_fender_FR/, 'rightFrontFender'),
    paint(/^TwiXeR_W223_trunk_antichrome/, 'trunk'),
    paint(/^TwiXeR_W223_mirror_L/, 'leftMirror'),
    paint(/^TwiXeR_W223_mirror_R/, 'rightMirror'),
    paint(/^TwiXeR_W223_bumper_F_brabus/, 'frontBumper'),
    paint(/^TwiXeR_W223_brabus_bumper_R/, 'rearBumper'),
    { node: /^TwiXeR_W223_body_50$/, mesh: /^Object_(267|268|269|270)$/, material: PAINT, part: 'mainBody', role: 'bodyPaint', represents: ['roof', 'leftRearFender', 'rightRearFender'] },

    // ---- labelling only; authored materials are kept ----
    { node: /exhaust/, part: 'mainBody', role: 'exhaust' },
    { node: /(seat|dash|console|doorpanel|steer|interior)/, part: 'mainBody', role: 'interior' },
  ],
}
