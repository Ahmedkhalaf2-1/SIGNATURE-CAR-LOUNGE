import { useI18n } from '../../i18n'

interface Props {
  /** Visible label of the switch, e.g. "Apply Wrap". */
  label: string
  enabled: boolean
  onToggle: (enabled: boolean) => void
  /** Visible label of the reset action, e.g. "Reset Wrap". Resets this service only. */
  resetLabel: string
  onReset: () => void
}

/** Top of every editor: whether this layer is applied to the vehicle, and a reset for this layer alone. */
export function TreatmentHeader({ label, enabled, onToggle, resetLabel, onReset }: Props) {
  const { t } = useI18n()
  return (
    <div className="viz-treat">
      <button type="button" role="switch" aria-checked={enabled} className="viz-switch" onClick={() => onToggle(!enabled)}>
        <span className="viz-switch__track" aria-hidden="true">
          <span className="viz-switch__thumb" />
        </span>
        <span className="viz-switch__label">{label}</span>
        <span className="viz-switch__state">{enabled ? t('Applied') : t('Not applied')}</span>
      </button>
      <button type="button" className="viz-link" onClick={onReset}>
        {resetLabel}
      </button>
    </div>
  )
}
