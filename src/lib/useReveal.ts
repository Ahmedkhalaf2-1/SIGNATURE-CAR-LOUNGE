import { useEffect, useState, type RefObject } from 'react'

/**
 * Reproduces the captured scroll-reveal: `.reveal` elements fade/slide in once they
 * enter the viewport. Returns whether motion is active so the root can carry `scl-motion`.
 */
export function useReveal(root: RefObject<HTMLElement | null>): boolean {
  const [motion, setMotion] = useState(false)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const items = Array.from(el.querySelectorAll<HTMLElement>('.reveal'))
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduce || !('IntersectionObserver' in window)) {
      items.forEach((i) => i.classList.add('visible'))
      return
    }

    setMotion(true)
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        }),
      { threshold: 0.06 },
    )
    items.forEach((i) => observer.observe(i))
    return () => observer.disconnect()
  }, [root])

  return motion
}
