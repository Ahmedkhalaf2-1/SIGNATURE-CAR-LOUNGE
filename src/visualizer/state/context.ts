import { createContext, type Dispatch } from 'react'
import type { VisualizerConfiguration, VisualizerState } from '../types'
import type { VisualizerAction } from './reducer'

export interface VisualizerContextValue {
  state: VisualizerState
  dispatch: Dispatch<VisualizerAction>
  configuration: VisualizerConfiguration
}

export const VisualizerContext = createContext<VisualizerContextValue | null>(null)
