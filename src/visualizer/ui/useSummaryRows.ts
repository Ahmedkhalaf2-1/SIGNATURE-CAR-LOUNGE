import { COVERAGE_OPTIONS, FINISH_OPTIONS, PANEL_LABELS, TINT_OPTIONS, WRAP_COLORS } from '../constants'
import type { VisualizerConfiguration } from '../types'
import { useI18n } from '../../i18n'

const find = <T extends { id: string; label: string }>(list: readonly T[], id: string | null) => list.find((o) => o.id === id)?.label

export interface SummaryRow {
  label: string
  value: string
  list?: string[]
}

/** One row per APPLIED treatment, whichever tab is open. Derived from the serializable configuration. */
export function useSummaryRows(c: VisualizerConfiguration): SummaryRow[] {
  const { t } = useI18n()
  const rows: SummaryRow[] = [{ label: t('Vehicle'), value: t(c.vehicle.name) }]
  if (c.wrap) rows.push({ label: t('Wrap'), value: `${t(find(WRAP_COLORS, c.wrap.color) ?? '')} · ${t(find(FINISH_OPTIONS, c.wrap.finish) ?? '')}` })
  if (c.ppf) {
    rows.push({
      label: t('PPF'),
      value: `${t(find(COVERAGE_OPTIONS, c.ppf.coverage) ?? '')} · ${t(find(FINISH_OPTIONS, c.ppf.finish) ?? '')}`,
      list: c.ppf.selectedPanels.map((p) => t(PANEL_LABELS[p])),
    })
  }
  if (c.ceramic) rows.push({ label: t('Ceramic'), value: t('Applied') })
  if (c.tint) rows.push({ label: t('Tint'), value: find(TINT_OPTIONS, c.tint.percentage) ?? '' })
  if (rows.length === 1) rows.push({ label: t('Treatments'), value: t('None applied: original vehicle') })
  return rows
}
