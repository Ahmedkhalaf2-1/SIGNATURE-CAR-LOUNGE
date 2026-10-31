import type { PartContext, Region, VehicleModelConfig } from '../vehicleModelConfig'
import type { VehiclePartId } from '../../types'

/**
 * Mercedes-AMG G900 by Brabus, Casacade Models, Sketchfab, CC-BY-4.0 (see ../../credits.ts).
 * 66 MB, 518k triangles, 109 meshes, 76 materials / textures. Y-up, authored in metres (2.20 x 2.04 x 4.81; the lowest vertex is the tyre,
 * y = -0.55).
 *
 * The structure is poor for configuration: node names are generic exports ("..._049_bodypaint_0"), many exterior parts share the interior
 * and trim materials (`door_handles`, `leather02_weave_*`), and each side's wheels are fused front+rear into single meshes. Only the
 * `bodypaint` material is used for the paint role; the wheels are carved out by position.
 */
const corner = (c: PartContext['center']): VehiclePartId | null => {
  if (Math.abs(c.x) < 0.6 || c.y > 0.75) return null
  return c.z > 0 ? (c.x > 0 ? 'frontLeftWheel' : 'frontRightWheel') : c.x > 0 ? 'rearLeftWheel' : 'rearRightWheel'
}
const wheelRegion = (part: VehiclePartId): Region => ({ when: ({ center }) => corner(center) === part, role: 'wheels', part })

export const MERCEDES_G900_BRABUS: VehicleModelConfig = {
  id: 'mercedes-g900-brabus',
  displayName: 'Mercedes-AMG G900 by Brabus',
  url: '/models/mercedes_amg_g900_by_brabus.glb',
  targetLength: 4.9,
  yawDegrees: 0,
  verticalOffset: 0,
  mapping: [
    {
      material: /^right_wheel(_\d)?$/,
      part: 'mainBody',
      role: 'trim',
      perTriangle: true,
      regions: (['frontLeftWheel', 'frontRightWheel', 'rearLeftWheel', 'rearRightWheel'] as const).map(wheelRegion),
    },
    { material: /^bodypaint$/, part: 'mainBody', role: 'bodyPaint' },
    { material: /^(ExtWindowsGlass|IntWindows)/, part: 'glass', role: 'glass' },
  ],
}
