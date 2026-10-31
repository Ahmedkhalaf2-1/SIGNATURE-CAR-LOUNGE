import type { MaterialRole, PaintPanelId, VehiclePartId } from '../types'
import { PAINT_PANEL_IDS } from '../types'

/**
 * THE swap point for vehicles. Replacing the test car with a production GLB means editing this file only:
 * point `url` at the new asset and adjust `mapping` to its node/material names. The studio, camera, UI,
 * material system and configuration state never see raw node names.
 *
 * A rule matches a mesh when every given pattern matches; the first matching rule wins.
 *  - `node`     matches against ANY ancestor node name (glTF node names survive multi-primitive meshes)
 *  - `mesh`     matches the mesh's own name
 *  - `material` matches the glTF material name
 * Meshes that match nothing are kept as-is (cloned, never mutated).
 */
/** Centre of a mesh or piece in vehicle space (metres): x = left (+), y = up, z = forward (+). */
export interface PartContext {
  center: { x: number; y: number; z: number }
}

/** Surface appearance nudges for assets whose authored look is unsuitable. Never used for the Porsche. */
export interface MaterialTweak {
  colorScale?: number
  metalness?: number
  roughness?: number
  /** Authored alpha is replaced (used where the GLB relies on transmission, which we do not render). */
  opacity?: number
  /** Set false when the GLB tints a surface twice (base colour AND vertex colour), which would square the colour away. */
  vertexColors?: boolean
}

/** Classifies one connected piece of a mesh by where it sits; the first matching region wins. */
export interface Region {
  when: (ctx: PartContext) => boolean
  role: MaterialRole
  part: VehiclePartId
}

export interface MeshRule {
  node?: RegExp
  mesh?: RegExp
  material?: RegExp
  /** A fixed part, or a function that picks the part from where the mesh sits (e.g. which wheel corner). */
  part: VehiclePartId | ((ctx: PartContext) => VehiclePartId)
  role: MaterialRole
  /** Bake every matching mesh into one mesh per (part, material): hundreds of draw calls (x3 render passes) become a handful. */
  merge?: boolean
  /**
   * Split the mesh into its connected pieces and classify each by position. Needed when one mesh (or one shared
   * material) covers different things, e.g. windshield and headlight covers. Pieces matching no region use `role`/`part`.
   */
  regions?: readonly Region[]
  /** Classify every triangle by its own centre instead of by connected piece. For flat-shaded meshes whose triangles share no vertices. */
  perTriangle?: boolean
  /** Only for non-managed roles: tweak the clone. Omit to keep the material exactly as authored. */
  tweak?: MaterialTweak
  /**
   * Paint panels this mesh stands for. Omit for a mesh that is exactly one panel (`part`); list several
   * when the model fuses panels into one mesh. The UI then shows an "approximate preview" notice.
   */
  represents?: readonly PaintPanelId[]
}

export interface VehicleModelConfig {
  id: string
  /** Human-readable name shown in the summary and the request. */
  displayName: string
  /** Served from /public; never reference the Downloads folder at runtime. */
  url: string
  /** Longest horizontal dimension after normalisation, in metres. */
  targetLength: number
  /** Extra yaw in degrees if the source faces something other than +Z (front) / +X (left). */
  yawDegrees: number
  /** Lift above the floor in metres after the lowest vertex is grounded (wheels touch at 0). */
  verticalOffset: number
  mapping: readonly MeshRule[]
}

/** Vehicle-space zones used to tell lamp glass from window glass (+Z is the nose). */
const FRONT_LAMP_ZONE = ({ center: c }: PartContext) => c.z > 1.2 && c.y < 0.9
const REAR_LAMP_ZONE = ({ center: c }: PartContext) => c.z < -1.4 && c.y < 1

const wheelCorner = ({ center }: PartContext): VehiclePartId =>
  center.z > 0 ? (center.x > 0 ? 'frontLeftWheel' : 'frontRightWheel') : center.x > 0 ? 'rearLeftWheel' : 'rearRightWheel'

const wheel = (nodeName: string, part: VehiclePartId): MeshRule[] => [
  { node: new RegExp(`^${nodeName}$`), material: /^carTire$/, part, role: 'wheels', tweak: { colorScale: 0.13, roughness: 0.62, metalness: 0 } },
  { node: new RegExp(`^${nodeName}$`), part, role: 'wheels', tweak: { metalness: 0.95, roughness: 0.2 } },
]

/** Temporary test asset: Kenney "racing-kit" race car (low poly, fused body, separate glass + wheels). */
export const TEST_RACE_CAR: VehicleModelConfig = {
  id: 'racing-kit-raceCarWhite',
  displayName: 'Race Car (test model)',
  url: '/models/racing-kit-raceCarWhite.glb',
  targetLength: 4.5,
  yawDegrees: 0,
  verticalOffset: 0,
  mapping: [
    ...wheel('wheelFrontLeft', 'frontLeftWheel'),
    ...wheel('wheelFrontRight', 'frontRightWheel'),
    ...wheel('wheelBackLeft', 'rearLeftWheel'),
    ...wheel('wheelBackRight', 'rearRightWheel'),
    { node: /^body$/, material: /^glass$/, part: 'glass', role: 'glass' },
    { node: /^body$/, material: /^grey$/, part: 'mainBody', role: 'bodyPaint', represents: PAINT_PANEL_IDS },
    { node: /^body$/, part: 'mainBody', role: 'trim', tweak: { colorScale: 0.34, metalness: 0.35, roughness: 0.4 } },
  ],
}

/**
 * 2004 Porsche Carrera GT (Sketchfab FBX export, ~18 MB, 225k triangles, 1,331 meshes, 31 textures).
 * Authored at 1/100 scale, Y-up, nose toward +Z (engine at -Z), so no yaw is needed.
 * Structure: one fused paint shell (`C1_Paint`), separate glass (`C1_Vidrios_Tr`), a modelled interior and engine, and
 * four wheel clusters made of ~1,300 tiny meshes (`Wheel1A_Details` + `CallipersCalliperA_Details`), merged at load.
 */
export const PORSCHE_CARRERA_GT: VehicleModelConfig = {
  id: 'porsche-carrera-gt-2004',
  displayName: 'Porsche Carrera GT',
  url: '/models/2004_porsche_carrera_gt.glb',
  targetLength: 4.5,
  yawDegrees: 0,
  verticalOffset: 0,
  mapping: [
    // ---- wheels and brakes: fused per corner, kept exactly as authored ----
    { node: /^Wheel1A_3D$/, material: /Calliper/, part: wheelCorner, role: 'brakes', merge: true },
    { node: /^Wheel1A_3D$/, part: wheelCorner, role: 'wheels', merge: true },

    // ---- body paint: the only surface Wrap / PPF / Ceramic may change ----
    { material: /^C1_Paint$/, part: 'mainBody', role: 'bodyPaint', represents: PAINT_PANEL_IDS },

    // ---- glass family: `C1_Vidrios_Tr` also clads the headlights, taillights and lamps, so it is split by position ----
    {
      material: /^C1_Vidrios_Tr$/,
      part: 'glass',
      role: 'glass',
      regions: [
        { when: FRONT_LAMP_ZONE, role: 'headlights', part: 'headlights' },
        { when: REAR_LAMP_ZONE, role: 'taillights', part: 'taillights' },
        { when: ({ center: c }) => Math.abs(c.x) < 0.3 && c.z > 0.3 && c.y > 0.8, role: 'glass', part: 'windshield' },
        { when: ({ center: c }) => c.z < -0.3, role: 'glass', part: 'rearGlass' },
        { when: ({ center: c }) => c.x > 0, role: 'glass', part: 'leftWindow' },
        { when: () => true, role: 'glass', part: 'rightWindow' },
      ],
    },
    // lamp units (housings, reflectors, textures) and the red rear lens: front vs rear by position, never modified
    {
      material: /^C1_Light$/,
      part: 'taillights',
      role: 'taillights',
      regions: [{ when: FRONT_LAMP_ZONE, role: 'headlights', part: 'headlights' }],
    },
    // The red rear lens is authored as a transmissive 25%-alpha lens, tinted by its red base colour AND red vertex colours (multiplied
    // together that is near-black). Transmission is not rendered (see buildVehicle), so it is alpha-blended over the textured lamp
    // unit with vertex colours off, which reproduces the original red look.
    { material: /^C1_Vidiro_Rojo$/, part: 'taillights', role: 'taillights', tweak: { opacity: 0.82, vertexColors: false } },

    // ---- everything else keeps its authored material; roles are for labelling and future control ----
    { node: /Engine\d/, part: 'mainBody', role: 'engine' },
    { node: /Interior\d/, part: 'mainBody', role: 'interior' },
    { material: /^C1_Carbon$/, part: 'mainBody', role: 'carbon' },
    {
      material: /^C1_Color_Plastico_Negro$/,
      part: 'mainBody',
      role: 'trim',
      regions: [{ when: ({ center: c }) => c.z < -1.95 && c.y < 0.6 && Math.abs(c.x) < 0.5, role: 'exhaust', part: 'mainBody' }],
    },
    { material: /^(C1_Grilla|C1_Brand|C1_Base|Default_Material)/, part: 'mainBody', role: 'trim' },
  ],
}

