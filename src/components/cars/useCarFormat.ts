import { useMemo } from 'react'
import { useI18n } from '../../i18n'
import type { CarStatus } from '../../data/cars'

/** Locale-aware mileage, status and count helpers (Latin digits in both languages, see LOCALES). */
export function useCarFormat() {
  const { t, info } = useI18n()
  return useMemo(() => {
    const nf = new Intl.NumberFormat(info.intl, { maximumFractionDigits: 0 })
    const plural = new Intl.PluralRules(info.lang)
    const statusLabels: Record<CarStatus, string> = {
      available: t('Available'),
      reserved: t('Reserved'),
      sold: t('Sold'),
    }
    return {
      status: (s: CarStatus) => statusLabels[s],
      mileage: (n: number) => `${nf.format(n)} ${t('km')}`,
      number: (n: number) => nf.format(n),
      count: (n: number) => {
        // Arabic has dual (2) and many (11-99) forms on top of one/few; English only one/other. Keys fall back to English.
        const cat = plural.select(n)
        const key =
          cat === 'one' ? '{n} vehicle' : cat === 'two' ? '{n} vehicles (two)' : cat === 'many' ? '{n} vehicles (many)' : '{n} vehicles'
        return t(key).replace('{n}', nf.format(n))
      },
    }
  }, [t, info])
}
