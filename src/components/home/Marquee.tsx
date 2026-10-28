import { useI18n } from '../../i18n'

const PHRASES = ['PRECISION IN EVERY DETAIL', 'THE ART OF AUTOMOTIVE CARE', 'EXCEPTIONAL BY DESIGN']
// Separator copied from the captured strip: space, NBSP, space, glyph, space, NBSP, space.
const SEP = ' \u00a0 ✦ \u00a0 '

/** Decorative scrolling strip; the track is duplicated so the -50% translate loops seamlessly. */
export function Marquee() {
  const { t } = useI18n()
  const phrase = PHRASES.map((p) => t(p)).join(SEP)
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[0, 1, 2, 3].map((i) => (
          <span key={i}>{phrase}</span>
        ))}
      </div>
    </div>
  )
}
