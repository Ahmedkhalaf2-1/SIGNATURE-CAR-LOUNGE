import { Router } from 'express'
import { EmailError, sendFormEmail } from '../services/email.js'
import { validateForm, type FormKind } from '../utils/validation.js'

/** Builds a POST handler router for one form: validate -> honeypot -> email via Resend. */
export function formRoute(kind: FormKind): Router {
  const router = Router()
  router.post('/', async (req, res) => {
    const result = validateForm(kind, req.body)
    if (!result.ok) {
      // Honeypot hits get a quiet 200 so bots learn nothing; nothing is sent.
      if (result.bot) {
        res.json({ ok: true })
        return
      }
      res.status(400).json({ ok: false, error: 'VALIDATION_ERROR', message: result.message })
      return
    }
    try {
      await sendFormEmail(kind, result.values)
      res.json({ ok: true })
    } catch (err) {
      // Name/category only: Resend and network error messages are not ours to log or forward.
      console.error(`[${kind}] email failed`, { name: err instanceof Error ? err.name : 'UnknownError', reason: err instanceof EmailError ? err.message : undefined })
      res.status(502).json({
        ok: false,
        error: 'EMAIL_SEND_FAILED',
        message: 'We could not send your message. Please try again.',
      })
    }
  })
  return router
}
