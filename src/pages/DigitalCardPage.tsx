import { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { GlobeIcon, MailIcon, PhoneIcon } from '../components/common/Icons'
import { QrCode } from '../components/card/QrCode'
import { downloadVCard, type VCardContact } from '../lib/vcard'
import '../styles/pages/digital-card.css'

/**
 * Standalone digital business card. Routed OUTSIDE the site layouts (no header, no footer), deliberately not linked from anywhere,
 * marked noindex, and English only (it ignores the site locale).
 */
export const DIGITAL_CARD_PATH = '/connect/rayan'

interface CardPerson {
  /** URL path, e.g. /connect/rayan: also what the QR code points at. */
  path: string
  contact: VCardContact
  phoneDisplay: string
  vcfName: string
}

const COMPANY = { organization: 'Signature Car Lounge', email: 'Info@signaturecarslounge.com', url: 'https://signaturecarslounge.com' }

const RAYAN: CardPerson = {
  path: DIGITAL_CARD_PATH,
  phoneDisplay: '+966 50 432 8778',
  vcfName: 'Rayan-Al-Bakri.vcf',
  contact: { givenName: 'Rayan', familyName: 'Al Bakri', fullName: 'Rayan Al Bakri', title: 'Owner', phone: '+966504328778', ...COMPANY },
}

const FAISAL: CardPerson = {
  path: '/connect/faisal',
  phoneDisplay: '+966 56 622 2312',
  vcfName: 'Faisal-Al-Belushi.vcf',
  contact: { givenName: 'Faisal', familyName: 'Al Belushi', fullName: 'Faisal Al Belushi', title: 'Owner / Partner', phone: '+966566222312', ...COMPANY },
}

function DigitalCard({ person }: { person: CardPerson }) {
  const { contact: CONTACT, path, phoneDisplay, vcfName } = person
  const [saved, setSaved] = useState(false)
  const timer = useRef<number>(0)
  // The QR points at this very page, built from the live origin so it is right on any host.
  const [cardUrl] = useState(() => `${window.location.origin}${path}`)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const save = () => {
    downloadVCard(CONTACT, vcfName)
    setSaved(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setSaved(false), 3200)
  }

  return (
    <div className="pg-card" lang="en" dir="ltr">
      <Helmet>
        <title>{`${CONTACT.fullName} – Signature Car Lounge`}</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="theme-color" content="#0B0914" />
      </Helmet>

      <div className="card-env" aria-hidden="true" />

      <main className="card">
        <div className="card__brand">
          <img className="card__logo" src="/assets/images/sc-monogram.png" alt="Signature Car Lounge" width={675} height={968} decoding="async" fetchPriority="high" />
          <p className="card__wordmark">
            <span>Signature</span>
            <span>Car Lounge</span>
          </p>
        </div>

        <section className="card__body">
          <h1 className="card__name">{CONTACT.fullName}</h1>
          <p className="card__role">{CONTACT.title}</p>
          <span className="card__rule" aria-hidden="true" />

          <ul className="card__contacts">
            <li>
              <a className="contact" href={`tel:${CONTACT.phone}`}>
                <PhoneIcon size={24} />
                <span>{phoneDisplay}</span>
              </a>
            </li>
            <li>
              <a className="contact" href={`mailto:${CONTACT.email}`}>
                <MailIcon size={24} />
                <span>{CONTACT.email}</span>
              </a>
            </li>
            <li>
              <a className="contact" href={CONTACT.url} target="_blank" rel="noopener noreferrer">
                <GlobeIcon size={24} />
                <span>signaturecarslounge.com</span>
              </a>
            </li>
          </ul>

          <div className="card__qr">
            <div className="qr">
              <QrCode value={cardUrl} label="QR code linking to this digital card" />
            </div>
            <p className="card__scan">Scan to Connect</p>
          </div>

          <button type="button" className="card__save" onClick={save}>
            Save Contact
          </button>
          <p className="card__status" role="status" aria-live="polite">
            {saved ? 'Contact card downloaded' : ''}
          </p>
        </section>
      </main>
    </div>
  )
}

export default function DigitalCardPage() {
  return <DigitalCard person={RAYAN} />
}

export function FaisalCardPage() {
  return <DigitalCard person={FAISAL} />
}
