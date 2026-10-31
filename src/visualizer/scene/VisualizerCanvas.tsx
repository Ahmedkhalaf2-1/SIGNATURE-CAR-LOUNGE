import { Suspense, useEffect, useMemo, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerformanceMonitor } from '@react-three/drei'
import { ACESFilmicToneMapping, SRGBColorSpace } from 'three'
import { resolveBodyConfig, resolveGlass } from '../materials/appearance'
import type { PaintPanelId, VisualizerState } from '../types'
import { useVehicleModel } from '../vehicle/useVehicleModel'
import { VehicleModel } from '../vehicle/VehicleModel'
import type { VehicleCapabilities } from '../vehicle/types'
import type { VehicleModelConfig } from '../vehicle/vehicleModelConfig'
import { CameraRig } from './CameraRig'
import { Studio } from './Studio'

export interface VehicleReadyInfo {
  id: string
  capabilities: VehicleCapabilities
}

interface Props {
  config: VehicleModelConfig
  state: VisualizerState
  reducedMotion: boolean
  compact: boolean
  /** Pixels covered by UI (x, y) and the size of the remaining free area (w, h). */
  inset: { x: number; y: number; w: number; h: number }
  ariaLabel: string
  onPanelToggle: (panel: PaintPanelId) => void
  onReady: (info: VehicleReadyInfo) => void
  onContextLost: () => void
}

function Stage({ config, state, reducedMotion, inset, onPanelToggle, onReady }: Omit<Props, 'compact' | 'ariaLabel' | 'onContextLost'>) {
  const vehicle = useVehicleModel(config)
  const { wrap, ppf, ceramic, tint, view, activeService } = state
  // Deterministic: the body and glass appearance are pure functions of the persistent treatment layers + the compare switch.
  // The open tab (activeService) and the camera never enter these dependencies.
  const body = useMemo(
    () => resolveBodyConfig({ wrap, ppf, ceramic, tint, view } as typeof state),
    // oxlint-disable-next-line react/exhaustive-deps
    [wrap, ppf, ceramic, view],
  )
  const glass = useMemo(
    () => resolveGlass({ tint, view } as typeof state),
    // oxlint-disable-next-line react/exhaustive-deps
    [tint, view],
  )
  const { target, center, extent } = useMemo(() => {
    const b = vehicle.bounds
    return {
      // Orbit point of the side / 3-4 views: a little below mid-height (waist line), on the real centre line.
      target: [b.center.x, b.min.y + b.size.y * 0.36, b.center.z] as const,
      // Orbit point of the Top view: the true centre of the bounding box.
      center: [b.center.x, b.center.y, b.center.z] as const,
      extent: [b.size.x, b.size.y, b.size.z] as const,
    }
  }, [vehicle])

  useEffect(() => {
    onReady({ id: vehicle.id, capabilities: vehicle.capabilities })
  }, [vehicle, onReady])

  return (
    <>
      <VehicleModel
        vehicle={vehicle}
        body={body}
        glass={glass}
        ppfCue={activeService === 'ppf' && ppf.enabled && view === 'treated'}
        selectable={activeService === 'ppf'}
        exploded={state.exploded}
        reducedMotion={reducedMotion}
        onPanelToggle={onPanelToggle}
      />
      <CameraRig target={target} center={center} extent={extent} radius={vehicle.bounds.radius} preset={state.camera.preset} nonce={state.camera.nonce} reducedMotion={reducedMotion} inset={inset} />
    </>
  )
}

/** Everything that touches three.js. Loaded lazily so the rest of the site never pays for it. */
export default function VisualizerCanvas({ compact, ariaLabel, onContextLost, ...stage }: Props) {
  const maxDpr = Math.min(window.devicePixelRatio || 1, compact ? 1.75 : 2)
  const [dpr, setDpr] = useState(maxDpr)

  return (
    <Canvas
      className="viz-canvas"
      frameloop="demand"
      dpr={dpr}
      camera={{ fov: 24, near: 0.1, far: 90, position: [5, 1.3, 7] }}
      gl={{ antialias: true, powerPreference: 'high-performance', toneMapping: ACESFilmicToneMapping, toneMappingExposure: 1.05, outputColorSpace: SRGBColorSpace }}
      onCreated={({ gl, scene, camera, invalidate }) => {
        // Development-only inspection handle (tree-shaken from production builds).
        if (import.meta.env.DEV) (window as unknown as { __viz?: unknown }).__viz = { gl, scene, camera, invalidate }
        gl.domElement.addEventListener('webglcontextlost', (e) => {
          e.preventDefault()
          onContextLost()
        })
      }}
      aria-label={ariaLabel}
      role="img"
    >
      <color attach="background" args={['#060509']} />
      {/* very light atmospheric falloff: pushes the far walls back without a visible haze layer */}
      <fog attach="fog" args={['#08070c', 16, 40]} />
      {/* Resolution only ever steps down when the frame rate really suffers, and never below 1x: the vehicle must stay sharp. */}
      <PerformanceMonitor onChange={({ factor }) => setDpr(Math.max(1, Math.round((1 + (maxDpr - 1) * factor) * 4) / 4))} />
      <Studio reflectionResolution={compact ? 384 : 768} exploded={stage.state.exploded} />
      <Suspense fallback={null}>
        <Stage {...stage} />
      </Suspense>
    </Canvas>
  )
}
