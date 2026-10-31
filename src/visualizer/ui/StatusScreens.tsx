import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { IMAGES } from '../../lib/assets'
import { ROUTES } from '../../data/site'
import { useI18n } from '../../i18n'

export function LoadingScreen({ done, vehicleName }: { done: boolean; vehicleName?: string }) {
  const { t } = useI18n()
  return (
    <div className={`viz-loading${done ? ' is-done' : ''}`} role="status" aria-live="polite" aria-hidden={done}>
      <img src={IMAGES.logo} alt="" width={64} height={64} />
      <h2 className="viz-loading__title">{vehicleName ? `${t('Loading')} ${vehicleName}` : t('Preparing Studio')}</h2>
      {vehicleName && <p className="viz-loading__sub">{t('Preparing Studio')}</p>}
      <span className="viz-loading__bar" aria-hidden="true" />
    </div>
  )
}

export function FallbackPanel({ onRetry, detail }: { onRetry: () => void; detail?: string }) {
  const { t } = useI18n()
  return (
    <div className="viz-fallback" role="alert">
      <img src={IMAGES.logo} alt="" width={56} height={56} />
      <h2 className="viz-fallback__title">{t('3D Visualizer is not available on this device.')}</h2>
      <p className="viz-hint">{t('Your browser could not start 3D graphics. Try again, or explore our services instead.')}</p>
      {detail && <p className="viz-hint viz-hint--mono">{detail}</p>}
      <div className="viz-modal__actions">
        <button type="button" className="viz-btn viz-btn--primary" onClick={onRetry}>
          {t('Try again')}
        </button>
        <Link className="viz-btn viz-btn--ghost" to={ROUTES.services}>
          {t('Return to Services')}
        </Link>
      </div>
    </div>
  )
}

interface BoundaryProps {
  children: ReactNode
  fallback: (reset: () => void, error: Error) => ReactNode
}
interface BoundaryState {
  error: Error | null
}

/** A three.js / GLB failure must never take the rest of the site down. */
export class VisualizerErrorBoundary extends Component<BoundaryProps, BoundaryState> {
  state: BoundaryState = { error: null }
  static getDerivedStateFromError(error: Error): BoundaryState {
    return { error }
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[visualizer]', error, info.componentStack)
  }
  reset = () => this.setState({ error: null })
  render() {
    return this.state.error ? this.props.fallback(this.reset, this.state.error) : this.props.children
  }
}
