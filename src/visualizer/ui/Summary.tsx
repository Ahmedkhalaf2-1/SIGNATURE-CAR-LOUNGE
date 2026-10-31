import type { VisualizerConfiguration } from '../types'
import { useI18n } from '../../i18n'
import { useSummaryRows } from './useSummaryRows'

export function Summary({ configuration, compact }: { configuration: VisualizerConfiguration; compact?: boolean }) {
  const { t } = useI18n()
  const rows = useSummaryRows(configuration)
  return (
    <dl className={`viz-summary${compact ? ' viz-summary--compact' : ''}`} aria-label={t('Configuration summary')}>
      {rows.map((r) => (
        <div key={r.label} className="viz-summary__row">
          <dt>{r.label}</dt>
          <dd>
            {r.value}
            {r.list && r.list.length > 0 && (
              <ul>
                {r.list.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            )}
          </dd>
        </div>
      ))}
    </dl>
  )
}
