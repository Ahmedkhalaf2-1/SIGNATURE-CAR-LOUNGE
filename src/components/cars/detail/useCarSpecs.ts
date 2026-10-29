import { useMemo } from 'react'
import { useI18n } from '../../../i18n'
import type { CarListing } from '../../../data/cars'
import { useCarFormat } from '../useCarFormat'

export interface SpecItem {
  key: string
  label: string
  /** Technical value; always rendered left-to-right. */
  value: string
  /** Optional unit shown smaller beside the value. */
  unit?: string
}

/** "612 PS" -> { value: "612", unit: "PS" }; values without a leading number stay whole. */
function splitUnit(v: string): { value: string; unit?: string } {
  const m = v.match(/^([\d.,]+)\s+(.+)$/)
  return m ? { value: m[1], unit: m[2] } : { value: v }
}

/** Builds the headline strip and the full specification table from the listing; missing values are skipped. */
export function useCarSpecs(car: CarListing) {
  const { t } = useI18n()
  const fmt = useCarFormat()
  return useMemo(() => {
    const spec = (key: string, label: string, v?: string | number, unit?: string): SpecItem | null =>
      v == null || v === '' ? null : { key, label, value: String(v), unit }
    const measured = (key: string, label: string, v?: string): SpecItem | null => (v ? { key, label, ...splitUnit(v) } : null)
    const keep = (xs: (SpecItem | null)[]) => xs.filter((x): x is SpecItem => x !== null)

    const mileage = car.mileage != null ? spec('mileage', t('Mileage'), fmt.number(car.mileage), t('km')) : null

    // Headline strip: the first six available, in this priority. Year and mileage belong to the individual car.
    const strip = keep([
      spec('year', t('Year'), car.year),
      mileage,
      spec('engine', t('Engine'), car.engine),
      measured('power', t('Power'), car.power),
      measured('torque', t('Torque'), car.torque),
      spec('drive', t('Drivetrain'), car.drivetrain),
      measured('accel', t('0–100 km/h'), car.zeroTo100),
      measured('top', t('Top Speed'), car.topSpeed),
      measured('weight', t('Weight'), car.weight),
    ]).slice(0, 6)

    const table = keep([
      spec('make', t('Make'), car.make),
      spec('model', t('Model'), car.model),
      spec('variant', t('Variant'), car.variant),
      spec('generation', t('Generation'), car.generation),
      spec('year', t('Year'), car.year),
      mileage,
      spec('ext', t('Exterior Colour'), car.exteriorColor && t(car.exteriorColor)),
      spec('int', t('Interior Colour'), car.interiorColor && t(car.interiorColor)),
      spec('engine', t('Engine'), car.engine),
      spec('displacement', t('Displacement'), car.displacement),
      spec('cylinders', t('Cylinders'), car.cylinders),
      spec('aspiration', t('Aspiration'), car.aspiration && t(car.aspiration)),
      spec('power', t('Power'), car.power),
      spec('torque', t('Torque'), car.torque),
      spec('trans', t('Transmission'), car.transmission && t(car.transmission)),
      spec('drive', t('Drivetrain'), car.drivetrain),
      spec('fuel', t('Fuel Type'), car.fuelType && t(car.fuelType)),
      spec('accel', t('0–100 km/h'), car.zeroTo100),
      spec('top', t('Top Speed'), car.topSpeed),
      spec('weight', t('Weight'), car.weight),
    ])
    return { strip, table }
  }, [car, t, fmt])
}
