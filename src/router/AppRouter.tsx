import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { RootLayout } from '../components/layout/RootLayout'
import { InnerLayout } from '../components/layout/InnerLayout'
import HomePage from '../pages/HomePage'
import { ROUTES, SERVICES } from '../data/site'

const AboutPage = lazy(() => import('../pages/AboutPage'))
const ServicesPage = lazy(() => import('../pages/ServicesPage'))
const DetailingPage = lazy(() => import('../pages/DetailingPage'))
const PPFPage = lazy(() => import('../pages/PPFPage'))
const CeramicCoatingPage = lazy(() => import('../pages/CeramicCoatingPage'))
const BodyKitsPage = lazy(() => import('../pages/BodyKitsPage'))
const RestorationPage = lazy(() => import('../pages/RestorationPage'))
const AutomotiveSpaPage = lazy(() => import('../pages/AutomotiveSpaPage'))
const CarsForSalePage = lazy(() => import('../pages/CarsForSalePage'))
const CarDetailPage = lazy(() => import('../pages/CarDetailPage'))
const VisualizerPage = lazy(() => import('../pages/VisualizerPage'))
const DigitalCardPage = lazy(() => import('../pages/DigitalCardPage'))
const ExperiencePage = lazy(() => import('../pages/ExperiencePage'))
const GalleryPage = lazy(() => import('../pages/GalleryPage'))
const FAQPage = lazy(() => import('../pages/FAQPage'))
const ContactPage = lazy(() => import('../pages/ContactPage'))
const BookingPage = lazy(() => import('../pages/BookingPage'))
const PrivacyPage = lazy(() => import('../pages/PrivacyPage'))
const TermsPage = lazy(() => import('../pages/TermsPage'))

const SERVICE_PAGES = [DetailingPage, PPFPage, CeramicCoatingPage, BodyKitsPage, RestorationPage, AutomotiveSpaPage]

/** Routes mirror site-map.json. `?service=` booking variants are handled inside BookingForm. */
export function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          <Route element={<RootLayout />}>
            <Route index element={<HomePage />} />
            {/* Standalone digital business card: no header/footer and not linked from any menu. */}
            <Route path="/connect/rayan" element={<DigitalCardPage />} />
            <Route element={<InnerLayout />}>
              <Route path={ROUTES.about} element={<AboutPage />} />
              <Route path={ROUTES.services} element={<ServicesPage />} />
              {SERVICES.map((s, i) => {
                const Page = SERVICE_PAGES[i]
                return <Route key={s.key} path={s.path} element={<Page />} />
              })}
              <Route path={ROUTES.cars} element={<CarsForSalePage />} />
              <Route path={`${ROUTES.cars}/:slug`} element={<CarDetailPage />} />
              <Route path={ROUTES.visualizer} element={<VisualizerPage />} />
              <Route path={ROUTES.experience} element={<ExperiencePage />} />
              <Route path={ROUTES.gallery} element={<GalleryPage />} />
              <Route path={ROUTES.faq} element={<FAQPage />} />
              <Route path={ROUTES.contact} element={<ContactPage />} />
              <Route path={ROUTES.booking} element={<BookingPage />} />
              <Route path={ROUTES.privacy} element={<PrivacyPage />} />
              <Route path={ROUTES.terms} element={<TermsPage />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
