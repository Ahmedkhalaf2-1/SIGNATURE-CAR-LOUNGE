import { Router } from 'express'

const router = Router()

router.get('/', (_req, res) => {
  res.json({ ok: true, service: 'signature-car-lounge-api' })
})

export default router
