import { useMemo, useReducer, type ReactNode } from 'react'
import { INITIAL_STATE } from '../constants'
import { VisualizerContext } from './context'
import { visualizerReducer } from './reducer'
import { toConfiguration } from './selectors'

/** Mount with `key={vehicle.id}`: a different vehicle starts from a clean treatment state (nothing unsupported carries over). */
export function VisualizerProvider({ vehicle, children }: { vehicle: { id: string; name: string }; children: ReactNode }) {
  const [state, dispatch] = useReducer(visualizerReducer, INITIAL_STATE)
  const value = useMemo(() => ({ state, dispatch, configuration: toConfiguration(state, vehicle) }), [state, vehicle])
  return <VisualizerContext.Provider value={value}>{children}</VisualizerContext.Provider>
}
