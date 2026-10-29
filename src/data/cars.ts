/**
 * Cars for Sale inventory (local data for now).
 *
 * This module is the single seam between the UI and the inventory source: pages and components only call
 * `getCars()` / `getCarBySlug()`. To move to an API or admin panel, keep the `CarListing` shape and make those two
 * functions fetch (the UI stays unchanged).
 *
 * The server keeps its own allowlist of slugs and display names in `server/src/data/vehicles.ts`; run
 * `npm run check:catalog` (also part of `npm run typecheck`) to make sure the two stay in sync.
 *
 * DATA RULES
 * - `CarListing` mixes two kinds of facts. Model specifications (engine, power, torque, drivetrain, performance,
 *   weight) come from published sources for the identified model and trim. Facts about the physical car (year,
 *   mileage, colours, condition, history) must come from the owner; omit them until known.
 * - Never add price, ownership/accident history, GCC specification, warranty or service history unless verified.
 * - Omit any value that cannot be verified; the UI renders only what exists.
 */

export type CarStatus = 'available' | 'reserved' | 'sold'

export interface CarListing {
  slug: string

  make: string
  model: string
  variant?: string
  /** Internal model/generation code, e.g. "980". */
  generation?: string
  /** Model year of THIS car. Owner-supplied only. */
  year?: number
  /** Kilometres on THIS car. Owner-supplied only. */
  mileage?: number

  status: CarStatus

  engine?: string
  displacement?: string
  cylinders?: string
  aspiration?: string

  /** Value with unit, e.g. "612 PS". */
  power?: string
  torque?: string

  transmission?: string
  drivetrain?: string
  fuelType?: string

  /** e.g. "3.9 sec" */
  zeroTo100?: string
  /** e.g. "330 km/h" */
  topSpeed?: string
  /** Kerb weight, e.g. "1,380 kg" */
  weight?: string

  /** Visible colour only, unless the owner supplies the official paint name. */
  exteriorColor?: string
  interiorColor?: string

  heroImage: string
  /** CSS object-position for the cropped card image, e.g. "50% 60%". Defaults to centre. */
  imagePosition?: string
  /** All images including the hero. */
  images: string[]

  description: string
  /** Model characteristics only; never claims about the physical car's condition. */
  highlights: string[]

  /** Internal review data (not shown on the site). */
  verification: {
    identityConfidence: 'high' | 'medium' | 'needs-confirmation'
    notes?: string
  }
}

const img = (slug: string, n: number): string => `/assets/cars/${slug}/${String(n).padStart(2, '0')}.jpg`

export const CARS: CarListing[] = [
  {
    slug: 'porsche-carrera-gt',
    make: 'Porsche',
    model: 'Carrera GT',
    generation: '980',
    status: 'available',
    engine: 'V10 5.7 L',
    displacement: '5,733 cc',
    cylinders: 'V10',
    aspiration: 'Naturally aspirated',
    power: '612 PS',
    torque: '590 Nm',
    transmission: 'Six-speed manual',
    drivetrain: 'RWD',
    fuelType: 'Petrol',
    zeroTo100: '3.9 sec',
    topSpeed: '330 km/h',
    weight: '1,380 kg',
    exteriorColor: 'Silver',
    heroImage: img('porsche-carrera-gt', 1),
    imagePosition: '50% 62%',
    images: [1, 2, 3, 4].map((n) => img('porsche-carrera-gt', n)),
    description:
      'The Porsche Carrera GT (internal code 980) is a rear mid-engined, two-seat roadster with a carbon-fibre monocoque and a 5.7 L naturally aspirated V10. Production ended in 2006 after 1,270 cars.\n\nYear, mileage, condition and documentation for this car are available on request from the Signature Car Lounge team.',
    highlights: [
      'Naturally aspirated 5.7 L V10',
      'Six-speed manual transmission',
      'Carbon-fibre monocoque chassis',
      'Carbon-ceramic brakes (PCCB)',
      'Rear mid-engine, rear-wheel drive',
    ],
    verification: {
      identityConfidence: 'high',
      notes:
        'Model confirmed from body shape, rear wing and badging. Year of this car, mileage and options are unknown. Photos appear to come from different cars/sources; confirm they show the car being sold. Figures: 612 PS / 590 Nm / 330 km/h / 1,380 kg are consistent across Porsche-quoted data and Wikipedia; 0–100 km/h is Porsche’s quoted 3.9 s (some magazines measured ~3.6 s).',
    },
  },
  {
    slug: 'ferrari-f40',
    make: 'Ferrari',
    model: 'F40',
    status: 'available',
    engine: 'V8 2.9 L',
    displacement: '2,936 cc',
    cylinders: 'V8',
    aspiration: 'Twin-turbocharged',
    power: '478 PS',
    torque: '577 Nm',
    transmission: 'Five-speed manual',
    drivetrain: 'RWD',
    fuelType: 'Petrol',
    exteriorColor: 'Red',
    heroImage: img('ferrari-f40', 1),
    imagePosition: '50% 60%',
    images: [1, 2, 3, 4, 5].map((n) => img('ferrari-f40', n)),
    description:
      'The Ferrari F40 is a rear mid-engined, rear-wheel-drive berlinetta introduced in 1987, with a 2.9 L twin-turbocharged V8, a five-speed manual transmission and bodywork by Pininfarina.\n\nYear, mileage, condition and documentation for this car are available on request from the Signature Car Lounge team.',
    highlights: [
      'Twin-turbocharged 2.9 L V8',
      'Five-speed manual transmission',
      'Rear mid-engine, rear-wheel drive',
      'Kevlar, carbon-fibre and aluminium body panels',
      'Pininfarina design',
    ],
    verification: {
      identityConfidence: 'high',
      notes:
        'Model confirmed from body shape and details. Year of this car, mileage and specification (European vs US, catalyst) are unknown. Weight, 0–100 km/h and top speed are omitted because sources disagree (kerb weight 1,100–1,254 kg; 0–100 4.1–4.7 s; top speed 315–324 km/h). Power 478 PS is the European figure (US 484 PS). Photos appear to come from different cars; one image looks AI-generated or heavily stylised.',
    },
  },
  {
    slug: 'ferrari-testarossa',
    make: 'Ferrari',
    model: 'Testarossa',
    status: 'available',
    engine: 'Flat-12 4.9 L',
    displacement: '4,943 cc',
    cylinders: 'Flat-12',
    aspiration: 'Naturally aspirated',
    power: '390 PS',
    transmission: 'Five-speed manual',
    drivetrain: 'RWD',
    fuelType: 'Petrol',
    exteriorColor: 'Red',
    heroImage: img('ferrari-testarossa', 1),
    imagePosition: '50% 58%',
    images: [1, 2, 3, 4].map((n) => img('ferrari-testarossa', n)),
    description:
      'The Ferrari Testarossa is a rear mid-engined, rear-wheel-drive berlinetta designed by Pininfarina, with a 4.9 L naturally aspirated flat-12 and a five-speed manual transmission. The original Testarossa was built from 1984 to 1991.\n\nYear, mileage, condition and documentation for this car are available on request from the Signature Car Lounge team.',
    highlights: [
      'Naturally aspirated 4.9 L flat-12',
      'Four valves per cylinder (48 valves)',
      'Five-speed manual transmission',
      'Rear mid-engine, rear-wheel drive',
      'Pininfarina design',
    ],
    verification: {
      identityConfidence: 'high',
      notes:
        'Identified as the original Testarossa (1984–1991) from the body shape, side strakes and wheels; one photo shows a "TESTAROSSA" plate. The 512 TR (1991–94) and F512 M differ visually and in output. Year, market and catalyst status of this car are unknown. Power 390 PS is the original European figure (US cars 380 hp; catalyst cars list 370–381 PS). Torque (480 vs 490 Nm), weight (1,455–1,708 kg) and 0–100 km/h (5.7–6.1 s) are omitted because sources disagree; the 290 km/h top speed is only an estimate.',
    },
  },
  {
    slug: 'mercedes-benz-slr-mclaren-722-edition',
    make: 'Mercedes-Benz',
    model: 'SLR McLaren',
    variant: '722 Edition',
    generation: 'C199',
    status: 'available',
    engine: 'V8 5.4 L',
    displacement: '5,439 cc',
    cylinders: 'V8',
    aspiration: 'Supercharged',
    power: '650 PS',
    torque: '820 Nm',
    transmission: 'Five-speed automatic',
    drivetrain: 'RWD',
    fuelType: 'Petrol',
    zeroTo100: '3.6 sec',
    topSpeed: '337 km/h',
    exteriorColor: 'Silver',
    heroImage: img('mercedes-benz-slr-mclaren-722-edition', 1),
    imagePosition: '45% 55%',
    images: [1, 2, 3, 4].map((n) => img('mercedes-benz-slr-mclaren-722-edition', n)),
    description:
      'The Mercedes-Benz SLR McLaren 722 Edition is a front mid-engined, rear-wheel-drive coupé with a 5.4 L supercharged V8 and a five-speed automatic transmission. The 722 Edition was introduced in 2006 and limited to 150 cars.\n\nYear, mileage, condition and documentation for this car are available on request from the Signature Car Lounge team.',
    highlights: [
      'Supercharged 5.4 L V8',
      'Five-speed automatic transmission',
      'Carbon-fibre reinforced plastic construction',
      'Carbon-ceramic brakes',
      'Butterfly doors',
      'Limited to 150 cars',
    ],
    verification: {
      identityConfidence: 'high',
      notes:
        'Identified as the SLR McLaren (C199) coupé in 722 Edition specification from the black wheels, front splitter and body; the owner supplied the 722 name. Year of this car and mileage are unknown. Figures are the 722 Edition values (650 PS, 820 Nm, 3.6 s, 337 km/h; the standard car is 626 PS, 780 Nm). Kerb weight is omitted because sources disagree (1,624 to 1,768 kg). Gallery uses 4 images; the supplied fifth was a byte-identical duplicate of the third.',
    },
  },
]

export const getCars = (): CarListing[] => CARS
export const getCarBySlug = (slug: string): CarListing | undefined => CARS.find((c) => c.slug === slug)

/** Display name used for headings and image alt text, e.g. "Porsche Carrera GT". */
export const carTitle = (c: Pick<CarListing, 'make' | 'model' | 'variant'>): string =>
  [c.make, c.model, c.variant].filter(Boolean).join(' ')

/** Plain-text description for image alt text, e.g. "Porsche Carrera GT" or "2013 Lamborghini Gallardo LP560-4". */
export const carAlt = (c: CarListing): string => [c.year, c.make, c.model, c.variant].filter(Boolean).join(' ')
