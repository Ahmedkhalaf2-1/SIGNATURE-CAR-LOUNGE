import type { Dispatch } from 'react'
import { COMPARE_OPTIONS, COVERAGE_OPTIONS, FINISH_OPTIONS, PANEL_LABELS, TINT_OPTIONS, WRAP_COLORS } from '../constants'
import { PAINT_PANEL_IDS, type VisualizerState } from '../types'
import { coveragePanels } from '../state/selectors'
import type { VisualizerAction } from '../state/reducer'
import type { VehicleCapabilities } from '../vehicle/types'
import { useI18n } from '../../i18n'
import { CheckGroup, RadioGroup } from './OptionGroup'
import { TreatmentHeader } from './TreatmentHeader'

interface Props {
  state: VisualizerState
  dispatch: Dispatch<VisualizerAction>
  capabilities: VehicleCapabilities | null
}

/** Original / With Treatment: compares the vehicle with the COMPLETE applied stack, whichever tab is open. */
function Compare({ state, dispatch }: Pick<Props, 'state' | 'dispatch'>) {
  const { t } = useI18n()
  return (
    <RadioGroup
      legend={t('Compare')}
      variant="segmented"
      options={COMPARE_OPTIONS.map((o) => ({ ...o, label: t(o.label) }))}
      value={state.view}
      onChange={(view) => dispatch({ type: 'setView', view })}
    />
  )
}

function WrapPanel({ state, dispatch }: Props) {
  const { t } = useI18n()
  const { enabled, color, finish } = state.wrap
  return (
    <>
      <TreatmentHeader
        label={t('Apply Wrap')}
        enabled={enabled}
        onToggle={(on) => dispatch({ type: 'setWrapEnabled', enabled: on })}
        resetLabel={t('Reset Wrap')}
        onReset={() => dispatch({ type: 'resetService', service: 'wrap' })}
      />
      <RadioGroup
        legend={t('Finish')}
        variant="segmented"
        options={FINISH_OPTIONS.map((o) => ({ ...o, label: t(o.label) }))}
        value={finish}
        onChange={(f) => dispatch({ type: 'setWrapFinish', finish: f })}
      />
      <RadioGroup
        legend={t('Color')}
        variant="swatches"
        scroll
        options={WRAP_COLORS.map((c) => ({ id: c.id, label: t(c.label), swatch: c.hex }))}
        value={enabled ? color : null}
        onChange={(c) => dispatch({ type: 'setWrapColor', color: c })}
      />
      <Compare state={state} dispatch={dispatch} />
    </>
  )
}

function PpfPanel({ state, dispatch, capabilities }: Props) {
  const { t } = useI18n()
  const { enabled, coverage, finish } = state.ppf
  const covered = coveragePanels(state.ppf)
  return (
    <>
      <TreatmentHeader
        label={t('Apply PPF')}
        enabled={enabled}
        onToggle={(on) => dispatch({ type: 'setPpfEnabled', enabled: on })}
        resetLabel={t('Reset PPF')}
        onReset={() => dispatch({ type: 'resetService', service: 'ppf' })}
      />
      <RadioGroup
        legend={t('Coverage')}
        scroll
        options={COVERAGE_OPTIONS.map((o) => ({ ...o, label: t(o.label) }))}
        value={enabled ? coverage : null}
        onChange={(c) => dispatch({ type: 'setCoverage', coverage: c })}
      />
      <RadioGroup
        legend={t('Finish')}
        variant="segmented"
        options={FINISH_OPTIONS.map((o) => ({ ...o, label: t(o.label) }))}
        value={finish}
        onChange={(f) => dispatch({ type: 'setPpfFinish', finish: f })}
      />
      <details className="viz-disclosure" open={coverage === 'custom' || undefined}>
        <summary>
          <span>{t('Panels')}</span>
          <span className="viz-disclosure__count">{covered.length}</span>
        </summary>
        <CheckGroup
          legend={t('Panels')}
          hideLegend
          scroll
          options={PAINT_PANEL_IDS.map((id) => ({ id, label: t(PANEL_LABELS[id]) }))}
          values={covered}
          onToggle={(panel) => dispatch({ type: 'togglePanel', panel })}
        />
      </details>
      {capabilities?.panelPrecision === 'approximate' && (
        <p className="viz-note" role="note">
          {t('Preview model note: this vehicle has a single body shell, so each coverage area is shown as a soft approximation. Your selection above is saved exactly.')}
        </p>
      )}
      <Compare state={state} dispatch={dispatch} />
    </>
  )
}

function CeramicPanel({ state, dispatch }: Props) {
  const { t } = useI18n()
  return (
    <>
      <TreatmentHeader
        label={t('Apply Ceramic Coating')}
        enabled={state.ceramic.enabled}
        onToggle={(on) => dispatch({ type: 'setCeramicEnabled', enabled: on })}
        resetLabel={t('Reset Ceramic')}
        onReset={() => dispatch({ type: 'resetService', service: 'ceramic' })}
      />
      <p className="viz-hint viz-hint--block">
        {t('Ceramic is the final coating over the whole exterior: deeper gloss and richer, controlled reflections on top of any wrap or film. A matte finish stays matte.')}
      </p>
      <Compare state={state} dispatch={dispatch} />
    </>
  )
}

function TintPanel({ state, dispatch, capabilities }: Props) {
  const { t } = useI18n()
  const { enabled, shade } = state.tint
  return (
    <>
      <TreatmentHeader
        label={t('Apply Tint')}
        enabled={enabled}
        onToggle={(on) => dispatch({ type: 'setTintEnabled', enabled: on })}
        resetLabel={t('Reset Tint')}
        onReset={() => dispatch({ type: 'resetService', service: 'tint' })}
      />
      <RadioGroup
        legend={t('Shade (visible light)')}
        scroll
        options={TINT_OPTIONS.map((o) => ({ id: o.id, label: o.label }))}
        value={enabled ? shade : null}
        onChange={(s) => dispatch({ type: 'setTint', shade: s })}
        hint={
          capabilities && !capabilities.separateWindshield
            ? t('Lower percentages let less light through. On this vehicle model the film covers all glass, windshield included.')
            : t('Lower percentages let less light through. Side and rear glass take the full shade; the windshield follows it down to 20%.')
        }
      />
      <p className="viz-note" role="note">
        {t('Visual simulation only. Real film appearance varies with vehicle, lighting and local regulations.')}
      </p>
      {capabilities && !capabilities.separateGlass && <p className="viz-note">{t('This vehicle model has no separate glass, so tint cannot be previewed.')}</p>}
      <Compare state={state} dispatch={dispatch} />
    </>
  )
}

/** The editor for the OPEN tab. It only edits its own layer; every other layer stays applied underneath. */
export function ModePanel(props: Props) {
  switch (props.state.activeService) {
    case 'ppf':
      return <PpfPanel {...props} />
    case 'wrap':
      return <WrapPanel {...props} />
    case 'ceramic':
      return <CeramicPanel {...props} />
    case 'tint':
      return <TintPanel {...props} />
  }
}
