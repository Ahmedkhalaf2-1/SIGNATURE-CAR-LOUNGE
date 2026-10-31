import { Color, MathUtils, Vector3, Vector4, type MeshPhysicalMaterial, type WebGLProgramParametersWithUniforms } from 'three'
import type { MappedMesh } from '../vehicle/types'
import { BASE_PAINT, BODY_ORIGINAL, type BodyConfig } from './appearance'
import { MASK_FEATHER, MAX_MASK_REGIONS, resolveCoverageMask, type PpfMask } from './coverage'

/**
 * Body paint shader. One MeshPhysicalMaterial per paint mesh is patched (onBeforeCompile) so that the final surface is a
 * pure function of TWO complete treatment configurations, A (what the body looked like) and B (what it should look like),
 * blended by a sweep that travels across the vehicle:
 *
 *   surface(config) = BASE -> WRAP -> PPF (masked) -> CERAMIC
 *   final           = mix(surface(A), surface(B), sweep(position, progress))
 *
 * Wrap, finish, PPF and Ceramic therefore all share one code path, can be stacked freely, and animate by moving a single
 * uniform. Nothing is rebuilt per frame and no React state changes while animating.
 */

type Vec = { value: Vector3 | Vector4 | Color | number | Vector3[] }
type UniformMap = Record<string, Vec>

const cfgUniforms = (k: 'A' | 'B'): UniformMap => ({
  [`u${k}WrapOn`]: { value: 0 },
  [`u${k}WrapColor`]: { value: new Color() },
  [`u${k}WrapP`]: { value: new Vector4() }, // roughness, metalness, clearcoat, clearcoatRoughness
  [`u${k}WrapE`]: { value: new Vector4() }, // env, sheenRoughness, 0, 0
  [`u${k}WrapSheen`]: { value: new Color() }, // sheen colour already multiplied by the sheen amount
  [`u${k}PpfOn`]: { value: 0 },
  [`u${k}PpfP`]: { value: new Vector4() }, // roughness, clearcoat, clearcoatRoughness, env
  [`u${k}PpfMode`]: { value: 0 }, // 0 none, 1 whole mesh, 2 regions
  [`u${k}PpfCount`]: { value: 0 },
  [`u${k}PpfMin`]: { value: Array.from({ length: MAX_MASK_REGIONS }, () => new Vector3()) },
  [`u${k}PpfMax`]: { value: Array.from({ length: MAX_MASK_REGIONS }, () => new Vector3()) },
  [`u${k}Ceramic`]: { value: 0 },
})

function createUniforms(): UniformMap {
  return {
    uVMin: { value: new Vector3() },
    uVSize: { value: new Vector3(1, 1, 1) },
    uProgress: { value: 1 },
    uFeather: { value: 0.2 },
    uSweepDir: { value: new Vector3(0.12, 0, -0.9) },
    uCue: { value: 0 },
    uFeatherMask: { value: MASK_FEATHER },
    uBaseColor: { value: new Color() },
    uBaseP: { value: new Vector4() },
    uBaseE: { value: new Vector4() },
    ...cfgUniforms('A'),
    ...cfgUniforms('B'),
  }
}

const SURF_DECL = /* glsl */ `
varying vec3 vWorldPos;
struct Surf { vec3 color; float rough; float metal; float cc; float ccRough; float env; vec3 sheenColor; float sheenRough; };
uniform vec3 uVMin; uniform vec3 uVSize;
uniform float uProgress; uniform float uFeather; uniform vec3 uSweepDir; uniform float uCue; uniform float uFeatherMask;
uniform vec3 uBaseColor; uniform vec4 uBaseP; uniform vec4 uBaseE;
Surf gSurf; float gPpfMask;

float boxMask(vec3 p, vec3 mn, vec3 mx, float f) {
  vec3 lo = smoothstep(mn - f, mn + f, p);
  vec3 hi = 1.0 - smoothstep(mx - f, mx + f, p);
  vec3 m = lo * hi;
  return m.x * m.y * m.z;
}
`

/** Evaluated twice from one template: once for configuration A, once for B. */
const evalTemplate = (k: 'A' | 'B') => /* glsl */ `
uniform float u${k}WrapOn; uniform vec3 u${k}WrapColor; uniform vec4 u${k}WrapP; uniform vec4 u${k}WrapE; uniform vec3 u${k}WrapSheen;
uniform float u${k}PpfOn; uniform vec4 u${k}PpfP; uniform float u${k}PpfMode; uniform int u${k}PpfCount;
uniform vec3 u${k}PpfMin[${MAX_MASK_REGIONS}]; uniform vec3 u${k}PpfMax[${MAX_MASK_REGIONS}];
uniform float u${k}Ceramic;

float ppfMask${k}(vec3 pn) {
  if (u${k}PpfMode > 1.5) {
    float m = 0.0;
    for (int i = 0; i < ${MAX_MASK_REGIONS}; i++) {
      if (i >= u${k}PpfCount) break;
      m = max(m, boxMask(pn, u${k}PpfMin[i], u${k}PpfMax[i], uFeatherMask));
    }
    return m;
  }
  return u${k}PpfMode > 0.5 ? 1.0 : 0.0;
}

Surf eval${k}(vec3 pn) {
  // BASE
  Surf s = Surf(uBaseColor, uBaseP.x, uBaseP.y, uBaseP.z, uBaseP.w, uBaseE.x, vec3(0.0), uBaseE.y);
  // WRAP: replaces colour and surface response
  if (u${k}WrapOn > 0.5) {
    s = Surf(u${k}WrapColor, u${k}WrapP.x, u${k}WrapP.y, u${k}WrapP.z, u${k}WrapP.w, u${k}WrapE.x, u${k}WrapSheen, u${k}WrapE.y);
  }
  // PPF: clear film inside its mask; replaces the response, keeps the colour (and metalness) beneath
  float pm = 0.0;
  if (u${k}PpfOn > 0.5) {
    pm = ppfMask${k}(pn);
    s.rough = mix(s.rough, u${k}PpfP.x, pm);
    s.cc = mix(s.cc, u${k}PpfP.y, pm);
    s.ccRough = mix(s.ccRough, u${k}PpfP.z, pm);
    s.env = mix(s.env, u${k}PpfP.w, pm);
  }
  // CERAMIC: final coating. Deepens glossy surfaces; leaves a matte finish matte.
  if (u${k}Ceramic > 0.5) {
    float g = 1.0 - smoothstep(0.25, 0.6, s.rough);
    s.rough *= 1.0 - 0.45 * g;
    s.cc = min(1.0, s.cc + 0.3 * g);
    s.ccRough *= 1.0 - 0.65 * g;
    s.env *= 1.0 + 0.25 * g + 0.05;
    s.color *= 1.0 - 0.07 * g;
  }
  ${k === 'B' ? 'gPpfMask = pm;' : ''}
  return s;
}
`

const SURF_RESOLVE = /* glsl */ `
Surf mixSurf(Surf a, Surf b, float k) {
  return Surf(mix(a.color, b.color, k), mix(a.rough, b.rough, k), mix(a.metal, b.metal, k), mix(a.cc, b.cc, k), mix(a.ccRough, b.ccRough, k),
              mix(a.env, b.env, k), mix(a.sheenColor, b.sheenColor, k), mix(a.sheenRough, b.sheenRough, k));
}

Surf resolveSurf(vec3 pn) {
  if (uProgress >= 0.999) return evalB(pn);
  Surf a = evalA(pn);
  Surf b = evalB(pn);
  float t = clamp(dot(pn - 0.5, uSweepDir) + 0.5, 0.0, 1.0);
  float k = smoothstep(0.0, uFeather, uProgress * (1.0 + uFeather) - t);
  return mixSurf(a, b, k);
}
`

const COMMON_PATCH = SURF_DECL + evalTemplate('A') + evalTemplate('B') + SURF_RESOLVE

/** Patches one paint material to evaluate the shared body surface. `uniforms` is private to the material. */
function patchMaterial(material: MeshPhysicalMaterial, uniforms: UniformMap) {
  material.onBeforeCompile = (shader: WebGLProgramParametersWithUniforms) => {
    Object.assign(shader.uniforms, uniforms)
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vWorldPos;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvWorldPos = ( modelMatrix * vec4( transformed, 1.0 ) ).xyz;')
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', '#include <common>\n' + COMMON_PATCH)
      .replace(
        '#include <color_fragment>',
        `#include <color_fragment>
        vec3 gPn = ( vWorldPos - uVMin ) / uVSize;
        gSurf = resolveSurf( gPn );
        diffuseColor.rgb = gSurf.color;
        #if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
          diffuseColor.rgb *= vColor.rgb;
        #endif`,
      )
      .replace('#include <roughnessmap_fragment>', '#include <roughnessmap_fragment>\nroughnessFactor = gSurf.rough;')
      .replace('#include <metalnessmap_fragment>', '#include <metalnessmap_fragment>\nmetalnessFactor = gSurf.metal;')
      .replace(
        '#include <emissivemap_fragment>',
        '#include <emissivemap_fragment>\ntotalEmissiveRadiance += vec3( 0.42, 0.2, 0.62 ) * uCue * gPpfMask * 0.05;',
      )
      .replace(
        '#include <lights_physical_fragment>',
        `#include <lights_physical_fragment>
        #ifdef USE_CLEARCOAT
          material.clearcoat = saturate( gSurf.cc );
          material.clearcoatRoughness = min( max( gSurf.ccRough, 0.045 ) + geometryRoughness, 1.0 );
        #endif
        #ifdef USE_SHEEN
          material.sheenColor = gSurf.sheenColor;
          material.sheenRoughness = clamp( gSurf.sheenRough, 0.0001, 1.0 );
        #endif`,
      )
      .replace(
        '#include <lights_fragment_end>',
        `#include <lights_fragment_end>
        reflectedLight.indirectSpecular *= gSurf.env;
        #ifdef USE_CLEARCOAT
          clearcoatSpecularIndirect *= gSurf.env;
        #endif`,
      )
  }
  material.userData.bodyUniforms = uniforms // inspection handle (dev tools / tests)
  // One program for every paint mesh; each material still gets its own uniforms.
  material.customProgramCacheKey = () => 'viz-body-surface-v1'
  material.needsUpdate = true
}

// ---------------------------------------------------------------------------------------------------------------------

interface Slot {
  mapped: MappedMesh
  uniforms: UniformMap
}

type Change = 'none' | 'sweep' | 'fade' | 'ceramic'

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

const sameSet = (a: ReadonlySet<string>, b: ReadonlySet<string>) => a.size === b.size && [...a].every((x) => b.has(x))

/** What kind of visual change takes the body from `a` to `b`. */
function classify(a: BodyConfig, b: BodyConfig): Change {
  const wrapStructure = (a.wrap?.color ?? null) !== (b.wrap?.color ?? null)
  const ppfStructure = (a.ppf === null) !== (b.ppf === null) || !sameSet(a.coverage, b.coverage)
  if (wrapStructure || ppfStructure) return 'sweep'
  if (a.ceramic !== b.ceramic) return 'ceramic'
  const finishChanged =
    JSON.stringify(a.wrap) !== JSON.stringify(b.wrap) || JSON.stringify(a.ppf) !== JSON.stringify(b.ppf)
  return finishChanged ? 'fade' : 'none'
}

/**
 * Owns the body-surface uniforms of every paint mesh and animates between configurations. The latest configuration always
 * wins: a change during a running transition starts the next one from the previously requested state.
 */
export class BodyFinishController {
  private readonly slots: Slot[]
  private current: BodyConfig = BODY_ORIGINAL
  private progress = 1
  private duration = 1
  private cue = 0
  private cueTarget = 0
  private initialised = false

  constructor(
    meshes: readonly MappedMesh[],
    bounds: { min: Vector3; size: Vector3 },
    baseColor: string,
  ) {
    const base = new Color(baseColor)
    this.slots = meshes
      .filter((m) => m.role === 'bodyPaint')
      .map((mapped) => {
        const uniforms = createUniforms()
        ;(uniforms.uVMin.value as Vector3).copy(bounds.min)
        ;(uniforms.uVSize.value as Vector3).copy(bounds.size)
        ;(uniforms.uBaseColor.value as Color).copy(base)
        ;(uniforms.uBaseP.value as Vector4).set(BASE_PAINT.roughness, BASE_PAINT.metalness, BASE_PAINT.clearcoat, BASE_PAINT.clearcoatRoughness)
        ;(uniforms.uBaseE.value as Vector4).set(BASE_PAINT.envIntensity, BASE_PAINT.sheenRoughness, 0, 0)
        return { mapped, uniforms }
      })
  }

  /**
   * Patches the paint materials to read this controller's uniforms. Kept out of the constructor on purpose: construction happens
   * inside useMemo, which React StrictMode runs twice and discards one result of, so it must not have side effects.
   */
  attach() {
    for (const s of this.slots) patchMaterial(s.mapped.material as MeshPhysicalMaterial, s.uniforms)
  }

  /** Applies `next` with a transition; `reduced` shortens it and removes the travelling sweep. */
  setConfig(next: BodyConfig, reduced: boolean) {
    const change = this.initialised ? classify(this.current, next) : 'none'
    if (!this.initialised) {
      this.writeConfig('A', next)
      this.writeConfig('B', next)
      this.progress = 1
      this.setProgress(1)
      this.initialised = true
      this.current = next
      return
    }
    if (change === 'none') {
      this.current = next
      return
    }
    // Previous target becomes the starting point (cancels a transition that is still running).
    this.writeConfig('A', this.current)
    this.writeConfig('B', next)
    const toward = change === 'ceramic' ? [0.1, 0, 0.9] : [0.12, 0, -0.9] // ceramic polishes rear -> front, everything else front -> rear
    for (const s of this.slots) {
      ;(s.uniforms.uSweepDir.value as Vector3).set(toward[0], toward[1], toward[2])
      s.uniforms.uFeather.value = change === 'fade' || reduced ? 3 : 0.22
    }
    this.duration = reduced ? 0.3 : change === 'fade' ? 0.75 : change === 'ceramic' ? 1.05 : 1.3
    this.progress = 0
    this.setProgress(0)
    this.current = next
  }

  /** Subtle lilac cue over the PPF area while the PPF editor is open. */
  setCue(on: boolean) {
    this.cueTarget = on ? 1 : 0
  }

  /** Advances the transition; returns true while anything is still moving (so the caller keeps rendering). */
  tick(dt: number): boolean {
    let moving = false
    if (this.progress < 1) {
      this.progress = Math.min(1, this.progress + dt / this.duration)
      this.setProgress(this.progress)
      moving = true
    }
    if (this.cue !== this.cueTarget) {
      this.cue = MathUtils.damp(this.cue, this.cueTarget, 6, dt)
      if (Math.abs(this.cue - this.cueTarget) < 0.005) this.cue = this.cueTarget
      for (const s of this.slots) s.uniforms.uCue.value = this.cue
      moving = true
    }
    return moving
  }

  private setProgress(p: number) {
    const eased = p >= 1 ? 1 : easeInOut(p)
    for (const s of this.slots) s.uniforms.uProgress.value = eased
  }

  private writeConfig(k: 'A' | 'B', c: BodyConfig) {
    const tmp = new Color()
    for (const { mapped, uniforms: u } of this.slots) {
      u[`u${k}WrapOn`].value = c.wrap ? 1 : 0
      if (c.wrap) {
        ;(u[`u${k}WrapColor`].value as Color).set(c.wrap.color)
        ;(u[`u${k}WrapP`].value as Vector4).set(c.wrap.roughness, c.wrap.metalness, c.wrap.clearcoat, c.wrap.clearcoatRoughness)
        ;(u[`u${k}WrapE`].value as Vector4).set(c.wrap.envIntensity, c.wrap.sheenRoughness, 0, 0)
        ;(u[`u${k}WrapSheen`].value as Color).copy(tmp.set(c.wrap.sheenColor).multiplyScalar(c.wrap.sheen))
      }
      u[`u${k}PpfOn`].value = c.ppf ? 1 : 0
      if (c.ppf) (u[`u${k}PpfP`].value as Vector4).set(c.ppf.roughness, c.ppf.clearcoat, c.ppf.clearcoatRoughness, c.ppf.envIntensity)
      const mask: PpfMask = c.ppf ? resolveCoverageMask(mapped.represents, c.coverage) : { kind: 'none' }
      u[`u${k}PpfMode`].value = mask.kind === 'none' ? 0 : mask.kind === 'all' ? 1 : 2
      if (mask.kind === 'regions') {
        u[`u${k}PpfCount`].value = mask.regions.length
        const mins = u[`u${k}PpfMin`].value as Vector3[]
        const maxs = u[`u${k}PpfMax`].value as Vector3[]
        mask.regions.forEach((r, i) => {
          mins[i].set(...r.min)
          maxs[i].set(...r.max)
        })
      } else u[`u${k}PpfCount`].value = 0
      u[`u${k}Ceramic`].value = c.ceramic ? 1 : 0
    }
  }
}
