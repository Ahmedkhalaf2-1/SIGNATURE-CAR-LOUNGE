import {
  Box3,
  BufferAttribute,
  BufferGeometry,
  DoubleSide,
  Group,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  Vector3,
  type Material,
  type Object3D,
} from 'three'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import { EXPLODE_OFFSETS } from '../constants'
import { MANAGED_ROLES, type MaterialRole, type PaintPanelId, type VehiclePartId } from '../types'
import type { LoadedVehicle, MappedMesh, VehicleCapabilities } from './types'
import type { MaterialTweak, MeshRule, Region, VehicleModelConfig } from './vehicleModelConfig'

const isMesh = (o: Object3D): o is Mesh => (o as Mesh).isMesh === true
const firstMaterial = (m: Mesh): Material => (Array.isArray(m.material) ? m.material[0] : m.material)
const isManaged = (role: MaterialRole) => MANAGED_ROLES.includes(role)

function ancestorNames(o: Object3D): string[] {
  const names: string[] = []
  for (let p: Object3D | null = o; p; p = p.parent) if (p.name) names.push(p.name)
  return names
}

function findRule(rules: readonly MeshRule[], mesh: Mesh, materialName: string): MeshRule | undefined {
  const names = ancestorNames(mesh)
  return rules.find(
    (r) =>
      (!r.node || names.some((n) => r.node!.test(n))) &&
      (!r.mesh || r.mesh.test(mesh.name)) &&
      (!r.material || r.material.test(materialName)),
  )
}

/** Development aid: prints a compact picture of the file so a new GLB can be mapped quickly. */
function logStructure(config: VehicleModelConfig, scene: Object3D, box: Box3) {
  const byMaterial = new Map<string, { meshes: number; triangles: number }>()
  let meshes = 0
  scene.traverse((o) => {
    if (!isMesh(o)) return
    meshes++
    const key = firstMaterial(o).name || '(unnamed material)'
    const e = byMaterial.get(key) ?? { meshes: 0, triangles: 0 }
    e.meshes++
    e.triangles += Math.round((o.geometry.index?.count ?? o.geometry.attributes.position.count) / 3)
    byMaterial.set(key, e)
  })
  const size = box.getSize(new Vector3())
  console.groupCollapsed(`[visualizer] ${config.id}: ${meshes} meshes, ${byMaterial.size} materials`)
  console.table(Object.fromEntries(byMaterial))
  console.info('bounds (source units)', size.toArray().map((n) => +n.toFixed(4)))
  console.groupEnd()
}

/**
 * Exact clone of the authored material: textures, KHR_materials_specular / clearcoat, alpha mode, emissive,
 * everything. Used for every role the appearance system must NOT touch.
 */
function exactMaterial(source: Material, tweak: MaterialTweak | undefined): Material {
  const m = source.clone()
  const phys = m as MeshPhysicalMaterial
  // KHR_materials_transmission is not rendered: three filters what is behind a transmissive surface by its base colour, which
  // turns black-based clear covers into black blobs, and it costs an extra full-scene pass. Lenses fall back to their alpha.
  if (phys.transmission > 0) phys.transmission = 0
  if (tweak) {
    const s = m as MeshStandardMaterial
    if (tweak.colorScale !== undefined) s.color.multiplyScalar(tweak.colorScale)
    if (tweak.metalness !== undefined) s.metalness = tweak.metalness
    if (tweak.roughness !== undefined) s.roughness = tweak.roughness
    if (tweak.vertexColors !== undefined) m.vertexColors = tweak.vertexColors
    if (tweak.opacity !== undefined) {
      m.opacity = tweak.opacity
      m.transparent = true
    }
  }
  return m
}

/** A MeshPhysicalMaterial of our own for the two managed roles (maps and standard fields come across). */
function managedMaterial(source: Material, role: MaterialRole): MeshPhysicalMaterial {
  const m = new MeshPhysicalMaterial()
  if ((source as MeshStandardMaterial).isMeshStandardMaterial) MeshStandardMaterial.prototype.copy.call(m, source)
  m.name = `${role}:${source.name}`
  m.transmission = 0
  // Always compiled in so changing finishes later never triggers a shader recompile hitch.
  m.clearcoat = Math.max(m.clearcoat, 0.001)
  m.sheen = Math.max(m.sheen, 0.0001)
  if (role === 'glass') {
    // Standard alpha blending. (A custom "absorb then add reflection" blend was tried and did not darken the cabin at all.) Alpha
    // also scales the reflection, which the appearance system compensates for through envMapIntensity.
    m.transparent = true
    m.depthWrite = false
    m.side = DoubleSide
    m.metalness = 0
    m.ior = 1.52
  }
  return m
}

/** Depth-only twin of a glass mesh: lets only the nearest glass layer blend (see `buildVehicle`). */
const makeGlassPrepassMaterial = () =>
  new MeshBasicMaterial({
    colorWrite: false,
    depthWrite: true,
    // Transparent so it sorts with the glass (after interior parts that are alpha blended), not in the opaque queue.
    transparent: true,
    side: DoubleSide,
    polygonOffset: true,
    polygonOffsetFactor: 1,
    polygonOffsetUnits: 1,
  })

/** Connected pieces of a geometry (triangles sharing vertices), as lists of triangle indices. */
function connectedPieces(g: BufferGeometry): number[][] {
  const index = g.index ? Array.from(g.index.array) : Array.from({ length: g.attributes.position.count }, (_, i) => i)
  const parent = Array.from({ length: g.attributes.position.count }, (_, i) => i)
  const find = (x: number): number => {
    while (parent[x] !== x) {
      parent[x] = parent[parent[x]]
      x = parent[x]
    }
    return x
  }
  for (let t = 0; t < index.length; t += 3) {
    const a = find(index[t])
    parent[find(index[t + 1])] = a
    parent[find(index[t + 2])] = a
  }
  const pieces = new Map<number, number[]>()
  for (let t = 0; t < index.length; t += 3) {
    const r = find(index[t])
    const list = pieces.get(r) ?? []
    list.push(t / 3)
    pieces.set(r, list)
  }
  return [...pieces.values()]
}

/**
 * For flat-shaded "triangle soup" meshes (vertices not shared between triangles) connected pieces are single triangles, so
 * instead every triangle is classified by its own centre and the triangles of one region are returned as ONE piece.
 */
function trianglesByRegion(g: BufferGeometry, matrix: Matrix4, rule: MeshRule): { tris: number[]; region: Region | undefined; c?: Vector3 }[] {
  const pos = g.attributes.position
  const count = (g.index ? g.index.count : pos.count) / 3
  const v = new Vector3()
  const c = new Vector3()
  const buckets = new Map<Region | undefined, number[]>()
  for (let t = 0; t < count; t++) {
    c.set(0, 0, 0)
    for (let k = 0; k < 3; k++) c.add(v.fromBufferAttribute(pos, g.index ? g.index.getX(t * 3 + k) : t * 3 + k).applyMatrix4(matrix))
    c.multiplyScalar(1 / 3)
    const ctx = { center: { x: c.x, y: c.y, z: c.z } }
    const region = rule.regions!.find((r) => r.when(ctx))
    const list = buckets.get(region) ?? []
    list.push(t)
    buckets.set(region, list)
  }
  return [...buckets].map(([region, tris]) => ({ tris, region }))
}

/** New geometry containing only the given triangles, with unused vertices dropped. */
function subsetGeometry(source: BufferGeometry, triangles: readonly number[]): BufferGeometry {
  const srcIndex = source.index
  const remap = new Map<number, number>()
  const order: number[] = []
  const index: number[] = []
  for (const t of triangles) {
    for (let k = 0; k < 3; k++) {
      const v = srcIndex ? srcIndex.getX(t * 3 + k) : t * 3 + k
      let n = remap.get(v)
      if (n === undefined) {
        n = order.length
        remap.set(v, n)
        order.push(v)
      }
      index.push(n)
    }
  }
  const g = new BufferGeometry()
  for (const name of ['position', 'normal', 'uv', 'color']) {
    const a = source.getAttribute(name)
    if (!a) continue
    // Colour is normalised to float RGB. The GLB's COLOR_0 is RGBA with alpha ~0 on glass and lamps (a bake channel, not
    // transparency); a 4-component colour makes three multiply opacity by it and the surface vanishes.
    const size = name === 'color' ? 3 : a.itemSize
    const out = new Float32Array(order.length * size).fill(1)
    order.forEach((v, i) => {
      for (let c = 0; c < Math.min(size, a.itemSize); c++) out[i * size + c] = a.getComponent(v, c)
    })
    g.setAttribute(name, new BufferAttribute(out, size))
  }
  g.setIndex(index)
  return g
}

/** Bakes `geometry` into `matrix` space, keeping only the attributes every mesh in a merge group is guaranteed to share. */
function bakeGeometry(source: BufferGeometry, matrix: Matrix4): BufferGeometry {
  const g = source.clone()
  for (const name of Object.keys(g.attributes)) if (!['position', 'normal', 'uv', 'color'].includes(name)) g.deleteAttribute(name)
  // This GLB's materials multiply by vertex colour (COLOR_0). Dropping the attribute makes them read black, so it is kept,
  // normalised to float RGB (white when a source mesh has none) so every geometry in a merge group is compatible, and so the
  // authored alpha channel (~0 on glass and lamps) never reaches the shader.
  const col = g.getAttribute('color')
  const count = g.attributes.position.count
  const rgb = new Float32Array(count * 3).fill(1)
  if (col) for (let i = 0; i < count; i++) for (let c = 0; c < Math.min(3, col.itemSize); c++) rgb[i * 3 + c] = col.getComponent(i, c)
  g.setAttribute('color', new BufferAttribute(rgb, 3))
  if (!g.attributes.normal) g.computeVertexNormals()
  if (!g.attributes.uv) g.setAttribute('uv', new BufferAttribute(new Float32Array(g.attributes.position.count * 2), 2))
  if (!g.index) g.setIndex(Array.from({ length: g.attributes.position.count }, (_, i) => i))
  g.applyMatrix4(matrix)
  // A mirrored instance (negative determinant) flips triangle winding; restore it or lighting inverts on that part.
  if (matrix.determinant() < 0) {
    const idx = g.index!
    for (let i = 0; i < idx.count; i += 3) {
      const b = idx.getX(i + 1)
      idx.setX(i + 1, idx.getX(i + 2))
      idx.setX(i + 2, b)
    }
  }
  return g
}

interface Piece {
  role: MaterialRole
  part: VehiclePartId
  rule: MeshRule
  source: Material
  geometry: BufferGeometry
}

/**
 * Clones the glTF scene, maps its meshes onto semantic roles/parts via the config, merges fragmented parts, splits
 * shared-material meshes by position, and normalises it: orientation fixed, scaled to `targetLength`, centred on the
 * origin, lowest vertex on the floor.
 */
export function buildVehicle(source: Object3D, config: VehicleModelConfig): LoadedVehicle {
  const clone = source.clone(true)
  const orient = new Group()
  orient.add(clone)
  orient.rotation.y = (config.yawDegrees * Math.PI) / 180
  const root = new Group()
  root.name = `vehicle:${config.id}`
  root.add(orient)

  const box = new Box3()
  const measure = () => {
    root.updateMatrixWorld(true)
    return box.setFromObject(root)
  }

  let size = measure().getSize(new Vector3())
  // Long axis along X means the file is rotated a quarter turn from our +Z-forward convention.
  if (size.x > size.z * 1.05) {
    orient.rotation.y += Math.PI / 2
    size = measure().getSize(new Vector3())
  }
  if (import.meta.env.DEV) logStructure(config, clone, box)

  root.scale.setScalar(config.targetLength / Math.max(size.x, size.z))
  measure()
  const center = box.getCenter(new Vector3())
  root.position.set(-center.x, config.verticalOffset - box.min.y, -center.z)
  measure()

  const finalSize = box.getSize(new Vector3())
  const finalCenter = box.getCenter(new Vector3())
  const rootInverse = new Matrix4().copy(root.matrixWorld).invert()

  const meshes: MappedMesh[] = []
  const owned: BufferGeometry[] = []
  let basePaintColor = '#d9dce2'
  const found: Mesh[] = []
  clone.traverse((o) => isMesh(o) && found.push(o))

  const pieces: Piece[] = []
  const centreOf = (g: BufferGeometry, triangles: readonly number[], matrix: Matrix4) => {
    const b = new Box3()
    const v = new Vector3()
    const pos = g.attributes.position
    for (const t of triangles) {
      for (let k = 0; k < 3; k++) {
        v.fromBufferAttribute(pos, g.index ? g.index.getX(t * 3 + k) : t * 3 + k).applyMatrix4(matrix)
        b.expandByPoint(v)
      }
    }
    return b.getCenter(new Vector3())
  }

  const register = (mesh: Mesh, rule: MeshRule, role: MaterialRole, part: VehiclePartId, material: Material) => {
    if (role === 'bodyPaint') basePaintColor = `#${(material as MeshPhysicalMaterial).color.getHexString()}`
    const offset = EXPLODE_OFFSETS[part]
    let explodeLocal: Vector3 | null = null
    if (offset && mesh.parent) {
      mesh.parent.updateMatrixWorld(true)
      const inverse = new Matrix4().copy(mesh.parent.matrixWorld).invert()
      explodeLocal = new Vector3(...offset).applyMatrix4(inverse).sub(new Vector3().applyMatrix4(inverse))
    }
    const represents: readonly PaintPanelId[] = rule.represents ?? (role === 'bodyPaint' ? [part as PaintPanelId] : [])
    mesh.userData.vehiclePart = part
    mesh.userData.vehicleRole = role
    // Glass is drawn after every other transparent surface (alpha-blended interior parts would otherwise paint over it).
    if (role === 'glass') mesh.renderOrder = 10
    // Only paint is interactive; skipping raycasts on everything else keeps hover cheap on a 225k-triangle car.
    if (role !== 'bodyPaint') mesh.raycast = () => {}
    meshes.push({ mesh, material, part, role, represents, explodeLocal, restPosition: mesh.position.clone() })
  }

  const materialFor = (src: Material, role: MaterialRole, rule: MeshRule) =>
    isManaged(role) ? managedMaterial(src, role) : exactMaterial(src, rule.tweak)

  for (const mesh of found) {
    const original = firstMaterial(mesh)
    const rule = findRule(config.mapping, mesh, original.name)
    if (!rule) {
      // Unmapped: kept exactly as authored, not interactive.
      mesh.material = exactMaterial(original, undefined)
      mesh.raycast = () => {}
      continue
    }
    mesh.updateMatrixWorld(true)
    const toRoot = new Matrix4().multiplyMatrices(rootInverse, mesh.matrixWorld)

    if (rule.regions) {
      const groups = rule.perTriangle
        ? trianglesByRegion(mesh.geometry, mesh.matrixWorld, rule)
        : connectedPieces(mesh.geometry).map((tris) => {
            const c = centreOf(mesh.geometry, tris, mesh.matrixWorld)
            return { tris, region: rule.regions!.find((r) => r.when({ center: c })), c }
          })
      for (const { tris, region, c } of groups) {
        const role = region?.role ?? rule.role
        const part = region?.part ?? (typeof rule.part === 'function' ? rule.part({ center: c ?? centreOf(mesh.geometry, tris, mesh.matrixWorld) }) : rule.part)
        pieces.push({ role, part, rule, source: original, geometry: bakeGeometry(subsetGeometry(mesh.geometry, tris), toRoot) })
      }
      mesh.removeFromParent()
      continue
    }
    if (rule.merge) {
      const c = new Box3().setFromObject(mesh).getCenter(new Vector3())
      const part = typeof rule.part === 'function' ? rule.part({ center: c }) : rule.part
      pieces.push({ role: rule.role, part, rule, source: original, geometry: bakeGeometry(mesh.geometry, toRoot) })
      mesh.removeFromParent()
      continue
    }
    const part = typeof rule.part === 'function' ? rule.part({ center: new Box3().setFromObject(mesh).getCenter(new Vector3()) }) : rule.part
    const material = materialFor(original, rule.role, rule)
    mesh.material = material
    register(mesh, rule, rule.role, part, material)
  }

  // One mesh per (role, part, source material): fragments of the same thing become a single draw call.
  const groups = new Map<string, { head: Piece; geometries: BufferGeometry[] }>()
  for (const p of pieces) {
    const key = `${p.role}|${p.part}|${p.source.uuid}`
    const g = groups.get(key) ?? { head: p, geometries: [] }
    g.geometries.push(p.geometry)
    groups.set(key, g)
  }
  const prepassMaterial = makeGlassPrepassMaterial()
  for (const { head, geometries } of groups.values()) {
    const merged = mergeGeometries(geometries, false)
    geometries.forEach((x) => x.dispose())
    if (!merged) continue
    owned.push(merged)
    const material = materialFor(head.source, head.role, head.rule)
    const mesh = new Mesh(merged, material)
    mesh.name = `${head.role}:${head.part}:${head.source.name}`
    root.add(mesh)
    register(mesh, head.rule, head.role, head.part, material)
    if (head.role === 'glass') {
      // Depth pre-pass: the cabin has several stacked glass layers (outer, inner copies). Writing their depth first lets
      // only the nearest layer blend, so the glass keeps one layer's opacity instead of compounding into black.
      const pre = new Mesh(merged, prepassMaterial)
      pre.name = `${mesh.name}:depth`
      pre.renderOrder = 9
      pre.raycast = () => {}
      root.add(pre)
    }
  }

  const parts = new Set(meshes.map((m) => m.part))
  const roles = new Set(meshes.map((m) => m.role))
  const capabilities: VehicleCapabilities = {
    panelPrecision: meshes.some((m) => m.role === 'bodyPaint' && m.represents.length > 1) ? 'approximate' : 'full',
    separateGlass: roles.has('glass'),
    separateWindshield: parts.has('windshield'),
    separateWheels: ['frontLeftWheel', 'frontRightWheel', 'rearLeftWheel', 'rearRightWheel'].every((w) => parts.has(w as VehiclePartId)),
    explodableParts: new Set(meshes.filter((m) => m.explodeLocal).map((m) => m.part)).size,
  }

  let meshCount = 0
  root.traverse((o) => isMesh(o) && meshCount++)
  if (import.meta.env.DEV) {
    const table: Record<string, { meshes: number; triangles: number }> = {}
    for (const m of meshes) {
      const e = (table[`${m.role} / ${m.part}`] ??= { meshes: 0, triangles: 0 })
      e.meshes++
      e.triangles += Math.round((m.mesh.geometry.index?.count ?? m.mesh.geometry.attributes.position.count) / 3)
    }
    console.groupCollapsed(`[visualizer] ${config.id}: ${found.length} source meshes -> ${meshCount} after mapping`)
    console.table(table)
    console.groupEnd()
  }

  return {
    id: config.id,
    root,
    meshes,
    basePaintColor,
    bounds: { min: box.min.clone(), size: finalSize, center: finalCenter, radius: finalSize.length() / 2 },
    capabilities,
    ownedGeometries: owned,
    meshCount,
  }
}

export function disposeVehicle(vehicle: LoadedVehicle) {
  // Source geometry belongs to the shared glTF cache; our cloned materials and merged geometry are ours to free.
  vehicle.root.traverse((o) => {
    if (isMesh(o)) (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => m.dispose())
  })
  vehicle.ownedGeometries.forEach((g) => g.dispose())
}
