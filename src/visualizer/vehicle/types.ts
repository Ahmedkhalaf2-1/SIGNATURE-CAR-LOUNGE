import type { BufferGeometry, Group, Material, Mesh, Vector3 } from 'three'
import type { MaterialRole, PaintPanelId, VehiclePartId } from '../types'

/** One renderable mesh of the vehicle with its semantic identity and its own (cloned) material. */
export interface MappedMesh {
  mesh: Mesh
  /** Our own material for `bodyPaint` / `glass`; an exact clone of the authored material for every other role. */
  material: Material
  part: VehiclePartId
  role: MaterialRole
  /** Paint panels this mesh stands for (a single panel on production models). */
  represents: readonly PaintPanelId[]
  /** Exploded-view displacement converted into this mesh's local space, or null if the part stays put. */
  explodeLocal: Vector3 | null
  restPosition: Vector3
}

export interface VehicleCapabilities {
  /** `full`: every panel is its own mesh. `approximate`: panels are fused, finishes apply to the whole mesh. */
  panelPrecision: 'full' | 'approximate'
  separateGlass: boolean
  /** True when the windshield is its own mesh, so tint can leave it alone. */
  separateWindshield: boolean
  separateWheels: boolean
  /** Parts that visibly move in the exploded view. */
  explodableParts: number
}

/** What the rest of the visualizer sees: no raw node names, no file name. */
export interface LoadedVehicle {
  id: string
  /** Normalised, grounded, centred object ready to be added to the studio. */
  root: Group
  meshes: readonly MappedMesh[]
  /** Hex colour of the factory paint, used as the "original" appearance. */
  basePaintColor: string
  bounds: { min: Vector3; size: Vector3; center: Vector3; radius: number }
  capabilities: VehicleCapabilities
  /** Geometry created at load time (merged meshes); the glTF cache owns the rest. */
  ownedGeometries: readonly BufferGeometry[]
  /** Draw-call count of the normalised model, for diagnostics. */
  meshCount: number
}
