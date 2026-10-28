import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './styles/reset.css'
import './styles/variables.css'
import './styles/fonts.css'
import './styles/fonts-ar.css'
import './styles/globals.css'
import './styles/home.css'
import './styles/chrome.css'
import './styles/brand.css'
import './styles/rtl.css'
import { AppRouter } from './router/AppRouter'
import { I18nProvider } from './i18n'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider>
      <HelmetProvider>
        <AppRouter />
      </HelmetProvider>
    </I18nProvider>
  </StrictMode>,
)
