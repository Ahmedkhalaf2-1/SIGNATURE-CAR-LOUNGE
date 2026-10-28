import { Resend } from 'resend'
import { FIELDS, type FormKind, type FormValues } from '../utils/validation.js'

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')

const oneLine = (s: string) => s.replace(/[\r\n]+/g, ' ').trim()

export class EmailError extends Error {}

let client: Resend | undefined

export async function sendFormEmail(kind: FormKind, values: FormValues): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) throw new EmailError('RESEND_API_KEY is not configured')
  client ??= new Resend(apiKey)

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

  // from/to come from server config only; the visitor's (validated, single-line) email is used solely as replyTo.
  const { error } = await client.emails.send({
    from: process.env.EMAIL_FROM || 'Signature Car Lounge Website <website@signaturecarslounge.com>',
    to: process.env.CONTACT_RECIPIENT || 'info@signaturecarslounge.com',
    replyTo: values.email,
    subject,
    html,
    text,
  })
  // Keep only Resend's error category; its free-text message is never logged or returned.
  if (error) throw new EmailError(`Resend rejected the email: ${String(error.name)}`)
}
