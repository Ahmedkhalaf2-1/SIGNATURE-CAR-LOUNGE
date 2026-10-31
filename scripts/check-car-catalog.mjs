// Fails when the frontend inventory (src/data/cars.ts) and the server's trusted allowlist
// (server/src/data/vehicles.ts) disagree on slugs or display names, or when a listing breaks a data rule.
import { CARS, carTitle } from '../src/data/cars.ts'
import { VEHICLES } from '../server/src/data/vehicles.ts'
import { existsSync } from 'node:fs'

const problems = []
const front = new Map(CARS.map((c) => [c.slug, carTitle(c)]))
for (const [slug, name] of front) {
  if (!(slug in VEHICLES)) problems.push(`server allowlist is missing "${slug}"`)
  else if (VEHICLES[slug] !== name) problems.push(`name mismatch for "${slug}": frontend "${name}" vs server "${VEHICLES[slug]}"`)
}
for (const slug of Object.keys(VEHICLES)) if (!front.has(slug)) problems.push(`server allowlist has "${slug}" which is not in the frontend inventory`)

for (const c of CARS) {
  if ('price' in c) problems.push(`"${c.slug}" must not have a price`)
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(c.slug)) problems.push(`bad slug "${c.slug}"`)
  if (!c.images.includes(c.heroImage)) problems.push(`"${c.slug}": heroImage is not in images`)
  for (const i of c.images) if (!existsSync(`public${i}`)) problems.push(`"${c.slug}": missing image public${i}`)
  if (/^https?:/.test(c.heroImage) || c.images.some((i) => /^https?:/.test(i))) problems.push(`"${c.slug}": remote images are not allowed`)
}
if (problems.length) {
  console.error('Car catalogue problems:\n - ' + problems.join('\n - '))
  process.exit(1)
}
console.log(`car catalogue OK: ${CARS.length} vehicles, frontend and server allowlist in sync.`)
