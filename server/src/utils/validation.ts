export type FormKind = 'contact' | 'booking'
export type FormValues = Record<string, string>

interface FieldRule {
  key: string
  label: string
  required: boolean
  max: number
}

const EMAIL_RE = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/
const PHONE_RE = /^[0-9()#&+*,./:;<=\- ]+$/

/** Name of the hidden anti-bot field. Real visitors never see or fill it. */
export const HONEYPOT_FIELD = 'website'

export const FIELDS: Record<FormKind, FieldRule[]> = {
  contact: [
    { key: 'name', label: 'Full name', required: true, max: 120 },
    { key: 'email', label: 'Email', required: true, max: 254 },
    { key: 'phone', label: 'Phone', required: false, max: 40 },
    { key: 'message', label: 'Message', required: true, max: 5000 },
  ],
  booking: [
    { key: 'name', label: 'Full name', required: true, max: 120 },
    { key: 'email', label: 'Email', required: true, max: 254 },
    { key: 'phone', label: 'Phone', required: true, max: 40 },
    { key: 'vehicle', label: 'Vehicle make, model and year', required: true, max: 200 },
    { key: 'service', label: 'Service', required: true, max: 100 },
    { key: 'preferred_date', label: 'Preferred date', required: false, max: 20 },
    { key: 'message', label: 'Your priorities', required: false, max: 5000 },
  ],
}

export type ValidationResult =
  | { ok: true; values: FormValues }
  | { ok: false; bot: true }
  | { ok: false; bot?: false; error: string }

export function validateForm(kind: FormKind, payload: unknown): ValidationResult {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) return { ok: false, error: 'Invalid request.' }
  const input = payload as Record<string, unknown>

  const trap = input[HONEYPOT_FIELD]
  if (typeof trap === 'string' && trap.trim() !== '') return { ok: false, bot: true }

  const values: FormValues = {}
  for (const f of FIELDS[kind]) {
    const raw = input[f.key]
    const v = typeof raw === 'string' ? raw.trim() : ''
    if (f.required && !v) return { ok: false, error: `${f.label} is required.` }
    if (v.length > f.max) return { ok: false, error: `${f.label} is too long.` }
    values[f.key] = v
  }
  if (!EMAIL_RE.test(values.email)) return { ok: false, error: 'Please enter a valid email address.' }
  if (values.phone && !PHONE_RE.test(values.phone)) return { ok: false, error: 'Please enter a valid phone number.' }
  return { ok: true, values }
}
