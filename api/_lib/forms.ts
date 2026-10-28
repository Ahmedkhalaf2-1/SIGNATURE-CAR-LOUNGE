import { Resend } from 'resend'

/** Framework-agnostic handler core shared by the serverless functions in /api and the Vite dev middleware. */

export type FormKind = 'contact' | 'booking'
export interface FormResult {
  status: number
  body: { ok: boolean; error?: string }
}

const FROM = 'Website <website@signaturecarslounge.com>'
const TO = 'info@signaturecarslounge.com'
const EMAIL_RE = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/
const PHONE_RE = /^[0-9()#&+*,./:;<=\- ]+$/

const FIELDS: Record<FormKind, { key: string; label: string; required: boolean; max: number }[]> = {
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

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')

const oneLine = (s: string) => s.replace(/[\r\n]+/g, ' ').trim()

const fail = (status: number, error: string): FormResult => ({ status, body: { ok: false, error } })

export async function handleForm(kind: FormKind, method: string | undefined, payload: unknown): Promise<FormResult> {
  if (method !== 'POST') return fail(405, 'Method not allowed.')
  if (!payload || typeof payload !== 'object') return fail(400, 'Invalid request.')

  const input = payload as Record<string, unknown>
  const values: Record<string, string> = {}
  for (const f of FIELDS[kind]) {
    const raw = input[f.key]
    const v = typeof raw === 'string' ? raw.trim() : ''
    if (f.required && !v) return fail(400, `${f.label} is required.`)
    if (v.length > f.max) return fail(400, `${f.label} is too long.`)
    values[f.key] = v
  }
  if (!EMAIL_RE.test(values.email)) return fail(400, 'Please enter a valid email address.')
  if (values.phone && !PHONE_RE.test(values.phone)) return fail(400, 'Please enter a valid phone number.')

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('RESEND_API_KEY is not configured')
    return fail(500, 'Email service is not configured.')
  }

  const subject =
    kind === 'contact'
      ? 'New Website Contact — Signature Car Lounge'
      : `New Consultation Booking — ${oneLine(values.service)}`

  const rows = FIELDS[kind].map((f) => ({ label: f.label, value: values[f.key] }))
  const html =
    `<h2>${escapeHtml(subject)}</h2><table cellpadding="6" style="border-collapse:collapse">` +
    rows
      .map(
        (r) =>
          `<tr><td style="vertical-align:top"><strong>${escapeHtml(r.label)}</strong></td>` +
          `<td style="white-space:pre-wrap">${escapeHtml(r.value) || '—'}</td></tr>`,
      )
      .join('') +
    '</table>'
  const text = rows.map((r) => `${r.label}: ${r.value || '—'}`).join('\n')

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from: FROM,
      to: TO,
      replyTo: values.email,
      subject,
      html,
      text,
    })
    if (error) {
      console.error('Resend rejected the email:', error.name, error.message)
      return fail(502, 'We could not send your message. Please try again.')
    }
  } catch (err) {
    console.error('Resend request failed:', err)
    return fail(502, 'We could not send your message. Please try again.')
  }
  return { status: 200, body: { ok: true } }
}
