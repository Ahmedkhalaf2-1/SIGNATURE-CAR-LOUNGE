/** Minimal vCard 3.0 builder + download, for the digital business card. No network, no dependencies. */

export interface VCardContact {
  givenName: string
  familyName: string
  /** Full display name (FN). */
  fullName: string
  organization: string
  title: string
  phone: string
  email: string
  url: string
}

/** vCard text values escape backslash, comma, semicolon and newlines (RFC 2426). */
const esc = (v: string) => v.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;')

export function buildVCard(c: VCardContact): string {
  // CRLF line endings are what the spec (and iOS/Android importers) expect.
  return [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${esc(c.familyName)};${esc(c.givenName)};;;`,
    `FN:${esc(c.fullName)}`,
    `ORG:${esc(c.organization)}`,
    `TITLE:${esc(c.title)}`,
    `TEL;TYPE=CELL,VOICE:${c.phone}`,
    `EMAIL;TYPE=INTERNET,WORK:${c.email}`,
    `URL:${c.url}`,
    'END:VCARD',
  ].join('\r\n') + '\r\n'
}

/** Triggers a .vcf download. Safari on iOS hands text/vcard straight to Contacts. */
export function downloadVCard(c: VCardContact, filename: string) {
  const blob = new Blob([buildVCard(c)], { type: 'text/vcard;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.rel = 'noopener'
  document.body.appendChild(a)
  a.click()
  a.remove()
  // Revoke after the browser has had time to start the download.
  setTimeout(() => URL.revokeObjectURL(url), 4000)
}
