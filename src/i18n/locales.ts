export type Locale = 'en' | 'ar-SA'

export interface LocaleInfo {
  /** Value for <html lang>. */
  lang: string
  dir: 'ltr' | 'rtl'
  /** Open Graph locale. */
  og: string
  /** BCP 47 tag for Intl formatting: Gregorian calendar and Latin digits in both languages. */
  intl: string
}

export const DEFAULT_LOCALE: Locale = 'en'
export const STORAGE_KEY = 'scl-locale'

export const LOCALES: Record<Locale, LocaleInfo> = {
  en: { lang: 'en', dir: 'ltr', og: 'en_US', intl: 'en-GB-u-ca-gregory-nu-latn' },
  'ar-SA': { lang: 'ar-SA', dir: 'rtl', og: 'ar_SA', intl: 'ar-SA-u-ca-gregory-nu-latn' },
}

export const isLocale = (v: unknown): v is Locale => v === 'en' || v === 'ar-SA'
