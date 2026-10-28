import { useRef } from 'react'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { Hero } from '../components/home/Hero'
import { Marquee } from '../components/home/Marquee'
import { Philosophy } from '../components/home/Philosophy'
import { ServicesGrid } from '../components/sections/ServicesGrid'
import { Experience } from '../components/home/Experience'
import { GalleryGrid } from '../components/sections/GalleryGrid'
import { Difference } from '../components/home/Difference'
import { EndCta } from '../components/home/EndCta'
import { Seo } from '../components/common/Seo'
import { useReveal } from '../lib/useReveal'

export default function HomePage() {
  const root = useRef<HTMLDivElement>(null)
  const motion = useReveal(root)

  return (
    <div className={`scl-home${motion ? ' scl-motion' : ''}`} ref={root}>
      <Seo title="Signature Car Lounge" description="A considered world of automotive detailing, protection and individual expression." />
      <Header />
      <Hero />
      <Marquee />
      <Philosophy />
      <ServicesGrid />
      <Experience />
      <GalleryGrid />
      <Difference />
      <EndCta />
      <Footer />
    </div>
  )
}
