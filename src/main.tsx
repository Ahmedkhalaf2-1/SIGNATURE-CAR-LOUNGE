import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './styles/reset.css'
import './styles/variables.css'
import './styles/fonts.css'
import './styles/globals.css'
import './styles/home.css'
import './styles/chrome.css'
import './styles/brand.css'
import { AppRouter } from './router/AppRouter'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <AppRouter />
    </HelmetProvider>
  </StrictMode>,
)
