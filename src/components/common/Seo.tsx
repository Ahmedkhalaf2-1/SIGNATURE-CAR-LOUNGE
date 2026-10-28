import { Helmet } from 'react-helmet-async'

interface SeoProps {
  title: string
  description?: string
  /** Absolute or root-relative image used for Open Graph. */
  image?: string
}

const SITE_NAME = 'Signature Car Lounge'

/** Page-level title/description/Open Graph tags. Titles are the captured <title> values. */
export function Seo({ title, description, image = '/assets/images/hero-banner.jpg' }: SeoProps) {
  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:image" content={image} />
    </Helmet>
  )
}
