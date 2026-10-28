import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Restores the multi-page feel: new route -> top of page; in-page hashes -> scroll to the anchor. */
export function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1))
      if (target) {
        target.scrollIntoView()
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}
