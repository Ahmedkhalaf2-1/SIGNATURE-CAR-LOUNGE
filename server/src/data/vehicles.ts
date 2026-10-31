/**
 * Trusted vehicle allowlist for POST /api/car-inquiry.
 *
 * The client sends only a slug. The display name used in the email subject and body is resolved HERE, never taken from
 * the request, so a visitor cannot inject an arbitrary vehicle name. Keep this in sync with src/data/cars.ts
 * (`npm run check:catalog` fails when slugs or display names differ).
 */
export const VEHICLES: Readonly<Record<string, string>> = {
  'porsche-carrera-gt': 'Porsche Carrera GT',
  'ferrari-f40': 'Ferrari F40',
  'ferrari-testarossa': 'Ferrari Testarossa',
  'mercedes-benz-slr-mclaren-722-edition': 'Mercedes-Benz SLR McLaren 722 Edition',
}

/** Display name for an allowed slug, or undefined. `Object.hasOwn` keeps "constructor"/"__proto__" from matching. */
export function vehicleName(slug: string): string | undefined {
  return Object.hasOwn(VEHICLES, slug) ? VEHICLES[slug] : undefined
}
