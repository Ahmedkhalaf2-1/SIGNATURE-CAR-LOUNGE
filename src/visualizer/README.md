# Visualizer (`/visualizer`)

Frontend-only 3D configurator (PPF, Wrap, Ceramic, Tint). No network calls; state is local.
`VisualizerConfiguration` (`state/selectors.ts#toConfiguration`) is the serializable shape intended for the enquiry endpoint.

```
types.ts / constants.ts      semantic ids, option tables, camera presets, explode offsets, studio layout (no three.js)
state/                       reducer, context, derived configuration, hover store
materials/                   appearance.ts (state -> PBR targets), useMaterialAnimator.ts (eases materials)
vehicle/                     vehicleModelConfig.ts  <- the ONLY file to edit when swapping vehicles
                             buildVehicle.ts        load -> map -> normalise (centre, scale, ground, orient)
                             VehicleModel.tsx       semantic hover/click, material targets, exploded view
scene/                       Studio.tsx (room, floor, LEDs, baked reflections), CameraRig.tsx, VisualizerCanvas.tsx
ui/                          panels, summary, modal, loading / fallback / error boundary
```

Only `scene/VisualizerCanvas.tsx` imports three.js/drei; it is lazy-loaded, so other routes never download it.

## Treatment model (persistent layers)

`state/reducer.ts`: **Wrap, PPF, Ceramic and Tint are independent layers**, each with its own `enabled` flag and options.
`activeService` only says which editor tab is open; it is never read when rendering. Tabs, camera, compare and explode never
write to a treatment. Per-service reset (`resetService`) clears one layer; `reset` clears all four (and the camera).

Body surface = pure function of the whole stack, evaluated in one patched `MeshPhysicalMaterial` shader
(`materials/bodyShader.ts`): `BASE -> WRAP -> PPF (masked) -> CERAMIC`. Glass = `BASE GLASS -> TINT` (`materials/appearance.ts`).
Transitions blend two complete configurations (A -> B) by moving one uniform; a change mid-transition retargets from the
previous request. Wrap colour / PPF coverage sweep across the car (front -> rear), finish changes cross-fade, ceramic
polishes rear -> front.

PPF coverage goes through `materials/coverage.ts`: a mesh that IS one panel is wholly covered or not; a fused body shell is
approximated by soft-edged boxes in normalised vehicle space (`PANEL_REGIONS`). A segmented GLB needs no UI change.

## Swapping the vehicle

1. Put the GLB in `public/models/` (meshopt is supported; Draco is disabled, see `useVehicleModel.ts`).
2. Open the page in dev: `buildVehicle` logs the node / mesh / material table and source bounds to the console.
3. Edit `vehicle/vehicleModelConfig.ts`: `url`, `targetLength`, `yawDegrees` (source must face +Z with the left side on +X after yaw),
   and `mapping` rules `{ node?, mesh?, material?, part, role, represents? }` (first match wins).
4. Nothing else changes. Scale, centring and grounding (lowest vertex = floor) and the camera framing are derived from bounds.

### What a production model should provide

- One mesh per paint panel with stable names: hood, front/rear bumper, roof, 4 fenders, 2 doors, trunk, 2 mirrors.
  Map each to its `PaintPanelId` with no `represents` (a single-panel mesh); panel-level PPF, hover, click and the exploded view then work fully.
- Separate glass meshes (windshield, side windows, rear glass) so tint can leave the windshield alone.
- Four wheel nodes (tyre + rim as separate primitives or meshes), pivots at the wheel centre.
- Named, **non-shared** materials per role (paint / glass / trim / rim / tyre). Materials are cloned before mutation either way.
- Y-up, real-world proportions are irrelevant (scaled to `targetLength`), origin anywhere (it is re-centred).

## Active vehicle: 2004 Porsche Carrera GT (`public/models/2004_porsche_carrera_gt.glb`)

Sketchfab FBX export: **17.9 MB, 225k triangles, 2,685 nodes, 1,331 meshes, 24 materials, 31 textures**, no animation.
Authored at 1/100 scale, Y-up, nose toward +Z (engine at -Z), so `yawDegrees` is 0; it is scaled to 4.5 m at load.

Semantic material roles (`MaterialRole` in `types.ts`). **Only `bodyPaint` responds to Wrap / PPF / Ceramic / highlight
and only `glass` responds to Tint.** Every other role is an exact `material.clone()` of what the GLB authored (textures,
KHR specular / clearcoat / transmission, alpha, emissive), so wheels and lamps are never modified.

| Role / part                         | Source in the GLB                                                              | Handling                              |
| ----------------------------------- | ------------------------------------------------------------------------------ | ------------------------------------- |
| `bodyPaint` / mainBody              | `C1_Paint` (2 meshes, black base)                                              | managed; all panels fused             |
| `glass` / windshield, left/right window, rearGlass | `C1_Vidrios_Tr` pieces with centre in the cabin               | managed; depth pre-pass, absorb blend |
| `headlights`                        | `C1_Light` + `C1_Vidrios_Tr` pieces at z > 1.2, y < 0.9                        | exact clone                           |
| `taillights`                        | `C1_Light`, `C1_Vidiro_Rojo` (red lens), `C1_Vidrios_Tr` pieces at z < -1.4    | exact clone (transmission kept)       |
| `wheels` / 4 corners                | `Wheel1A_Details_Material` (733 meshes, merged per corner)                     | exact clone                           |
| `brake` / corners                   | `CallipersCalliperA_Details_Material` (562 meshes, merged)                     | exact clone                           |
| `interior`, `engine`, `carbon`, `trim`, `exhaust` | Interior*/Engine* nodes, `C1_Carbon`, grilles, black plastic    | exact clone, labelled                 |

`C1_Vidrios_Tr` is shared by windows AND lamp covers, so meshes carrying it are split into connected pieces and each
piece is classified by position (`regions` in `vehicleModelConfig.ts`).

Glass rendering: pieces merged per part; a colour-less depth pre-pass (`renderOrder` 9) lets only the nearest of the
cabin's stacked glass layers blend (`renderOrder` 10) with ordinary alpha blending; reflection strength rises with the film
so LED lines stay visible. The windshield follows the shade down to 20% VLT.

GLB gotchas found on this asset: `COLOR_0` is RGBA with alpha ~0 on glass and lamps (it must be baked as RGB, otherwise
blended surfaces vanish); wheels need their vertex colours (without them they render black); KHR_materials_transmission is
not rendered (black-based clear covers would go black), so the red rear lens is alpha-blended with vertex colours off.

Notes and limitations:

- Wheel pieces are placed on a corner by their world position (left = +X, front = +Z); tyre and rim share one textured
  atlas material, so they cannot be recoloured separately. Wheels and calipers are never touched by Wrap/PPF.
- **Body panels are fused** into one paint shell, exactly as with the earlier test car: panel-level PPF is previewed across
  the whole body, with an on-screen note. The configuration still records the exact panels.
- **Glass is five meshes, windshield not separate**, so tint covers all glass (the tint copy says so when
  `capabilities.separateWindshield` is false).
- Exploded view moves the four wheel assemblies only.
- The file is heavy for production. Before launch, run it through meshopt/KTX2 compression (for example
  `gltf-transform optimize`, keeping nodes unmerged for the wheel groups) to bring it to a few MB; `useGLTF` already
  decodes meshopt.
- Draw calls: 1,331 meshes collapse to 43 at load. Contact shadows re-render only after the vehicle changes shape.

The earlier Kenney race car stays available as `TEST_RACE_CAR` in `vehicle/vehicleModelConfig.ts`.


## Multiple vehicles

`/visualizer` shows a selector (`ui/VehicleSelector.tsx`, static thumbnails, no three.js); `/visualizer?vehicle=<id>` opens that vehicle; an
unknown id falls back to the selector. The provider is keyed by vehicle, so treatment state never carries from one car to another, and the
previous GLB's GPU buffers and glTF cache entry are released shortly after leaving it (`vehicle/useVehicleModel.ts`).

Add a car: (1) put the GLB in `public/models/`; (2) write a `VehicleModelConfig` (see `vehicle/vehicles/bmw7SeriesF01.ts`); (3) add a thumbnail
to `public/assets/visualizer/`; (4) add ONE entry to `vehicle/vehicleRegistry.ts`; (5) if the model is CC-BY, add it to `credits.ts`.
`MeshRule.perTriangle` classifies triangles by position for flat-shaded "triangle soup" meshes.

### BMW 7 Series (F01), Black Snow, CC BY 4.0
10.2 MB, 85k triangles, 70 nodes, 34 meshes, 34 materials, 1 texture. Source: Y-up, nose toward -X, 3.005 x 0.848 x 1.232 (scaled to 5.0 m,
turned a quarter turn automatically). The whole shell is one black `Body_Color` mesh (all panels fused => approximate PPF masks, as on the
Porsche); glass is one translucent material split by position into windshield / rear / side / headlights / taillights; wheels, tyres and brakes
are carved out of generic `M_01xx` materials by position and kept as authored.

### Mercedes models (added after the BMW)
- **S-Class W223 Brabus 850** (Black Snow, CC BY 4.0, 58.6 MB, 1.09M tris): clean named panel nodes. Paint = the shared `TwiXeR_W223` material on
  exterior nodes only (hood, doors, fenders, trunk, mirrors, bumpers, skirts) plus meshes `Object_267..270` of `body_50` (roof / rear quarters, fused).
  The same material also covers tyres and interior plastics, which are not painted. Some cabin pillar surfaces share those fused meshes, so a
  wrap shows faintly on the inside of the pillars.
- **S65 W222** (Black Snow, CC BY 4.0, 28.8 MB, 559k tris): named panels; paint = `sw222_paint`; the rear glazing is one mesh.
- **G900 by Brabus** (Casacade Models, CC BY 4.0, 66 MB, 518k tris): poorly structured export. Only the `bodypaint` material is paint (the black
  carbon and trim parts stay as authored); wheels are fused front+rear per side and are carved out by position (`perTriangle`); glass is one part.
- **Ferrari LaFerrari (Element 6)** (Echoo, 78 MB) is added at the owner's request but is CC BY-NC-ND 4.0 (non-commercial, no derivatives). Do not publish
  it on the live site without the author's permission; remove its registry entry to hide it.
- These GLBs are large and uncompressed. Meshopt/Draco compression (e.g. `gltf-transform optimize`) would cut each by roughly 60-80%.
