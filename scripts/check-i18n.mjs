// Lists t('...') source strings in src/ that have no Arabic entry in src/i18n/ar-SA.ts.
// Strings coming from data tables (nav labels, service names, gallery alts) are checked at runtime by the QA crawl.
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

const walk = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]))
const catalogue = readFileSync('src/i18n/ar-SA.ts', 'utf8')
const have = new Set([...catalogue.matchAll(/^\s+("(?:[^"\\]|\\.)*"):/gm)].map((m) => JSON.parse(m[1])))

const missing = new Set()
for (const f of walk('src').filter((f) => /\.tsx?$/.test(f) && !f.includes('/i18n/'))) {
  const src = readFileSync(f, 'utf8')
  for (const m of src.matchAll(/\bt\((?:'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)")\)/g)) {
    const key = (m[1] ?? m[2]).replace(/\\'/g, "'").replace(/\\"/g, '"')
    if (!have.has(key)) missing.add(`${f}: ${key}`)
  }
}
if (missing.size) {
  console.error(`${missing.size} untranslated string(s):\n` + [...missing].join('\n'))
  process.exit(1)
}
console.log(`i18n: all t() literals are translated (${have.size} catalogue entries).`)
