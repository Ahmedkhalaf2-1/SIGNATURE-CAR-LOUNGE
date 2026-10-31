import { useLayoutEffect, useMemo, useRef, type ReactNode } from 'react'
import { useFrame } from '@react-three/fiber'
import { AdditiveBlending, BackSide, CanvasTexture, DoubleSide, Object3D, SRGBColorSpace, type Group, type InstancedMesh } from 'three'
import { ContactShadows, Environment, Lightformer, MeshReflectorMaterial } from '@react-three/drei'
import { PURPLE, STUDIO } from '../constants'

const { roomHalfWidth: HW, roomHalfDepth: HD, ceilingY, ceilingStripX, ceilingStripY, ceilingStripLength, ceilingStripWidth, sideStripX, sideStripY, sideStripTilt, sideStripLength, wallSlitZ, bay } = STUDIO

/** HDR white for emissive LED geometry: tone mapped, so it rolls off instead of clipping flat. */
const LED = [4.2, 4.2, 4.5] as const
const LED_SOFT = [1.5, 1.5, 1.7] as const
const LED_PURPLE = [1.5, 0.4, 2.1] as const

function useGradientTexture(kind: 'radial' | 'vertical') {
  return useMemo(() => {
    const c = document.createElement('canvas')
    const g = c.getContext('2d')!
    if (kind === 'radial') {
      c.width = c.height = 128
      const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64)
      grad.addColorStop(0, 'rgba(255,255,255,1)')
      grad.addColorStop(1, 'rgba(255,255,255,0)')
      g.fillStyle = grad
      g.fillRect(0, 0, 128, 128)
    } else {
      // Light from the ceiling washing down the graphite walls: bright cove, fading to near black at the floor.
      c.width = 4
      c.height = 256
      const grad = g.createLinearGradient(0, 0, 0, 256)
      grad.addColorStop(0, '#ffffff')
      grad.addColorStop(0.3, '#7a7a7a')
      grad.addColorStop(0.7, '#202020')
      grad.addColorStop(1, '#000000')
      g.fillStyle = grad
      g.fillRect(0, 0, 4, 256)
    }
    const t = new CanvasTexture(c)
    t.colorSpace = SRGBColorSpace
    return t
  }, [kind])
}

/**
 * Everything that hangs from the ceiling. When the camera rises above the ceiling (the Top view looks straight down from higher
 * than the room) these are hidden so the vehicle is never looked at through, or hidden behind, the ceiling.
 */
function CeilingFixtures({ children }: { children: ReactNode }) {
  const ref = useRef<Group>(null)
  useFrame(({ camera }) => {
    if (ref.current) ref.current.visible = camera.position.y < ceilingY - 0.35
  })
  return <group ref={ref}>{children}</group>
}

const PANEL_W = 2.4
const PANEL_GAP = 0.07
const PANEL_H = 3.3
const PANEL_Y0 = 0.55

/** Wall cladding as one InstancedMesh: raised satin graphite panels with dark reveals between them. */
function WallPanels() {
  const ref = useRef<InstancedMesh>(null)
  const layout = useMemo(() => {
    const out: { p: [number, number, number]; ry: number }[] = []
    const run = (length: number, make: (u: number) => { p: [number, number, number]; ry: number }) => {
      const n = Math.floor(length / (PANEL_W + PANEL_GAP))
      const start = -(n * (PANEL_W + PANEL_GAP)) / 2 + (PANEL_W + PANEL_GAP) / 2
      for (let i = 0; i < n; i++) out.push(make(start + i * (PANEL_W + PANEL_GAP)))
    }
    const y = PANEL_Y0 + PANEL_H / 2
    run(HW * 2, (u) => ({ p: [u, y, -HD + 0.04], ry: 0 }))
    run(HW * 2, (u) => ({ p: [u, y, HD - 0.04], ry: Math.PI }))
    run(HD * 2, (u) => ({ p: [-HW + 0.04, y, u], ry: Math.PI / 2 }))
    run(HD * 2, (u) => ({ p: [HW - 0.04, y, u], ry: -Math.PI / 2 }))
    return out
  }, [])
  useLayoutEffect(() => {
    const m = ref.current
    if (!m) return
    const o = new Object3D()
    layout.forEach((l, i) => {
      o.position.set(...l.p)
      o.rotation.set(0, l.ry, 0)
      o.updateMatrix()
      m.setMatrixAt(i, o.matrix)
    })
    m.instanceMatrix.needsUpdate = true
  }, [layout])
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, layout.length]} frustumCulled={false}>
      <boxGeometry args={[PANEL_W, PANEL_H, 0.08]} />
      <meshStandardMaterial color="#202027" roughness={0.42} metalness={0.5} />
    </instancedMesh>
  )
}

/** Ceiling beams running across the bay; the LED rows hang just beneath them. */
function CeilingBeams() {
  const ref = useRef<InstancedMesh>(null)
  const zs = useMemo(() => Array.from({ length: 9 }, (_, i) => -14 + i * 3.5), [])
  useLayoutEffect(() => {
    const m = ref.current
    if (!m) return
    const o = new Object3D()
    zs.forEach((z, i) => {
      o.position.set(0, ceilingY - 0.16, z)
      o.updateMatrix()
      m.setMatrixAt(i, o.matrix)
    })
    m.instanceMatrix.needsUpdate = true
  }, [zs])
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, zs.length]} frustumCulled={false}>
      <boxGeometry args={[HW * 2, 0.32, 0.38]} />
      <meshStandardMaterial color="#0e0e12" roughness={0.6} metalness={0.5} />
    </instancedMesh>
  )
}

function Room() {
  const wash = useGradientTexture('vertical')
  return (
    <group>
      {/* wall backplane: the dark reveal visible between the panels, washed softly from above */}
      {(
        [
          [[0, ceilingY / 2, -HD], 0, HW * 2],
          [[0, ceilingY / 2, HD], Math.PI, HW * 2],
          [[-HW, ceilingY / 2, 0], Math.PI / 2, HD * 2],
          [[HW, ceilingY / 2, 0], -Math.PI / 2, HD * 2],
        ] as const
      ).map(([p, ry, w], i) => (
        <mesh key={i} position={[p[0], p[1], p[2]]} rotation-y={ry}>
          <planeGeometry args={[w, ceilingY]} />
          <meshStandardMaterial color="#0c0c10" roughness={0.8} metalness={0.2} emissive="#6a6b7c" emissiveMap={wash} emissiveIntensity={0.5} />
        </mesh>
      ))}
      <WallPanels />
      {/* glossy dark kick plate: catches the slit lights and anchors the walls to the floor */}
      {(
        [
          [[0, 0.27, -HD + 0.06], 0, HW * 2],
          [[0, 0.27, HD - 0.06], Math.PI, HW * 2],
          [[-HW + 0.06, 0.27, 0], Math.PI / 2, HD * 2],
          [[HW - 0.06, 0.27, 0], -Math.PI / 2, HD * 2],
        ] as const
      ).map(([p, ry, w], i) => (
        <mesh key={i} position={[p[0], p[1], p[2]]} rotation-y={ry}>
          <planeGeometry args={[w, 0.54]} />
          <meshStandardMaterial color="#09090c" roughness={0.28} metalness={0.7} />
        </mesh>
      ))}
      <CeilingFixtures>
        <mesh position={[0, ceilingY, 0]} rotation-x={Math.PI / 2}>
          <planeGeometry args={[HW * 2, HD * 2]} />
          <meshStandardMaterial color="#0a0a0d" roughness={0.9} side={DoubleSide} />
        </mesh>
        <CeilingBeams />
      </CeilingFixtures>
    </group>
  )
}

/** Ceiling LED rows, angled side rows, wall slits, bay outline and the restrained Signature accent. */
function Lights() {
  const glow = useGradientTexture('radial')
  return (
    <group>
      <CeilingFixtures>
        {ceilingStripX.map((x) => (
          <mesh key={x} position={[x, ceilingStripY, 0]} rotation-x={Math.PI / 2}>
            <planeGeometry args={[ceilingStripWidth, ceilingStripLength]} />
            <meshBasicMaterial color={LED} side={DoubleSide} />
          </mesh>
        ))}
      </CeilingFixtures>
      {([-1, 1] as const).map((side) => (
        <group key={side} position={[side * sideStripX, sideStripY, 0]} rotation-z={-side * sideStripTilt}>
          <mesh rotation-x={Math.PI / 2}>
            <planeGeometry args={[0.14, sideStripLength]} />
            <meshBasicMaterial color={LED_SOFT} side={DoubleSide} />
          </mesh>
        </group>
      ))}
      {/* floor-to-ceiling slits on the long walls */}
      {([-1, 1] as const).map((side) =>
        wallSlitZ.map((z) => (
          <mesh key={`${side}${z}`} position={[side * (HW - 0.03), ceilingY / 2, z]} rotation-y={-side * (Math.PI / 2)}>
            <planeGeometry args={[0.1, ceilingY - 0.4]} />
            <meshBasicMaterial color={LED_SOFT} />
          </mesh>
        )),
      )}
      {/* Signature accent: a thin violet line low on both end walls, with a soft wash */}
      {([-1, 1] as const).map((end) => (
        <group key={end} position={[0, 0, end * (HD - 0.1)]} rotation-y={end === 1 ? Math.PI : 0}>
          <mesh position={[0, 1.05, 0]}>
            <planeGeometry args={[14, 0.06]} />
            <meshBasicMaterial color={LED_PURPLE} />
          </mesh>
          <mesh position={[0, 1.05, -0.01]}>
            <planeGeometry args={[22, 3.6]} />
            <meshBasicMaterial map={glow} color={PURPLE.accent} transparent opacity={0.36} blending={AdditiveBlending} depthWrite={false} />
          </mesh>
        </group>
      ))}
      {/* service bay outline on the floor */}
      {(
        [
          [0, bay.halfLength, bay.halfWidth * 2, 0.035],
          [0, -bay.halfLength, bay.halfWidth * 2, 0.035],
          [bay.halfWidth, 0, 0.035, bay.halfLength * 2],
          [-bay.halfWidth, 0, 0.035, bay.halfLength * 2],
        ] as const
      ).map(([x, z, w, d], i) => (
        <mesh key={i} position={[x, 0.006, z]} rotation-x={-Math.PI / 2}>
          <planeGeometry args={[w, d]} />
          <meshBasicMaterial color={[0.5, 0.5, 0.56]} transparent opacity={0.55} depthWrite={false} />
        </mesh>
      ))}
      {/* faint pool of light on the epoxy under the vehicle */}
      <mesh position={[0, 0.004, 0]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[15, 15]} />
        <meshBasicMaterial map={glow} color="#c9cdf5" transparent opacity={0.018} blending={AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  )
}

/**
 * Baked once (frames=1): the same LED layout as the visible geometry, plus the hidden softbox rig that shapes the
 * paint: key (front left, large and soft), fill (front right, low), rims (behind, tall and narrow).
 */
function Reflections() {
  return (
    <Environment resolution={512} frames={1} background={false}>
      {/* graphite dome: the faint ambient the room would bounce back */}
      <mesh scale={60}>
        <sphereGeometry args={[1, 24, 16]} />
        <meshBasicMaterial color={[0.09, 0.09, 0.11]} side={BackSide} />
      </mesh>
      {/* overhead LED rows (match the visible fixtures) */}
      {ceilingStripX.map((x) => (
        <Lightformer key={x} form="rect" intensity={6} color="#fffaf2" position={[x, ceilingStripY, 0]} rotation-x={Math.PI / 2} scale={[ceilingStripWidth * 2.4, ceilingStripLength, 1]} />
      ))}
      {([-1, 1] as const).map((side) => (
        <group key={side} position={[side * sideStripX, sideStripY, 0]} rotation-z={-side * sideStripTilt}>
          <Lightformer form="rect" intensity={3.2} color="#f3f4ff" rotation-x={Math.PI / 2} scale={[0.5, sideStripLength, 1]} />
        </group>
      ))}
      {/* wall slits */}
      {([-1, 1] as const).map((side) =>
        wallSlitZ.map((z) => (
          <Lightformer key={`${side}${z}`} form="rect" intensity={2.4} color="#f3f4ff" position={[side * (HW - 0.05), ceilingY / 2, z]} rotation-y={-side * (Math.PI / 2)} scale={[0.3, ceilingY - 0.4, 1]} />
        )),
      )}
      {/* key: large soft box, front left, above waist height */}
      <Lightformer form="rect" intensity={2.6} color="#fff3e6" position={[-7, 3.2, 7]} rotation-y={Math.PI * 0.72} rotation-x={-0.35} scale={[6, 3.2, 1]} />
      {/* fill: low, wide and dim, front right */}
      <Lightformer form="rect" intensity={0.7} color="#dfe5ff" position={[8, 1.4, 5]} rotation-y={-Math.PI * 0.62} scale={[5, 2.2, 1]} />
      {/* rim lights: tall, narrow, behind the vehicle either side */}
      <Lightformer form="rect" intensity={4} color="#f1f3ff" position={[-5.5, 2.4, -8]} rotation-y={Math.PI * 0.2} scale={[0.9, 4.4, 1]} />
      <Lightformer form="rect" intensity={4} color="#f1f3ff" position={[5.5, 2.4, -8]} rotation-y={-Math.PI * 0.2} scale={[0.9, 4.4, 1]} />
      {/* violet bounce from the end walls: just enough to tint reflections */}
      <Lightformer form="rect" intensity={0.5} color={PURPLE.accent} position={[0, 1.1, -HD + 3]} scale={[16, 1.1, 1]} />
      <Lightformer form="rect" intensity={0.3} color={PURPLE.accent} position={[0, 1.1, HD - 3]} rotation-y={Math.PI} scale={[16, 1.1, 1]} />
      {/* low flank softboxes: the wheel arches shade the wheels from the ceiling, and the floor is dark, so without these the
          dark wheel textures and brake calipers have nothing to catch. They light the wheels; the wheel materials are untouched. */}
      <Lightformer form="rect" intensity={2.4} color="#f4f5ff" position={[-8, 0.55, 0]} rotation-y={Math.PI / 2} scale={[16, 1.1, 1]} />
      <Lightformer form="rect" intensity={2.4} color="#f4f5ff" position={[8, 0.55, 0]} rotation-y={-Math.PI / 2} scale={[16, 1.1, 1]} />
      <Lightformer form="rect" intensity={1.2} color="#f4f5ff" position={[0, 0.5, 8]} rotation-y={Math.PI} scale={[8, 1, 1]} />
      <Lightformer form="rect" intensity={1.2} color="#f4f5ff" position={[0, 0.5, -8]} scale={[8, 1, 1]} />
      {/* soft overhead diffuser keeps shadow sides readable instead of crushed */}
      <Lightformer form="rect" intensity={1.1} color="#fff8f0" position={[0, 4.9, 0]} rotation-x={Math.PI / 2} scale={[9, 16, 1]} />
    </Environment>
  )
}

function Floor({ resolution }: { resolution: number }) {
  return (
    <mesh rotation-x={-Math.PI / 2}>
      <planeGeometry args={[HW * 2, HD * 2]} />
      {/* Polished dark epoxy. Metalness 1 keeps the specular F0 near black so the broad softboxes cannot wash the floor grey;
          the albedo is multiplied by the reflection, so a near-black colour needs a large mixStrength. */}
      <MeshReflectorMaterial
        color="#0a0a0e"
        metalness={1}
        roughness={0.72}
        blur={[420, 120]}
        mixBlur={1.5}
        mixStrength={26}
        mirror={1}
        resolution={resolution}
        depthScale={1.1}
        minDepthThreshold={0.3}
        maxDepthThreshold={1.5}
      />
    </mesh>
  )
}

/**
 * Direct key / fill / rim lights (no shadow maps: grounding comes from contact shadows). The baked reflections give
 * the paint its LED lines; these give each face of the body a distinct tone so the silhouette reads.
 */
function KeyRig() {
  return (
    <>
      <directionalLight position={[-6, 7, 7]} intensity={1.9} color="#fff1e0" />
      <directionalLight position={[7, 3.5, 2]} intensity={0.45} color="#dfe6ff" />
      <directionalLight position={[3, 4, -9]} intensity={1.3} color="#e9ecff" />
      {/* low, wide flank lights at wheel height */}
      <directionalLight position={[9, 0.6, 1.5]} intensity={1.1} color="#f2f4ff" />
      <directionalLight position={[-9, 0.6, -1.5]} intensity={0.9} color="#f2f4ff" />
      <hemisphereLight args={['#c9ccff', '#08070b', 0.25]} />
    </>
  )
}

export function Studio({ reflectionResolution, exploded }: { reflectionResolution: number; exploded: boolean }) {
  return (
    <>
      <KeyRig />
      <Room />
      <Lights />
      <Floor resolution={reflectionResolution} />
      <Reflections />
      {/* The shadow pass re-renders the whole vehicle, so it only runs after the vehicle changes shape (mount, explode,
          reassemble). Remounting with a bounded frame count covers the animation, then it stops costing anything. */}
      <ContactShadows key={exploded ? 'exploded' : 'assembled'} position={[0, 0.012, 0]} opacity={0.95} scale={11} blur={1.9} far={1.1} resolution={512} color="#000000" frames={150} />
    </>
  )
}
