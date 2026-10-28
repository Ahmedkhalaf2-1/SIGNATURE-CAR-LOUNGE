import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import type { FormKind } from './api/_lib/forms.ts'

/** Serves /api/contact and /api/booking during `vite` / `vite preview` using the same handler core as /api/*.ts. */
function formApi(): Plugin {
  const mount = (server: { middlewares: { use: (fn: (req: any, res: any, next: () => void) => void) => void } }) => {
    // Server-only: load every .env var (not just VITE_*) into the dev server process, never into the client bundle.
    Object.assign(process.env, { ...loadEnv('development', process.cwd(), ''), ...process.env })
    server.middlewares.use(async (req, res, next) => {
      const kind = /^\/api\/(contact|booking)\/?(\?.*)?$/.exec(req.url ?? '')?.[1] as FormKind | undefined
      if (!kind) return next()
      let raw = ''
      for await (const chunk of req) raw += chunk
      let payload: unknown
      try {
        payload = raw ? JSON.parse(raw) : undefined
      } catch {
        payload = undefined
      }
      const { handleForm } = await import('./api/_lib/forms.ts')
      const { status, body } = await handleForm(kind, req.method, payload)
      res.statusCode = status
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(body))
    })
  }
  return { name: 'form-api', configureServer: mount, configurePreviewServer: mount }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), formApi()],
})
