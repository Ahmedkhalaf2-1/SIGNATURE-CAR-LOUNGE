import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Color, MathUtils, type MeshPhysicalMaterial } from 'three'
import type { MappedMesh } from '../vehicle/types'
import type { PbrTarget } from '../types'

const NUMERIC = ['metalness', 'roughness', 'clearcoat', 'clearcoatRoughness', 'envMapIntensity', 'sheen', 'sheenRoughness', 'emissiveIntensity', 'opacity'] as const
const COLORS = ['color', 'sheenColor', 'emissive'] as const
/** Clearcoat and sheen stay marginally above zero so their shader paths are compiled once, not toggled. */
const FLOOR: Partial<Record<(typeof NUMERIC)[number], number>> = { clearcoat: 0.001, sheen: 0.0001 }

interface Slot {
  target: PbrTarget
  colors: Record<(typeof COLORS)[number], Color>
}

/**
 * Eases each mesh's own material toward a target PBR description. Frame-rate independent and only keeps
 * the on-demand render loop alive while something is still moving. Targets are written imperatively,
 * so changing a finish never re-renders React or rebuilds materials.
 */
export function useMaterialAnimator(meshes: readonly MappedMesh[], reducedMotion: boolean) {
  const invalidate = useThree((s) => s.invalidate)
  const scene = useThree((s) => s.scene)
  const slots = useRef(new Map<MappedMesh, Slot>())
  const lambda = reducedMotion ? 60 : 9

  const setTarget = useRef((mapped: MappedMesh, target: PbrTarget) => {
    let slot = slots.current.get(mapped)
    if (!slot) {
      slot = { target, colors: { color: new Color(), sheenColor: new Color(), emissive: new Color() } }
      slots.current.set(mapped, slot)
      // First target is applied instantly: no fade-in from the loader's raw colours.
      const m = mapped.material as MeshPhysicalMaterial
      for (const k of NUMERIC) m[k] = Math.max(FLOOR[k] ?? 0, target[k])
      for (const k of COLORS) m[k].set(target[k])
    }
    slot.target = target
    for (const k of COLORS) slot.colors[k].set(target[k])
  })

  useEffect(() => {
    const map = slots.current
    return () => map.clear()
  }, [meshes])

  useFrame((_, dt) => {
    let moving = false
    for (const [mapped, slot] of slots.current) {
      // Only bodyPaint and glass ever get a slot; every other role keeps its authored material untouched.
      const m = mapped.material as MeshPhysicalMaterial
      // Since three r163 `scene.environment` ignores material.envMapIntensity; binding the map per material restores it.
      if (scene.environment && m.envMap !== scene.environment) {
        m.envMap = scene.environment
        m.needsUpdate = true
        moving = true
      }
      for (const k of NUMERIC) {
        const to = Math.max(FLOOR[k] ?? 0, slot.target[k])
        const next = MathUtils.damp(m[k], to, lambda, dt)
        const settled = Math.abs(next - to) < 0.002
        m[k] = settled ? to : next
        if (!settled) moving = true
      }
      const k = 1 - Math.exp(-lambda * dt)
      for (const c of COLORS) {
        const cur = m[c]
        const to = slot.colors[c]
        if (Math.abs(cur.r - to.r) + Math.abs(cur.g - to.g) + Math.abs(cur.b - to.b) > 0.003) {
          cur.lerp(to, k)
          moving = true
        } else cur.copy(to)
      }
      if (mapped.role === 'bodyPaint') m.transparent = m.opacity < 0.999
    }
    if (moving) invalidate()
  })

  return {
    setTarget: (mapped: MappedMesh, target: PbrTarget) => {
      setTarget.current(mapped, target)
      invalidate()
    },
  }
}
