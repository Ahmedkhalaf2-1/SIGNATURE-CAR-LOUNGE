import { useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import { CanvasTexture, Color, DoubleSide, Object3D, RepeatWrapping, SRGBColorSpace, type InstancedMesh } from 'three'
import { PURPLE, STUDIO } from '../constants'

const { roomHalfWidth: HW, roomHalfDepth: HD } = STUDIO

const PLATINUM = '#d4d7df'
const LED_WARM = [3.0, 2.7, 2.3] as const
const LED_VIOLET = [1.4, 0.4, 2.0] as const

/** Draws once into a canvas texture. `paint` may be async (fonts, images); the texture refreshes and the demand loop is nudged. */
function useCanvasTexture(width: number, height: number, paint: (g: CanvasRenderingContext2D, w: number, h: number) => void | Promise<void>) {
  const invalidate = useThree((s) => s.invalidate)
  const texture = useMemo(() => {
    const c = document.createElement('canvas')
    c.width = width
    c.height = height
    const t = new CanvasTexture(c)
    t.colorSpace = SRGBColorSpace
    t.anisotropy = 4
    return t
  }, [width, height])
  useEffect(() => {
    let alive = true
    const c = texture.image as HTMLCanvasElement
    const g = c.getContext('2d')!
    const run = async () => {
      try {
        await Promise.all([document.fonts.load('500 64px Cinzel'), document.fonts.load('600 24px Montserrat')])
      } catch {
        /* fonts unavailable: canvas falls back to serif/sans */
      }
      g.clearRect(0, 0, width, height)
      await paint(g, width, height)
      if (!alive) return
      texture.needsUpdate = true
      invalidate()
    }
    void run()
    return () => {
      alive = false
    }
    // oxlint-disable-next-line react/exhaustive-deps
  }, [texture])
  useEffect(() => () => texture.dispose(), [texture])
  return texture
}

const loadImage = (src: string) =>
  new Promise<HTMLImageElement | null>((resolve) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => resolve(null)
    img.src = src
  })

const spaced = (g: CanvasRenderingContext2D, text: string, x: number, y: number, tracking: number) => {
  ;(g as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = `${tracking}px`
  g.textAlign = 'center'
  g.fillText(text, x + tracking / 2, y)
}

/** Backlit brand wall: a frosted light box carrying the SC monogram beside the Signature wordmark. */
function BrandWall() {
  const box = useCanvasTexture(512, 1024, async (g, w, h) => {
    const logo = await loadImage('/assets/images/sc-monogram.png')
    const grad = g.createLinearGradient(0, 0, 0, h)
    grad.addColorStop(0, '#e6e8ef')
    grad.addColorStop(1, '#bfc2cf')
    g.fillStyle = grad
    g.fillRect(0, 0, w, h)
    g.strokeStyle = 'rgba(255,255,255,0.5)'
    g.lineWidth = 4
    g.strokeRect(18, 18, w - 36, h - 36)
    if (logo) {
      const lh = h * 0.6
      const lw = (logo.width / logo.height) * lh
      g.drawImage(logo, (w - lw) / 2, (h - lh) / 2, lw, lh)
    }
  })
  const word = useCanvasTexture(1536, 1024, (g, w, h) => {
    const cx = w / 2
    g.fillStyle = PLATINUM
    g.font = '500 150px Cinzel, serif'
    spaced(g, 'SIGNATURE', cx, h / 2 - 10, 34)
    g.font = '500 70px Cinzel, serif'
    spaced(g, 'CAR LOUNGE', cx, h / 2 + 100, 46)
    g.strokeStyle = 'rgba(212,215,223,0.6)'
    g.lineWidth = 2
    g.beginPath()
    g.moveTo(cx - 330, h / 2 + 175)
    g.lineTo(cx + 330, h / 2 + 175)
    g.stroke()
    g.font = '600 38px Montserrat, sans-serif'
    spaced(g, 'AUTOMOTIVE ATELIER', cx, h / 2 + 250, 18)
  })
  const W = 11
  const H = 5.2
  return (
    <group position={[0, 2.7, -HD + 0.1]}>
      {/* smoked-glass slab with a violet LED perimeter */}
      <mesh position={[0, 0, -0.04]}>
        <boxGeometry args={[W + 0.9, H + 0.9, 0.08]} />
        <meshStandardMaterial color="#07070a" roughness={0.18} metalness={0.8} />
      </mesh>
      {[
        [0, (H + 0.9) / 2, W + 0.9, 0.05],
        [0, -(H + 0.9) / 2, W + 0.9, 0.05],
        [-(W + 0.9) / 2, 0, 0.05, H + 0.9],
        [(W + 0.9) / 2, 0, 0.05, H + 0.9],
      ].map(([x, y, w, h], i) => (
        <mesh key={i} position={[x, y, 0.01]}>
          <planeGeometry args={[w, h]} />
          <meshBasicMaterial fog={false} color={LED_VIOLET} />
        </mesh>
      ))}
      <mesh position={[-3.2, 0, 0.02]}>
        <planeGeometry args={[2.3, 4.6]} />
        <meshBasicMaterial fog={false} map={box} color={[0.92, 0.92, 0.96]} />
      </mesh>
      <mesh position={[1.6, 0, 0.02]}>
        <planeGeometry args={[6.9, 4.6]} />
        <meshBasicMaterial fog={false} map={word} transparent color={[2.4, 2.4, 2.6]} />
      </mesh>
      {/* the light the box throws onto the wall */}
      <pointLight position={[0, 0, 2.5]} intensity={6} distance={9} decay={2} color="#d9d2f5" />
    </group>
  )
}

/** Smoked-glass material shared by every niche, partition and display: dark, glossy, faintly violet. */
const GLASS = { color: '#15121d', roughness: 0.06, metalness: 0.9, transparent: true, opacity: 0.55 } as const

/** Satin obsidian metal used for cabinetry bodies, frames and pilasters. */
const SATIN = { color: '#0c0b11', roughness: 0.34, metalness: 0.72 } as const

/** Curated film & finish library: three recessed smoked-glass niches with a few backlit vertical strips each. */
function SampleWall() {
  const label = useCanvasTexture(1024, 128, (g, w, h) => {
    g.fillStyle = PLATINUM
    g.font = '500 50px Cinzel, serif'
    spaced(g, 'FILM & FINISH LIBRARY', w / 2, h / 2 + 16, 20)
  })
  const ref = useRef<InstancedMesh>(null)
  const sets = useMemo(
    () => [
      ['#0b0b0e', '#2a2c31', '#6e7178', '#9a9ca3', '#3c3f46', '#16161a'],
      ['#2a0f58', '#10295a', '#0f4a33', '#4a1522', '#1d1d22', '#8e9096'],
      ['#16161a', '#3a3d44', '#0b0b0e', '#6b6e75', '#5a1424', '#26262c'],
    ],
    [],
  )
  const NICHE_Z = [-3.4, 0, 3.4]
  useLayoutEffect(() => {
    const m = ref.current
    if (!m) return
    const o = new Object3D()
    const c = new Color()
    let i = 0
    sets.forEach((set, n) => {
      set.forEach((hex, k) => {
        o.position.set(NICHE_Z[n] + (k - 2.5) * 0.36, 0.05, 0.05)
        o.updateMatrix()
        m.setMatrixAt(i, o.matrix)
        m.setColorAt(i, c.set(hex).multiplyScalar(0.42))
        i++
      })
    })
    m.instanceMatrix.needsUpdate = true
    if (m.instanceColor) m.instanceColor.needsUpdate = true
    // oxlint-disable-next-line react/exhaustive-deps
  }, [sets])
  return (
    <group position={[-HW + 0.12, 2.25, 0]} rotation-y={Math.PI / 2}>
      {/* layered stepped surround */}
      <mesh position={[0, 0, -0.04]}>
        <boxGeometry args={[11.6, 4.6, 0.08]} />
        <meshStandardMaterial {...SATIN} />
      </mesh>
      {NICHE_Z.map((z) => (
        <group key={z} position={[z, 0, 0]}>
          <mesh position={[0, 0, 0.0]}>
            <boxGeometry args={[3.0, 3.7, 0.06]} />
            <meshStandardMaterial color="#050507" roughness={0.5} metalness={0.4} />
          </mesh>
          {/* soft backlight and under-light */}
          <mesh position={[0, 0.05, 0.035]}>
            <planeGeometry args={[2.7, 3.35]} />
            <meshBasicMaterial fog={false} color={[0.03, 0.025, 0.06]} />
          </mesh>
          <mesh position={[0, -1.62, 0.05]}>
            <planeGeometry args={[2.6, 0.035]} />
            <meshBasicMaterial fog={false} color={LED_WARM} />
          </mesh>
          <mesh position={[-1.5, 0, 0.04]}>
            <planeGeometry args={[0.03, 3.7]} />
            <meshBasicMaterial fog={false} color={[0.55, 0.5, 0.65]} />
          </mesh>
        </group>
      ))}
      <instancedMesh ref={ref} args={[undefined, undefined, 18]} frustumCulled={false}>
        <boxGeometry args={[0.24, 2.7, 0.03]} />
        <meshBasicMaterial fog={false} />
      </instancedMesh>
      <mesh position={[0, 2.62, 0.03]}>
        <planeGeometry args={[4.6, 0.575]} />
        <meshBasicMaterial fog={false} map={label} transparent color={[1.1, 1.1, 1.15]} />
      </mesh>
    </group>
  )
}

/** Black stone slabs with violet-white veining, set into the side walls. */
function useMarbleTexture() {
  return useMemo(() => {
    const S = 512
    const c = document.createElement('canvas')
    c.width = c.height = S
    const g = c.getContext('2d')!
    const base = g.createLinearGradient(0, 0, S, S)
    base.addColorStop(0, '#0a090e')
    base.addColorStop(1, '#16121f')
    g.fillStyle = base
    g.fillRect(0, 0, S, S)
    for (let i = 0; i < 26; i++) {
      g.strokeStyle = `rgba(${200 + Math.random() * 40},${190 + Math.random() * 40},255,${0.1 + Math.random() * 0.28})`
      g.lineWidth = 0.5 + Math.random() * 1.4
      g.beginPath()
      let x = Math.random() * S
      let y = -10
      g.moveTo(x, y)
      while (y < S + 10) {
        x += (Math.random() - 0.5) * 70
        y += 20 + Math.random() * 40
        g.lineTo(x, y)
      }
      g.stroke()
    }
    const t = new CanvasTexture(c)
    t.colorSpace = SRGBColorSpace
    t.anisotropy = 4
    return t
  }, [])
}

/**
 * Side-wall architecture: pilasters with a platinum edge, polished stone slabs and slim recessed reveals, so no long wall is a flat
 * plane. Left wall (-X) and right wall (+X); the swatch niches and cabinets occupy the middle of each, the rest is designed here.
 */
function SideWalls({ compact }: { compact: boolean }) {
  const marble = useMarbleTexture()
  const pilasters = useMemo(() => [-12.8, -9.6, -6.4, 6.4, 9.6, 12.8], [])
  const slabs = useMemo(() => [-11.2, -8.0, 8.0, 11.2], [])
  return (
    <group>
      {([-1, 1] as const).map((side) => (
        <group key={side} position={[side * (HW - 0.02), 0, 0]} rotation-y={side === -1 ? Math.PI / 2 : -Math.PI / 2}>
          {pilasters.map((z) => (
            <group key={z} position={[z, 2.6, 0.1]}>
              <mesh>
                <boxGeometry args={[0.42, 5.2, 0.2]} />
                <meshStandardMaterial {...SATIN} />
              </mesh>
              <mesh position={[0.2, 0, 0.11]}>
                <planeGeometry args={[0.012, 5.2]} />
                <meshBasicMaterial fog={false} color={[1.1, 1.1, 1.2]} />
              </mesh>
            </group>
          ))}
          {slabs.map((z) => (
            <mesh key={z} position={[z, 2.2, 0.05]}>
              <planeGeometry args={[2.5, 3.8]} />
              <meshStandardMaterial map={marble} color="#c9c4d6" roughness={0.14} metalness={0.35} />
            </mesh>
          ))}
          {side === 1 &&
            [-3.7, 0, 3.7].map((z) => (
              <mesh key={`u${z}`} position={[z, 3.05, 0.04]}>
                <planeGeometry args={[3.2, 2.5]} />
                <meshStandardMaterial map={marble} color="#b9b3c9" roughness={0.16} metalness={0.35} />
              </mesh>
            ))}
          {/* recessed horizontal reveal with a restrained violet line */}
          <mesh position={[0, 4.55, 0.02]}>
            <planeGeometry args={[HD * 2, 0.025]} />
            <meshBasicMaterial fog={false} color={[0.62, 0.22, 0.92]} />
          </mesh>
          {!compact && (
            <mesh position={[0, 0.9, 0.02]}>
              <planeGeometry args={[HD * 2, 0.012]} />
              <meshBasicMaterial fog={false} color={[1.6, 1.5, 1.3]} />
            </mesh>
          )}
        </group>
      ))}
    </group>
  )
}

/** Thin warm-white strips along the base of every wall: light for depth, never a floor outline. */
function BaseLights() {
  const warm = [1.7, 1.55, 1.3] as const
  return (
    <group>
      {[-1, 1].map((e) => (
        <mesh key={`e${e}`} position={[0, 0.07, e * (HD - 0.14)]}>
          <planeGeometry args={[HW * 2 - 0.4, 0.045]} />
          <meshBasicMaterial fog={false} color={warm} side={DoubleSide} />
        </mesh>
      ))}
      {[-1, 1].map((e) => (
        <mesh key={`s${e}`} position={[e * (HW - 0.14), 0.07, 0]} rotation-y={Math.PI / 2}>
          <planeGeometry args={[HD * 2 - 0.4, 0.045]} />
          <meshBasicMaterial fog={false} color={warm} side={DoubleSide} />
        </mesh>
      ))}
    </group>
  )
}

/** Rear zone: smoked-glass partition in dark mullions, a film-roll rack behind it and a vertical violet reveal. Not a second hero wall. */
function RearZone({ compact }: { compact: boolean }) {
  const rolls = useRef<InstancedMesh>(null)
  const ROWS = 3
  const PER = 6
  useLayoutEffect(() => {
    const m = rolls.current
    if (!m) return
    const o = new Object3D()
    const c = new Color()
    const tints = ['#1c1b22', '#26242d', '#17161c', '#2a1d3a', '#202026', '#18171d']
    let i = 0
    for (let r = 0; r < ROWS; r++)
      for (let k = 0; k < PER; k++) {
        o.position.set((k - (PER - 1) / 2) * 0.62, r * 0.78, 0)
        o.rotation.z = Math.PI / 2
        o.updateMatrix()
        m.setMatrixAt(i, o.matrix)
        m.setColorAt(i, c.set(tints[(k + r * 2) % tints.length]))
        i++
      }
    m.instanceMatrix.needsUpdate = true
    if (m.instanceColor) m.instanceColor.needsUpdate = true
  }, [])
  const panes = [-4.2, 0, 4.2]
  return (
    <group position={[0, 0, HD - 0.3]} rotation-y={Math.PI}>
      {/* recessed back panel with violet vertical reveals */}
      <mesh position={[0, 2.4, -0.18]}>
        <boxGeometry args={[13.4, 4.4, 0.06]} />
        <meshStandardMaterial {...SATIN} color="#0a0910" />
      </mesh>
      {[-6.4, 6.4].map((x) => (
        <mesh key={x} position={[x, 2.4, -0.14]}>
          <planeGeometry args={[0.04, 4.2]} />
          <meshBasicMaterial fog={false} color={LED_VIOLET} />
        </mesh>
      ))}
      {!compact && (
        <group position={[0, 1.1, 0.02]}>
          {/* rolls lie along X; instances are spaced along X and stacked on Y */}
          <instancedMesh ref={rolls} args={[undefined, undefined, ROWS * PER]} frustumCulled={false}>
            <cylinderGeometry args={[0.17, 0.17, 0.5, 14]} />
            <meshStandardMaterial roughness={0.35} metalness={0.5} />
          </instancedMesh>
        </group>
      )}
      {panes.map((x) => (
        <group key={x} position={[x, 2.3, 0.45]}>
          <mesh>
            <planeGeometry args={[4.0, 4.2]} />
            <meshStandardMaterial {...GLASS} opacity={0.16} depthWrite={false} side={DoubleSide} />
          </mesh>
          {[-2.04, 2.04].map((dx) => (
            <mesh key={dx} position={[dx, 0, 0]}>
              <boxGeometry args={[0.08, 4.4, 0.1]} />
              <meshStandardMaterial {...SATIN} />
            </mesh>
          ))}
        </group>
      ))}
      <mesh position={[0, 4.46, 0.45]}>
        <boxGeometry args={[12.5, 0.08, 0.1]} />
        <meshStandardMaterial {...SATIN} />
      </mesh>
      <mesh position={[0, 0.16, 0.45]}>
        <boxGeometry args={[12.5, 0.1, 0.1]} />
        <meshStandardMaterial {...SATIN} />
      </mesh>
    </group>
  )
}

/** Integrated, handle-less cabinetry with toe-kick lighting, a stone top and a recessed display shelf with a few bottles. */
function Cabinets({ compact }: { compact: boolean }) {
  const bottles = useRef<InstancedMesh>(null)
  const BZ = [-3.2, -2.5, -0.4, 0.3, 1.4, 3.0, 3.6]
  useLayoutEffect(() => {
    const m = bottles.current
    if (!m) return
    const o = new Object3D()
    const c = new Color()
    BZ.forEach((z, i) => {
      o.position.set(0, 0, z)
      o.scale.set(1, 0.8 + (i % 3) * 0.2, 1)
      o.updateMatrix()
      m.setMatrixAt(i, o.matrix)
      m.setColorAt(i, c.set(i === 3 ? '#3a1f5a' : '#1a1920'))
    })
    m.instanceMatrix.needsUpdate = true
    if (m.instanceColor) m.instanceColor.needsUpdate = true
    // oxlint-disable-next-line react/exhaustive-deps
  }, [])
  const reveals = useMemo(() => Array.from({ length: 8 }, (_, i) => -5.25 + i * 1.5), [])
  return (
    <group position={[HW - 0.52, 0, 0]}>
      {/* monolithic satin body */}
      <mesh position={[0, 0.58, 0]}>
        <boxGeometry args={[0.78, 1.16, 12.4]} />
        <meshStandardMaterial {...SATIN} />
      </mesh>
      {/* shadow-gap reveals between the flush doors */}
      {reveals.map((z) => (
        <mesh key={z} position={[-0.395, 0.62, z]}>
          <planeGeometry args={[0.012, 0.98]} />
          <meshBasicMaterial fog={false} color={[0.01, 0.01, 0.015]} side={DoubleSide} />
        </mesh>
      ))}
      {/* recessed toe-kick light */}
      <mesh position={[-0.3, 0.045, 0]}>
        <boxGeometry args={[0.05, 0.03, 12.2]} />
        <meshBasicMaterial fog={false} color={LED_WARM} />
      </mesh>
      {/* dark stone top with a platinum edge */}
      <mesh position={[0.02, 1.2, 0]}>
        <boxGeometry args={[0.86, 0.05, 12.6]} />
        <meshStandardMaterial color="#09080d" roughness={0.12} metalness={0.4} />
      </mesh>
      <mesh position={[-0.42, 1.2, 0]}>
        <boxGeometry args={[0.012, 0.052, 12.6]} />
        <meshStandardMaterial color="#b9bcc6" roughness={0.3} metalness={1} />
      </mesh>
      {/* recessed display shelf */}
      <group position={[0.3, 2.45, 0]}>
        <mesh position={[0.1, 0, 0]}>
          <boxGeometry args={[0.16, 0.9, 8.4]} />
          <meshStandardMaterial color="#050507" roughness={0.5} metalness={0.5} />
        </mesh>
        <mesh position={[-0.05, -0.43, 0]}>
          <boxGeometry args={[0.2, 0.03, 8.2]} />
          <meshStandardMaterial color="#0d0c12" roughness={0.18} metalness={0.7} />
        </mesh>
        <mesh position={[-0.05, 0.43, 0]}>
          <boxGeometry args={[0.16, 0.02, 8.2]} />
          <meshBasicMaterial fog={false} color={LED_WARM} />
        </mesh>
        <instancedMesh ref={bottles} args={[undefined, undefined, BZ.length]} position={[-0.02, -0.28, 0]} frustumCulled={false}>
          <cylinderGeometry args={[0.045, 0.05, 0.3, 12]} />
          <meshStandardMaterial roughness={0.12} metalness={0.85} />
        </instancedMesh>
      </group>
      {!compact && (
        <>
          {/* wall-mounted tool rail: a platinum bar with a few dark silhouettes */}
          <group position={[0.35, 3.45, 0]}>
            <mesh>
              <boxGeometry args={[0.03, 0.03, 5.2]} />
              <meshStandardMaterial color="#b9bcc6" roughness={0.3} metalness={1} />
            </mesh>
            {[-2, -1.2, -0.3, 0.6, 1.5, 2.2].map((z) => (
              <mesh key={z} position={[-0.02, -0.22, z]}>
                <boxGeometry args={[0.03, 0.4, 0.07]} />
                <meshStandardMaterial color="#121117" roughness={0.4} metalness={0.7} />
              </mesh>
            ))}
          </group>
          {/* service trolley */}
          <group position={[-2.2, 0, -9.6]}>
            <mesh position={[0, 0.8, 0]}>
              <boxGeometry args={[0.6, 0.04, 1.1]} />
              <meshStandardMaterial color="#9ea1ab" roughness={0.28} metalness={1} />
            </mesh>
            <mesh position={[0, 0.36, 0]}>
              <boxGeometry args={[0.55, 0.035, 1.0]} />
              <meshStandardMaterial color="#6f727c" roughness={0.35} metalness={1} />
            </mesh>
            {[-0.5, 0.5].map((z) => (
              <mesh key={z} position={[0, 0.42, z]}>
                <boxGeometry args={[0.04, 0.8, 0.04]} />
                <meshStandardMaterial color="#9ea1ab" roughness={0.28} metalness={1} />
              </mesh>
            ))}
          </group>
        </>
      )}
    </group>
  )
}

/** Hero light: a wide warm pool over the bay and violet kickers behind the brand wall. No shadow maps. */
function HeroLights() {
  return (
    <>
      <spotLight position={[0, 5.1, 0.5]} angle={0.62} penumbra={1} intensity={16} distance={14} decay={1.5} color="#f3f1ff" />
      <spotLight position={[-4, 3.6, -HD + 3]} angle={0.9} penumbra={1} intensity={22} distance={12} decay={1.6} color={PURPLE.accent} />
      <spotLight position={[4, 3.6, -HD + 3]} angle={0.9} penumbra={1} intensity={22} distance={12} decay={1.6} color={PURPLE.accent} />
    </>
  )
}

/** Procedural dark stone: tile seams, faint veining and mottling; used as the floor albedo (multiplied by the epoxy colour). */
export function useStoneTexture() {
  return useMemo(() => {
    const S = 512
    const c = document.createElement('canvas')
    c.width = c.height = S
    const g = c.getContext('2d')!
    g.fillStyle = '#bcbcc2'
    g.fillRect(0, 0, S, S)
    for (let i = 0; i < 1400; i++) {
      g.fillStyle = `rgba(${i % 2 ? 255 : 0},${i % 2 ? 255 : 0},${i % 2 ? 255 : 0},${0.012 + Math.random() * 0.03})`
      const r = 10 + Math.random() * 46
      g.beginPath()
      g.arc(Math.random() * S, Math.random() * S, r, 0, Math.PI * 2)
      g.fill()
    }
    g.strokeStyle = 'rgba(255,255,255,0.22)'
    for (let i = 0; i < 9; i++) {
      g.lineWidth = 0.6 + Math.random() * 0.8
      g.beginPath()
      let x = Math.random() * S
      let y = Math.random() * S
      g.moveTo(x, y)
      for (let k = 0; k < 7; k++) {
        x += (Math.random() - 0.5) * 140
        y += (Math.random() - 0.3) * 120
        g.lineTo(x, y)
      }
      g.stroke()
    }
    g.strokeStyle = 'rgba(255,255,255,0.7)'
    g.lineWidth = 3
    g.strokeRect(0, 0, S, S)
    const t = new CanvasTexture(c)
    t.wrapS = t.wrapT = RepeatWrapping
    t.repeat.set(HW / 1.6, HD / 1.6)
    t.anisotropy = 8
    t.colorSpace = SRGBColorSpace
    return t
  }, [])
}

/** Everything that makes the room a Signature atelier. Static, instanced where repeated, and independent of the vehicle. */
export function Atelier({ compact }: { compact: boolean }) {
  return (
    <group>
      <BrandWall />
      <SampleWall />
      <SideWalls compact={compact} />
      <BaseLights />
      <RearZone compact={compact} />
      <Cabinets compact={compact} />
      <HeroLights />
    </group>
  )
}
