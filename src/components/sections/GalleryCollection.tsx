import { img } from '../../lib/assets'
import './GalleryCollection.css'

const SHOTS = [
  { file: 'mercedes.jpg', alt: 'Sculpted lines — illustrative vehicle photography' },
  { file: 'detail.jpg', alt: 'The art of care — illustrative vehicle photography' },
  { file: 'ferrari.jpg', alt: 'Colour & character — illustrative vehicle photography' },
  { file: 'wheel.jpg', alt: 'Designed to stand apart — illustrative vehicle photography' },
  { file: 'classic.jpg', alt: 'Timeless presence — illustrative vehicle photography' },
  { file: 'porsche.jpg', alt: 'Performance in motion — illustrative vehicle photography' },
  { file: 'interior.jpg', alt: 'A considered finish — illustrative vehicle photography' },
  { file: 'road.jpg', alt: 'After dark — illustrative vehicle photography' },
]

/** The gallery page's image collection: two wide tiles followed by a three-up grid. */
export function GalleryCollection() {
  return (
    <div className="gallery-page-content" id="page-content">
      <div className="gallery-collection" id="collection">
        {SHOTS.map((s) => (
          <figure key={s.file}>
            <img src={img(s.file)} alt={s.alt} loading="lazy" />
          </figure>
        ))}
      </div>
    </div>
  )
}
