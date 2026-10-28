const PHRASE = 'PRECISION IN EVERY DETAIL   ✦   THE ART OF AUTOMOTIVE CARE   ✦   EXCEPTIONAL BY DESIGN'

/** Decorative scrolling strip; the track is duplicated so the -50% translate loops seamlessly. */
export function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[0, 1, 2, 3].map((i) => (
          <span key={i}>{PHRASE}</span>
        ))}
      </div>
    </div>
  )
}
