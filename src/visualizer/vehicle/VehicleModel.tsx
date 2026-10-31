import { useCallback, useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import { useFrame, useThree, type ThreeEvent } from '@react-three/fiber'
import { MathUtils, type Object3D } from 'three'
import type { BodyConfig, GlassAppearance } from '../materials/appearance'
import { BodyFinishController } from '../materials/bodyShader'
import { useMaterialAnimator } from '../materials/useMaterialAnimator'
import { hoverStore } from '../state/hoverStore'
import type { PaintPanelId } from '../types'
import type { LoadedVehicle, MappedMesh } from './types'

interface Props {
  vehicle: LoadedVehicle
  body: BodyConfig
  glass: GlassAppearance
  /** True while the PPF editor is open and PPF is applied: shows a faint coverage cue on the body. */
  ppfCue: boolean
  /** PPF editor open: hovering the paint explains the panel limitation / lets real panel meshes be toggled. */
  selectable: boolean
  exploded: boolean
  reducedMotion: boolean
  onPanelToggle: (panel: PaintPanelId) => void
}

const smoothstep = (p: number) => p * p * (3 - 2 * p)

const setCursor = (el: HTMLElement, value: string) => {
  el.style.cursor = value
}

/** Renders a LoadedVehicle. Knows semantic parts and roles only; never raw node names. */
export function VehicleModel({ vehicle, body, glass, ppfCue, selectable, exploded, reducedMotion, onPanelToggle }: Props) {
  const gl = useThree((s) => s.gl)
  const invalidate = useThree((s) => s.invalidate)
  const { setTarget } = useMaterialAnimator(vehicle.meshes, reducedMotion)
  const hovered = useRef<MappedMesh | null>(null)
  const byObject = useMemo(() => new Map<Object3D, MappedMesh>(vehicle.meshes.map((m) => [m.mesh, m])), [vehicle])

  // Body paint: shader uniforms animate between full configurations (see materials/bodyShader.ts). No React state per frame.
  const controller = useMemo(
    () => new BodyFinishController(vehicle.meshes, { min: vehicle.bounds.min, size: vehicle.bounds.size }, vehicle.basePaintColor),
    [vehicle],
  )
  useLayoutEffect(() => {
    controller.attach()
  }, [controller])
  useEffect(() => {
    controller.setConfig(body, reducedMotion)
    invalidate()
  }, [controller, body, reducedMotion, invalidate])
  useEffect(() => {
    controller.setCue(ppfCue)
    invalidate()
  }, [controller, ppfCue, invalidate])

  // Glass: eased by the generic PBR animator.
  useEffect(() => {
    for (const m of vehicle.meshes) if (m.role === 'glass') setTarget(m, m.part === 'windshield' ? glass.windshield : glass.glass)
  }, [vehicle, glass, setTarget])

  // Leaving the PPF editor (or unmounting) must not leave a stale hover or cursor behind.
  useEffect(() => {
    if (selectable) return
    hovered.current = null
    hoverStore.set(null)
    setCursor(gl.domElement, '')
  }, [selectable, gl])
  useEffect(
    () => () => {
      hoverStore.set(null)
      setCursor(gl.domElement, '')
    },
    [gl],
  )

  const setHover = useCallback(
    (m: MappedMesh | null) => {
      if (hovered.current === m) return
      hovered.current = m
      if (m) {
        const approximate = m.represents.length > 1
        hoverStore.set({ part: approximate ? m.part : m.represents[0], approximate })
        setCursor(gl.domElement, approximate ? 'default' : 'pointer')
      } else {
        hoverStore.set(null)
        setCursor(gl.domElement, '')
      }
    },
    [gl],
  )

  const paintHit = (e: ThreeEvent<PointerEvent | MouseEvent>) => {
    const m = byObject.get(e.object)
    return m && m.role === 'bodyPaint' ? m : null
  }

  // Exploded view: one damped scalar drives every part, so it is deterministic and always reversible.
  const progress = useRef(0)
  useFrame((_, dt) => {
    if (controller.tick(dt)) invalidate()
    const to = exploded ? 1 : 0
    if (progress.current === to) return
    const next = MathUtils.damp(progress.current, to, reducedMotion ? 16 : 4.2, dt)
    progress.current = Math.abs(next - to) < 0.0015 ? to : next
    const k = smoothstep(progress.current) * (reducedMotion ? 0.35 : 1)
    for (const m of vehicle.meshes) {
      if (m.explodeLocal) m.mesh.position.copy(m.restPosition).addScaledVector(m.explodeLocal, k)
    }
    invalidate()
  })

  return (
    <primitive
      object={vehicle.root}
      onPointerOver={(e: ThreeEvent<PointerEvent>) => {
        if (!selectable) return
        e.stopPropagation()
        setHover(paintHit(e))
      }}
      onPointerMove={(e: ThreeEvent<PointerEvent>) => {
        if (!selectable) return
        setHover(paintHit(e))
      }}
      onPointerOut={() => selectable && setHover(null)}
      onClick={(e: ThreeEvent<MouseEvent>) => {
        if (!selectable || e.delta > 5) return
        const m = paintHit(e)
        // Fused-panel meshes cannot be toggled per panel: the UI explains this instead of faking precision.
        if (m && m.represents.length === 1) {
          e.stopPropagation()
          onPanelToggle(m.represents[0])
        }
      }}
    />
  )
}
