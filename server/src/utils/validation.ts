export type FormKind = 'contact' | 'booking'
export type FormValues = Record<string, string>

interface FieldRule {
  key: string
  label: string
  required: boolean
  max: number
  /** Single-line fields reject any line break or tab; only free-text fields may contain them. */
  multiline?: boolean
}

// Practical ASCII email grammar: no whitespace, quotes, angle brackets or control characters.
const EMAIL_RE =
  /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/
// Digits (Latin, Arabic-Indic, Persian) plus the separators real numbers use: + ( ) - . / spaces, and dial extras # * , ;
const PHONE_RE = /^[0-9٠-٩۰-۹ ()+\-./#*,;]+$/
const DIGIT_RE = /[0-9\u0660-\u0669\u06F0-\u06F9]/g
const DATE_RE = /^(\d{4})-(\d{2})-(\d{2})$/
// Control characters except TAB/LF/CR, plus the Unicode line/paragraph separators (U+2028, U+2029).
const BAD_CHARS_RE = new RegExp(`[\\u0000-\\u0008\\u000B\\u000C\\u000E-\\u001F\\u007F${String.fromCharCode(0x2028, 0x2029)}]`)
const LINE_BREAK_RE = /[\r\n\t]/

/** Exactly the booking form's service <option> values (src/data/site.ts SERVICES[].option). */
export const ALLOWED_SERVICES: ReadonlySet<string> = new Set([
  'Bespoke Detailing',
  'Paint Protection Film',
  'Ceramic Coating',
  'Body Kits',
  'Restoration',
  'Automotive Spa',
])

/** Name of the hidden anti-bot field. Real visitors never see or fill it. */
export const HONEYPOT_FIELD = 'website'

export const FIELDS: Record<FormKind, FieldRule[]> = {
  contact: [
    { key: 'name', label: 'Full name', required: true, max: 120 },
    { key: 'email', label: 'Email', required: true, max: 254 },
    { key: 'phone', label: 'Phone', required: false, max: 40 },
    { key: 'message', label: 'Message', required: true, max: 5000, multiline: true },
  ],
  booking: [
    { key: 'name', label: 'Full name', required: true, max: 120 },
    { key: 'email', label: 'Email', required: true, max: 254 },
    { key: 'phone', label: 'Phone', required: true, max: 40 },
    { key: 'vehicle', label: 'Vehicle make, model and year', required: true, max: 200 },
    { key: 'service', label: 'Service', required: true, max: 100 },
    { key: 'preferred_date', label: 'Preferred date', required: false, max: 20 },
    { key: 'message', label: 'Your priorities', required: false, max: 5000, multiline: true },
  ],
}

export type ValidationResult =
  | { ok: true; values: FormValues }
  | { ok: false; bot: true }
  | { ok: false; bot?: false; message: string }

const hasOwn = (o: object, k: string) => Object.prototype.hasOwnProperty.call(o, k)

/** A real Gregorian date, not before yesterday (UTC) so a visitor in Riyadh (UTC+3) picking "today" always passes. */
function isValidBookingDate(value: string, now: Date): boolean {
  const m = DATE_RE.exec(value)
  if (!m) return false
  const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])]
  const t = new Date(Date.UTC(y, mo - 1, d))
  if (t.getUTCFullYear() !== y || t.getUTCMonth() !== mo - 1 || t.getUTCDate() !== d) return false
  const yesterday = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()) - 24 * 60 * 60 * 1000
  return t.getTime() >= yesterday
}

export function validateForm(kind: FormKind, payload: unknown, now: Date = new Date()): ValidationResult {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) return { ok: false, message: 'Invalid request.' }
  const input = payload as Record<string, unknown>

  // Honeypot first, so bots get a fake success whatever else they sent. Any non-empty value, of any type, trips it.
  const trap = hasOwn(input, HONEYPOT_FIELD) ? input[HONEYPOT_FIELD] : undefined
  if (trap !== undefined && trap !== null && trap !== '' && (typeof trap !== 'string' || trap.trim() !== '')) {
    return { ok: false, bot: true }
  }

  // Only the known fields are read; any other property is ignored and never forwarded.
  const values: FormValues = {}
  for (const f of FIELDS[kind]) {
    const raw = hasOwn(input, f.key) ? input[f.key] : undefined
    if (raw !== undefined && typeof raw !== 'string') return { ok: false, message: `${f.label} is invalid.` }
    const v = (raw ?? '').trim()
    if (f.required && !v) return { ok: false, message: `${f.label} is required.` }
    if (v.length > f.max) return { ok: false, message: `${f.label} is too long.` }
    if (BAD_CHARS_RE.test(v) || (!f.multiline && LINE_BREAK_RE.test(v))) {
      return { ok: false, message: `${f.label} contains invalid characters.` }
    }
    values[f.key] = v
  }

  if (!EMAIL_RE.test(values.email) || values.email.split('@')[0].length > 64) {
    return { ok: false, message: 'Please enter a valid email address.' }
  }
  if (values.phone && (!PHONE_RE.test(values.phone) || (values.phone.match(DIGIT_RE)?.length ?? 0) < 5)) {
    return { ok: false, message: 'Please enter a valid phone number.' }
  }
  if (kind === 'booking') {
    if (!ALLOWED_SERVICES.has(values.service)) return { ok: false, message: 'Please choose a valid service.' }
    if (values.preferred_date && !isValidBookingDate(values.preferred_date, now)) {
      return { ok: false, message: 'Please enter a valid preferred date.' }
    }
  }
  return { ok: true, values }
}
