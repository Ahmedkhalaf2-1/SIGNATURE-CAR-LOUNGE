import type { MeshRule, PartContext, VehicleModelConfig } from '../vehicleModelConfig'
import type { PaintPanelId, VehiclePartId } from '../../types'
import { PAINT_PANEL_IDS } from '../../types'

/**
 * Ddiaz Design Sketchfab exports (CC-BY-NC-SA-4.0, see ../../credits.ts: NON-COMMERCIAL, SHARE-ALIKE). All three share one authoring
 * pipeline: 1/100 scale, Y-up, nose +Z; mesh NAMES carry the roles (`..Paint_Material1_0`, `..Window_..`, `..LightA_..`, `Wheel1A_3D`), and
 * a car's whole shell is fused into one or two paint meshes, so PPF is approximate on the Bugatti and Pagani.
 */
const corner = ({ center }: PartContext): VehiclePartId =>
  center.z > 0 ? (center.x > 0 ? 'frontLeftWheel' : 'frontRightWheel') : center.x > 0 ? 'rearLeftWheel' : 'rearRightWheel'

const wheelsAndBrakes: MeshRule[] = [
  { mesh: /Wheel1A_3D/, part: corner, role: 'wheels', merge: true },
  { material: /CallipersCalliper/, part: corner, role: 'brakes', merge: true },
]

export const BUGATTI_TOURBILLON: VehicleModelConfig = {
  id: 'bugatti-tourbillon-2026',
  displayName: 'Bugatti Tourbillon (2026)',
  url: '/models/2026_bugatti_tourbillon.glb',
  targetLength: 4.7,
  yawDegrees: 0,
  verticalOffset: 0,
  mapping: [
    ...wheelsAndBrakes,
    { mesh: /red_glass/, part: 'taillights', role: 'taillights' },
    { mesh: /2026LightA_/, part: 'headlights', role: 'headlights' },
    { mesh: /2026Window_Material1/, part: 'glass', role: 'glass' },
    { mesh: /2026Paint_Material1_0$|Paint_Material_col_2_0$/, part: 'mainBody', role: 'bodyPaint', represents: PAINT_PANEL_IDS },
    { mesh: /2026InteriorA_|InteriorTilling|InteriorColour/, part: 'mainBody', role: 'interior' },
    { mesh: /2026EngineA_/, part: 'mainBody', role: 'engine' },
    { mesh: /2026Carbon1/, part: 'mainBody', role: 'carbon' },
  ],
}

export const PAGANI_HUAYRA_R_EVO: VehicleModelConfig = {
  id: 'pagani-huayra-r-evo-roadster-2025',
  displayName: 'Pagani Huayra R Evo Roadster (2025)',
  url: '/models/2025_pagani_huayra_r_evo_roadster.glb',
  targetLength: 4.9,
  yawDegrees: 0,
  verticalOffset: 0,
  mapping: [
    ...wheelsAndBrakes,
    { mesh: /light_glass/, part: 'headlights', role: 'headlights' },
    { mesh: /2024LightA_/, part: 'taillights', role: 'taillights' },
    { mesh: /2024WindowA_/, part: 'glass', role: 'glass' },
    { mesh: /2024PaintA_Material1_0$/, part: 'mainBody', role: 'bodyPaint', represents: PAINT_PANEL_IDS },
    { mesh: /2024InteriorA_|int_color/, part: 'mainBody', role: 'interior' },
    { mesh: /2024Carbon1/, part: 'mainBody', role: 'carbon' },
  ],
}

const PAINT = /^A45MI_1236020001_002$/
const paint = (mesh: RegExp, part: VehiclePartId, represents?: readonly PaintPanelId[]): MeshRule => ({
  mesh,
  material: PAINT,
  part,
  role: 'bodyPaint',
  ...(represents ? { represents } : {}),
})

/** 2023 Mercedes-Benz A45 S AMG 4Matic: separate panel nodes (SK_Hood, SK_Door_FL, SM_Bumper_F ...) sharing one textured paint material. */
export const MERCEDES_A45_S_AMG: VehicleModelConfig = {
  id: 'mercedes-a45-s-amg-2023',
  displayName: 'Mercedes-AMG A45 S 4MATIC (2023)',
  url: '/models/2023_mercedes-benz_a45_s_amg_4matic.glb',
  targetLength: 4.4,
  yawDegrees: 0,
  verticalOffset: 0,
  mapping: [
    { material: /^A45MI_Change_Brake1$/, part: corner, role: 'brakes', merge: true },
    { material: /^A45MI_ChangeA_(Rim1|Tyre1)$/, part: corner, role: 'wheels', merge: true },
    { material: /^A45MI_Glass_Light1$/, part: 'headlights', role: 'headlights' },
    { material: /^A45MI_Light1$/, part: 'headlights', role: 'headlights' },
    { material: /^A45MI_Glass_In_WindowGlass1$/, part: 'glass', role: 'glass' },
    paint(/SK_Hood/, 'hood'),
    paint(/SK_Door_(FL|BL)/, 'leftDoor'),
    paint(/SK_Door_(FR|BR)/, 'rightDoor'),
    paint(/SK_Trunk/, 'trunk'),
    paint(/SM_Bumper_F/, 'frontBumper'),
    paint(/SM_Bumper_B/, 'rearBumper'),
    paint(/SM_Roof/, 'roof'),
    paint(/SideMirror_L/, 'leftMirror'),
    paint(/SideMirror_R/, 'rightMirror'),
    paint(/SM_Fender_F/, 'mainBody', ['leftFrontFender', 'rightFrontFender']),
    paint(/SM_Fender_B/, 'mainBody', ['leftRearFender', 'rightRearFender']),
    paint(/SM_(Body|SideSkirts|Spoiler|Diffuser)/, 'mainBody', ['leftDoor', 'rightDoor', 'roof']),
    { material: /^A45MI_Exhaust1$/, part: 'mainBody', role: 'exhaust' },
    { material: /^A45MI_Engine1$/, part: 'mainBody', role: 'engine' },
    { material: /^A45MI_Cabin/, part: 'mainBody', role: 'interior' },
  ],
}

export const MCLAREN_W1: VehicleModelConfig = {
  id: 'mclaren-w1-2025',
  displayName: 'McLaren W1 (2025)',
  url: '/models/2025_mclaren_w1.glb',
  targetLength: 4.7,
  yawDegrees: 0,
  verticalOffset: 0,
  mapping: [
    ...wheelsAndBrakes,
    { material: /^calipe_color$/, part: corner, role: 'brakes', merge: true },
    { mesh: /light_glass/, part: 'headlights', role: 'headlights' },
    { mesh: /2025LightA_|LightEmissive/, part: 'headlights', role: 'headlights' },
    { mesh: /red_glass/, part: 'taillights', role: 'taillights' },
    { mesh: /2025Window_Material1/, part: 'glass', role: 'glass' },
    { mesh: /2025Paint_Material1_0$/, part: 'mainBody', role: 'bodyPaint', represents: PAINT_PANEL_IDS },
    { mesh: /2025InteriorA_/, part: 'mainBody', role: 'interior' },
    { mesh: /2025Carbon1/, part: 'mainBody', role: 'carbon' },
  ],
}

export const PORSCHE_918_SPYDER: VehicleModelConfig = {
  id: 'porsche-918-spyder-2026',
  displayName: 'Porsche 918 Spyder Asphalt Edition (2026)',
  url: '/models/2026_porsche_918_spyder_asphalt_edition.glb',
  targetLength: 4.6,
  yawDegrees: 0,
  verticalOffset: 0,
  mapping: [
    { material: /^P1shared_calipers/, part: corner, role: 'brakes', merge: true },
    { material: /^(Rim_Color|P1shared_tires_street1)$/, part: corner, role: 'wheels', merge: true },
    { material: /^glassLsight$/, part: 'headlights', role: 'headlights' },
    { material: /^P1car_Mistery_Porsche_glass1$/, part: 'glass', role: 'glass' },
    { material: /^(P1car_Mistery_Porsche_carpaint[12]|Internal_CarPaint)$/, part: 'mainBody', role: 'bodyPaint', represents: PAINT_PANEL_IDS },
    { material: /tiled_carbon/, part: 'mainBody', role: 'carbon' },
  ],
}

/** 2024 GMC Hummer EV SUV: panels are separate named nodes sharing the `CarPaint` material; black cladding (`blackpaint1`) stays as authored. */
export const GMC_HUMMER_EV: VehicleModelConfig = {
  id: 'gmc-hummer-ev-suv-2024',
  displayName: 'GMC Hummer EV SUV (2024)',
  url: '/models/2024_gmc_hummer_ev_suv.glb',
  targetLength: 5.0,
  yawDegrees: 0,
  verticalOffset: 0,
  mapping: [
    { material: /^Disk_BR$/, part: corner, role: 'brakes', merge: true },
    { mesh: /(?<!steering)wheel/i, material: /^(Hev_PlD_Grey|tire|Chrome_Br|aluminiumbrushed1|Gold_SH|Plastic_Diff)$/, part: corner, role: 'wheels', merge: true },
    { material: /^Light_glass1$/, part: 'headlights', role: 'headlights' },
    { material: /^red_glass$/, part: 'taillights', role: 'taillights' },
    { material: /^(Windows1|D_glass)$/, part: 'glass', role: 'glass' },
    { mesh: /Door_FL|Door_BL|Door_RL/, material: /^CarPaint$/, part: 'leftDoor', role: 'bodyPaint' },
    { mesh: /Door_FR|Door_BR|Door_RR/, material: /^CarPaint$/, part: 'rightDoor', role: 'bodyPaint' },
    { material: /^CarPaint$/, part: 'mainBody', role: 'bodyPaint', represents: ['hood', 'frontBumper', 'rearBumper', 'roof', 'leftFrontFender', 'rightFrontFender', 'leftRearFender', 'rightRearFender', 'trunk', 'leftMirror', 'rightMirror'] },
    { material: /^(Leather|Fabric|Cerpet|stitches|seatb)/, part: 'mainBody', role: 'interior' },
  ],
}
