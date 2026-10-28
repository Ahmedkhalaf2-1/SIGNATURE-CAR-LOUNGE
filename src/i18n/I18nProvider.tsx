import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { en } from './en'
import { arSA } from './ar-SA'
import { I18nContext, type I18nValue } from './context'
import { DEFAULT_LOCALE, LOCALES, STORAGE_KEY, isLocale, type Locale } from './locales'

const CATALOGUES: Record<Locale, Record<string, string>> = { en, 'ar-SA': arSA }

function readStoredLocale(): Locale {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    if (isLocale(v)) return v
  } catch {
    /* storage unavailable (private mode etc.) */
  }
  return DEFAULT_LOCALE
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readStoredLocale)
  const info = LOCALES[locale]

  // Keep <html lang/dir> in sync (index.html applies the stored value before first paint).
  useEffect(() => {
    document.documentElement.lang = info.lang
    document.documentElement.dir = info.dir
  }, [info])

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l)
    try {
      localStorage.setItem(STORAGE_KEY, l)
    } catch {
      /* ignore */
    }
  }, [])

  const value = useMemo<I18nValue>(() => {
    const cat = CATALOGUES[locale]
    return { locale, info, isRtl: info.dir === 'rtl', setLocale, t: (s) => cat[s] ?? s }
  }, [locale, info, setLocale])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
