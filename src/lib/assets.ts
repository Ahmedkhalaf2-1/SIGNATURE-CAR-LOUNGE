/** All images ship locally from /public/assets/images (copied from the captured export). */
export const img = (file: string): string => `/assets/images/${file}`

export const IMAGES = {
  logo: img('logo.png'),
  hero: img('hero-banner.jpg'),
  detailing: img('814e2e85-6807-48c1-961e-71ea36e7b1f8-1.webp'),
  ppf: img('26b659a1-2a3d-40db-a7f7-762ebf160670-1.webp'),
  ceramic: img('de3d88ed-3d3b-4deb-9637-114fd5ccf715-1.webp'),
  bodyKits: img('fbb4cb03-08c1-45f4-9e93-3bcdcad22fbd-1.webp'),
  restoration: img('941e188e-50da-4f35-b0fe-b7edde1bf792-1.webp'),
  spa: img('5054bea5-6fdd-4d5c-9153-b854b99e0543-1.webp'),
  end: img('d1846466-7ee8-48f3-82a1-0e5af2c6b3d8-1.webp'),
  wheel: img('wheel.jpg'),
} as const
