import { IMAGES } from '../lib/assets'

export interface ServiceLink {
  /** Route slug used in the booking query, e.g. ?service=ppf */
  key: string
  path: string
  label: string
  /** Option label used by the booking form's service <select> */
  option: string
}

export const SERVICES: ServiceLink[] = [
  { key: 'detailing', path: '/signature-detailing/', label: 'Bespoke Detailing', option: 'Bespoke Detailing' },
  { key: 'ppf', path: '/signature-ppf/', label: 'Paint Protection Film', option: 'Paint Protection Film' },
  { key: 'ceramic-coating', path: '/signature-ceramic-coating/', label: 'Ceramic Coating', option: 'Ceramic Coating' },
  { key: 'body-kits', path: '/signature-body-kits/', label: 'Body Kits', option: 'Body Kits' },
  { key: 'restoration', path: '/signature-restoration/', label: 'Restoration', option: 'Restoration' },
  { key: 'automotive-spa', path: '/signature-automotive-spa/', label: 'Automotive Spa', option: 'Automotive Spa' },
]

export const ROUTES = {
  home: '/',
  about: '/signature-about/',
  services: '/signature-services/',
  cars: '/cars-for-sale',
  experience: '/signature-experience/',
  gallery: '/signature-gallery/',
  faq: '/signature-faq/',
  contact: '/signature-contact/',
  booking: '/signature-booking/',
  privacy: '/signature-privacy/',
  terms: '/signature-terms/',
} as const

/** Home-page service cards (copy and imagery from pages/01-home). */
export const HOME_SERVICE_CARDS = [
  { ...SERVICES[0], title: 'Bespoke detailing', tagline: 'A deeper kind of brilliance.', image: IMAGES.detailing, alt: 'Bespoke detailing automotive service' },
  { ...SERVICES[1], title: 'Paint protection film', tagline: 'Preserve the exceptional.', image: IMAGES.ppf, alt: 'Paint protection film automotive service' },
  { ...SERVICES[2], title: 'Ceramic coating', tagline: 'A finish beyond ordinary.', image: IMAGES.ceramic, alt: 'Ceramic coating automotive service' },
  { ...SERVICES[3], title: 'Body kits', tagline: 'Designed to be noticed.', image: IMAGES.bodyKits, alt: 'Body kits automotive service' },
  { ...SERVICES[4], title: 'Restoration', tagline: 'Timeless character, renewed.', image: IMAGES.restoration, alt: 'Restoration automotive service' },
  { ...SERVICES[5], title: 'Automotive spa', tagline: 'Beautiful inside and out.', image: IMAGES.spa, alt: 'Automotive spa automotive service' },
]

