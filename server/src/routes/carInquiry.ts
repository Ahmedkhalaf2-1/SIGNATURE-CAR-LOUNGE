import { Router } from 'express'
import { EmailError, sendCarInquiryEmail } from '../services/email.js'
import { validateCarInquiry } from '../utils/carInquiry.js'

const router = Router()

router.post('/', async (req, res) => {
  const result = validateCarInquiry(req.body)
  if (!result.ok) {
    // Honeypot hits get a quiet 200 so bots learn nothing; nothing is sent or logged.
    if (result.bot) {
      res.json({ ok: true })
      return
    }
    res.status(400).json({ ok: false, error: result.error })
    return
  }
  try {
    await sendCarInquiryEmail(result.inquiry)
    res.json({ ok: true })
  } catch (err) {
    console.error('[car-inquiry] email failed', { name: err instanceof Error ? err.name : 'UnknownError', reason: err instanceof EmailError ? err.message : undefined })
    res.status(502).json({ ok: false, error: 'Unable to send enquiry right now. Please try again.' })
  }
})

export default router
