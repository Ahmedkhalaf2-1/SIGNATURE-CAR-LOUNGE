import type { CarListing, CarStatus } from '../../data/cars'

export type CarView = 'large' | 'standard' | 'list'

/** featured = the order in the catalogue; newest only orders cars whose year is known. */
export type SortKey = 'featured' | 'make' | 'newest'

export const STATUSES: CarStatus[] = ['available', 'reserved', 'sold']

export interface CarFilters {
  search: string
  make: string
  model: string
  year: string
  status: string
  sort: SortKey
}

export const DEFAULT_FILTERS: CarFilters = { search: '', make: '', model: '', year: '', status: '', sort: 'featured' }

/** Number of narrowing filters in use (sort is not counted). */
export const activeFilterCount = (f: CarFilters): number => [f.search.trim(), f.make, f.model, f.year, f.status].filter(Boolean).length

const norm = (s: string) => s.toLocaleLowerCase().replace(/[\s-]+/g, ' ').trim()

export function queryCars(cars: CarListing[], f: CarFilters): CarListing[] {
  const terms = norm(f.search).split(' ').filter(Boolean)

  const out = cars.filter((c) => {
    if (f.make && c.make !== f.make) return false
    if (f.model && c.model !== f.model) return false
    if (f.year && c.year !== Number(f.year)) return false
    if (f.status && c.status !== f.status) return false
    if (terms.length) {
      const hay = norm([c.make, c.model, c.variant ?? '', c.generation ?? '', c.year ?? ''].join(' '))
      if (!terms.every((t) => hay.includes(t))) return false
    }
    return true
  })

  if (f.sort === 'make') return out.sort((a, b) => a.make.localeCompare(b.make) || a.model.localeCompare(b.model))
  if (f.sort === 'newest') return out.sort((a, b) => (b.year ?? -1) - (a.year ?? -1))
  return out
}

/** Distinct, sorted option values for the select controls. Models narrow to the chosen make; years come from known years only. */
export function filterOptions(cars: CarListing[], make: string) {
  const uniq = <T,>(xs: T[]) => [...new Set(xs)]
  return {
    makes: uniq(cars.map((c) => c.make)).sort(),
    models: uniq(cars.filter((c) => !make || c.make === make).map((c) => c.model)).sort(),
    years: uniq(cars.flatMap((c) => (c.year ? [c.year] : []))).sort((a, b) => b - a),
  }
}
