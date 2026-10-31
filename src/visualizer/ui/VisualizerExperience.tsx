import { lazy, Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { PART_LABELS, SERVICES } from '../constants'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { hoverStore, useHover } from '../state/hoverStore'
import { useVisualizer } from '../state/useVisualizer'
import type { PaintPanelId } from '../types'
import type { VehicleCapabilities } from '../vehicle/types'
import { useI18n } from '../../i18n'
import { CameraBar } from './CameraBar'
import { ModePanel } from './ModePanels'
import { RadioGroup } from './OptionGroup'
import { RequestModal } from './RequestModal'
import { FallbackPanel, LoadingScreen, VisualizerErrorBoundary } from './StatusScreens'
import { webglAvailable } from '../hooks/webgl'
import type { VisualizerVehicle } from '../vehicle/vehicleRegistry'
import { DirArrow } from '../../components/common/Icons'
import { Summary } from './Summary'
import { useSummaryRows } from './useSummaryRows'

// three.js, drei and the GLB loader only ship when this route is visited.
const VisualizerCanvas = lazy(() => import('../scene/VisualizerCanvas'))

const MOBILE_QUERY = '(max-width: 900px)'

function useIsMobile() {
  const [mobile, setMobile] = useState(() => window.matchMedia(MOBILE_QUERY).matches)
  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY)
    const on = () => setMobile(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return mobile
}

/** How much of the canvas the UI covers, so the 3D camera can re-centre the vehicle in the free space. */
function useViewInset(stage: React.RefObject<HTMLElement | null>, panel: React.RefObject<HTMLElement | null>, bar: React.RefObject<HTMLElement | null>, modes: React.RefObject<HTMLElement | null>, mobile: boolean, rtl: boolean, barHidden: boolean) {
  const [inset, setInset] = useState({ x: 0, y: 0, w: 0, h: 0 })
  useLayoutEffect(() => {
    const s = stage.current
    if (!s) return
    const measure = () => {
      const sr = s.getBoundingClientRect()
      if (mobile) {
        const ph = panel.current?.getBoundingClientRect().height ?? 0
        const bh = barHidden ? 0 : (bar.current?.getBoundingClientRect().height ?? 0)
        const top = Math.max(0, (modes.current?.getBoundingClientRect().bottom ?? sr.top) - sr.top)
        s.style.setProperty('--viz-sheet-h', `${ph}px`)
        // Centre the vehicle between the mode row above and the sheet / camera bar below.
        const covered = ph + (barHidden ? 0 : bh + 12)
        const y = Math.round((covered - top) / 2)
        const h = Math.max(120, Math.round(sr.height - covered - top))
        const w = Math.round(sr.width)
        setInset((p) => (p.x === 0 && p.y === y && p.w === w && p.h === h ? p : { x: 0, y, w, h }))
      } else {
        const pr = panel.current?.getBoundingClientRect()
        const covered = pr ? (rtl ? pr.right - sr.left : sr.right - pr.left) : 0
        const x = Math.round((rtl ? -covered : covered) / 2)
        const w = Math.max(200, Math.round(sr.width - Math.abs(x) * 2))
        const h = Math.round(sr.height)
        setInset((p) => (p.x === x && p.y === 0 && p.w === w && p.h === h ? p : { x, y: 0, w, h }))
      }
    }
    measure()
    const ro = new ResizeObserver(measure)
    ;[s, panel.current, bar.current, modes.current].forEach((el) => el && ro.observe(el))
    return () => ro.disconnect()
  }, [stage, panel, bar, modes, mobile, rtl, barHidden])
  return inset
}

function HoverTip() {
  const { t } = useI18n()
  const hover = useHover()
  if (!hover) return null
  return (
    <div className="viz-tip" role="status" aria-live="polite">
      <strong>{t(PART_LABELS[hover.part] ?? 'Vehicle Body')}</strong>
      <span>{hover.approximate ? t('Whole-body preview on this test model') : t('Click to add or remove')}</span>
    </div>
  )
}

export function VisualizerExperience({ vehicle, onChangeVehicle }: { vehicle: VisualizerVehicle; onChangeVehicle: () => void }) {
  const { t, isRtl } = useI18n()
  const { state, dispatch, configuration } = useVisualizer()
  const reducedMotion = useReducedMotion()
  const mobile = useIsMobile()
  const [attempt, setAttempt] = useState(0)
  const [supported, setSupported] = useState(webglAvailable)
  const [ready, setReady] = useState(false)
  const [capabilities, setCapabilities] = useState<VehicleCapabilities | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const stageRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const modesRef = useRef<HTMLDivElement>(null)
  const inset = useViewInset(stageRef, panelRef, barRef, modesRef, mobile, isRtl, mobile && sheetOpen)

  const onReady = useCallback((info: { capabilities: VehicleCapabilities }) => {
    setCapabilities(info.capabilities)
    // Two frames so the first rendered image (floor reflection, environment) is on screen before the veil lifts.
    requestAnimationFrame(() => requestAnimationFrame(() => setReady(true)))
  }, [])
  const onPanelToggle = useCallback((panel: PaintPanelId) => dispatch({ type: 'togglePanel', panel }), [dispatch])
  const onContextLost = useCallback(() => setSupported(false), [])

  const retry = () => {
    hoverStore.set(null)
    setReady(false)
    setSupported(webglAvailable())
    setAttempt((n) => n + 1)
  }

  const summaryRows = useSummaryRows(configuration)
  // Collapsed mobile sheet: every applied treatment, e.g. "Candy Red · Gloss · Full Front · Ceramic · 35%".
  const brief = summaryRows
    .slice(1)
    .map((r) => r.value)
    .join(' · ')

  const canExplode = (capabilities?.explodableParts ?? 0) > 0

  return (
    <section className="viz" aria-label={t('3D vehicle visualizer')}>
      <div className="viz-stage" ref={stageRef}>
        {supported ? (
          <VisualizerErrorBoundary key={attempt} fallback={(reset) => <FallbackPanel onRetry={() => { reset(); retry() }} />}>
            <Suspense fallback={null}>
              <VisualizerCanvas
                config={vehicle.config}
                state={state}
                reducedMotion={reducedMotion}
                compact={mobile}
                inset={inset}
                ariaLabel={t('Interactive 3D view of the vehicle. Use arrow keys to rotate and plus or minus to zoom.')}
                onPanelToggle={onPanelToggle}
                onReady={onReady}
                onContextLost={onContextLost}
              />
            </Suspense>
          </VisualizerErrorBoundary>
        ) : (
          <FallbackPanel onRetry={retry} />
        )}
        {supported && <LoadingScreen done={ready} vehicleName={`${vehicle.manufacturer} ${vehicle.name}`} />}

        <button type="button" className="viz-change" onClick={onChangeVehicle}>
          <DirArrow dir="w" />
          <span>{t('Change Vehicle')}</span>
        </button>

        <div className="viz-modes" ref={modesRef} role="group" aria-label={t('Service')}>
          <RadioGroup
            legend={t('Service')}
            hideLegend
            variant="segmented"
            options={SERVICES.map((s) => ({ id: s.id, label: t(s.label), applied: state[s.id].enabled }))}
            value={state.activeService}
            onChange={(service) => dispatch({ type: 'setActiveService', service })}
          />
        </div>

        <HoverTip />

        <CameraBar state={state} dispatch={dispatch} canExplode={canExplode} hidden={sheetOpen} barRef={barRef} />

        <aside className={`viz-panel${sheetOpen ? ' is-open' : ''}`} ref={panelRef} aria-label={t('Configuration')}>
          <button type="button" className="viz-sheet-toggle" aria-expanded={sheetOpen} onClick={() => setSheetOpen((v) => !v)}>
            <span className="viz-sheet-toggle__grip" aria-hidden="true" />
            <span className="viz-sheet-toggle__text">{sheetOpen ? t('Hide options') : t('Customize')}</span>
            <span className="viz-sheet-toggle__brief">{brief}</span>
          </button>
          <div className="viz-panel__scroll">
            <p className="viz-eyebrow">{t('Configure')}</p>
            <ModePanel state={state} dispatch={dispatch} capabilities={capabilities} />
            <div className="viz-panel__summary">
              <p className="viz-eyebrow">{t('Summary')}</p>
              <Summary configuration={configuration} compact />
            </div>
          </div>
          <div className="viz-panel__actions">
            <button type="button" className="viz-btn viz-btn--primary" onClick={() => setModalOpen(true)}>
              {t('Request This Configuration')}
            </button>
            <button type="button" className="viz-btn viz-btn--ghost" onClick={() => dispatch({ type: 'reset' })}>
              {t('Reset Configuration')}
            </button>
          </div>
        </aside>
      </div>
      <RequestModal open={modalOpen} configuration={configuration} onClose={() => setModalOpen(false)} />
    </section>
  )
}
