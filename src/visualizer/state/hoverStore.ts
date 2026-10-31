import { useSyncExternalStore } from 'react'
import type { VehiclePartId } from '../types'

/** Pointer hover lives outside React state so moving over the car never re-renders the control panels. */
export interface HoverInfo {
  part: VehiclePartId
  /** True when the hovered mesh stands for several panels at once (model without separate panels). */
  approximate: boolean
}

let current: HoverInfo | null = null
const listeners = new Set<() => void>()

export const hoverStore = {
  get: () => current,
  set(next: HoverInfo | null) {
    if (current?.part === next?.part && current?.approximate === next?.approximate) return
    current = next
    listeners.forEach((l) => l())
  },
  subscribe(l: () => void) {
    listeners.add(l)
    return () => void listeners.delete(l)
  },
}

export const useHover = () => useSyncExternalStore(hoverStore.subscribe, hoverStore.get, hoverStore.get)
