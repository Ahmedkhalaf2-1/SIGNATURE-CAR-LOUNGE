import { COVERAGE_PANELS } from '../constants'
import type { PaintPanelId, VisualizerConfiguration, VisualizerState } from '../types'

/** Panels the PPF layer covers right now (none while the layer is off); one source for scene, summary and request payload. */
export function coveragePanels(ppf: VisualizerState['ppf']): readonly PaintPanelId[] {
  if (!ppf.enabled) return []
  return ppf.coverage === 'custom' ? ppf.customPanels : COVERAGE_PANELS[ppf.coverage]
}

/** True when at least one treatment layer is applied. */
export const hasTreatments = (s: VisualizerState) => s.wrap.enabled || s.ppf.enabled || s.ceramic.enabled || s.tint.enabled

/** Derives the serializable configuration (the whole composed stack, not the open tab) from state; nothing is stored twice. */
export function toConfiguration(state: VisualizerState, vehicle: { id: string; name: string }): VisualizerConfiguration {
  return {
    version: 2,
    vehicle: { id: vehicle.id, name: vehicle.name },
    wrap: state.wrap.enabled ? { color: state.wrap.color, finish: state.wrap.finish } : null,
    ppf: state.ppf.enabled ? { coverage: state.ppf.coverage, finish: state.ppf.finish, selectedPanels: [...coveragePanels(state.ppf)] } : null,
    ceramic: state.ceramic.enabled,
    tint: state.tint.enabled ? { percentage: state.tint.shade } : null,
  }
}
