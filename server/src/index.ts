import 'dotenv/config'
import express, { type ErrorRequestHandler, type RequestHandler } from 'express'
import helmet from 'helmet'
import { rateLimit } from './middleware/rateLimit.js'
import bookingRoute from './routes/booking.js'
import contactRoute from './routes/contact.js'
import healthRoute from './routes/health.js'

const PORT = Number(process.env.PORT) || 3001
const HOST = process.env.HOST || '127.0.0.1'

const app = express()
app.disable('x-powered-by')
// Behind Caddy on the same machine: trust X-Forwarded-For from loopback only, so req.ip is the visitor
// and entries a client prepends itself are never believed.
app.set('trust proxy', 'loopback')
app.use(helmet())
// Same-origin in dev (Vite proxy) and prod (Caddy), so no CORS headers are sent. Responses are never cacheable.
app.use((_req, res, next) => {
  res.setHeader('Cache-Control', 'no-store')
  next()
})

const methods =
  (allow: string): RequestHandler =>
  (req, res, next) => {
    if (allow.split(', ').includes(req.method)) return next()
    res.setHeader('Allow', allow)
    res.status(405).json({ ok: false, error: 'METHOD_NOT_ALLOWED', message: 'Method not allowed.' })
  }

/** Form endpoints take JSON only; express.json would otherwise skip other content types without a word. */
const requireJson: RequestHandler = (req, res, next) => {
  if (req.is('application/json')) return next()
  res.status(415).json({ ok: false, error: 'UNSUPPORTED_MEDIA_TYPE', message: 'Content-Type must be application/json.' })
}

// 5 form submissions per IP per 10 minutes, shared by both form endpoints.
const formLimit = rateLimit(5, 10 * 60 * 1000)
// Order matters: method check, then the limiter (so malformed/oversized bodies count too), then content type, then parse.
const formPipeline = [methods('POST'), formLimit, requireJson, express.json({ limit: '20kb' })]

app.use('/api/health', methods('GET, HEAD'), healthRoute)
app.use('/api/contact', ...formPipeline, contactRoute)
app.use('/api/booking', ...formPipeline, bookingRoute)

app.use((_req, res) => {
  res.status(404).json({ ok: false, error: 'NOT_FOUND', message: 'Not found.' })
})

// Body-parser failures (bad JSON, too large) and anything unexpected: safe JSON only, never internals.
const onError: ErrorRequestHandler = (err, _req, res, next) => {
  if (res.headersSent) return next(err)
  switch (err?.type) {
    case 'entity.too.large':
      res.status(413).json({ ok: false, error: 'PAYLOAD_TOO_LARGE', message: 'Your message is too large.' })
      return
    case 'charset.unsupported':
    case 'encoding.unsupported':
      res.status(415).json({ ok: false, error: 'UNSUPPORTED_MEDIA_TYPE', message: 'Unsupported request encoding.' })
      return
    case 'entity.parse.failed':
    case 'entity.verify.failed':
    case 'request.aborted':
    case 'request.size.invalid':
      res.status(400).json({ ok: false, error: 'INVALID_REQUEST', message: 'Invalid request.' })
      return
  }
  console.error('Unhandled error', { name: err instanceof Error ? err.name : 'UnknownError' })
  res.status(500).json({ ok: false, error: 'SERVER_ERROR', message: 'Something went wrong. Please try again later.' })
}
app.use(onError)

if (!process.env.RESEND_API_KEY) console.warn('Warning: RESEND_API_KEY is not set; form emails will fail.')

app.listen(PORT, HOST, () => {
  console.log(`signature-car-lounge-api listening on http://${HOST}:${PORT}`)
})
