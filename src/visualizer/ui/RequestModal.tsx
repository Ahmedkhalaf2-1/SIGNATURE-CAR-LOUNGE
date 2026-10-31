import { useEffect, useRef } from 'react'
import type { VisualizerConfiguration } from '../types'
import { useI18n } from '../../i18n'
import { Summary } from './Summary'

interface Props {
  open: boolean
  configuration: VisualizerConfiguration
  onClose: () => void
}

/** Frontend-only confirmation. Nothing is sent; `configuration` is already shaped for the enquiry endpoint. */
export function RequestModal({ open, configuration, onClose }: Props) {
  const { t } = useI18n()
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      className="viz-modal"
      aria-labelledby="viz-modal-title"
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
    >
      <div className="viz-modal__body">
        <p className="viz-eyebrow">{t('Your configuration')}</p>
        <h2 className="viz-modal__title" id="viz-modal-title">
          {t('Request This Configuration')}
        </h2>
        <Summary configuration={configuration} />
        <p className="viz-note">{t('This is a preview. Nothing has been sent. Our team will take your configuration into your consultation when you book.')}</p>
        <div className="viz-modal__actions">
          <button type="button" className="viz-btn viz-btn--ghost" onClick={onClose}>
            {t('Close')}
          </button>
          <button type="button" className="viz-btn viz-btn--primary" onClick={onClose}>
            {t('Continue Later')}
          </button>
        </div>
      </div>
    </dialog>
  )
}
