import { createContext } from 'react'
import type { Locale, LocaleInfo } from './locales'

export interface I18nValue {
  locale: Locale
  info: LocaleInfo
  isRtl: boolean
  setLocale: (l: Locale) => void
  /** Looks the English source string up in the active catalogue; falls back to the English text. */
  t: (source: string) => string
}

export const I18nContext = createContext<I18nValue | null>(null)
