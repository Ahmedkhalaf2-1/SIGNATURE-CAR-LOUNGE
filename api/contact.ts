import type { IncomingMessage, ServerResponse } from 'node:http'
import { handleForm } from './_lib/forms.ts'

// Vercel-style Node function (POST /api/contact). Body is JSON-parsed by the platform.
export default async function handler(req: IncomingMessage & { body?: unknown }, res: ServerResponse) {
  const { status, body } = await handleForm('contact', req.method, req.body)
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Cache-Control', 'no-store')
  res.end(JSON.stringify(body))
}
