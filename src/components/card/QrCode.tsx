import { useMemo } from 'react'
import qrcode from 'qrcode-generator'

interface Props {
  value: string
  /** Accessible name, e.g. "QR code linking to this card". */
  label: string
  className?: string
}

/**
 * Crisp SVG QR code. Modules are merged into horizontal runs in one path, so it stays small and sharp at any size.
 * Colours come from CSS (`.qr` fill = the dark module colour); the quiet zone is the standard 4 modules.
 */
export function QrCode({ value, label, className }: Props) {
  const { size, d } = useMemo(() => {
    const qr = qrcode(0, 'M')
    qr.addData(value)
    qr.make()
    const n = qr.getModuleCount()
    const quiet = 4
    let path = ''
    for (let y = 0; y < n; y++) {
      let x = 0
      while (x < n) {
        if (!qr.isDark(y, x)) {
          x++
          continue
        }
        const start = x
        while (x < n && qr.isDark(y, x)) x++
        path += `M${start + quiet} ${y + quiet}h${x - start}v1h${-(x - start)}z`
      }
    }
    return { size: n + quiet * 2, d: path }
  }, [value])

  return (
    <svg className={className} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={label} shapeRendering="crispEdges">
      <path className="qr__modules" d={d} />
    </svg>
  )
}
