import 'dotenv/config'
import express, { type ErrorRequestHandler } from 'express'
import { rateLimit } from './middleware/rateLimit.js'
import bookingRoute from './routes/booking.js'
import contactRoute from './routes/contact.js'
import healthRoute from './routes/health.js'

const PORT = Number(process.env.PORT) || 3001
const HOST = process.env.HOST || '127.0.0.1'

const app = express()
app.disable('x-powered-by')
// Behind Caddy on the same machine: trust X-Forwarded-For from loopback so req.ip is the visitor.
app.set('trust proxy', 'loopback')

app.use('/api', express.json({ limit: '20kb' }))

// 5 form submissions per IP per 10 minutes, shared by both form endpoints.
const formLimit = rateLimit(5, 10 * 60 * 1000)

app.use('/api/health', healthRoute)
app.use('/api/contact', formLimit, contactRoute)
app.use('/api/booking', formLimit, bookingRoute)

app.use('/api', (_req, res) => {
  res.status(404).json({ ok: false, error: 'Not found.' })
})

const onError: ErrorRequestHandler = (err, _req, res, _next) => {
  const status = typeof err?.status === 'number' ? err.status : 500
  if (status >= 500) console.error(err)
  res.status(status).json({
    ok: false,
    error: status === 413 ? 'Request too large.' : status < 500 ? 'Invalid request.' : 'Server error.',
  })
}
app.use(onError)

if (!process.env.RESEND_API_KEY) console.warn('Warning: RESEND_API_KEY is not set; form emails will fail.')

app.listen(PORT, HOST, () => {
  console.log(`signature-car-lounge-api listening on http://${HOST}:${PORT}`)
})
