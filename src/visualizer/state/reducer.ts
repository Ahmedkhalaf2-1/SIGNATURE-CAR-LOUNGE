import { DEFAULT_CAMERA_PRESET, INITIAL_STATE } from '../constants'
import type { CameraPresetId, CompareView, CoverageId, FinishId, PaintPanelId, ServiceId, TintId, VisualizerState, WrapColorId } from '../types'
import { coveragePanels } from './selectors'

export type VisualizerAction =
  | { type: 'setActiveService'; service: ServiceId }
  | { type: 'setWrapEnabled'; enabled: boolean }
  | { type: 'setWrapColor'; color: WrapColorId }
  | { type: 'setWrapFinish'; finish: FinishId }
  | { type: 'setPpfEnabled'; enabled: boolean }
  | { type: 'setCoverage'; coverage: CoverageId }
  | { type: 'setPpfFinish'; finish: FinishId }
  | { type: 'togglePanel'; panel: PaintPanelId }
  | { type: 'setCeramicEnabled'; enabled: boolean }
  | { type: 'setTintEnabled'; enabled: boolean }
  | { type: 'setTint'; shade: TintId }
  | { type: 'resetService'; service: ServiceId }
  | { type: 'setView'; view: CompareView }
  | { type: 'setExploded'; exploded: boolean }
  | { type: 'setCamera'; preset: CameraPresetId }
  | { type: 'reset' }

/**
 * Every treatment edit enables its own layer and returns the compare switch to "treated"; none of them touches another layer.
 * Switching tab, changing camera, comparing and exploding never write to the treatment fields.
 */
export function visualizerReducer(state: VisualizerState, action: VisualizerAction): VisualizerState {
  switch (action.type) {
    case 'setActiveService':
      return state.activeService === action.service ? state : { ...state, activeService: action.service }

    case 'setWrapEnabled':
      return { ...state, view: 'treated', wrap: { ...state.wrap, enabled: action.enabled } }
    case 'setWrapColor':
      return { ...state, view: 'treated', wrap: { ...state.wrap, enabled: true, color: action.color } }
    case 'setWrapFinish':
      return { ...state, view: 'treated', wrap: { ...state.wrap, enabled: true, finish: action.finish } }

    case 'setPpfEnabled':
      return { ...state, view: 'treated', ppf: { ...state.ppf, enabled: action.enabled } }
    case 'setCoverage':
      // Entering Custom starts from the panels the previous preset covered, so nothing visually disappears.
      return {
        ...state,
        view: 'treated',
        ppf: {
          ...state.ppf,
          enabled: true,
          coverage: action.coverage,
          customPanels: action.coverage === 'custom' && state.ppf.coverage !== 'custom' ? [...coveragePanels(state.ppf)] : state.ppf.customPanels,
        },
      }
    case 'setPpfFinish':
      return { ...state, view: 'treated', ppf: { ...state.ppf, enabled: true, finish: action.finish } }
    case 'togglePanel': {
      const current = coveragePanels(state.ppf)
      const next = current.includes(action.panel) ? current.filter((p) => p !== action.panel) : [...current, action.panel]
      return { ...state, view: 'treated', ppf: { ...state.ppf, enabled: next.length > 0, coverage: 'custom', customPanels: next } }
    }

    case 'setCeramicEnabled':
      return { ...state, view: 'treated', ceramic: { enabled: action.enabled } }

    case 'setTintEnabled':
      return { ...state, view: 'treated', tint: { ...state.tint, enabled: action.enabled } }
    case 'setTint':
      return { ...state, view: 'treated', tint: { enabled: true, shade: action.shade } }

    case 'resetService':
      // Resets one layer only; the other three stay exactly as they were.
      return { ...state, view: 'treated', [action.service]: INITIAL_STATE[action.service] }

    case 'setView':
      return { ...state, view: action.view }
    case 'setExploded':
      return { ...state, exploded: action.exploded }
    case 'setCamera':
      return { ...state, camera: { preset: action.preset, nonce: state.camera.nonce + 1 } }
    case 'reset':
      return { ...INITIAL_STATE, activeService: state.activeService, camera: { preset: DEFAULT_CAMERA_PRESET, nonce: state.camera.nonce + 1 } }
  }
}
