import { useEffect, useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import type { Material, Mesh, Object3D, Texture } from 'three'
import { buildVehicle, disposeVehicle } from './buildVehicle'
import type { LoadedVehicle } from './types'
import type { VehicleModelConfig } from './vehicleModelConfig'

// Draco is not used by our assets, so skip its decoder; meshopt (used by the test car) stays on.
export const preloadVehicle = (config: VehicleModelConfig) => useGLTF.preload(config.url, false, true)

const pendingRelease = new Map<string, number>()

/** Frees the GPU buffers and the glTF cache entry of a vehicle that is no longer shown (switching cars must not leak). */
function releaseSource(url: string, scene: Object3D) {
  scene.traverse((o) => {
    const mesh = o as Mesh
    if (!mesh.isMesh) return
    mesh.geometry.dispose()
    for (const m of Array.isArray(mesh.material) ? mesh.material : [mesh.material]) {
      for (const v of Object.values(m as Material & Record<string, unknown>)) if ((v as Texture | null)?.isTexture) (v as Texture).dispose()
      m.dispose()
    }
  })
  useGLTF.clear(url)
}

/** Suspends while the GLB loads, then returns a normalised, semantically mapped vehicle. */
export function useVehicleModel(config: VehicleModelConfig): LoadedVehicle {
  const gltf = useGLTF(config.url, false, true)
  const vehicle = useMemo(() => buildVehicle(gltf.scene, config), [gltf.scene, config])
  useEffect(() => () => disposeVehicle(vehicle), [vehicle])
  // Release the downloaded model when the viewer leaves it. Deferred one tick so React StrictMode's simulated unmount
  // (which remounts immediately) does not throw the model away.
  useEffect(() => {
    window.clearTimeout(pendingRelease.get(config.url))
    return () => {
      pendingRelease.set(config.url, window.setTimeout(() => releaseSource(config.url, gltf.scene), 250))
    }
  }, [config.url, gltf.scene])
  return vehicle
}
