import { BAD_CHARS_RE, DIGIT_RE, EMAIL_RE, HONEYPOT_FIELD, LINE_BREAK_RE, PHONE_RE } from './validation.js'

/** Trusted vehicle names, keyed by the slugs the frontend sends. The client never supplies a display name. */
export const CAR_NAMES: Readonly<Record<string, string>> = Object.freeze({
  'porsche-carrera-gt': 'Porsche Carrera GT',
  'ferrari-f40': 'Ferrari F40',
  'ferrari-testarossa': 'Ferrari Testarossa',
  'mercedes-benz-slr-mclaren-722-edition': 'Mercedes-Benz SLR McLaren 722 Edition',
})

export interface CarInquiry {
  car: string
  name: string
  email: string
  phone: string
  message: string
}

export type CarInquiryResult = { ok: true; inquiry: CarInquiry } | { ok: false; bot: true } | { ok: false; bot?: false; error: string }

const hasOwn = (o: object, k: string) => Object.prototype.hasOwnProperty.call(o, k)

interface Rule {
  key: 'name' | 'email' | 'phone' | 'message'
  label: string
  min: number
  max: number
  multiline?: boolean
}

const RULES: Rule[] = [
  { key: 'name', label: 'Name', min: 2, max: 120 },
  { key: 'email', label: 'Email', min: 1, max: 254 },
  { key: 'phone', label: 'Phone', min: 7, max: 40 },
  { key: 'message', label: 'Message', min: 5, max: 2000, multiline: true },
]

export function validateCarInquiry(payload: unknown): CarInquiryResult {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) return { ok: false, error: 'Invalid request.' }
  const input = payload as Record<string, unknown>

  // Honeypot first: any non-empty value (of any type) gets a silent fake success and is never logged.
  const trap = hasOwn(input, HONEYPOT_FIELD) ? input[HONEYPOT_FIELD] : undefined
  if (trap !== undefined && trap !== null && trap !== '' && (typeof trap !== 'string' || trap.trim() !== '')) {
    return { ok: false, bot: true }
  }

  // Only the known fields are read; anything else (vehicle, subject, to, from, ...) is ignored.
  const rawSlug = hasOwn(input, 'carSlug') ? input.carSlug : undefined
  if (typeof rawSlug !== 'string' || !rawSlug.trim()) return { ok: false, error: 'Vehicle is required.' }
  const slug = rawSlug.trim()
  if (!hasOwn(CAR_NAMES, slug)) return { ok: false, error: 'Unknown vehicle.' }

  const values = {} as Record<Rule['key'], string>
  for (const r of RULES) {
    const raw = hasOwn(input, r.key) ? input[r.key] : undefined
    if (typeof raw !== 'string') return { ok: false, error: raw === undefined ? `${r.label} is required.` : `${r.label} is invalid.` }
    const v = raw.trim()
    if (!v) return { ok: false, error: `${r.label} is required.` }
    if (v.length < r.min) return { ok: false, error: `${r.label} is too short.` }
    if (v.length > r.max) return { ok: false, error: `${r.label} is too long.` }
    if (BAD_CHARS_RE.test(v) || (!r.multiline && LINE_BREAK_RE.test(v))) return { ok: false, error: `${r.label} contains invalid characters.` }
    values[r.key] = v
  }

  if (!EMAIL_RE.test(values.email) || values.email.split('@')[0].length > 64) return { ok: false, error: 'Please enter a valid email address.' }
  if (!PHONE_RE.test(values.phone) || (values.phone.match(DIGIT_RE)?.length ?? 0) < 5) {
    return { ok: false, error: 'Please enter a valid phone number.' }
  }
  return { ok: true, inquiry: { car: CAR_NAMES[slug], ...values } }
}
