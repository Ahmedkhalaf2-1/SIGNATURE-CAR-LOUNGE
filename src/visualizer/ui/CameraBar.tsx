import type { Dispatch, Ref } from 'react'
import { CAMERA_PRESETS } from '../constants'
import type { VisualizerAction } from '../state/reducer'
import type { VisualizerState } from '../types'
import { useI18n } from '../../i18n'

interface Props {
  state: VisualizerState
  dispatch: Dispatch<VisualizerAction>
  canExplode: boolean
  hidden: boolean
  barRef: Ref<HTMLDivElement>
}

const Icon = ({ d }: { d: string }) => (
  <svg className="brand-icon" width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d={d} />
  </svg>
)

/** Light, single-row camera dock: view presets plus reset-view and explode. Labels stay visible for accessibility. */
export function CameraBar({ state, dispatch, canExplode, hidden, barRef }: Props) {
  const { t } = useI18n()
  return (
    <div className={`viz-camera${hidden ? ' is-hidden' : ''}`} ref={barRef} role="toolbar" aria-label={t('Camera')}>
      <div className="viz-camera__views">
        {CAMERA_PRESETS.map((p) => (
          <button key={p.id} type="button" className="viz-chip" aria-pressed={state.camera.preset === p.id} onClick={() => dispatch({ type: 'setCamera', preset: p.id })}>
            {t(p.label)}
          </button>
        ))}
      </div>
      <span className="viz-camera__sep" aria-hidden="true" />
      <button type="button" className="viz-chip viz-chip--icon" onClick={() => dispatch({ type: 'setCamera', preset: 'front34' })} aria-label={t('Reset view')} title={t('Reset view')}>
        <Icon d="M4 12a8 8 0 1 0 2.6-5.9M4 4v4.5h4.5" />
      </button>
      <button type="button" className="viz-chip viz-chip--icon" aria-pressed={state.exploded} disabled={!canExplode} onClick={() => dispatch({ type: 'setExploded', exploded: !state.exploded })}>
        <Icon d={state.exploded ? 'M9 9 4 4m0 0v4m0-4h4M15 9l5-5m0 0v4m0-4h-4M9 15l-5 5m0 0v-4m0 4h4M15 15l5 5m0 0v-4m0 4h-4' : 'M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5'} />
        <span>{state.exploded ? t('Reassemble') : t('Explode')}</span>
      </button>
    </div>
  )
}
