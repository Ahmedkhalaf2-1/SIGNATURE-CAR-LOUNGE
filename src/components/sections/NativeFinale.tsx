import { Link } from 'react-router-dom'
import './NativeFinale.css'

interface NativeFinaleProps {
  /** `panel` = bordered gradient card (gallery); `plain` = flat band (booking). */
  variant: 'panel' | 'plain'
  to: string
  label: string
}

/** Closing CTA that the captured gallery and booking pages build from native Elementor widgets. */
export function NativeFinale({ variant, to, label }: NativeFinaleProps) {
  return (
    <section className={`native-finale native-finale--${variant}`}>
      <div className="native-finale__inner">
        <div className="native-finale__kicker">YOUR CAR. YOUR SIGNATURE.</div>
        <h2>
          Let’s start with <em>your vision.</em>
        </h2>
        <Link className="scl-page-cta native-finale__cta" to={to}>
          {label}
        </Link>
      </div>
    </section>
  )
}
