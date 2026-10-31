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
  {
    vehicleId: 'bmw-m4-competition',
    title: '2025 BMW M4 Competition',
    creator: 'Ddiaz Design',
    creatorUrl: 'https://sketchfab.com/ddiaz-design',
    source: 'https://sketchfab.com/3d-models/2025-bmw-m4-competition-f8141ecd755547989c9209784b71ad43',
    license: 'Creative Commons Attribution-NonCommercial-ShareAlike 4.0 (CC BY-NC-SA 4.0)',
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
  },
  {
    vehicleId: 'bugatti-tourbillon',
    title: '2026 Bugatti Tourbillon',
    creator: 'Ddiaz Design',
    creatorUrl: 'https://sketchfab.com/ddiaz-design',
    source: 'https://sketchfab.com/3d-models/2026-bugatti-tourbillon-4f63f5a74611477989cefd9861b9784a',
    license: 'Creative Commons Attribution-NonCommercial-ShareAlike 4.0 (CC BY-NC-SA 4.0)',
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
  },
  {
    vehicleId: 'pagani-huayra-r-evo-roadster',
    title: '2025 Pagani Huayra R Evo Roadster',
    creator: 'Ddiaz Design',
    creatorUrl: 'https://sketchfab.com/ddiaz-design',
    source: 'https://sketchfab.com/3d-models/2025-pagani-huayra-r-evo-roadster-4950e65962044c8b90d0e1b140ca9868',
    license: 'Creative Commons Attribution-NonCommercial-ShareAlike 4.0 (CC BY-NC-SA 4.0)',
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
  },
  {
    vehicleId: 'mercedes-a45-s-amg',
    title: '2023 Mercedes-Benz A45 S AMG 4Matic',
    creator: 'Ddiaz Design',
    creatorUrl: 'https://sketchfab.com/ddiaz-design',
    source: 'https://sketchfab.com/3d-models/2023-mercedes-benz-a45-s-amg-4matic-7dcef373c52c44ffb0bfbd85a1da1ed2',
    license: 'Creative Commons Attribution-NonCommercial-ShareAlike 4.0 (CC BY-NC-SA 4.0)',
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
  },
  {
    vehicleId: 'mclaren-w1',
    title: '2025 McLaren W1',
    creator: 'Ddiaz Design',
    creatorUrl: 'https://sketchfab.com/ddiaz-design',
    source: 'https://sketchfab.com/3d-models/2025-mclaren-w1-519ee6f9089b4d548cd4384ef159f62e',
    license: 'Creative Commons Attribution-NonCommercial-ShareAlike 4.0 (CC BY-NC-SA 4.0)',
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
  },
  {
    vehicleId: 'porsche-918-spyder',
    title: '2026 Porsche 918 Spyder Asphalt Edition',
    creator: 'Ddiaz Design',
    creatorUrl: 'https://sketchfab.com/ddiaz-design',
    source: 'https://sketchfab.com/3d-models/2026-porsche-918-spyder-asphalt-edition-af0c8754a78f48729e3ca5a4adc0c7ae',
    license: 'Creative Commons Attribution-NonCommercial-ShareAlike 4.0 (CC BY-NC-SA 4.0)',
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
  },
  {
    vehicleId: 'gmc-hummer-ev-suv',
    title: '2024 GMC Hummer EV SUV',
    creator: 'Ddiaz Design',
    creatorUrl: 'https://sketchfab.com/ddiaz-design',
    source: 'https://sketchfab.com/3d-models/2024-gmc-hummer-ev-suv-7cd584fc9ba54acd9002d4286a08e419',
    license: 'Creative Commons Attribution-NonCommercial-ShareAlike 4.0 (CC BY-NC-SA 4.0)',
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
  },
]

export const creditFor = (vehicleId: string) => MODEL_CREDITS.find((c) => c.vehicleId === vehicleId)
