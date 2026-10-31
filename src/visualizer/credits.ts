/** Third-party model attribution. Kept in one place so a Credits surface (or the site footer) can render it later. */
export interface ModelCredit {
  /** Registry id of the vehicle (see vehicle/vehicleRegistry.ts). */
  vehicleId: string
  title: string
  creator: string
  creatorUrl: string
  source: string
  license: string
  licenseUrl: string
}

export const MODEL_CREDITS: readonly ModelCredit[] = [
  {
    vehicleId: 'bmw-7-series-f01',
    title: 'BMW 7-series (F01)',
    creator: 'Black Snow',
    creatorUrl: 'https://sketchfab.com/BlackSnow02',
    source: 'https://sketchfab.com/3d-models/bmw-7-series-f01-0806c39847ae42e5996917f50527dda0',
    license: 'Creative Commons Attribution 4.0 (CC BY 4.0)',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
  },
  {
    vehicleId: 'mercedes-s-class-w223-brabus-850',
    title: 'Mersedes-Benz S-class W223 [BRABUS 850]',
    creator: 'Black Snow',
    creatorUrl: 'https://sketchfab.com/BlackSnow02',
    source: 'https://sketchfab.com/3d-models/mersedes-benz-s-class-w223-brabus-850-297e1da45b874276aae24c4a8ec10982',
    license: 'Creative Commons Attribution 4.0 (CC BY 4.0)',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
  },
  {
    vehicleId: 'mercedes-s65-w222',
    title: 'Mersedes-Benz s65 w222',
    creator: 'Black Snow',
    creatorUrl: 'https://sketchfab.com/BlackSnow02',
    source: 'https://sketchfab.com/3d-models/mersedes-benz-s65-w222-f42d9d13b0404b5b9a2302a4c590a94d',
    license: 'Creative Commons Attribution 4.0 (CC BY 4.0)',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
  },
  {
    vehicleId: 'mercedes-g900-brabus',
    title: 'Mercedes AMG G900 by Brabus',
    creator: 'Casacade Models',
    creatorUrl: 'https://sketchfab.com/CasacadeOperations',
    source: 'https://sketchfab.com/3d-models/mercedes-amg-g900-by-brabus-4b92be05e9db44aeb7a207b5ca7142fc',
    license: 'Creative Commons Attribution 4.0 (CC BY 4.0)',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
  },
  {
    vehicleId: 'ferrari-laferrari-element-6',
    title: 'Ferrari LaFerrari ( Element 6 )',
    creator: 'Echoo',
    creatorUrl: 'https://sketchfab.com/echoo.',
    source: 'https://sketchfab.com/3d-models/ferrari-laferrari-element-6-7751755ad93c43f4aa85830d5ccdda23',
    license: 'Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 (CC BY-NC-ND 4.0)',
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-nd/4.0/',
  },
]

export const creditFor = (vehicleId: string) => MODEL_CREDITS.find((c) => c.vehicleId === vehicleId)
