import { useCallback, useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { CameraControls, CameraControlsImpl } from '@react-three/drei'
import { MathUtils, type PerspectiveCamera } from 'three'
import { CAMERA_PRESETS, STUDIO } from '../constants'
import type { CameraPresetId } from '../types'

interface Props {
  /** Point the camera orbits for the side/3-4 views, in metres. */
  target: readonly [number, number, number]
  /** Real centre of the vehicle's bounding box: the orbit target of the Top view. */
  center: readonly [number, number, number]
  /** Real vehicle extents in metres: x = width, y = height, z = length. */
  extent: readonly [number, number, number]
  /** Bounding radius of the vehicle. */
  radius: number
  preset: CameraPresetId
  nonce: number
  reducedMotion: boolean
  /** Pixels of the viewport covered by UI; the vehicle is re-centred in the remaining space (w x h). */
  inset: { x: number; y: number; w: number; h: number }
}

const IDLE_DELAY_MS = 4500
const IDLE_SPEED = 0.07 // rad/s
const BASE_FOV = 27 // long-lens automotive photography; widened below only when the screen is narrow

/** Vertical FOV: widen on portrait screens so the whole vehicle still fits. */
const fovFor = (aspect: number) => MathUtils.clamp(BASE_FOV * Math.pow(Math.max(1, 1.45 / aspect), 0.9), BASE_FOV, 60)

/**
 * Distance at which a box of `halfW` x `halfH` metres fills `fill` of the FREE area. The lens frustum is the whole canvas
 * (`aspect`); the free area is the sub-rectangle `fw` x `fh` (fractions of the canvas width / height) not covered by UI.
 * Fitted by whichever axis is the tighter one.
 */
function fitDistance(halfW: number, halfH: number, fovDeg: number, aspect: number, fw: number, fh: number, fill: number) {
  const tanV = Math.tan(MathUtils.degToRad(fovDeg) / 2)
  return Math.max(halfW / (tanV * aspect * fw), halfH / (tanV * fh)) / fill
}

export function CameraRig({ target, center, extent, radius, preset, nonce, reducedMotion, inset }: Props) {
  const controls = useRef<CameraControlsImpl>(null)
  const { size, camera, gl, invalidate } = useThree()
  const lastInteraction = useRef(performance.now())
  const interacting = useRef(false)
  const first = useRef(true)
  const aspect = size.width / size.height
  const fov = fovFor(aspect)
  // A 3/4 view spans ~0.92 of the bounding radius horizontally; the vehicle should fill ~76% of the free area (phones: more).
  // The free area is the real remaining rectangle (beside the panel on desktop, between tabs and sheet on phones).
  const fw = inset.w > 0 ? Math.min(1, inset.w / size.width) : 1
  const fh = inset.h > 0 ? Math.min(1, inset.h / size.height) : 1
  const freeAspect = (fw * size.width) / (fh * size.height)
  const portrait = freeAspect < 0.9
  const baseDistance = fitDistance(radius * 0.92, radius * 0.4, fov, aspect, fw, fh, portrait ? 0.84 : 0.76)

  // Top view: straight down at the real bounding-box centre. The heading follows the viewport so the car fills it: a landscape
  // viewport shows the car side-on (nose to the left), a portrait one nose-up. The distance is solved from the real extents,
  // the lens and the free viewport (not from the origin or a constant), and may be above the studio ceiling (the ceiling hides).
  const landscape = freeAspect > 1.15
  const topDistance = fitDistance(landscape ? extent[2] / 2 : extent[0] / 2, landscape ? extent[0] / 2 : extent[2] / 2, fov, aspect, fw, fh, portrait ? 0.78 : 0.7)
  const TOP_POLAR = 0.05 // rad; a hair off vertical keeps the heading well-defined (no gimbal flip) while looking straight down

  const goTo = useCallback(
    (id: CameraPresetId, animate: boolean) => {
      const c = controls.current
      const p = CAMERA_PRESETS.find((x) => x.id === id)
      if (!c || !p) return
      const isTop = id === 'top'
      // Phones frame a little wider so side views never crop the nose or tail.
      const d = isTop ? topDistance : baseDistance * (portrait ? Math.max(p.zoom, 1.1) : p.zoom)
      const az = MathUtils.degToRad(isTop ? (landscape ? 90 : 180) : p.azimuth)
      const po = isTop ? TOP_POLAR : MathUtils.degToRad(p.polar)
      const t = isTop ? center : target
      void c.setLookAt(
        t[0] + d * Math.sin(po) * Math.sin(az),
        t[1] + d * Math.cos(po),
        t[2] + d * Math.sin(po) * Math.cos(az),
        t[0],
        t[1],
        t[2],
        animate && !reducedMotion,
      )
      invalidate()
    },
    [baseDistance, topDistance, landscape, portrait, target, center, reducedMotion, invalidate],
  )

  const userMoved = useRef(false)
  const lastCommand = useRef({ preset, nonce })

  // A preset or Reset command always frames the vehicle. A layout change (resize, mobile sheet opening) re-frames only while the
  // user has not orbited away since the last command, so their view is never yanked back.
  useEffect(() => {
    const commanded = lastCommand.current.preset !== preset || lastCommand.current.nonce !== nonce || first.current
    if (!commanded && userMoved.current) return
    if (commanded) userMoved.current = false
    lastCommand.current = { preset, nonce }
    goTo(preset, commanded && !first.current)
    lastInteraction.current = performance.now()
    first.current = false
  }, [preset, nonce, goTo])

  // Field of view + off-centre projection so the vehicle sits in the visible area beside the UI.
  useEffect(() => {
    const cam = camera as PerspectiveCamera
    cam.fov = fov
    cam.setViewOffset(size.width, size.height, inset.x, inset.y, size.width, size.height)
    cam.updateProjectionMatrix()
    invalidate()
  }, [camera, fov, size.width, size.height, inset.x, inset.y, invalidate])

  // Orbit limits derived from the vehicle: never below the floor, never inside the car.
  useEffect(() => {
    const c = controls.current
    if (!c) return
    c.minDistance = radius * 1.12
    c.maxDistance = Math.max(baseDistance * 1.5, radius * 3, topDistance * 1.1)
    c.minDistance = Math.min(c.minDistance, c.maxDistance * 0.8)
    c.minPolarAngle = 0.03
    c.maxPolarAngle = 1.5
    c.smoothTime = reducedMotion ? 0.05 : 0.28
    c.draggingSmoothTime = reducedMotion ? 0.02 : 0.09
    c.dollySpeed = 0.7
    c.mouseButtons.right = CameraControlsImpl.ACTION.NONE
    c.mouseButtons.middle = CameraControlsImpl.ACTION.NONE
    c.touches.two = CameraControlsImpl.ACTION.TOUCH_DOLLY
    c.touches.three = CameraControlsImpl.ACTION.NONE
  }, [radius, baseDistance, topDistance, reducedMotion])

  // Horizontal reach is limited by the walls, not by a number: at low angles the camera may not leave the room, while near the top
  // (above the hidden ceiling) the whole fitted distance is allowed.
  useFrame(() => {
    const c = controls.current
    if (!c) return
    const reach = Math.max(Math.sin(c.polarAngle), 0.08)
    const room = (STUDIO.roomHalfWidth - 0.8) / reach
    const limit = Math.max(c.minDistance + 0.1, Math.min(Math.max(baseDistance * 1.5, radius * 3, topDistance * 1.1), room))
    if (c.maxDistance !== limit) c.maxDistance = limit
  })

  // Slow cinematic turntable, only after the user has been idle; any input stops it immediately. Not while looking down.
  useFrame((_, dt) => {
    const c = controls.current
    if (!c || reducedMotion || interacting.current || c.polarAngle < 0.4) return
    if (performance.now() - lastInteraction.current < IDLE_DELAY_MS) return
    void c.rotate(IDLE_SPEED * dt, 0, false)
    invalidate()
  })

  const touch = useCallback(() => {
    lastInteraction.current = performance.now()
  }, [])

  // Keyboard orbit/zoom for the focused canvas (arrow keys, +/-).
  useEffect(() => {
    const el = gl.domElement
    el.tabIndex = 0
    const onKey = (e: KeyboardEvent) => {
      const c = controls.current
      if (!c) return
      const step = 0.12
      const handled = {
        ArrowLeft: () => c.rotate(-step, 0, !reducedMotion),
        ArrowRight: () => c.rotate(step, 0, !reducedMotion),
        ArrowUp: () => c.rotate(0, -step, !reducedMotion),
        ArrowDown: () => c.rotate(0, step, !reducedMotion),
        '+': () => c.dolly(0.6, !reducedMotion),
        '=': () => c.dolly(0.6, !reducedMotion),
        '-': () => c.dolly(-0.6, !reducedMotion),
      }[e.key]
      if (!handled) return
      e.preventDefault()
      touch()
      void handled()
      invalidate()
    }
    el.addEventListener('keydown', onKey)
    return () => el.removeEventListener('keydown', onKey)
  }, [gl, reducedMotion, touch, invalidate])

  return (
    <CameraControls
      ref={controls}
      makeDefault
      onControlStart={() => {
        interacting.current = true
        userMoved.current = true
      }}
      onControlEnd={() => {
        interacting.current = false
        touch()
      }}
    />
  )
}
