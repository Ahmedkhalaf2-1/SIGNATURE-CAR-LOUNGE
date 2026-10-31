import { useContext } from 'react'
import { VisualizerContext, type VisualizerContextValue } from './context'

export function useVisualizer(): VisualizerContextValue {
  const ctx = useContext(VisualizerContext)
  if (!ctx) throw new Error('useVisualizer must be used inside <VisualizerProvider>')
  return ctx
}
