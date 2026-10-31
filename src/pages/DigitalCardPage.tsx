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

const CONTACT: VCardContact = {
  givenName: 'Rayan SalahAldeen',
  familyName: 'Al Bakri',
  fullName: 'Rayan SalahAldeen Al Bakri',
  organization: 'Signature Car Lounge',
  title: 'Owner',
  phone: '+966566885580',
  email: 'Info@signaturecarslounge.com',
  url: 'https://signaturecarslounge.com',
}

export default function DigitalCardPage() {
  const [saved, setSaved] = useState(false)
  const timer = useRef<number>(0)
  // The QR points at this very page, built from the live origin so it is right on any host.
  const [cardUrl] = useState(() => `${window.location.origin}${DIGITAL_CARD_PATH}`)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const save = () => {
    downloadVCard(CONTACT, 'Rayan-Al-Bakri.vcf')
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
          <p className="card__role">Owner</p>
          <span className="card__rule" aria-hidden="true" />

          <ul className="card__contacts">
            <li>
              <a className="contact" href={`tel:${CONTACT.phone}`}>
                <PhoneIcon size={18} />
                <span>+966 56 688 5580</span>
              </a>
            </li>
            <li>
              <a className="contact" href={`mailto:${CONTACT.email}`}>
                <MailIcon size={18} />
                <span>{CONTACT.email}</span>
              </a>
            </li>
            <li>
              <a className="contact" href={CONTACT.url} target="_blank" rel="noopener noreferrer">
                <GlobeIcon size={18} />
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
