import type { RequestHandler } from 'express'

/** Hard cap on tracked IPs so a flood of distinct addresses cannot grow memory without bound. */
const MAX_TRACKED_IPS = 10_000

/** Simple in-memory fixed-window limiter (per process). Fine for a single PM2 instance. */
export function rateLimit(max: number, windowMs: number): RequestHandler {
  const hits = new Map<string, { count: number; resetAt: number }>()

  setInterval(() => {
    const now = Date.now()
    for (const [ip, h] of hits) if (h.resetAt <= now) hits.delete(ip)
  }, 60 * 1000).unref()

  return (req, res, next) => {
    const ip = req.ip ?? 'unknown'
    const now = Date.now()
    let h = hits.get(ip)
    if (!h || h.resetAt <= now) {
      if (!h && hits.size >= MAX_TRACKED_IPS) hits.delete(hits.keys().next().value as string)
      h = { count: 0, resetAt: now + windowMs }
      hits.set(ip, h)
    }
    h.count += 1
    if (h.count > max) {
      res.setHeader('Retry-After', String(Math.ceil((h.resetAt - now) / 1000)))
      res.status(429).json({ ok: false, error: 'RATE_LIMITED', message: 'Too many requests. Please try again later.' })
      return
    }
    next()
  }
}
